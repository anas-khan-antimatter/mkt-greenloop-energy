"use client";

import { useState } from "react";
import {
  Sun, Leaf, ArrowRight, Star, Zap, Home, DollarSign, Shield,
  CheckCircle, Menu, X, Phone, Mail, MapPin, BarChart3, Calculator,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// ─── Navigation ────────────────────────────────────────────────
function Header() {
  const [open, setOpen] = useState(false);
  const links = [
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
              className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg hover:bg-secondary transition-colors"
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
              className="block px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg hover:bg-secondary transition-colors"
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

// ─── Hero ──────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="relative pt-24 pb-20 md:pt-32 md:pb-28 overflow-hidden">
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
          <a href="/savings">
            <Button size="lg" className="rounded-full text-base px-8">
              Calculate Your Savings <Calculator className="ml-2 w-5 h-5" />
            </Button>
          </a>
          <a href="/lead">
            <Button size="lg" variant="outline" className="rounded-full text-base px-8">
              Free Home Assessment
            </Button>
          </a>
        </div>
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {[
            { icon: Zap, label: "5,200+ Homes Powered" },
            { icon: DollarSign, label: "$47M Total Savings" },
            { icon: Shield, label: "25-Year Warranty" },
            { icon: Star, label: "4.9 ★ Avg Rating" },
          ].map((item) => (
            <div key={item.label}
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

// ─── Features grid (route cards) ──────────────────────────────
const features = [
  {
    icon: Calculator,
    title: "Savings Calculator",
    desc: "Estimate your solar savings with roof size, bill, zip code, and state-specific rebates.",
    href: "/savings",
    label: "Calculate",
  },
  {
    icon: BarChart3,
    title: "Before & After Energy",
    desc: "See month-by-month energy usage before and after solar, adjustable by climate zone.",
    href: "/chart",
    label: "View Chart",
  },
  {
    icon: CheckCircle,
    title: "Install Process",
    desc: "Follow our 6-step interactive stepper — from assessment to activation.",
    href: "/install",
    label: "See Steps",
  },
  {
    icon: Shield,
    title: "FAQ & Rebate Filter",
    desc: "Browse FAQs and filter state-specific rebate incentives by location.",
    href: "/faq",
    label: "Learn More",
  },
  {
    icon: Home,
    title: "Free System Estimate",
    desc: "Get a real-time system size estimate based on your bill and location.",
    href: "/lead",
    label: "Get Started",
  },
  {
    icon: Zap,
    title: "API Access",
    desc: "POST /api/estimate and POST /api/leads for programmatic solar calculations.",
    href: "/api/estimate",
    label: "API Docs",
  },
];

function Features() {
  return (
    <section className="py-20 md:py-28">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Your solar toolkit
          </h2>
          <p className="mt-3 text-muted-foreground text-lg max-w-xl mx-auto">
            Explore every aspect of going solar — from instant estimates to installation.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {features.map((f) => (
            <a key={f.href} href={f.href}
              className="group block p-6 rounded-xl border border-border/40 bg-white/50 hover:bg-primary/5 hover:border-primary/30 transition-all shadow-sm hover:shadow-md"
            >
              <div className="flex items-center gap-2 mb-3">
                <f.icon className="w-5 h-5 text-primary" />
                <h3 className="font-semibold">{f.title}</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-3">{f.desc}</p>
              <span className="text-xs text-primary font-medium inline-flex items-center gap-1">
                {f.label} <ArrowRight className="w-3 h-3" />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Trust / Reviews ──────────────────────────────────────────
const reviews = [
  { name: "Sarah M.", location: "Austin, TX", text: "Our electric bill went from $240 to under $40 a month. Installation was seamless — done in 2 days." },
  { name: "James K.", location: "Denver, CO", text: "The calculator was spot on. Greenloop made the whole process transparent and easy." },
  { name: "Lisa R.", location: "Portland, OR", text: "Even in the Pacific Northwest, our solar panels produce way more than I expected. Love the monitoring app!" },
];

function Reviews() {
  return (
    <section className="py-16 bg-secondary/20">
      <div className="container max-w-4xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-8">What our customers say</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((r) => (
            <Card key={r.name} className="border-border/40 text-left">
              <CardContent className="space-y-2">
                <p className="text-sm text-muted-foreground leading-relaxed">&ldquo;{r.text}&rdquo;</p>
                <div className="flex items-center gap-2 mt-2 pt-2 border-t border-border/40">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">
                    {r.name[0]}
                  </div>
                  <div>
                    <p className="text-xs font-semibold">{r.name}</p>
                    <p className="text-[0.65rem] text-muted-foreground">{r.location}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA ──────────────────────────────────────────────────────
function CTA() {
  return (
    <section className="py-20 md:py-28 text-center">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-bold mb-3">Ready to power your home with sunshine?</h2>
        <p className="text-muted-foreground text-lg mb-6 max-w-xl mx-auto">
          Start with a free, no-obligation assessment. We&apos;ll design a system custom to your roof and energy needs.
        </p>
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
          <p>&copy; 2026 Greenloop Energy Inc. All rights reserved.</p>
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
        <Features />
        <Reviews />
        <CTA />
      </main>
      <Footer />
    </>
  );
}