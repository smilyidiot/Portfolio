import { profile } from '../data/resume.js'

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 py-8 text-center text-sm text-slate-500 dark:border-slate-800 dark:text-slate-400">
      <p>
        © {new Date().getFullYear()} {profile.name}. Built with React, Vite & Flask.
      </p>
    </footer>
  )
}
