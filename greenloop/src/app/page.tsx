"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  Sun,
  Leaf,
  ArrowRight,
  Star,
  ChevronDown,
  Zap,
  Home,
  DollarSign,
  Shield,
  CheckCircle,
  Menu,
  X,
  Phone,
  Mail,
  MapPin,
  Quote,
  BarChart3,
  Calculator,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

// ─── Navigation ────────────────────────────────────────────────
function Header() {
  const [open, setOpen] = useState(false);

  const links = [
    { href: "#estimator", label: "Savings" },
    { href: "#packages", label: "Packages" },
    { href: "#process", label: "Process" },
    { href: "#financing", label: "Financing" },
    { href: "#reviews", label: "Reviews" },
    { href: "#contact", label: "Get Started" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-border/40">
      <div className="container flex items-center justify-between h-16">
        <a href="#" className="flex items-center gap-2 text-xl font-bold tracking-tight">
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
              className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg hover:bg-secondary transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <a href="#contact">
            <Button size="sm" className="rounded-full">
              Book Assessment <ArrowRight className="ml-1.5 w-4 h-4" />
            </Button>
          </a>
        </div>

        <button
          className="md:hidden p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
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
              className="block px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg hover:bg-secondary transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a href="#contact" className="block pt-2">
            <Button className="w-full rounded-full" size="sm">
              Book Assessment <ArrowRight className="ml-1.5 w-4 h-4" />
            </Button>
          </a>
        </div>
      )}
    </header>
  );
}

