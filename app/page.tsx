import Link from "next/link";

const features = [
  {
    title: "Schedule & dispatch",
    body: "Today's stops in your pocket. Tap to mark done. Drag to reschedule. Your crew sees the route on their phone.",
    icon: "📅",
  },
  {
    title: "Satellite lawn sizing",
    body: "Click a property on the map and get the square footage in seconds. No more pacing yards or guessing on quotes.",
    icon: "🛰️",
  },
  {
    title: "AI pricing & ROI",
    body: "Mowpro tells you which customers to upsell, which to drop, and what to charge for the next quote — every Monday morning.",
    icon: "📈",
  },
  {
    title: "Invoicing & payments",
    body: "Stripe-powered. Send a payment link from the truck cab. Get paid before you load the trailer.",
    icon: "💳",
  },
];

const tiers = [
  {
    name: "Free",
    price: "$0",
    cadence: "forever",
    blurb: "Try the core ops.",
    features: [
      "Up to 10 active customers",
      "Schedule, jobs, invoicing",
      "Mobile-friendly job-day view",
    ],
    cta: "Start free",
    highlight: false,
  },
  {
    name: "Solo",
    price: "$29",
    cadence: "/ month",
    blurb: "For one truck.",
    features: [
      "Unlimited customers",
      "Satellite lawn sizing",
      "Route optimization",
      "Stripe payment links",
    ],
    cta: "Start Solo",
    highlight: true,
  },
  {
    name: "Pro",
    price: "$79",
    cadence: "/ month",
    blurb: "For 2-person crews.",
    features: [
      "Everything in Solo",
      "2 crew seats included",
      "AI pricing suggestions",
      "Weekly ROI digest",
      "Territory tools",
    ],
    cta: "Start Pro",
    highlight: false,
  },
  {
    name: "Crew",
    price: "$149",
    cadence: "/ month",
    blurb: "For multi-truck operators.",
    features: [
      "Everything in Pro",
      "5 crew seats included",
      "Upsell signals on every job",
      "Advanced analytics",
    ],
    cta: "Start Crew",
    highlight: false,
  },
];

const steps = [
  {
    n: "1",
    title: "Drop a pin",
    body: "Click any property on the map. Mowpro measures the lawn from satellite imagery — no walking the yard.",
  },
  {
    n: "2",
    title: "Send the quote",
    body: "AI suggests the right price for your zip code. One click sends a Stripe payment link or sets up a recurring schedule.",
  },
  {
    n: "3",
    title: "Mow and get paid",
    body: "Your crew sees today's route on their phone. The customer pays before you're done loading the trailer.",
  },
];

function Logo({ size = "md" }: { size?: "sm" | "md" }) {
  const dim = size === "sm" ? "h-7 w-7 text-sm" : "h-8 w-8";
  return (
    <span className="inline-flex items-center gap-2">
      <span className={`${dim} grid place-items-center rounded-lg bg-emerald-600 font-bold text-white`}>
        M
      </span>
      <span className="text-lg font-semibold tracking-tight text-slate-900">Mowpro</span>
    </span>
  );
}

