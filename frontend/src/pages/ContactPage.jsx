import { useState } from "react";
import PageHeader from "../components/PageHeader.jsx";
import { profile } from "../data/resume.js";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | ok | error
  const [error, setError] = useState("");

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  async function onSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setStatus("ok");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus("error");
      setError(err.message);
    }
  }

  return (
    <section className="mx-auto max-w-5xl px-5 py-14">
      <PageHeader
        title="Contact"
        subtitle="Let’s talk Python, data pipelines, or LLM agents."
      />

      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300">
            Have a role, a project, or just want to connect? Drop a message — it
            reaches me through a small Flask API behind this page.
          </p>
          <div className="mt-6 space-y-2 text-sm">
            <p>
              <span className="font-semibold">Email:</span>{" "}
              <a
                href={`mailto:${profile.email}`}
                className="text-brand hover:underline dark:text-brand-dark"
              >
                {profile.email}
              </a>
            </p>
            <p>
              <span className="font-semibold">LinkedIn:</span>{" "}
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="text-brand hover:underline dark:text-brand-dark"
              >
                /in/r-vinayaka/
              </a>
            </p>
          </div>
        </div>

        <form
          onSubmit={onSubmit}
          className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
        >
          <div>
            <label className="mb-1 block text-sm font-medium" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              name="name"
              required
              value={form.name}
              onChange={update}
              className="w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 text-sm outline-none focus:border-brand dark:border-slate-700 dark:focus:border-brand-dark"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={form.email}
              onChange={update}
              className="w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 text-sm outline-none focus:border-brand dark:border-slate-700 dark:focus:border-brand-dark"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium" htmlFor="message">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="4"
              required
              value={form.message}
              onChange={update}
              className="w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 text-sm outline-none focus:border-brand dark:border-slate-700 dark:focus:border-brand-dark"
            />
          </div>
          <button
            type="submit"
            disabled={status === "sending"}
            className="w-full rounded-lg bg-brand px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60 dark:bg-brand-dark dark:text-slate-950 dark:hover:bg-blue-300"
          >
            {status === "sending" ? "Sending…" : "Send message"}
          </button>

          {status === "ok" && (
            <p className="text-sm font-medium text-green-600 dark:text-green-400">
              Thanks — your message was received.
            </p>
          )}
          {status === "error" && (
            <p className="text-sm font-medium text-red-600 dark:text-red-400">
              {error}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
