import { NextRequest, NextResponse } from "next/server";

// ─── State rebate data ─────────────────────────────────────────
const stateRebates: Record<string, { federal: number; state: number; name: string }> = {
  CA: { federal: 30, state: 10, name: "California" },
  TX: { federal: 30, state: 0, name: "Texas" },
  NY: { federal: 30, state: 15, name: "New York" },
  FL: { federal: 30, state: 0, name: "Florida" },
  IL: { federal: 30, state: 10, name: "Illinois" },
  PA: { federal: 30, state: 5, name: "Pennsylvania" },
  OH: { federal: 30, state: 0, name: "Ohio" },
  NC: { federal: 30, state: 0, name: "North Carolina" },
  GA: { federal: 30, state: 0, name: "Georgia" },
  MI: { federal: 30, state: 5, name: "Michigan" },
  NJ: { federal: 30, state: 15, name: "New Jersey" },
  VA: { federal: 30, state: 10, name: "Virginia" },
  WA: { federal: 30, state: 5, name: "Washington" },
  AZ: { federal: 30, state: 0, name: "Arizona" },
  MA: { federal: 30, state: 20, name: "Massachusetts" },
  TN: { federal: 30, state: 0, name: "Tennessee" },
  IN: { federal: 30, state: 0, name: "Indiana" },
  MO: { federal: 30, state: 0, name: "Missouri" },
  MD: { federal: 30, state: 12, name: "Maryland" },
  WI: { federal: 30, state: 5, name: "Wisconsin" },
  CO: { federal: 30, state: 10, name: "Colorado" },
  MN: { federal: 30, state: 10, name: "Minnesota" },
  SC: { federal: 30, state: 0, name: "South Carolina" },
  AL: { federal: 30, state: 0, name: "Alabama" },
  LA: { federal: 30, state: 0, name: "Louisiana" },
  KY: { federal: 30, state: 0, name: "Kentucky" },
  OR: { federal: 30, state: 5, name: "Oregon" },
  OK: { federal: 30, state: 0, name: "Oklahoma" },
  CT: { federal: 30, state: 12, name: "Connecticut" },
  UT: { federal: 30, state: 0, name: "Utah" },
  NV: { federal: 30, state: 0, name: "Nevada" },
  NM: { federal: 30, state: 5, name: "New Mexico" },
  HI: { federal: 30, state: 15, name: "Hawaii" },
  ID: { federal: 30, state: 0, name: "Idaho" },
  MT: { federal: 30, state: 0, name: "Montana" },
  WY: { federal: 30, state: 0, name: "Wyoming" },
  NE: { federal: 30, state: 0, name: "Nebraska" },
  IA: { federal: 30, state: 5, name: "Iowa" },
  KS: { federal: 30, state: 0, name: "Kansas" },
  AR: { federal: 30, state: 0, name: "Arkansas" },
  MS: { federal: 30, state: 0, name: "Mississippi" },
  VT: { federal: 30, state: 18, name: "Vermont" },
  NH: { federal: 30, state: 5, name: "New Hampshire" },
  ME: { federal: 30, state: 10, name: "Maine" },
  RI: { federal: 30, state: 15, name: "Rhode Island" },
  SD: { federal: 30, state: 0, name: "South Dakota" },
  ND: { federal: 30, state: 0, name: "North Dakota" },
  DE: { federal: 30, state: 10, name: "Delaware" },
  WV: { federal: 30, state: 0, name: "West Virginia" },
  AK: { federal: 30, state: 0, name: "Alaska" },
  DC: { federal: 30, state: 20, name: "Washington, DC" },
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      monthlyBill = 180,
      roofSize = 700,
      zipCode = "78701",
      state = "TX",
      sunExposure = "moderate",
    } = body;

    // Parameter validation
    const bill = Math.max(30, Math.min(800, Number(monthlyBill)));
    const roof = Math.max(200, Math.min(3000, Number(roofSize)));

    // Solar factors
    const sunFactors: Record<string, number> = {
      sunny: 0.85,
      moderate: 0.72,
      cloudy: 0.5,
    };
    const sunFactor = sunFactors[sunExposure] ?? 0.72;
    const roofFactor = Math.min(1, roof / 800);

    // Rebate calculation
    const rebate = stateRebates[state] ?? { federal: 30, state: 0, name: "Generic" };
    const totalIncentivePct = rebate.federal + rebate.state;

    // Core math
    const monthlySavings = Math.round(bill * sunFactor * roofFactor * 0.9);
    const yearlySavings = monthlySavings * 12;
    const panelsNeeded = Math.max(6, Math.round((bill * 1.1) / 30) + 2);
    const systemSizeKw = Number((panelsNeeded * 0.4).toFixed(1));
    const grossCost = panelsNeeded * 1100;
    const netCost = Math.round(grossCost * (1 - totalIncentivePct / 100));
    const paybackYears = yearlySavings > 0
      ? Math.round((netCost / yearlySavings) * 10) / 10
      : 20;
    const total25YearValue = yearlySavings * 25 - netCost;
    const solarProductionKwh = Math.round(panelsNeeded * 0.4 * 1500 * roofFactor * sunFactor);
    const co2OffsetTons = Math.round(solarProductionKwh * 0.00085 * 10) / 10;

    const result = {
      input: { monthlyBill: bill, roofSize: roof, zipCode, state, sunExposure },
      savings: {
        monthly: monthlySavings,
        yearly: yearlySavings,
      },
      system: {
        sizeKw: systemSizeKw,
        panels: panelsNeeded,
        annualProductionKwh: solarProductionKwh,
      },
      costs: {
        grossCost,
        netCost,
        incentives: {
          federal: rebate.federal,
          state: rebate.state,
          totalPercent: totalIncentivePct,
          stateName: rebate.name,
        },
      },
      payback: {
        years: paybackYears,
        breakEvenYear: Math.ceil(paybackYears),
      },
      longTerm: {
        total25YearValue,
        co2OffsetTons,
        treesEquivalent: Math.round(co2OffsetTons * 45),
      },
    };

    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: "Invalid request body. Provide monthlyBill, roofSize, zipCode, state, and sunExposure." },
      { status: 400 },
    );
  }
}

export async function GET() {
  // Return documentation + example
  return NextResponse.json({
    endpoint: "/api/estimate",
    method: "POST",
    description: "Solar savings estimate calculator. Provide home details and get a complete breakdown.",
    exampleRequest: {
      monthlyBill: 180,
      roofSize: 700,
      zipCode: "78701",
      state: "TX",
      sunExposure: "moderate",
    },
    exampleResponse: {
      input: { monthlyBill: 180, roofSize: 700, zipCode: "78701", state: "TX", sunExposure: "moderate" },
      savings: { monthly: 91, yearly: 1092 },
      system: { sizeKw: 7.6, panels: 19, annualProductionKwh: 8280 },
      costs: { grossCost: 20900, netCost: 14630, incentives: { federal: 30, state: 0, totalPercent: 30, stateName: "Texas" } },
      payback: { years: 13.4, breakEvenYear: 14 },
      longTerm: { total25YearValue: 12670, co2OffsetTons: 7, treesEquivalent: 315 },
    },
    sunExposureOptions: ["sunny", "moderate", "cloudy"],
  });
}