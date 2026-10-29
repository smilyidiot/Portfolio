import { Link } from 'react-router-dom'

export default function PageHeader({ title, subtitle }) {
  return (
    <div className="mb-10">
      <Link
        to="/"
        className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 transition hover:text-brand dark:text-slate-400 dark:hover:text-brand-dark"
      >
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 12H5M11 6l-6 6 6 6" />
        </svg>
        Home
      </Link>
      <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">{title}</h1>
      {subtitle && <p className="mt-2 text-slate-600 dark:text-slate-300">{subtitle}</p>}
    </div>
  )
}
