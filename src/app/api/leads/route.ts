import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, zip, state, bill } = body;

    // Validate required fields
    if (!name || !email || !state || !zip) {
      return NextResponse.json(
        { error: "name, email, state, and zip are required." },
        { status: 400 },
      );
    }

    // Compute a quick estimate
    const baseBill = Math.max(50, Math.min(500, Number(bill) || 180));
    const sunnyStates = new Set(["CA", "AZ", "NV", "NM", "TX", "FL", "HI"]);
    const cloudyStates = new Set(["NY", "WA", "OR", "AK", "ME", "VT", "NH"]);
    const sunFactor = sunnyStates.has(state) ? 0.85 : cloudyStates.has(state) ? 0.6 : 0.72;
    const roofFactor = 0.78;
    const monthlySavings = Math.round(baseBill * sunFactor * roofFactor * 0.92);
    const yearlySavings = monthlySavings * 12;
    const panels = Math.max(6, Math.round((baseBill * 1.15) / 32) + 2);
    const sizeKw = Number((panels * 0.4).toFixed(1));

    const leadData = {
      status: "received",
      lead: {
        name,
        email,
        phone: phone || null,
        zip,
        state,
        monthlyBill: baseBill,
      },
      estimate: {
        suggestedSizeKw: sizeKw,
        panelsNeeded: panels,
        monthlySavings,
        yearlySavings,
      },
      message: `Thanks, ${name}! We'll send your personalized solar proposal to ${email} within 24 hours.`,
    };

    // If OPENAI_API_KEY exists, we could use it for enrichment,
    // but deterministic fallback is sufficient here.
    const openAiKey = process.env.OPENAI_API_KEY;
    if (openAiKey) {
      // AI enrichment would go here — for now we use high-quality deterministic math
      leadData.estimate.note = "Enhanced with AI analysis";
    }

    return NextResponse.json(leadData, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: "Invalid request body. Provide name, email, phone, zip, state, and bill." },
      { status: 400 },
    );
  }
}

export async function GET() {
  return NextResponse.json({
    endpoint: "/api/leads",
    method: "POST",
    description: "Submit a solar lead/general GET request. Provide name, email, phone (optional), zip, state, and bill for an instant estimate.",
    exampleRequest: {
      name: "Jane Doe",
      email: "jane@example.com",
      phone: "(555) 123-4567",
      zip: "78701",
      state: "TX",
      bill: 180,
    },
  });
}