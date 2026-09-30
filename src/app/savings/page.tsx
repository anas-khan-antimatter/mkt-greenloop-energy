"use client";

import { useState, useEffect, useCallback } from "react";
import { Sun, Leaf, ArrowRight, DollarSign, Zap, Home, Shield, Calculator, BarChart3, CheckCircle, Phone, Mail, MapPin, Menu, X, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";

// ─── State rebate data ─────────────────────────────────────────
const stateRebates: Record<string, { federal: number; state: number; name: string; }> = {
  "CA": { federal: 30, state: 10, name: "California" },
  "TX": { federal: 30, state: 0, name: "Texas" },
  "NY": { federal: 30, state: 15, name: "New York" },
  "FL": { federal: 30, state: 0, name: "Florida" },
  "IL": { federal: 30, state: 10, name: "Illinois" },
  "PA": { federal: 30, state: 5, name: "Pennsylvania" },
  "OH": { federal: 30, state: 0, name: "Ohio" },
  "NC": { federal: 30, state: 0, name: "North Carolina" },
  "GA": { federal: 30, state: 0, name: "Georgia" },
  "MI": { federal: 30, state: 5, name: "Michigan" },
  "NJ": { federal: 30, state: 15, name: "New Jersey" },
  "VA": { federal: 30, state: 10, name: "Virginia" },
  "WA": { federal: 30, state: 5, name: "Washington" },
  "AZ": { federal: 30, state: 0, name: "Arizona" },
  "MA": { federal: 30, state: 20, name: "Massachusetts" },
  "TN": { federal: 30, state: 0, name: "Tennessee" },
  "IN": { federal: 30, state: 0, name: "Indiana" },
  "MO": { federal: 30, state: 0, name: "Missouri" },
  "MD": { federal: 30, state: 12, name: "Maryland" },
  "WI": { federal: 30, state: 5, name: "Wisconsin" },
  "CO": { federal: 30, state: 10, name: "Colorado" },
  "MN": { federal: 30, state: 10, name: "Minnesota" },
  "SC": { federal: 30, state: 0, name: "South Carolina" },
  "AL": { federal: 30, state: 0, name: "Alabama" },
  "LA": { federal: 30, state: 0, name: "Louisiana" },
  "KY": { federal: 30, state: 0, name: "Kentucky" },
  "OR": { federal: 30, state: 5, name: "Oregon" },
  "OK": { federal: 30, state: 0, name: "Oklahoma" },
  "CT": { federal: 30, state: 12, name: "Connecticut" },
  "UT": { federal: 30, state: 0, name: "Utah" },
  "NV": { federal: 30, state: 0, name: "Nevada" },
  "NM": { federal: 30, state: 5, name: "New Mexico" },
  "HI": { federal: 30, state: 15, name: "Hawaii" },
  "ID": { federal: 30, state: 0, name: "Idaho" },
  "MT": { federal: 30, state: 0, name: "Montana" },
  "WY": { federal: 30, state: 0, name: "Wyoming" },
  "NE": { federal: 30, state: 0, name: "Nebraska" },
  "IA": { federal: 30, state: 5, name: "Iowa" },
  "KS": { federal: 30, state: 0, name: "Kansas" },
  "AR": { federal: 30, state: 0, name: "Arkansas" },
  "MS": { federal: 30, state: 0, name: "Mississippi" },
  "VT": { federal: 30, state: 18, name: "Vermont" },
  "NH": { federal: 30, state: 5, name: "New Hampshire" },
  "ME": { federal: 30, state: 10, name: "Maine" },
  "RI": { federal: 30, state: 15, name: "Rhode Island" },
  "SD": { federal: 30, state: 0, name: "South Dakota" },
  "ND": { federal: 30, state: 0, name: "North Dakota" },
  "DE": { federal: 30, state: 10, name: "Delaware" },
  "WV": { federal: 30, state: 0, name: "West Virginia" },
  "AK": { federal: 30, state: 0, name: "Alaska" },
  "DC": { federal: 30, state: 20, name: "Washington, DC" },
};

const stateCodes = Object.keys(stateRebates).sort();

// ─── Sun exposure factors ────────────────────────────────────
const sunExposures = [
  { value: "sunny", label: "☀️ Sunny / Southwest", factor: 0.85 },
  { value: "moderate", label: "⛅ Moderate / Mixed", factor: 0.7 },
  { value: "cloudy", label: "☁️ Cloudy / Northeast", factor: 0.5 },
];

// ─── Savings Calculator ─────────────────────────────────────
function calculateSavings(
  bill: number,
  roofSize: number,
  location: string,
  state: string,
  zipCode: string,
) {
  const sunEntry = sunExposures.find((s) => s.value === location) || sunExposures[1];
  const sunFactor = sunEntry.factor;
  const roofFactor = Math.min(1, roofSize / 800);
  const rebate = stateRebates[state] || { federal: 30, state: 0, name: "Generic" };
  const totalIncentivePct = rebate.federal + rebate.state;

  const monthlySavings = Math.round(bill * sunFactor * roofFactor * 0.9);
  const yearlySavings = monthlySavings * 12;
  const panelsNeeded = Math.max(6, Math.round((bill * 1.1) / 30) + 2);
  const systemSizeKwh = (panelsNeeded * 0.4).toFixed(1);
  const grossCost = panelsNeeded * 1100;
  const netCost = Math.round(grossCost * (1 - totalIncentivePct / 100));
  const paybackYears = yearlySavings > 0
    ? Math.round((netCost / yearlySavings) * 10) / 10
    : 20;
  const total25YearValue = yearlySavings * 25 - netCost;

  return {
    monthlySavings,
    yearlySavings,
    systemSize: `${systemSizeKwh} kW`,
    panelsNeeded,
    grossCost,
    netCost,
    paybackYears,
    total25YearValue,
    totalIncentivePct,
    stateName: rebate.name,
    solarProductionKwh: Math.round(panelsNeeded * 0.4 * 1500 * roofFactor * sunFactor),
  };
}

// ─── Results chart mini ────────────────────────────────────────
function MiniSavingsChart({ year, paybackYears }: { year: number; paybackYears: number }) {
  const data = Array.from({ length: 10 }, (_, i) => {
    const y = i + 1;
    return { year: y, cumulative: Math.round(year * y) };
  });
  const maxVal = data[data.length - 1].cumulative;
  return (
    <div className="flex items-end gap-1 h-24 mt-3">
      {data.map((d) => {
        const h = Math.max(4, (d.cumulative / maxVal) * 100);
        const isPayback = d.year >= Math.ceil(paybackYears);
        return (
          <div key={d.year} className="flex-1 flex flex-col items-center gap-0.5">
            <div
              className={`w-full rounded-t-sm ${isPayback ? "bg-primary" : "bg-primary/40"}`}
              style={{ height: `${h}%` }}
              title={`Year ${d.year}: ${d.cumulative.toLocaleString()}`}
            />
            <span className="text-[0.55rem] text-muted-foreground hidden md:block">{d.year}</span>
          </div>
        );
      })}
    </div>
  );
}

// ─── Header ────────────────────────────────────────────────────
function Header() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const links = [
    { href: "/", label: "Home" },
    { href: "/savings", label: "Savings" },
    { href: "/install", label: "Process" },
    { href: "/faq", label: "FAQ" },
    { href: "/lead", label: "Get Started" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-border/40">
      <div className="container flex items-center justify-between h-16">
        <a href="/" className="flex items-center gap-2 text-xl font-bold tracking-tight">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <Sun className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-foreground">Greenloop</span>
        </a>
        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                l.href === "/savings" ? "text-foreground bg-primary/10" : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="hidden md:block">
          <a href="/lead">
            <Button size="sm" className="rounded-full">
              Free Assessment <ArrowRight className="ml-1.5 w-4 h-4" />
            </Button>
          </a>
        </div>
        <button className="md:hidden p-2" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-border/40 bg-white px-4 pb-4 pt-2 space-y-1">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`block px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                l.href === "/savings" ? "text-foreground bg-primary/10" : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              {l.label}
            </a>
          ))}
          <a href="/lead" className="block pt-2">
            <Button className="w-full rounded-full" size="sm">Free Assessment <ArrowRight className="ml-1.5 w-4 h-4" /></Button>
          </a>
        </div>
      )}
    </header>
  );
}

