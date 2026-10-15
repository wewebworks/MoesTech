"use client";
import { useState } from "react";
import { Mail } from "lucide-react";
import { company } from "@/lib/site";

const interests = ["Managed Services", "Security", "Network", "Audio & Video", "Electrical / Low-Voltage"] as const;
type Fields = { name: string; email: string; phone: string; company: string; interest: string; message: string };
const empty: Fields = { name: "", email: "", phone: "", company: "", interest: "", message: "" };

function validate(f: Fields) {
  const e: Partial<Record<keyof Fields, string>> = {};
  if (f.name.trim().length < 2) e.name = "Enter your full name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) e.email = "Enter a valid email address.";
  if (f.phone.replace(/\D/g, "").length < 10) e.phone = "Enter a phone number with area code.";
  if (!f.interest) e.interest = "Choose an area of interest.";
  if (f.message.trim().length < 10) e.message = "Tell us a little more (10+ characters).";
  return e;
}

export function ContactForm() {
  const [f, setF] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [ok, setOk] = useState(false);

  const set = (k: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setF((p) => ({ ...p, [k]: e.target.value }));

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const v = validate(f);
    setErrors(v);
    const first = Object.keys(v)[0];
    if (first) { document.getElementById(`f-${first}`)?.focus(); setOk(false); return; }
    setOk(true);
  }

  const mailto = `mailto:${company.email}?subject=${encodeURIComponent(`Quote request — ${f.interest}`)}&body=${encodeURIComponent(
    `Name: ${f.name}\nCompany: ${f.company}\nPhone: ${f.phone}\nEmail: ${f.email}\nInterest: ${f.interest}\n\n${f.message}`,
  )}`;

  const input = "w-full rounded-md border border-line bg-white px-4 py-3 text-sm text-navy-900 transition-colors placeholder:text-slate-ink/50 focus:border-brand focus:outline-none";
  const field = (k: keyof Fields, label: string, el: React.ReactNode, optional = false) => (
    <div>
      <label htmlFor={`f-${k}`} className="mb-1.5 block text-sm font-semibold text-navy-900">
        {label} {optional && <span className="font-normal text-slate-ink">(optional)</span>}
      </label>
      {el}
      {errors[k] && <p id={`e-${k}`} className="mt-1.5 text-sm text-rose-600">{errors[k]}</p>}
    </div>
  );
  const aria = (k: keyof Fields) => ({ id: `f-${k}`, "aria-invalid": !!errors[k], "aria-describedby": errors[k] ? `e-${k}` : undefined });

  if (ok) {
    return (
      <div className="rounded-md border border-line bg-mist p-8" role="status">
        <p className="eyebrow text-brand">Demo form — nothing was sent</p>
        <h3 className="mt-3 text-2xl font-semibold text-navy-900">Your details look good.</h3>
        <p className="mt-3 text-slate-ink">
          This demonstration site isn&rsquo;t connected to a backend, so your message has not been delivered. To reach RNA Tek now, open it in your email app or call {company.phone}.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href={mailto} className="inline-flex items-center gap-2 rounded-md bg-navy-900 px-6 py-3.5 text-sm font-semibold text-white hover:bg-brand"><Mail className="size-4" aria-hidden="true" /> Open in email app</a>
          <button onClick={() => setOk(false)} className="rounded-md border border-navy-900/20 px-6 py-3.5 text-sm font-semibold text-navy-900 hover:border-brand hover:text-brand">Edit details</button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5 rounded-md border border-line bg-white p-6 shadow-sm sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        {field("name", "Full name", <input {...aria("name")} value={f.name} onChange={set("name")} autoComplete="name" className={input} />)}
        {field("company", "Company / property", <input {...aria("company")} value={f.company} onChange={set("company")} autoComplete="organization" className={input} />, true)}
        {field("email", "Email", <input {...aria("email")} type="email" value={f.email} onChange={set("email")} autoComplete="email" className={input} />)}
        {field("phone", "Phone", <input {...aria("phone")} type="tel" value={f.phone} onChange={set("phone")} autoComplete="tel" className={input} />)}
      </div>
      {field("interest", "Area of interest",
        <select {...aria("interest")} value={f.interest} onChange={set("interest")} className={input}>
          <option value="">Select…</option>
          {interests.map((i) => <option key={i}>{i}</option>)}
        </select>)}
      {field("message", "How can we help?", <textarea {...aria("message")} rows={5} value={f.message} onChange={set("message")} className={input} />)}
      <button type="submit" className="rounded-md bg-navy-900 px-6 py-4 text-sm font-semibold text-white transition-colors hover:bg-brand">Request a consultation</button>
      <p className="text-xs text-slate-ink">Demo form: validation works, but submissions are not transmitted anywhere until a backend is connected.</p>
    </form>
  );
}
