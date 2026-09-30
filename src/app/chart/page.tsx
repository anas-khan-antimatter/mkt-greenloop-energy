"use client";

import { useState } from "react";
import {
  Sun, Leaf, ArrowRight, DollarSign, Home, BarChart3, TrendingDown,
  Phone, Mail, MapPin, Menu, X, Calculator, Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// ─── Energy usage data (before/after solar) ────────────────────
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const defaultBefore = [1100, 1050, 980, 920, 850, 900, 1200, 1150, 950, 900, 1000, 1080];
const defaultAfter = [320, 290, 260, 180, 120, 160, 300, 310, 200, 180, 250, 290];

const states = [
  { code: "default", name: "Default (Austin, TX)" },
  { code: "sunny", name: "☀️ Sunny / Southwest" },
  { code: "moderate", name: "⛅ Moderate / Mixed" },
  { code: "cloudy", name: "☁️ Cloudy / Northeast" },
];

// ─── Generate season-adjusted data ────────────────────────────
function generateData(zone: string): { before: number[]; after: number[] } {
  const multiplier =
    zone === "sunny" ? 0.85 :
    zone === "cloudy" ? 1.15 :
    zone === "moderate" ? 1.0 :
    1.0;

  const before = defaultBefore.map((v) => Math.round(v * multiplier));
  const factor =
    zone === "sunny" ? 0.75 :
    zone === "cloudy" ? 0.40 :
    zone === "moderate" ? 0.58 :
    0.62;

  const after = before.map((v) => Math.round(v * (1 - factor)));
  return { before, after };
}

// ─── Chart Bars ───────────────────────────────────────────────
function BarGroup({
  label,
  beforeVal,
  afterVal,
  maxVal,
  index,
}: {
  label: string;
  beforeVal: number;
  afterVal: number;
  maxVal: number;
  index: number;
}) {
  const beforeH = Math.max(4, (beforeVal / maxVal) * 120);
  const afterH = Math.max(4, (afterVal / maxVal) * 120);
  return (
    <div className="flex flex-col items-center gap-1 relative">
      {/* Bar pair */}
      <div className="flex gap-0.5 items-end">
        <div
          className="w-3 rounded-t-sm bg-muted-foreground/60 transition-all"
          style={{ height: `${beforeH}px` }}
          title={`Before: ${beforeVal.toLocaleString()} kWh`}
        />
        <div
          className="w-3 rounded-t-sm bg-primary transition-all"
          style={{ height: `${afterH}px` }}
          title={`After: ${afterVal.toLocaleString()} kWh`}
        />
      </div>
      {/* Savings indicator */}
      <div className="flex items-center gap-0.5">
        <span className="text-[0.55rem] text-primary font-semibold">
          {Math.round((1 - afterVal / beforeVal) * 100)}%
        </span>
      </div>
      <span className="text-[0.55rem] text-muted-foreground">{label}</span>
    </div>
  );
}

// ─── Header ────────────────────────────────────────────────────
function Header() {
  const [open, setOpen] = useState(false);
  const links = [
    { href: "/", label: "Home" },
    { href: "/savings", label: "Savings" },
    { href: "/install", label: "Process" },
    { href: "/faq", label: "FAQ" },
    { href: "/chart", label: "Energy" },
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
            <a key={l.href} href={l.href}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                l.href === "/chart" ? "text-foreground bg-primary/10" : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >{l.label}</a>
          ))}
        </nav>
        <div className="hidden md:block">
          <a href="/lead">
            <Button size="sm" className="rounded-full">Free Assessment <ArrowRight className="ml-1.5 w-4 h-4" /></Button>
          </a>
        </div>
        <button className="md:hidden p-2" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-border/40 bg-white px-4 pb-4 pt-2 space-y-1">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}
              className={`block px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                l.href === "/chart" ? "text-foreground bg-primary/10" : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >{l.label}</a>
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
              <li><a href="/chart" className="hover:text-foreground transition-colors">Energy Usage</a></li>
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
export default function ChartPage() {
  const [zone, setZone] = useState("default");
  const data = generateData(zone);
  const allVals = [...data.before, ...data.after];
  const maxVal = Math.max(...allVals);
  const totalBefore = data.before.reduce((a, b) => a + b, 0);
  const totalAfter = data.after.reduce((a, b) => a + b, 0);
  const savingsPct = Math.round((1 - totalAfter / totalBefore) * 100);
  const annualSavingsKwh = totalBefore - totalAfter;
  const co2Offset = Math.round(annualSavingsKwh * 0.85 / 1000 * 10) / 10;

  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <section className="py-16 md:py-24 text-center bg-gradient-to-b from-[oklch(0.95_0.03_120)] via-background to-background">
          <div className="container">
            <Badge variant="secondary" className="mb-4 px-4 py-1.5 rounded-full">
              <BarChart3 className="w-3.5 h-3.5 mr-1.5 inline" />
              Before & After Solar
            </Badge>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight max-w-3xl mx-auto">
              See the difference solar makes
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Month-by-month energy usage before and after going solar. Adjust the climate zone to see how your area compares.
            </p>
          </div>
        </section>

        {/* Chart */}
        <section className="py-12 md:py-16">
          <div className="container max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Monthly Energy Usage (kWh)</h2>
              <div className="max-w-[200px]">
                <Select value={zone} onValueChange={(v) => v && setZone(v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Zone" />
                  </SelectTrigger>
                  <SelectContent>
                    {states.map((s) => (
                      <SelectItem key={s.code} value={s.code}>{s.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Color legend */}
            <div className="flex items-center gap-4 mb-4 text-sm">
              <div className="flex items-center gap-2">
                <span className="w-4 h-3 rounded-sm bg-muted-foreground/60" />
                <span>Before Solar</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-3 rounded-sm bg-primary" />
                <span>After Solar</span>
              </div>
            </div>

            {/* The chart */}
            <Card className="border-border/40">
              <CardContent className="overflow-x-auto">
                <div className="flex items-end gap-3 md:gap-4 min-w-[320px]" style={{ height: "130px" }}>
                  {months.map((m, i) => (
                    <BarGroup
                      key={m}
                      label={m}
                      beforeVal={data.before[i]}
                      afterVal={data.after[i]}
                      maxVal={maxVal}
                      index={i}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Summary stats */}
            <div className="grid md:grid-cols-3 gap-4 mt-8">
              <div className="p-5 rounded-xl bg-primary/5 border border-primary/20 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <TrendingDown className="w-5 h-5 text-primary" />
                </div>
                <p className="text-2xl font-bold text-primary">{savingsPct}%</p>
                <p className="text-xs text-muted-foreground">Energy Reduction</p>
              </div>
              <div className="p-5 rounded-xl bg-accent/5 border border-accent/20 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Zap className="w-5 h-5 text-accent" />
                </div>
                <p className="text-2xl font-bold text-accent">{annualSavingsKwh.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">kWh Saved / Year</p>
              </div>
              <div className="p-5 rounded-xl bg-[oklch(0.85_0.15_160)/0.2] border border-primary/20 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Leaf className="w-5 h-5 text-primary" />
                </div>
                <p className="text-2xl font-bold text-primary">{co2Offset} tons</p>
                <p className="text-xs text-muted-foreground">CO₂ Offset / Year</p>
              </div>
            </div>

            {/* Detailed table */}
            <details className="mt-8 group">
              <summary className="cursor-pointer text-sm font-semibold text-primary px-4 py-3 rounded-lg bg-primary/5 border border-primary/30 flex items-center gap-2">
                <Calculator className="w-4 h-4" />
                View detailed monthly data
              </summary>
              <div className="mt-2 overflow-x-auto">
                <table className="w-full text-xs text-left border-collapse">
                  <thead>
                    <tr className="border-b border-border/40">
                      <th className="px-3 py-2 font-medium">Month</th>
                      <th className="px-3 py-2 font-medium text-right">Before (kWh)</th>
                      <th className="px-3 py-2 font-medium text-right">After (kWh)</th>
                      <th className="px-3 py-2 font-medium text-right">Savings (kWh)</th>
                      <th className="px-3 py-2 font-medium text-right">Reduction</th>
                    </tr>
                  </thead>
                  <tbody>
                    {months.map((m, i) => (
                      <tr key={m} className="border-b border-border/40 hover:bg-secondary/20">
                        <td className="px-3 py-2 font-semibold">{m}</td>
                        <td className="px-3 py-2 text-right">{data.before[i].toLocaleString()}</td>
                        <td className="px-3 py-2 text-right text-primary font-semibold">{data.after[i].toLocaleString()}</td>
                        <td className="px-3 py-2 text-right text-accent">{(data.before[i] - data.after[i]).toLocaleString()}</td>
                        <td className="px-3 py-2 text-right text-primary">{Math.round((1 - data.after[i] / data.before[i]) * 100)}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </details>
          </div>
        </section>

        {/* How it works */}
        <section className="py-16 bg-secondary/20">
          <div className="container max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">How solar transforms your energy profile</h2>
            <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
              <p><strong className="text-foreground">Peak production matches peak usage.</strong> Solar panels generate the most electricity during midday and summer months — exactly when your AC and appliances need it most. This is why you see the biggest drops in July and August.</p>
              <p><strong className="text-foreground">Net metering banks your surplus.</strong> When your panels produce more than you use (spring and fall afternoons), the excess flows back to the grid and you earn credits. At night and on cloudy days, you draw from those credits.</p>
              <p><strong className="text-foreground">Even winter works.</strong> Cold weather actually improves panel efficiency. Snow reflects extra light onto panels, and shorter days are offset by lower heating energy (for electric heat pump homes).</p>
              <p><strong className="text-foreground">The result: 50-80% total reduction.</strong> Most homes see their annual grid consumption cut by more than half. With battery storage, some homes reach 95%+ self-sufficiency.</p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 text-center">
          <div className="container">
            <h2 className="text-3xl font-bold mb-3">Want these numbers for your home?</h2>
            <p className="text-muted-foreground text-lg mb-6 max-w-xl mx-auto">Get a personalized energy analysis with your actual roof and utility data.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a href="/lead">
                <Button size="lg" className="rounded-full px-8">Free Assessment <ArrowRight className="ml-2 w-5 h-5" /></Button>
              </a>
              <a href="/savings">
                <Button size="lg" variant="outline" className="rounded-full px-8">Calculate Savings</Button>
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}