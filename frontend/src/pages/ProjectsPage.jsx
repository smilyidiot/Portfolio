import PageHeader from '../components/PageHeader.jsx'
import { projects } from '../data/resume.js'

function ArrowIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  )
}

export default function ProjectsPage() {
  return (
    <section className="mx-auto max-w-5xl px-5 py-14">
      <PageHeader title="Projects" subtitle="A few things I’ve built end to end." />
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((p) => (
          <div
            key={p.name}
            className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
          >
            <h3 className="text-lg font-bold">{p.name}</h3>
            <p className="text-sm font-medium text-brand dark:text-brand-dark">{p.stack}</p>
            <ul className="mt-4 flex-1 space-y-2.5">
              {p.points.map((pt, i) => (
                <li key={i} className="flex gap-3 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand dark:bg-brand-dark" />
                  {pt}
                </li>
              ))}
            </ul>
            {p.demo && p.demo !== '#' && (
              <a
                href={p.demo}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline dark:text-brand-dark"
              >
                Live demo <ArrowIcon />
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
