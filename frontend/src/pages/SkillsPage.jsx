import PageHeader from '../components/PageHeader.jsx'
import { skills } from '../data/resume.js'

export default function SkillsPage() {
  return (
    <section className="mx-auto max-w-5xl px-5 py-14">
      <PageHeader title="Skills" subtitle="Tools and technologies I work with day to day." />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((s) => (
          <div
            key={s.group}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
          >
            <h3 className="mb-3 font-bold text-brand dark:text-brand-dark">{s.group}</h3>
            <div className="flex flex-wrap gap-2">
              {s.items.map((item) => (
                <span
                  key={item}
                  className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
