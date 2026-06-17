import { ArrowRight, BadgeEuro, Clock3, ShieldCheck, Workflow } from 'lucide-react'

import { Button } from '@/shared/ui/button'

const capabilities = [
  {
    title: 'OAuth PKCE',
    description: 'Secure access for employees and finance reviewers.',
    icon: ShieldCheck,
  },
  {
    title: 'Payment requests',
    description: 'Submit, follow, and review multi-currency requests.',
    icon: BadgeEuro,
  },
  {
    title: 'Finance review',
    description: 'Approve or reject pending requests with clear context.',
    icon: Workflow,
  },
]

const metrics = [
  { label: 'Currencies', value: '160+' },
  { label: 'Review window', value: '48h' },
  { label: 'Rate source', value: 'Live' },
]

export function HomePage() {
  return (
    <main className="min-h-screen bg-[#f7f8fb]">
      <section className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 py-8">
        <header className="flex items-center justify-between border-b border-[#dfe5ef] pb-5">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-[#1268b3] text-sm font-bold text-white">
              CF
            </div>
            <div>
              <p className="text-sm font-semibold text-[#172033]">CurrencyFlow</p>
              <p className="text-xs text-[#657189]">Multi-currency payments</p>
            </div>
          </div>

          <Button type="button" variant="secondary">
            Sign in
          </Button>
        </header>

        <div className="grid flex-1 items-center gap-10 py-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-[#1268b3]">
              Payment request management
            </p>
            <h1 className="max-w-3xl text-4xl font-semibold leading-tight text-[#172033] md:text-5xl">
              Manage company payments across currencies with confidence.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-[#526076]">
              Employees can submit payment requests in local currencies while finance teams review
              every request with immutable exchange-rate snapshots and clear approval history.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button type="button">
                Sign in
                <ArrowRight className="size-4" />
              </Button>
              <Button type="button" variant="secondary">
                Create account
              </Button>
            </div>

            <div className="mt-10 grid max-w-xl grid-cols-3 gap-3">
              {metrics.map((metric) => (
                <div className="rounded-lg border border-[#dfe5ef] bg-white p-4" key={metric.label}>
                  <p className="text-2xl font-semibold text-[#172033]">{metric.value}</p>
                  <p className="mt-1 text-xs font-medium text-[#657189]">{metric.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4">
            {capabilities.map((item) => (
              <article
                className="rounded-lg border border-[#dfe5ef] bg-white p-5 shadow-sm"
                key={item.title}
              >
                <div className="mb-4 flex size-10 items-center justify-center rounded-lg bg-[#e9f2fb] text-[#1268b3]">
                  <item.icon className="size-5" />
                </div>
                <h2 className="text-lg font-semibold text-[#172033]">{item.title}</h2>
                <p className="mt-2 text-sm leading-6 text-[#657189]">{item.description}</p>
              </article>
            ))}

            <article className="rounded-lg border border-[#dfe5ef] bg-[#172033] p-5 text-white shadow-sm">
              <div className="mb-4 flex size-10 items-center justify-center rounded-lg bg-white/10 text-white">
                <Clock3 className="size-5" />
              </div>
              <h2 className="text-lg font-semibold">Automatic expiration</h2>
              <p className="mt-2 text-sm leading-6 text-white/70">
                Pending requests age out automatically when the finance review window closes.
              </p>
            </article>
          </div>
        </div>
      </section>
    </main>
  )
}
