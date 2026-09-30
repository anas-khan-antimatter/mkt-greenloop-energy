"use client";

import { useState } from "react";
import { Sun, Leaf, ArrowRight, CheckCircle, ClipboardCheck, Home, Shield, Phone, Mail, MapPin, Menu, X, BarChart3, Calendar, Eye, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// ─── Step data ────────────────────────────────────────────────
const installSteps = [
  {
    step: "01",
    icon: ClipboardCheck,
    title: "Free Home Assessment",
    short: "Assessment",
    desc: "One of our solar consultants visits your home, inspects your roof, measures your panel, and reviews your energy usage — all at no cost.",
    details: [
      "Inspection of roof condition, pitch, and orientation",
      "Review of past 12 months of electric bills",
      "Shade analysis using our solar mapping tool",
      "Discussion of your energy goals and budget",
    ],
    duration: "1-2 hours",
  },
  {
    step: "02",
    icon: Eye,
    title: "Custom Design & Quote",
    short: "Design",
    desc: "We design a system tailored to your roof and energy needs. You'll get a detailed proposal with savings projections, costs, and financing options.",
    details: [
      "3D layout of panels on your roof",
      "Energy production estimate by month",
      "Itemized pricing with and without incentives",
      "Financing options: cash, loan, or PPA",
    ],
    duration: "2-3 business days",
  },
  {
    step: "03",
    icon: Leaf,
    title: "Permits & Paperwork",
    short: "Permits",
    desc: "Our team handles all permits, HOA approvals, and utility interconnection paperwork. You don't lift a finger.",
    details: [
      "Building permit application with your city",
      "HOA approval package (if applicable)",
      "Utility interconnection agreement",
      "Federal tax credit paperwork preparation",
    ],
    duration: "2-4 weeks",
  },
  {
    step: "04",
    icon: Home,
    title: "Professional Installation",
    short: "Install",
    desc: "Our certified crew installs your system in as little as 1-2 days. We use flush-mount racking and keep your roof watertight.",
    details: [
      "Racking and mount system installation",
      "Panel placement and wiring",
      "Inverter and monitoring system setup",
      "Site cleanup and debris removal",
    ],
    duration: "1-2 days",
  },
  {
    step: "05",
    icon: Zap,
    title: "Inspection & Activation",
    short: "Activation",
    desc: "We coordinate city inspection and utility approval. Once done, we flip the switch — you're generating clean energy.",
    details: [
      "City/county final inspection",
      "Utility meter swap or net meter install",
      "System commissioning and testing",
      "Permission to Operate (PTO) from utility",
    ],
    duration: "1-3 weeks",
  },
  {
    step: "06",
    icon: Calendar,
    title: "Enjoy & Monitor",
    short: "Monitor",
    desc: "Watch your savings grow in real time via our app. With 25-year warranties, you're covered for decades of clean power.",
    details: [
      "Real-time production monitoring via app",
      "Monthly savings reports emailed to you",
      "Proactive alerts for maintenance",
      "25-year panel and inverter warranty coverage",
    ],
    duration: "Lifetime",
  },
];

// ─── Stepper ──────────────────────────────────────────────────
function StepperBar({ current }: { current: number }) {
  return (
    <div className="hidden md:flex items-center justify-between mb-8 max-w-3xl mx-auto relative">
      {/* Background line */}
      <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 bg-muted-foreground/20 -z-10" />
      {/* Active fill line */}
      <div
        className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 bg-primary -z-10 transition-all"
        style={{ right: `${(1 - current / (installSteps.length - 1)) * 100}%`, width: `${(current / (installSteps.length - 1)) * 100}%` }}
      />
      {installSteps.map((s, i) => {
        const state = i < current ? "done" : i === current ? "active" : "pending";
        const circleClasses = state === "done"
          ? "bg-primary text-primary-foreground border-primary shadow-md shadow-primary/20"
          : state === "active"
            ? "bg-white text-foreground border-primary ring-4 ring-primary/30 shadow-md"
            : "bg-muted/30 text-muted-foreground border-border/40";
        return (
          <button
            key={s.step}
            onClick={() => {}}
            className={`flex flex-col items-center gap-1 relative z-10 transition-all cursor-default ${
              state === "done" ? "cursor-pointer" : ""
            }`}
          >
            <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center text-sm font-bold transition-all ${circleClasses}`}>
              {state === "done" ? <CheckCircle className="w-5 h-5" /> : s.step}
            </div>
            <span className={`text-[0.65rem] font-medium ${state === "active" ? "text-foreground" : "text-muted-foreground"}`}>
              {s.short}
            </span>
          </button>
        );
      })}
    </div>
  );
}

// ─── Header ────────────────────────────────────────────────────
function Header({ current }: { current: number }) {
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
                l.href === "/install" ? "text-foreground bg-primary/10" : "text-muted-foreground hover:text-foreground hover:bg-secondary"
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
                l.href === "/install" ? "text-foreground bg-primary/10" : "text-muted-foreground hover:text-foreground hover:bg-secondary"
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

// ─── Day-by-day timeline ───────────────────────────────────────
function DayTimeline({ step }: { step: number }) {
  const timelines: Record<number, { day: string; activity: string; icon: string }[]> = {
    0: [
      { day: "Day 1", activity: "Initial consultation call", icon: "📞" },
      { day: "Day 3-5", activity: "On-site assessment visit", icon: "🏠" },
      { day: "Day 5-7", activity: "Receive custom proposal", icon: "📄" },
    ],
    1: [
      { day: "Week 1", activity: "Proposal review & acceptance", icon: "✅" },
      { day: "Week 1-2", activity: "Finalize system design", icon: "📐" },
      { day: "Week 2", activity: "Financing approval (if needed)", icon: "💰" },
    ],
    2: [
      { day: "Week 3-4", activity: "Permit filed with city", icon: "📋" },
      { day: "Week 4-6", activity: "HOA approval (if needed)", icon: "🏛️" },
      { day: "Week 5-7", activity: "Utility interconnection submitted", icon: "🔌" },
    ],
    3: [
      { day: "Day 1", activity: "Roof prep & racking install", icon: "🔧" },
      { day: "Day 1-2", activity: "Panel installation", icon: "☀️" },
      { day: "Day 2", activity: "Wiring & inverter setup", icon: "⚡" },
    ],
    4: [
      { day: "Week 1", activity: "City inspection", icon: "🛡️" },
      { day: "Week 1-2", activity: "Utility meter installation", icon: "📊" },
      { day: "Week 2-3", activity: "System goes live (PTO)", icon: "🎉" },
    ],
    5: [
      { day: "Day 1", activity: "Monitor your production", icon: "📱" },
      { day: "Monthly", activity: "Receive savings report", icon: "📊" },
      { day: "Annually", activity: "System health check", icon: "🔍" },
    ],
  };
  const timeline = timelines[step] || timelines[0];
  return (
    <div className="space-y-3">
      <p className="text-sm font-semibold text-foreground mb-2">What happens next:</p>
      {timeline.map((t) => (
        <div key={t.day} className="flex items-center gap-3 p-2 rounded-lg bg-white/40 border border-border/40">
          <span className="text-lg">{t.icon}</span>
          <div>
            <p className="text-xs font-medium text-foreground">{t.day}</p>
            <p className="text-sm text-muted-foreground">{t.activity}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────
export default function InstallPage() {
  const [currentStep, setCurrentStep] = useState(0);

  const step = installSteps[currentStep];
  const totalSteps = installSteps.length;
  const pct = Math.round(((currentStep + 1) / totalSteps) * 100);

  return (
    <>
      <Header current={currentStep} />
      <main>
        {/* Hero */}
        <section className="relative pt-24 pb-12 md:pt-32 md:pb-16 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.95_0.03_120)] via-background to-background -z-10" />
          <div className="container text-center">
            <Badge variant="secondary" className="mb-3 px-3 py-1 rounded-full">
              <BarChart3 className="w-3.5 h-3.5 mr-1.5 inline" />
              Your Installation Journey
            </Badge>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight max-w-3xl mx-auto">
              From <span className="text-primary">signup</span> to <span className="text-primary">solar savings</span>
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto">
              Click through each step to see exactly what happens — we handle the hard parts so you don&apos;t have to.
            </p>
          </div>
        </section>

        {/* Progress indicator */}
        <section className="py-4 md:py-8">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              {/* Overall progress */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-foreground">Overall Progress</span>
                <span className="text-sm font-bold text-primary">{pct}% complete</span>
              </div>
              <div className="h-2 rounded-full bg-muted-foreground/20 overflow-hidden">
                <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${pct}%` }} />
              </div>
              {/* Stepper dots for mobile */}
              <div className="flex md:hidden items-center justify-center gap-2 mt-4">
                {installSteps.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentStep(i)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      i === currentStep
                        ? "bg-primary scale-125"
                        : i < currentStep ? "bg-primary/50" : "bg-muted-foreground/30"
                    }`}
                  />
                ))}
              </div>
              {/* Desktop stepper bar */}
              <StepperBar current={currentStep} />
            </div>
          </div>
        </section>

        {/* Current Step Detail */}
        <section className="py-8 md:py-12">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto items-start">
              {/* Step card */}
              <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/30 shadow-md">
                <CardContent className="p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-primary/15 border-2 border-primary flex items-center justify-center">
                      <step.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <Badge variant="secondary" className="text-xs">Step {step.step}</Badge>
                      <h2 className="text-xl font-bold mt-1">{step.title}</h2>
                    </div>
                  </div>

                  <p className="text-muted-foreground leading-relaxed">{step.desc}</p>

                  <div className="mt-5 space-y-3">
                    <p className="text-sm font-semibold text-foreground">What&apos;s included:</p>
                    <ul className="space-y-2">
                      {step.details.map((d) => (
                        <li key={d} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center gap-2 mt-5 p-3 rounded-lg bg-white/50 border border-border/40">
                    <Calendar className="w-5 h-5 text-primary" />
                    <span className="text-sm"><strong>Typical duration:</strong> {step.duration}</span>
                  </div>

                  {/* Navigation */}
                  <div className="flex items-center gap-3 mt-6">
                    {currentStep > 0 && (
                      <Button variant="outline" onClick={() => setCurrentStep(currentStep - 1)} className="rounded-full">
                        <ArrowRight className="w-4 h-4 mr-1.5 rotate-180" />
                        Previous: {installSteps[currentStep - 1].short}
                      </Button>
                    )}
                    {currentStep < totalSteps - 1 && (
                      <Button onClick={() => setCurrentStep(currentStep + 1)} className="rounded-full ml-auto">
                        Next: {installSteps[currentStep + 1].short} <ArrowRight className="ml-1.5 w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Timeline sidebar */}
              <Card className="border-border/40 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-primary" />
                      Timeline
                  </CardTitle>
                  <CardDescription>What to expect for this step</CardDescription>
                </CardHeader>
                <CardContent>
                  <DayTimeline step={currentStep} />
                  <div className="mt-5 p-4 rounded-lg bg-primary/5 border border-primary/20">
                    <p className="text-sm font-semibold text-primary text-center">
                      🏛️ No surprises — ever
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Greenloop sends proactive updates at every stage. You&apos;ll always know exactly where your project stands.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Quick overview of all steps */}
        <section className="py-12 md:py-16 bg-secondary/20">
          <div className="container">
            <h2 className="text-2xl font-bold text-center mb-8">All 6 steps at a glance</h2>
            <div className="grid md:grid-cols-3 gap-4 max-w-5xl mx-auto">
              {installSteps.map((s, i) => (
                <button
                  key={s.step}
                  onClick={() => setCurrentStep(i)}
                  className={`p-4 rounded-xl border-2 text-left transition-all hover:shadow-md ${
                    i === currentStep ? "border-primary bg-primary/5" : "border-border/40 bg-white/50"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                      i <= currentStep ? "bg-primary text-primary-foreground" : "bg-muted/30 text-muted-foreground"
                    }`}>
                      {s.step}
                    </div>
                    <span className="text-sm font-semibold">{s.short}</span>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2">{s.desc}</p>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 text-center">
          <div className="container">
            <h2 className="text-3xl font-bold mb-3">Ready to start your journey?</h2>
            <p className="text-muted-foreground text-lg mb-6 max-w-xl mx-auto">It all starts with a free, no-obligation home assessment. Your first step is just a click away.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a href="/lead">
                <Button size="lg" className="rounded-full px-8">Start Your Free Assessment <ArrowRight className="ml-2 w-5 h-5" /></Button>
              </a>
              <a href="/savings">
                <Button size="lg" variant="outline" className="rounded-full px-8">Calculate Your Savings First</Button>
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}