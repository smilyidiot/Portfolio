import { useOutletContext, Link } from 'react-router-dom'
import { profile, languages, hobbies } from '../data/resume.js'

function MailIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  )
}
function LinkedInIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14zM8.34 18.34v-7.2H5.96v7.2h2.38zM7.15 10.1a1.38 1.38 0 1 0 0-2.76 1.38 1.38 0 0 0 0 2.76zm11.19 8.24v-3.95c0-2.11-.45-3.74-2.92-3.74-1.19 0-1.99.65-2.31 1.27h-.03v-1.08h-2.28v7.2h2.38v-3.56c0-.94.18-1.85 1.34-1.85 1.15 0 1.16 1.07 1.16 1.91v3.5h2.39z" />
    </svg>
  )
}

export default function Home() {
  const { openDrawer } = useOutletContext()

  return (
    <section className="mx-auto max-w-5xl px-5 pb-16 pt-14 md:pt-20">
      {/* Intro */}
      <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-brand dark:text-brand-dark">
        {profile.location}
      </p>
      <h1 className="text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">
        Hi, I’m {profile.name.split(' ')[0]}.
      </h1>
      <p className="mt-3 text-lg font-semibold text-slate-600 dark:text-slate-300 md:text-2xl">
        {profile.title}
      </p>

      <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-700 dark:text-slate-300">
        {profile.summary}
      </p>

      {/* Primary actions */}
      <div className="mt-8 flex flex-wrap gap-3">
        <button
          onClick={openDrawer}
          className="inline-flex items-center gap-2 rounded-xl bg-brand px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 dark:bg-brand-dark dark:text-slate-950 dark:hover:bg-blue-300"
        >
          View details
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </button>
        <a
          href={`mailto:${profile.email}`}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-brand hover:text-brand dark:border-slate-700 dark:text-slate-200 dark:hover:border-brand-dark dark:hover:text-brand-dark"
        >
          <MailIcon /> Email
        </a>
        <a
          href={profile.linkedin}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-brand hover:text-brand dark:border-slate-700 dark:text-slate-200 dark:hover:border-brand-dark dark:hover:text-brand-dark"
        >
          <LinkedInIcon /> LinkedIn
        </a>
      </div>

      {/* Personal: languages + hobbies */}
      <div className="mt-14 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h2 className="mb-1 font-bold text-brand dark:text-brand-dark">Languages</h2>
          <p className="mb-4 text-xs font-medium text-slate-400 dark:text-slate-500">{languages.note}</p>
          <div className="flex flex-wrap gap-2">
            {languages.items.map((lang) => (
              <span
                key={lang}
                className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300"
              >
                {lang}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h2 className="mb-4 font-bold text-brand dark:text-brand-dark">Hobbies</h2>
          <div className="flex flex-wrap gap-2">
            {hobbies.map((h) => (
              <span
                key={h.label}
                className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300"
              >
                <span>{h.icon}</span> {h.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      <p className="mt-10 text-sm text-slate-500 dark:text-slate-400">
        Explore more via the{' '}
        <button onClick={openDrawer} className="font-semibold text-brand hover:underline dark:text-brand-dark">
          menu
        </button>{' '}
        — or jump straight to{' '}
        <Link to="/projects" className="font-semibold text-brand hover:underline dark:text-brand-dark">
          my projects
        </Link>
        .
      </p>
    </section>
  )
}
