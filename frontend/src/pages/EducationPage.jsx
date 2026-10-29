import PageHeader from "../components/PageHeader.jsx";
import { education, languages, background } from "../data/resume.js";

export default function EducationPage() {
  return (
    <section className="mx-auto max-w-5xl px-5 py-14">
      <PageHeader
        title="Education"
        subtitle="Academic background and languages."
      />

      <p className="mb-6 max-w-3xl border-l-2 border-brand/40 pl-4 text-sm italic leading-relaxed text-slate-500 dark:border-brand-dark/40 dark:text-slate-400">
        {background}
      </p>

      <div className="space-y-5">
        {education.map((e) => (
          <div
            key={e.school}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <p className="text-lg font-bold">
                {e.degree} ·{" "}
                <span className="text-brand dark:text-brand-dark">
                  {e.school}
                </span>
              </p>
              <span className="text-sm text-slate-500 dark:text-slate-400">
                {e.period}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h2 className="mb-1 font-bold text-brand dark:text-brand-dark">
          Languages
        </h2>
        <p className="mb-4 text-xs font-medium text-slate-400 dark:text-slate-500">
          {languages.note}
        </p>
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
    </section>
  );
}
