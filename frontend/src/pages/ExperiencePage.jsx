import PageHeader from '../components/PageHeader.jsx'
import { experience } from '../data/resume.js'

export default function ExperiencePage() {
  return (
    <section className="mx-auto max-w-5xl px-5 py-14">
      <PageHeader title="Experience" subtitle="Where I’ve built and shipped." />
      <div className="space-y-8">
        {experience.map((job) => (
          <div
            key={job.company}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-lg font-bold">
                {job.role} · <span className="text-brand dark:text-brand-dark">{job.company}</span>
              </h3>
              <span className="text-sm font-medium text-slate-500 dark:text-slate-400">{job.period}</span>
            </div>
            <p className="mb-4 text-sm text-slate-500 dark:text-slate-400">{job.location}</p>
            <ul className="space-y-2.5">
              {job.points.map((p, i) => (
                <li key={i} className="flex gap-3 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand dark:bg-brand-dark" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
