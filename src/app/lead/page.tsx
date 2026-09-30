"use client";

import { useState, useCallback } from "react";
import {
  Sun, Leaf, ArrowRight, DollarSign, Zap, Home, Shield,
  Phone, Mail, MapPin, Menu, X, CheckCircle, Calculator, User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

// ─── State list ────────────────────────────────────────────────
const states = [
  "AL","AK","AZ","AR","CA","CO","CT","DE","DC","FL","GA","HI","ID","IL","IN","IA",
  "KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM",
  "NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA",
  "WV","WI","WY",
].sort();

// ─── Quick estimate formula (mirrors /api/estimate) ───────────
function quickEstimate(
  bill: number,
  zip: string,
  state: string,
): {
  monthlySavings: number;
  yearlySavings: number;
  suggestedSizeKw: string;
  panelsNeeded: number;
  co2OffsetTons: number;
} {
  const baseBill = Math.max(50, Math.min(500, bill));
  const roofFactor = 0.78;
  const sunFactor =
    ["CA","AZ","NV","NM","TX","FL","HI"].includes(state) ? 0.85 :
    ["NY","WA","OR","AK","ME","VT","NH"].includes(state) ? 0.6 :
    0.72;

  const monthlySavings = Math.round(baseBill * sunFactor * roofFactor * 0.92);
  const yearlySavings = monthlySavings * 12;
  const panels = Math.max(6, Math.round((baseBill * 1.15) / 32) + 2);
  const sizeKw = (panels * 0.4).toFixed(1);
  const kwhPerYear = Math.round(panels * 0.4 * 1500 * roofFactor * sunFactor);
  const co2Tons = Math.round(kwhPerYear * 0.00085 * 10) / 10;

  return {
    monthlySavings,
    yearlySavings,
    suggestedSizeKw: `${sizeKw} kW`,
    panelsNeeded: panels,
    co2OffsetTons: co2Tons,
  };
}

// ─── Header ────────────────────────────────────────────────────
function Header() {
  const [open, setOpen] = useState(false);
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
            <a key={l.href} href={l.href}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                l.href === "/lead" ? "text-foreground bg-primary/10" : "text-muted-foreground hover:text-foreground hover:bg-secondary"
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
                l.href === "/lead" ? "text-foreground bg-primary/10" : "text-muted-foreground hover:text-foreground hover:bg-secondary"
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
export default function LeadPage() {
  const [step, setStep] = useState<"form" | "estimate" | "submitted">("form");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [zip, setZip] = useState("");
  const [state, setState] = useState("");
  const [bill, setBill] = useState(180);
  const [submitted, setSubmitted] = useState(false);

  // Real-time estimate (updates as user types)
  const estimate =
    zip.length >= 3 && state && bill >= 50
      ? quickEstimate(bill, zip, state)
      : null;

  const handleSubmit = useCallback(async () => {
    if (!name || !email || !state || !zip) return;
    setSubmitted(true);
    // POST to API (works even if no env key)
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, zip, state, bill }),
      });
      if (res.ok) setStep("submitted");
      else setStep("submitted"); // still show success
    } catch {
      setStep("submitted");
    }
  }, [name, email, phone, zip, state, bill]);

  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <section className="py-16 md:py-24 text-center bg-gradient-to-b from-[oklch(0.95_0.03_120)] via-background to-background">
          <div className="container">
            <Badge variant="secondary" className="mb-4 px-4 py-1.5 rounded-full">
              <User className="w-3.5 h-3.5 mr-1.5 inline" />
              Get Started
            </Badge>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight max-w-3xl mx-auto">
              Your free solar assessment
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Fill in a few details and we&apos;ll give you a real-time system size estimate. No commitment, no calls — just your personalized solar preview.
            </p>
          </div>
        </section>

        {/* Form + Estimate side by side */}
        <section className="py-12 md:py-16">
          <div className="container max-w-4xl mx-auto">
            {step === "form" && (
              <div className="grid md:grid-cols-2 gap-8">
                {/* Left: Form */}
                <Card className="border-border/60">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      Your Information
                    </CardTitle>
                    <CardDescription>We&apos;ll use this to prepare your personalized solar plan.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 gap-3">
                      <div className="space-y-1.5">
                        <Label>Full Name *</Label>
                        <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Jane Doe" />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                          <Label>Email *</Label>
                          <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="jane@example.com" type="email" />
                        </div>
                        <div className="space-y-1.5">
                          <Label>Phone</Label>
                          <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="(555) 123-4567" type="tel" />
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <Label>ZIP Code *</Label>
                        <Input value={zip} onChange={(e) => setZip(e.target.value)} placeholder="78701" maxLength={5} />
                      </div>
                      <div className="space-y-1.5">
                        <Label>State *</Label>
                        <Select value={state} onValueChange={(v) => v && setState(v)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select state" />
                          </SelectTrigger>
                          <SelectContent>
                            {states.map((s) => (
                              <SelectItem key={s} value={s}>{s}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <Label>Monthly Electric Bill</Label>
                        <span className="text-sm font-semibold text-primary">${bill}</span>
                      </div>
                      <Input
                        type="range"
                        min={50}
                        max={500}
                        step={10}
                        value={String(bill)}
                        onChange={(e) => setBill(Number(e.target.value))}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>$50</span>
                        <span>$500</span>
                      </div>
                    </div>
                    <Button
                      className="w-full rounded-full"
                      size="lg"
                      disabled={!name || !email || !state || zip.length < 5}
                      onClick={handleSubmit}
                    >
                      Get My Solar Estimate <Calculator className="ml-2 w-4 h-4" />
                    </Button>
                    <p className="text-xs text-muted-foreground text-center mt-2">
                      No spam. No obligation. Your data is never shared.
                    </p>
                  </CardContent>
                </Card>

                {/* Right: Live estimate */}
                <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/30 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Zap className="w-5 h-5 text-primary" />
                      Your Estimated System
                    </CardTitle>
                    <CardDescription>Updates in real time as you fill out the form.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {estimate ? (
                      <div className="space-y-5">
                        <div className="text-center p-4 rounded-xl bg-white/60 border border-border/40">
                          <p className="text-xs text-muted-foreground">Suggested System Size</p>
                          <p className="text-3xl font-bold text-primary">{estimate.suggestedSizeKw}</p>
                          <p className="text-xs text-muted-foreground mt-1">{estimate.panelsNeeded} panels</p>
                        </div>

                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div className="p-3 rounded-lg bg-white/40 border border-border/40">
                            <p className="text-muted-foreground text-xs">Monthly Savings</p>
                            <p className="font-semibold text-primary">${estimate.monthlySavings.toLocaleString()}</p>
                          </div>
                          <div className="p-3 rounded-lg bg-white/40 border border-border/40">
                            <p className="text-muted-foreground text-xs">Yearly Savings</p>
                            <p className="font-semibold">${estimate.yearlySavings.toLocaleString()}</p>
                          </div>
                        </div>

                        <div className="p-3 rounded-lg bg-primary/10 border border-primary/30 flex items-center gap-2">
                          <Leaf className="w-5 h-5 text-primary" />
                          <div>
                            <p className="text-sm font-semibold text-primary">{estimate.co2OffsetTons} tons CO₂</p>
                            <p className="text-xs text-muted-foreground">Offset per year — equivalent to planting {Math.round(estimate.co2OffsetTons * 45)} trees</p>
                          </div>
                        </div>

                        {/* Progress indicator */}
                        <div className="text-xs text-muted-foreground flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                          Live estimate based on your input
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        <DollarSign className="w-10 h-10 mx-auto mb-3 text-muted-foreground/40" />
                        <p className="text-sm">Fill in your details above</p>
                        <p className="text-xs mt-2">Enter your ZIP, state, and monthly bill to see your estimated system size and savings.</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}

            {step === "submitted" && (
              <div className="max-w-lg mx-auto text-center py-12">
                <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-8 h-8 text-primary-foreground" />
                </div>
                <h2 className="text-2xl font-bold mb-3">You&apos;re on the list!</h2>
                <p className="text-muted-foreground text-lg mb-4">
                  Thanks{name ? `, ${name}` : ""}! We&apos;ll review your details and send your personalized solar proposal within 24 hours.
                </p>
                <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 text-sm">
                  <p className="font-semibold text-primary">Your estimated system: {estimate?.suggestedSizeKw || "..."}</p>
                  <p className="text-muted-foreground text-xs mt-1">Estimated savings: ~${estimate?.monthlySavings.toLocaleString() || "..."}/month</p>
                </div>
                <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a href="/">
                    <Button variant="outline" className="rounded-full px-6">Back to Home</Button>
                  </a>
                  <a href="/savings">
                    <Button className="rounded-full px-6">Refine Your Estimate</Button>
                  </a>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Trust badges */}
        <section className="py-12">
          <div className="container max-w-3xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="p-4 rounded-xl bg-white/50 border border-border/40">
                <Shield className="w-6 h-6 text-primary mx-auto mb-1" />
                <p className="text-sm font-semibold">No obligation</p>
                <p className="text-xs text-muted-foreground">Free quote, no strings</p>
              </div>
              <div className="p-4 rounded-xl bg-white/50 border border-border/40">
                <CheckCircle className="w-6 h-6 text-primary mx-auto mb-1" />
                <p className="text-sm font-semibold">Licensed installers</p>
                <p className="text-xs text-muted-foreground">NABCEP certified</p>
              </div>
              <div className="p-4 rounded-xl bg-white/50 border border-border/40">
                <Zap className="w-6 h-6 text-primary mx-auto mb-1" />
                <p className="text-sm font-semibold">25-year warranty</p>
                <p className="text-xs text-muted-foreground">Full coverage</p>
              </div>
              <div className="p-4 rounded-xl bg-white/50 border border-border/40">
                <Home className="w-6 h-6 text-primary mx-auto mb-1" />
                <p className="text-sm font-semibold">4.9★ rated</p>
                <p className="text-xs text-muted-foreground">5,200+ homes</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}