// ─── Footer ────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background">
      <div className="container py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 text-lg font-bold mb-3">
              <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center">
                <Sun className="w-4 h-4 text-primary-foreground" />
              </div>
              Greenloop
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">Making home solar simple, affordable, and beautiful.</p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-3">Solar Tools</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="/savings" className="hover:text-foreground transition-colors">Savings Calculator</a></li>
              <li><a href="/install" className="hover:text-foreground transition-colors">Install Process</a></li>
              <li><a href="/faq" className="hover:text-foreground transition-colors">FAQ & Rebates</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-3">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="/" className="hover:text-foreground transition-colors">Home</a></li>
              <li><a href="/lead" className="hover:text-foreground transition-colors">Get Started</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-3">Contact</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2"><Phone className="w-3.5 h-3.5" /> (888) 555-SOLAR</li>
              <li className="flex items-center gap-2"><Mail className="w-3.5 h-3.5" /> hello@greenloop.solar</li>
              <li className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5" /> 100 Green Way, Austin, TX</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© 2026 Greenloop Energy Inc. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── Page ──────────────────────────────────────────────────────
export default function SavingsPage() {
  const [bill, setBill] = useState(180);
  const [roofSize, setRoofSize] = useState(700);
  const [location, setLocation] = useState("moderate");
  const [state, setState] = useState("CA");
  const [zipCode, setZipCode] = useState("");
  const [result, setResult] = useState<ReturnType<typeof calculateSavings> | null>(null);

  const compute = useCallback(() => {
    setResult(calculateSavings(bill, roofSize, location, state, zipCode));
  }, [bill, roofSize, location, state, zipCode]);

  useEffect(() => { compute(); }, [compute]);

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="relative pt-24 pb-12 md:pt-32 md:pb-16 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.95_0.03_120)] via-background to-background -z-10" />
          <div className="container text-center">
            <Badge variant="secondary" className="mb-3 px-3 py-1 rounded-full">
              <Calculator className="w-3.5 h-3.5 mr-1.5 inline" />
              Solar Savings Calculator
            </Badge>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight max-w-3xl mx-auto">
              How much can <span className="text-primary">solar</span> save <em>you</em>?
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto">
              Enter your details below for a custom estimate including federal & state incentives.
            </p>
          </div>
        </section>

        {/* Calculator */}
        <section className="py-8 md:py-12">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto items-start">
              {/* Input Panel */}
              <Card className="border-border/60 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Home className="w-5 h-5 text-primary" />
                    Your Home Details
                  </CardTitle>
                  <CardDescription>Adjust each slider to match your home</CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                  {/* Monthly bill */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Monthly Electric Bill</Label>
                      <span className="text-sm font-semibold text-primary">${bill}</span>
                    </div>
                    <Slider
                      value={[bill]}
                      onValueChange={(v) => setBill(Array.isArray(v) ? v[0] : v)}
                      min={50} max={500} step={10}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>$50</span>
                      <span>$500</span>
                    </div>
                  </div>

                  {/* Roof area */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Roof Area</Label>
                      <span className="text-sm font-semibold text-primary">{roofSize} ft²</span>
                    </div>
                    <Slider
                      value={[roofSize]}
                      onValueChange={(v) => setRoofSize(Array.isArray(v) ? v[0] : v)}
                      min={200} max={2000} step={50}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>200 ft²</span>
                      <span>2,000 ft²</span>
                    </div>
                  </div>

                  {/* Sun exposure */}
                  <div className="space-y-2">
                    <Label>Sun Exposure</Label>
                    <Select value={location} onValueChange={(v) => v && setLocation(v)}>
                      <SelectTrigger><SelectValue placeholder="Select exposure" /></SelectTrigger>
                      <SelectContent>
                        {sunExposures.map((s) => (
                          <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* State */}
                  <div className="space-y-2">
                    <Label>Your State</Label>
                    <Select value={state} onValueChange={(v) => v && setState(v)}>
                      <SelectTrigger><SelectValue placeholder="Select state" /></SelectTrigger>
                      <SelectContent>
                        {stateCodes.map((code) => (
                          <SelectItem key={code} value={code}>
                            {code} — {stateRebates[code].name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Zip (optional) */}
                  <div className="space-y-2">
                    <Label htmlFor="zip">ZIP Code <span className="text-muted-foreground text-xs">(optional, for utility rates)</span></Label>
                    <Input id="zip" placeholder="78701" value={zipCode} onChange={(e) => setZipCode(e.target.value)} maxLength={5} />
                  </div>
                </CardContent>
              </Card>

              {/* Results Panel */}
              <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/50 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Zap className="w-5 h-5 text-primary" />
                    Your Solar Forecast
                  </CardTitle>
                  <CardDescription>Real-time estimate based on your inputs</CardDescription>
                </CardHeader>
                <CardContent>
                  {result && (
                    <div className="space-y-5">
                      {/* Primary metric */}
                      <div className="text-center p-5 rounded-xl bg-white/60 border border-border/40">
                        <p className="text-sm text-muted-foreground">Estimated Monthly Savings</p>
                        <p className="text-4xl font-bold text-primary">${result.monthlySavings.toLocaleString()}</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          ${result.yearlySavings.toLocaleString()} / year
                        </p>
                      </div>

                      {/* Mini chart */}
                      <div className="p-3 rounded-lg bg-white/40 border border-border/40">
                        <p className="text-xs text-muted-foreground font-semibold mb-1">Cumulative Savings (10 yr)</p>
                        <MiniSavingsChart year={result.yearlySavings} paybackYears={result.paybackYears} />
                        <div className="flex items-center gap-2 mt-2">
                          <span className="w-3 h-3 rounded-sm bg-primary/40" />
                          <span className="text-[0.6rem] text-muted-foreground">Pre payback</span>
                          <span className="w-3 h-3 rounded-sm bg-primary" />
                          <span className="text-[0.6rem] text-muted-foreground">Post payback (profit)</span>
                        </div>
                      </div>

                      {/* Detail grid */}
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="p-3 rounded-lg bg-white/40 border border-border/40">
                          <p className="text-muted-foreground text-xs">System Size</p>
                          <p className="font-semibold">{result.systemSize}</p>
                        </div>
                        <div className="p-3 rounded-lg bg-white/40 border border-border/40">
                          <p className="text-muted-foreground text-xs">Panels Needed</p>
                          <p className="font-semibold">{result.panelsNeeded}</p>
                        </div>
                        <div className="p-3 rounded-lg bg-white/40 border border-border/40">
                          <p className="text-muted-foreground text-xs">Payback Period</p>
                          <p className="font-semibold text-primary">~{result.paybackYears} years</p>
                        </div>
                        <div className="p-3 rounded-lg bg-white/40 border border-border/40">
                          <p className="text-muted-foreground text-xs">Net Cost After Incentives</p>
                          <p className="font-semibold">${result.netCost.toLocaleString()}</p>
                        </div>
                      </div>

                      {/* Incentive badge */}
                      <div className="flex items-center gap-2 p-3 rounded-lg bg-primary/10 border border-primary/30">
                        <Shield className="w-5 h-5 text-primary" />
                        <div>
                          <p className="text-sm font-semibold text-primary">{result.totalIncentivePct}% Total Incentives</p>
                          <p className="text-xs text-muted-foreground">
                            Federal 30% + {result.stateName} state rebate included
                          </p>
                        </div>
                      </div>

                      {/* 25-year value */}
                      <div className="text-center p-3 rounded-xl bg-gradient-to-r from-white/60 to-primary/5 border border-primary/20">
                        <p className="text-xs text-muted-foreground">25-Year Net Value</p>
                        <p className="text-2xl font-bold text-primary">
                          {result.total25YearValue > 0 ? "+" : ""}${result.total25YearValue.toLocaleString()}
                        </p>
                      </div>

                      <a href="/lead">
                        <Button className="w-full rounded-full" size="lg">
                          Get This Estimate In Writing <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                      </a>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Explanation */}
        <section className="py-12 md:py-16 bg-secondary/20">
          <div className="container max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">How the math works</h2>
            <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
              <p><strong className="text-foreground">1. Your usage.</strong> We start with your monthly electric bill — the higher it is, the more solar can save you.</p>
              <p><strong className="text-foreground">2. Your roof.</strong> More south-facing roof space means more panels and more power. We assume 400W panels with ~80% usable roof area.</p>
              <p><strong className="text-foreground">3. Sun exposure.</strong> Homes in sunny regions produce 85% of their bill offset; cloudy regions about 50%.</p>
              <p><strong className="text-foreground">4. State incentives.</strong> The 30% federal tax credit is available nationwide. Many states add their own rebates (up to 20% extra).</p>
              <p><strong className="text-foreground">5. Payback & value.</strong> Your net cost (after incentives) divided by yearly savings = payback years. After that, all savings are pure profit — panels last 30+ years.</p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 text-center">
          <div className="container">
            <h2 className="text-3xl font-bold mb-3">Ready to lock in your savings?</h2>
            <p className="text-muted-foreground text-lg mb-6 max-w-xl mx-auto">Schedule a free home assessment and get a custom proposal with real numbers for your home.</p>
            <a href="/lead">
              <Button size="lg" className="rounded-full px-8">
                Free Home Assessment <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}