export default function Home() {
  return (
    <div className="flex min-h-full flex-1 flex-col bg-white text-slate-900">
      {/* Nav */}
      <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" aria-label="Mowpro home">
            <Logo />
          </Link>
          <nav className="hidden gap-8 text-sm font-medium text-slate-600 md:flex">
            <a href="#features" className="hover:text-slate-900">Features</a>
            <a href="#how" className="hover:text-slate-900">How it works</a>
            <a href="#pricing" className="hover:text-slate-900">Pricing</a>
          </nav>
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="hidden text-sm font-medium text-slate-600 hover:text-slate-900 sm:inline"
            >
              Sign in
            </Link>
            <Link
              href="/login"
              className="rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-emerald-700"
            >
              Start free
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-x-0 -top-40 -z-10 h-[600px] bg-gradient-to-b from-emerald-50 via-white to-white"
        />
        <div className="mx-auto max-w-6xl px-6 py-20 text-center md:py-28">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
            Built by lawn-care pros, for lawn-care pros
          </p>
          <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-bold tracking-tight text-slate-900 md:text-6xl md:leading-tight">
            More mows. Less paperwork.
            <br className="hidden md:block" />
            <span className="text-emerald-600"> Bigger margins.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-600 md:text-xl">
            Mowpro is the operating system for your lawn-care business. Schedule jobs, measure lawns
            from satellite, and let AI tell you which customers are worth more — all in one place.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <Link
              href="/login"
              className="rounded-full bg-emerald-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-emerald-600/20 transition-colors hover:bg-emerald-700"
            >
              Start free — no credit card
            </Link>
            <a
              href="#how"
              className="rounded-full border border-slate-300 bg-white px-8 py-4 text-base font-semibold text-slate-900 transition-colors hover:bg-slate-50"
            >
              See how it works
            </a>
          </div>
          <p className="mt-6 text-sm text-slate-500">
            14-day Pro trial · cancel anytime · works on phone, tablet, or truck cab
          </p>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
              The four things that actually move the needle
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              No fluff. No 200-feature CRM. Just the workflows that turn driving time into billable revenue.
            </p>
          </div>
          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {features.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-emerald-50 text-2xl">
                  {f.icon}
                </div>
                <h3 className="mt-5 text-lg font-semibold text-slate-900">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
              From quote to paid in three taps
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              You don&apos;t have a billing problem. You have a friction problem. Mowpro removes the friction.
            </p>
          </div>
          <div className="mt-16 grid gap-12 md:grid-cols-3">
            {steps.map((s) => (
              <div key={s.n} className="text-center">
                <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-emerald-600 text-lg font-bold text-white shadow-md shadow-emerald-600/20">
                  {s.n}
                </div>
                <h3 className="mt-6 text-xl font-semibold text-slate-900">{s.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-slate-600">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
              Pricing that pays for itself in one upsell
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Start free. Upgrade when the AI surfaces its first $200/month customer you didn&apos;t know you had.
            </p>
          </div>
          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {tiers.map((t) => (
              <div
                key={t.name}
                className={`flex flex-col rounded-2xl border p-6 ${
                  t.highlight
                    ? "border-emerald-600 bg-white shadow-lg ring-1 ring-emerald-600"
                    : "border-slate-200 bg-white shadow-sm"
                }`}
              >
                {t.highlight ? (
                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-emerald-700">
                    Most popular
                  </p>
                ) : (
                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-transparent">
                    placeholder
                  </p>
                )}
                <h3 className="mt-2 text-lg font-semibold text-slate-900">{t.name}</h3>
                <p className="mt-1 text-sm text-slate-600">{t.blurb}</p>
                <p className="mt-6 flex items-baseline gap-1">
                  <span className="text-4xl font-bold tracking-tight text-slate-900">{t.price}</span>
                  <span className="text-sm text-slate-500">{t.cadence}</span>
                </p>
                <ul className="mt-6 space-y-2 text-sm text-slate-600">
                  {t.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <span className="mt-0.5 font-bold text-emerald-600">✓</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/login"
                  className={`mt-8 block rounded-full px-4 py-3 text-center text-sm font-semibold transition-colors ${
                    t.highlight
                      ? "bg-emerald-600 text-white hover:bg-emerald-700"
                      : "border border-slate-300 text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  {t.cta}
                </Link>
              </div>
            ))}
          </div>
          <p className="mt-10 text-center text-sm text-slate-500">
            Pricing in USD. All plans include unlimited jobs, photos, and route history.
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t border-slate-200 bg-emerald-600">
        <div className="mx-auto max-w-3xl px-6 py-20 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
            Stop running your business out of a notebook.
          </h2>
          <p className="mt-4 text-lg text-emerald-50">
            Mowpro pays for itself in less time than it takes to write up one paper invoice.
          </p>
          <div className="mt-8">
            <Link
              href="/login"
              className="inline-block rounded-full bg-white px-8 py-4 text-base font-semibold text-emerald-700 shadow-lg transition-colors hover:bg-emerald-50"
            >
              Start free today
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-10 sm:flex-row">
          <Link href="/" aria-label="Mowpro home">
            <Logo size="sm" />
          </Link>
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} Mowpro · Built for lawn-care pros
          </p>
        </div>
      </footer>
    </div>
  );
}
