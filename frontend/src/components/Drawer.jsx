import { NavLink } from 'react-router-dom'
import { navLinks } from '../data/nav.js'
import { profile } from '../data/resume.js'

export default function Drawer({ open, onClose }) {
  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm transition-opacity duration-300 ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        aria-hidden={!open}
      />

      {/* Panel (slides in from the right) */}
      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-72 max-w-[85vw] flex-col border-l border-slate-200 bg-white shadow-2xl transition-transform duration-300 ease-out dark:border-slate-800 dark:bg-slate-900 ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-label="Navigation"
      >
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 dark:border-slate-800">
          <span className="font-extrabold tracking-tight">
            {profile.name.split(' ')[0]}
            <span className="text-brand dark:text-brand-dark">.</span>
          </span>
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="rounded-lg p-1.5 text-slate-500 transition hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </div>

        <nav className="flex flex-col gap-1 p-4">
          <NavLink
            to="/"
            end
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                isActive
                  ? 'bg-brand/10 text-brand dark:bg-brand-dark/15 dark:text-brand-dark'
                  : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
              }`
            }
          >
            <span className="text-base">🏠</span> Home
          </NavLink>

          {navLinks.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                  isActive
                    ? 'bg-brand/10 text-brand dark:bg-brand-dark/15 dark:text-brand-dark'
                    : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
                }`
              }
            >
              <span className="text-base">{l.icon}</span> {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto border-t border-slate-200 p-5 text-xs text-slate-400 dark:border-slate-800 dark:text-slate-500">
          <a href={`mailto:${profile.email}`} className="block hover:text-brand dark:hover:text-brand-dark">
            {profile.email}
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="block hover:text-brand dark:hover:text-brand-dark">
            LinkedIn
          </a>
        </div>
      </aside>
    </>
  )
}
