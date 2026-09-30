"use client";

import { useState } from "react";
import {
  Sun, Leaf, ArrowRight, ChevronDown, ChevronUp, Home, DollarSign,
  Shield, MapPin, Phone, Mail, Menu, X, Search, Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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

const stateCodes = Object.keys(stateRebates).sort();

// ─── FAQ data ──────────────────────────────────────────────────
const faqItems = [
  {
    q: "How much does a solar system cost after incentives?",
    a: "The average US home solar system costs between $15,000–$25,000 before incentives. After the 30% federal tax credit and any state rebates, the net cost typically ranges from $9,000–$17,000. Greenloop offers zero-down financing options so you can start saving immediately with no upfront payment.",
    tags: ["cost", "incentives"],
  },
  {
    q: "How long does installation take?",
    a: "The physical installation takes just 1–2 days. The full process from assessment to activation typically takes 4–8 weeks, most of which is permitting and utility paperwork — our team handles all of that for you. See our Install Process page for a step-by-step breakdown.",
    tags: ["install", "timeline"],
  },
  {
    q: "What if my roof is shaded or faces the wrong direction?",
    a: "Solar can still work for most homes! We use microinverters and optimizers to maximize production even with partial shade. During your free assessment, we measure your roof's solar potential with mapping tools. If your roof isn't ideal, we can explore ground-mount or community solar options.",
    tags: ["roof", "technical"],
  },
  {
    q: "Do solar panels work in winter or on cloudy days?",
    a: "Absolutely. Solar panels produce electricity from daylight, not direct sunlight. Even on overcast days they generate 10–25% of their rated capacity. Snow actually helps by reflecting extra light onto panels. Modern systems are designed to perform year-round in all climates.",
    tags: ["weather", "technical"],
  },
  {
    q: "What happens during a power outage?",
    a: "Standard grid-tied solar systems shut off during an outage for safety (to protect utility workers). If you add battery storage (like the Tesla Powerwall or Enphase IQ Battery), your home can keep running on solar power during outages. Ask about our solar + storage packages!",
    tags: ["technical", "battery"],
  },
  {
    q: "How long do solar panels last? What about warranties?",
    a: "Premium solar panels come with a 25-year performance warranty and typically last 30+ years with gradual degradation (about 0.5% per year). Inverters last 10–15 years. Greenloop backs all installations with a 25-year workmanship warranty and we handle any warranty claims for you.",
    tags: ["cost", "technical"],
  },
  {
    q: "Will solar increase my home value?",
    a: "Yes! Studies from Zillow and the DOE show homes with solar sell for 4–6% more than comparable homes without. Solar is one of the few home improvements that pays for itself AND increases resale value. Plus, solar panels are exempt from property tax increases in most states.",
    tags: ["cost", "incentives"],
  },
  {
    q: "What is net metering and how does it work?",
    a: "Net metering credits you for excess solar power sent back to the grid. When your panels produce more than you use (like midday), the meter runs backward. At night, you pull from those credits. Most states guarantee net metering, meaning your solar system can zero out your electric bill entirely.",
    tags: ["incentives", "technical"],
  },
  {
    q: "Can I finance my solar system with $0 down?",
    a: "Yes! Greenloop offers three ways to go solar with no upfront cost: (1) Solar Loan — own your system with low monthly payments; (2) PPA — pay only for the power produced, at a lower rate than the utility; (3) Lease — fixed monthly payments with no maintenance costs. All options include full monitoring and warranty coverage.",
    tags: ["cost", "financing"],
  },
  {
    q: "What maintenance do solar panels need?",
    a: "Virtually none! Solar panels have no moving parts and are self-cleaning from rain in most climates. We recommend a quick annual rinse from the ground and trimming nearby trees. Your monitoring app alerts you to any performance issues. Greenloop's warranty covers equipment and production for 25 years.",
    tags: ["technical", "cost"],
  },
  {
    q: "How do state tax credits and rebates work?",
    a: "Beyond the 30% federal Investment Tax Credit (ITC), many states offer additional incentives. These can include state tax credits, cash rebates, and SREC (Solar Renewable Energy Certificate) programs. Use the filter below to see what's available in your state. Greenloop automatically applies all eligible incentives to your quote.",
    tags: ["incentives", "cost"],
  },
  {
    q: "What size solar system do I need?",
    a: "The average home needs a 6–10 kW system, which is about 15–25 panels. The exact size depends on your energy usage, roof space, sun exposure, and goals. Our savings calculator gives a quick estimate, but your free assessment gives you a precise, custom design tailored to your home.",
    tags: ["technical", "cost"],
  },
];

// ─── Accordion ─────────────────────────────────────────────────
function AccordionItem({
  item,
  index,
  isOpen,
  onToggle,
  stateFilter,
}: {
  item: (typeof faqItems)[0];
  index: number;
  isOpen: boolean;
  onToggle: () => void;
  stateFilter: string | null;
}) {
  // If a state is selected, show applicable rebate info inline
  const rebateInfo =
    stateFilter && stateRebates[stateFilter]
      ? stateRebates[stateFilter]
      : null;

  // Check if this answer mentions rebates and we have a state filter
  const showRebateNote = rebateInfo && (item.tags.includes("incentives") || item.tags.includes("cost"));

  return (
    <div className="border-b border-border/40 last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-5 py-4 text-left font-medium text-sm transition-colors hover:bg-secondary/30 rounded-t-lg gap-3"
      >
        <span className="flex-1">{item.q}</span>
        <div className="flex items-center gap-2">
          {item.tags.map((t) => (
            <span
              key={t}
              className="text-[0.6rem] px-1.5 py-0.5 rounded-full bg-primary/10 text-primary font-medium"
            >
              {t}
            </span>
          ))}
          {isOpen ? (
            <ChevronUp className="w-4 h-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          )}
        </div>
      </button>
      {isOpen && (
        <div className="px-5 py-4 text-sm text-muted-foreground leading-relaxed">
          {item.a}
          {showRebateNote && (
            <div className="mt-3 p-3 rounded-lg bg-primary/5 border border-primary/20">
              <p className="text-xs font-semibold text-primary flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5" />
                {rebateInfo!.name} Incentives Available
              </p>
              <ul className="mt-1.5 text-xs space-y-1">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  Federal Tax Credit: <strong>{rebateInfo!.federal}%</strong>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-accent" />
                  State Incentive: <strong>{rebateInfo!.state}%</strong>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  Total Potential Savings: <strong>{rebateInfo!.federal + rebateInfo!.state}%</strong> off system cost
                </li>
              </ul>
            </div>
          )}
        </div>
      )}
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
                l.href === "/faq" ? "text-foreground bg-primary/10" : "text-muted-foreground hover:text-foreground hover:bg-secondary"
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
                l.href === "/faq" ? "text-foreground bg-primary/10" : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              {l.label}
            </a>
          ))}
          <a href="/lead" className="block pt-2">
            <Button className="w-full rounded-full" size="sm">
              Free Assessment <ArrowRight className="ml-1.5 w-4 h-4" />
            </Button>
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
            <p className="text-sm text-muted-foreground leading-relaxed">
              Making home solar simple, affordable, and beautiful.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-3">Solar Tools</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="/savings" className="hover:text-foreground transition-colors">
                  Savings Calculator
                </a>
              </li>
              <li>
                <a href="/install" className="hover:text-foreground transition-colors">
                  Install Process
                </a>
              </li>
              <li>
                <a href="/faq" className="hover:text-foreground transition-colors">
                  FAQ &amp; Rebates
                </a>
              </li>
              <li>
                <a href="/chart" className="hover:text-foreground transition-colors">
                  Energy Comparison
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-3">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="/" className="hover:text-foreground transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/lead" className="hover:text-foreground transition-colors">
                  Get Started
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-3">Contact</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5" /> (888) 555-SOLAR
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5" /> hello@greenloop.solar
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5" /> 100 Green Way, Austin, TX
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© 2026 Greenloop Energy Inc. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── Page ──────────────────────────────────────────────────────
export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [stateFilter, setStateFilter] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = faqItems.filter((item) => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return item.q.toLowerCase().includes(q) || item.a.toLowerCase().includes(q) || item.tags.some((t) => t.includes(q));
    }
    return true;
  });

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Get current rebate info
  const currentRebate = stateFilter ? stateRebates[stateFilter] : null;

  return (
    <>
      <Header />

      <main className="pt-24 pb-16">
        {/* Hero */}
        <section className="py-12 md:py-16">
          <div className="container text-center">
            <Badge variant="secondary" className="mb-3 px-3 py-1 rounded-full">
              <Search className="w-3.5 h-3.5 mr-1.5 inline" />
              FAQ &amp; Rebates
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              Your solar questions, answered.
            </h1>
            <p className="mt-3 text-muted-foreground text-lg max-w-2xl mx-auto">
              Everything you need to know about going solar — including custom rebate info for your state.
            </p>
          </div>
        </section>

        {/* State Rebate Filter */}
        <section className="py-8">
          <div className="container max-w-3xl mx-auto">
            <Card className="border-border/60 shadow-sm">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Filter className="w-4 h-4 text-primary" />
                  Filter by State &mdash; see your rebates
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>Your State</Label>
                    <Select
                      value={stateFilter || ""}
                      onValueChange={(v) => setStateFilter(v || null)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select your state" />
                      </SelectTrigger>
                      <SelectContent>
                        {stateCodes.map((code) => (
                          <SelectItem key={code} value={code}>
                            {stateRebates[code].name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Search questions</Label>
                    <Input
                      placeholder="Search…"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>

                {currentRebate && (
                  <div className="p-4 rounded-xl bg-gradient-to-r from-primary/5 to-accent/10 border border-primary/20">
                    <div className="flex items-center gap-2">
                      <Shield className="w-5 h-5 text-primary" />
                      <strong className="text-sm">{currentRebate.name} Solar Incentives</strong>
                    </div>
                    <div className="mt-2 grid grid-cols-3 gap-4 text-sm">
                      <div className="text-center p-2 rounded-lg bg-white/40">
                        <p className="text-xs text-muted-foreground">Federal Tax Credit</p>
                        <p className="text-xl font-bold text-primary">{currentRebate.federal}%</p>
                      </div>
                      <div className="text-center p-2 rounded-lg bg-white/40">
                        <p className="text-xs text-muted-foreground">State Incentive</p>
                        <p className="text-xl font-bold text-accent">{currentRebate.state}%</p>
                      </div>
                      <div className="text-center p-2 rounded-lg bg-white/40">
                        <p className="text-xs text-muted-foreground">Total Off</p>
                        <p className="text-xl font-bold text-primary">
                          {currentRebate.federal + currentRebate.state}%
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Accordion */}
        <section className="py-8">
          <div className="container max-w-3xl mx-auto">
            {filteredItems.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <p className="text-lg">No questions match your search.</p>
                <p className="text-sm mt-1">Try different keywords or clear the search.</p>
              </div>
            ) : (
              <div className="rounded-xl border border-border/60 overflow-hidden bg-card">
                {filteredItems.map((item, i) => (
                  <AccordionItem
                    key={i}
                    item={item}
                    index={i}
                    isOpen={openIndex === i}
                    onToggle={() => toggleItem(i)}
                    stateFilter={stateFilter}
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 text-center">
          <div className="container max-w-2xl mx-auto">
            <div className="p-8 rounded-2xl bg-gradient-to-r from-primary/5 to-accent/10 border border-primary/20">
              <h2 className="text-2xl font-bold tracking-tight">
                Still have questions?
              </h2>
              <p className="mt-2 text-muted-foreground">
                Our solar advisors are here to help. Get a free, no-obligation consultation.
              </p>
              <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a href="/lead">
                  <Button size="lg" className="rounded-full text-base px-8">
                    Get Your Free Assessment <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </a>
                <a href="tel:+188855576527">
                  <Button size="lg" variant="outline" className="rounded-full text-base px-8">
                    <Phone className="mr-2 w-5 h-5" /> (888) 555-SOLAR
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}