// ─── Hero ──────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="relative pt-24 pb-20 md:pt-32 md:pb-28 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.95_0.03_120)] via-background to-background -z-10" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full bg-primary/5 blur-3xl -z-10" />

      <div className="container text-center">
        <Badge variant="secondary" className="mb-4 px-4 py-1.5 text-xs font-semibold rounded-full">
          <Leaf className="w-3.5 h-3.5 mr-1.5 inline" />
          Powering a cleaner tomorrow
        </Badge>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1] max-w-3xl mx-auto">
          Own your energy.
          <br />
          <span className="text-primary">Save the planet.</span>
        </h1>
        <p className="mt-5 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Greenloop makes home solar simple, affordable, and beautiful. 
          Cut your electric bills, increase your home value, and join the clean energy revolution — all with zero upfront cost options.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a href="#estimator">
            <Button size="lg" className="rounded-full text-base px-8">
              Calculate Your Savings <Calculator className="ml-2 w-5 h-5" />
            </Button>
          </a>
          <a href="#contact">
            <Button size="lg" variant="outline" className="rounded-full text-base px-8">
              Free Home Assessment
            </Button>
          </a>
        </div>

        {/* Trust markers */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {[
            { icon: Zap, label: "5,200+ Homes Powered" },
            { icon: DollarSign, label: "$47M Total Savings" },
            { icon: Shield, label: "25-Year Warranty" },
            { icon: Star, label: "4.9 ★ Avg Rating" },
          ].map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-center gap-2 p-3 rounded-xl bg-white/60 border border-border/40"
            >
              <item.icon className="w-5 h-5 text-primary shrink-0" />
              <span className="text-sm font-semibold">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Savings Estimator (working calculator) ────────────────────
function SavingsEstimator() {
  const [bill, setBill] = useState(180);
  const [roofSize, setRoofSize] = useState(500);
  const [location, setLocation] = useState("sunny");
  const [result, setResult] = useState<{
    monthlySavings: number;
    yearlySavings: number;
    systemSize: string;
    panelsNeeded: number;
    paybackYears: number;
  } | null>(null);

  const calculate = useCallback(() => {
    // Realistic solar math:
    // - Avg US electric bill: $180/month
    // - Solar saves 60-90% of bill depending on sun
    const sunFactors: Record<string, number> = {
      sunny: 0.85,
      moderate: 0.7,
      cloudy: 0.5,
    };
    const roofFactor = Math.min(1, roofSize / 800);
    const sunFactor = sunFactors[location] || 0.7;

    const monthlySavings = Math.round(bill * sunFactor * roofFactor * 0.9);
    const yearlySavings = monthlySavings * 12;
    const panelsNeeded = Math.round((bill * 1.1) / 30) + 2;
    const systemSizeKwh = (panelsNeeded * 0.4).toFixed(1);
    const costAfterIncentives = panelsNeeded * 900;
    const paybackYears = Math.round((costAfterIncentives / yearlySavings) * 10) / 10;

    setResult({
      monthlySavings,
      yearlySavings,
      systemSize: `${systemSizeKwh} kW`,
      panelsNeeded,
      paybackYears,
    });
  }, [bill, roofSize, location]);

  useEffect(() => {
    calculate();
  }, [calculate]);

  return (
    <section id="estimator" className="py-20 md:py-28">
      <div className="container">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-3 px-3 py-1 rounded-full">
            <Calculator className="w-3.5 h-3.5 mr-1.5 inline" />
            Savings Calculator
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            See how much you could save
          </h2>
          <p className="mt-3 text-muted-foreground text-lg max-w-xl mx-auto">
            Adjust your details below for a realistic estimate based on your home.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Inputs */}
          <Card className="border-border/60 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Your Home Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Monthly bill */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Monthly Electric Bill</Label>
                  <span className="text-sm font-semibold text-primary">${bill}</span>
                </div>
                <Slider
                  value={[bill]}
                  onValueChange={([v]) => setBill(v)}
                  min={50}
                  max={500}
                  step={10}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>$50</span>
                  <span>$500</span>
                </div>
              </div>

              {/* Roof square footage */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Roof Area (sq ft)</Label>
                  <span className="text-sm font-semibold text-primary">{roofSize} ft²</span>
                </div>
                <Slider
                  value={[roofSize]}
                  onValueChange={([v]) => setRoofSize(v)}
                  min={200}
                  max={2000}
                  step={50}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>200 ft²</span>
                  <span>2,000 ft²</span>
                </div>
              </div>

              {/* Sun exposure */}
              <div className="space-y-2">
                <Label>Sun Exposure</Label>
                <Select value={location} onValueChange={setLocation}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select sun exposure" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sunny">☀️ Sunny / Southwest</SelectItem>
                    <SelectItem value="moderate">⛅ Moderate / Mixed</SelectItem>
                    <SelectItem value="cloudy">☁️ Cloudy / Northeast</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/50 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary" />
                Your Estimated Savings
              </CardTitle>
              <CardDescription>Based on current utility rates and federal incentives</CardDescription>
            </CardHeader>
            <CardContent>
              {result && (
                <div className="space-y-5">
                  <div className="text-center p-4 rounded-xl bg-white/60 border border-border/40">
                    <p className="text-sm text-muted-foreground">Monthly Savings</p>
                    <p className="text-4xl font-bold text-primary">
                      ${result.monthlySavings.toLocaleString()}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      ${result.yearlySavings.toLocaleString()} / year
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="p-3 rounded-lg bg-white/40 border border-border/40">
                      <p className="text-muted-foreground">System Size</p>
                      <p className="font-semibold">{result.systemSize}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-white/40 border border-border/40">
                      <p className="text-muted-foreground">Panels Needed</p>
                      <p className="font-semibold">{result.panelsNeeded}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-white/40 border border-border/40">
                      <p className="text-muted-foreground">Payback Period</p>
                      <p className="font-semibold">~{result.paybackYears} years</p>
                    </div>
                    <div className="p-3 rounded-lg bg-white/40 border border-border/40">
                      <p className="text-muted-foreground">25-Year Value</p>
                      <p className="font-semibold text-primary">
                        ${(result.yearlySavings * 25).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <a href="#contact">
                    <Button className="w-full rounded-full">
                      Get This Estimate in Writing <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </a>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

// ─── Solar Packages ────────────────────────────────────────────
const packages = [
  {
    name: "Essential",
    subtitle: "Best for smaller homes",
    price: "Starts at $8,900",
    priceNote: "after federal tax credit",
    panels: "10-14 panels · 4.0-5.6 kW",
    savings: "$600–$900/yr",
    features: [
      "High-efficiency monocrystalline panels",
      "Standard rooftop installation",
      "Net metering ready",
      "Monitoring app access",
      "25-year performance warranty",
    ],
    popular: false,
  },
  {
    name: "Performance",
    subtitle: "Most popular",
    price: "Starts at $14,500",
    priceNote: "after federal tax credit",
    panels: "16-22 panels · 6.4-8.8 kW",
    savings: "$1,000–$1,600/yr",
    features: [
      "Premium bifacial panels",
      "Optimized micro-inverters",
      "Battery-ready design",
      "Enhanced monitoring + alerts",
      "25-year all-inclusive warranty",
      "Free EV charger credit ($500)",
    ],
    popular: true,
  },
  {
    name: "Premium",
    subtitle: "Maximize independence",
    price: "Starts at $24,900",
    priceNote: "after federal tax credit",
    panels: "24-30 panels · 9.6-12 kW",
    savings: "$1,600–$2,400/yr",
    features: [
      "Premium bifacial panels + backup battery",
      "Full-home backup power",
      "Smart energy management",
      "Premium flush-mount racking",
      "25-year bumper-to-bumper warranty",
      "EV charger + smart panel upgrade",
      "Priority service & support",
    ],
    popular: false,
  },
];

function Packages() {
  return (
    <section id="packages" className="py-20 md:py-28 bg-secondary/30">
      <div className="container">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-3 px-3 py-1 rounded-full">
            <Home className="w-3.5 h-3.5 mr-1.5 inline" />
            Solar Packages
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            A plan for every roof
          </h2>
          <p className="mt-3 text-muted-foreground text-lg max-w-xl mx-auto">
            From essential savings to full home energy independence — all with zero-down financing available.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {packages.map((pkg) => (
            <Card
              key={pkg.name}
              className={`relative border-2 flex flex-col ${
                pkg.popular ? "border-primary shadow-lg shadow-primary/10" : "border-border/40"
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-xs">
                    Most Popular
                  </Badge>
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-xl">{pkg.name}</CardTitle>
                <CardDescription>{pkg.subtitle}</CardDescription>
                <div className="mt-3">
                  <p className="text-2xl font-bold">{pkg.price}</p>
                  <p className="text-xs text-muted-foreground">{pkg.priceNote}</p>
                </div>
                <div className="mt-2">
                  <p className="text-sm text-muted-foreground">{pkg.panels}</p>
                  <p className="text-sm font-semibold text-primary">{pkg.savings}</p>
                </div>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <ul className="space-y-2 flex-1">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <a href="#contact" className="mt-6 block">
                  <Button
                    variant={pkg.popular ? "default" : "outline"}
                    className="w-full rounded-full"
                  >
                    Get a Quote <ArrowRight className="ml-1.5 w-4 h-4" />
                  </Button>
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Installation Process ──────────────────────────────────────
const steps = [
  {
    step: "01",
    title: "Free Home Assessment",
    desc: "One of our solar consultants visits your home, inspects your roof, measures your panel, and reviews your energy usage — all at no cost.",
  },
  {
    step: "02",
    title: "Custom Design & Quote",
    desc: "We design a system tailored to your roof and energy needs. You'll get a detailed proposal with savings projections, costs, and financing options.",
  },
  {
    step: "03",
    title: "Permits & Paperwork",
    desc: "Our team handles all permits, HOA approvals, and utility interconnection paperwork. You don't lift a finger.",
  },
  {
    step: "04",
    title: "Professional Installation",
    desc: "Our certified crew installs your system in as little as 1-2 days. We use flush-mount racking and keep your roof watertight.",
  },
  {
    step: "05",
    title: "Inspection & Activation",
    desc: "We coordinate city inspection and utility approval. Once done, we flip the switch — you're generating clean energy.",
  },
  {
    step: "06",
    title: "Enjoy & Monitor",
    desc: "Watch your savings grow in real time via our app. With 25-year warranties, you're covered for decades of clean power.",
  },
];

function Process() {
  return (
    <section id="process" className="py-20 md:py-28">
      <div className="container">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-3 px-3 py-1 rounded-full">
            <BarChart3 className="w-3.5 h-3.5 mr-1.5 inline" />
            How It Works
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            From assessment to activation
          </h2>
          <p className="mt-3 text-muted-foreground text-lg max-w-xl mx-auto">
            We make going solar effortless. Here&apos;s your journey from start to savings.
          </p>
        </div>

        <div className="relative max-w-3xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-0.5 bg-primary/20 hidden md:block" />

          <div className="space-y-8 md:space-y-0">
            {steps.map((s, i) => (
              <div
                key={s.step}
                className="md:flex items-start gap-6 md:pb-12 relative"
              >
                {/* Step number */}
                <div className="hidden md:flex w-16 h-16 rounded-full bg-primary/10 border-2 border-primary items-center justify-center shrink-0 relative z-10">
                  <span className="text-lg font-bold text-primary">{s.step}</span>
                </div>

                <Card className="flex-1 border-border/40 shadow-sm md:ml-0">
                  <CardContent className="p-5 md:p-6">
                    <div className="flex items-center gap-3 mb-2 md:hidden">
                      <span className="inline-flex w-8 h-8 rounded-full bg-primary/10 border border-primary items-center justify-center text-sm font-bold text-primary shrink-0">
                        {s.step}
                      </span>
                      <h3 className="text-lg font-semibold">{s.title}</h3>
                    </div>
                    <div className="hidden md:block mb-2">
                      <h3 className="text-lg font-semibold">{s.title}</h3>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Financing Explainer ───────────────────────────────────────
function Financing() {
  const plans = [
    {
      icon: DollarSign,
      name: "Cash Purchase",
      desc: "Own your system outright. Maximum long-term savings with fastest payback.",
      bestFor: "Best for: homeowners with available capital",
    },
    {
      icon: Sun,
      name: "Solar Loan",
      desc: "Zero-down financing with fixed low monthly payments. Start saving from day one.",
      bestFor: "Best for: most homeowners — $0 down, own the system",
    },
    {
      icon: Leaf,
      name: "PPA / Lease",
      desc: "No upfront cost. Pay a fixed low rate for the power your system generates — lower than utility rates.",
      bestFor: "Best for: renters or those who prefer no long-term commitment",
    },
  ];

  return (
    <section id="financing" className="py-20 md:py-28 bg-gradient-to-b from-secondary/20 to-background">
      <div className="container">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-3 px-3 py-1 rounded-full">
            <DollarSign className="w-3.5 h-3.5 mr-1.5 inline" />
            Financing
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Solar for every budget
          </h2>
          <p className="mt-3 text-muted-foreground text-lg max-w-xl mx-auto">
            With the 30% federal tax credit plus our flexible financing, most homeowners pay nothing upfront.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-10">
          {plans.map((plan) => (
            <Card key={plan.name} className="border-border/40 shadow-sm">
              <CardHeader>
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                  <plan.icon className="w-5 h-5 text-primary" />
                </div>
                <CardTitle className="text-lg">{plan.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">{plan.desc}</p>
                <p className="text-xs font-medium text-primary">{plan.bestFor}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="max-w-2xl mx-auto p-6 rounded-2xl bg-primary/5 border border-primary/20 text-center">
          <p className="text-sm font-semibold text-primary mb-1">
            🏛️ Federal Tax Credit — 30% of your system cost
          </p>
          <p className="text-sm text-muted-foreground">
            The Inflation Reduction Act extended the 30% federal solar tax credit through 2032. 
            That means on a $20,000 system, you save $6,000.
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── Reviews ───────────────────────────────────────────────────
const reviews = [
  {
    name: "Sarah M.",
    location: "Austin, TX",
    rating: 5,
    text: "Greenloop made the whole process seamless. From the consultation to installation — only 3 days for the install! Now our electric bill is basically $10/month. Incredible.",
    date: "September 2026",
  },
  {
    name: "James K.",
    location: "Portland, OR",
    rating: 5,
    text: "We were hesitant about the cost, but their financing team found us a zero-down option that actually saves us money month one. The monitoring app is fantastic.",
    date: "August 2026",
  },
  {
    name: "Maria & David R.",
    location: "Phoenix, AZ",
    rating: 5,
    text: "Our Performance package with battery backup has kept our lights on during three summer outages. Best home investment we've ever made.",
    date: "July 2026",
  },
  {
    name: "Tom L.",
    location: "Denver, CO",
    rating: 4,
    text: "Very professional crew. They handled all the HOA paperwork for us — that alone was worth it. System looks great and production has exceeded estimates.",
    date: "June 2026",
  },
];

function Reviews() {
  return (
    <section id="reviews" className="py-20 md:py-28">
      <div className="container">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-3 px-3 py-1 rounded-full">
            <Star className="w-3.5 h-3.5 mr-1.5 inline" />
            Real Reviews
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            What our homeowners say
          </h2>
          <p className="mt-3 text-muted-foreground text-lg max-w-xl mx-auto">
            Join thousands of happy Greenloop families powering their homes with the sun.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {reviews.map((r) => (
            <Card key={r.name} className="border-border/40 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < r.rating ? "text-amber-400 fill-amber-400" : "text-muted-foreground/30"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm leading-relaxed mb-4">&ldquo;{r.text}&rdquo;</p>
                <div>
                  <p className="text-sm font-semibold">{r.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {r.location} · {r.date}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground">
            ★ 4.9 average rating across 2,400+ reviews on Google, SolarReviews, and EnergySage
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── Book Assessment (Contact Form) ────────────────────────────
function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [roofType, setRoofType] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate form submission
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-secondary/30">
      <div className="container">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-3 px-3 py-1 rounded-full">
            <Phone className="w-3.5 h-3.5 mr-1.5 inline" />
            Book Your Assessment
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Ready to go solar?
          </h2>
          <p className="mt-3 text-muted-foreground text-lg max-w-xl mx-auto">
            Fill out the form and we&apos;ll schedule a free, no-obligation home assessment within 48 hours.
          </p>
        </div>

        <div className="max-w-lg mx-auto">
          {submitted ? (
            <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/50 text-center p-8">
              <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">You&apos;re on the list! ☀️</h3>
              <p className="text-muted-foreground text-sm">
                A Greenloop energy specialist will call or email you within 24 hours to schedule your free home assessment. We&apos;re excited to help you start saving!
              </p>
            </Card>
          ) : (
            <Card className="border-border/40 shadow-sm">
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        placeholder="Jane Smith"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="jane@example.com"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="(555) 123-4567"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="roof">Roof Type</Label>
                      <Select value={roofType} onValueChange={setRoofType}>
                        <SelectTrigger id="roof">
                          <SelectValue placeholder="Select..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="shingle">Asphalt Shingle</SelectItem>
                          <SelectItem value="tile">Clay/Concrete Tile</SelectItem>
                          <SelectItem value="metal">Metal</SelectItem>
                          <SelectItem value="flat">Flat / Low Slope</SelectItem>
                          <SelectItem value="other">Other / Not Sure</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="address">Home Address</Label>
                    <Input
                      id="address"
                      placeholder="123 Sunny Dr, Austin, TX 78701"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="message">Questions or Notes (optional)</Label>
                    <Textarea
                      id="message"
                      placeholder="Any specific questions about your home or energy needs..."
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </div>

                  <Button type="submit" className="w-full rounded-full" size="lg" disabled={loading}>
                    {loading ? "Sending..." : "Book My Free Assessment"}
                    {!loading && <ArrowRight className="ml-2 w-4 h-4" />}
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    No spam, no pushy sales calls. Just a friendly chat about your home.
                  </p>
                </form>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </section>
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
            <p className="text-sm text-muted-foreground leading-relaxed">
              Making home solar simple, affordable, and beautiful. Powering a cleaner tomorrow, one roof at a time.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-3">Services</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#packages" className="hover:text-foreground transition-colors">Residential Solar</a></li>
              <li><a href="#packages" className="hover:text-foreground transition-colors">Battery Backup</a></li>
              <li><a href="#financing" className="hover:text-foreground transition-colors">Financing</a></li>
              <li><a href="#estimator" className="hover:text-foreground transition-colors">Savings Calculator</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-3">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">About</a></li>
              <li><a href="#reviews" className="hover:text-foreground transition-colors">Reviews</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Blog</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-3">Contact</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5" />
                (888) 555-SOLAR
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5" />
                hello@greenloop.solar
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5" />
                100 Green Way, Austin, TX
              </li>
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
export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <SavingsEstimator />
        <Packages />
        <Process />
        <Financing />
        <Reviews />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}