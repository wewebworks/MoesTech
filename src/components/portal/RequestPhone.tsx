"use client";
import { useEffect, useId, useRef, useState } from "react";
import { Camera, Check, ChevronLeft, ImagePlus, Building2, RotateCcw } from "lucide-react";
import { PROPERTIES, SAMPLE_PHOTO, type Priority } from "./portalData";

export type NewRequest = { property: string; description: string; priority: Priority; photo?: string };

// Mobile-style ticket submission flow. Purely client-side; nothing is uploaded or sent.
export function RequestPhone({ onSubmit, createdId }: { onSubmit: (r: NewRequest) => void; createdId: string | null }) {
  const [step, setStep] = useState(0);
  const [property, setProperty] = useState("");
  const [photo, setPhoto] = useState<string | undefined>();
  const [desc, setDesc] = useState("");
  const [priority, setPriority] = useState<Priority>("Normal");
  const [error, setError] = useState("");
  const objectUrl = useRef<string | null>(null);
  const uid = useId();

  useEffect(() => () => { if (objectUrl.current) URL.revokeObjectURL(objectUrl.current); }, []);

  function next() {
    setError("");
    if (step === 0 && !property) return setError("Choose a property to continue.");
    if (step === 2 && desc.trim().length < 10) return setError("Describe the issue in at least 10 characters.");
    setStep((s) => s + 1);
  }

  function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    if (!f.type.startsWith("image/")) return setError("Please choose an image file.");
    if (objectUrl.current) URL.revokeObjectURL(objectUrl.current);
    objectUrl.current = URL.createObjectURL(f);
    setPhoto(objectUrl.current);
    setError("");
  }

  function submit() {
    onSubmit({ property, description: desc.trim(), priority, photo });
    setStep(5);
  }

  function reset() {
    setStep(0); setProperty(""); setPhoto(undefined); setDesc(""); setPriority("Normal"); setError("");
  }

  return (
    <div className="mx-auto w-full max-w-[22rem]">
      <div className="rounded-[2.6rem] bg-navy-900 p-3 shadow-[0_30px_80px_-20px_rgba(10,18,36,0.6)] ring-1 ring-white/10">
        <div className="flex min-h-[34rem] flex-col overflow-hidden rounded-[2rem] bg-white">
          <div className="flex items-center justify-between bg-navy-950 px-5 pb-4 pt-5 text-white">
            <div className="flex items-center gap-2">
              {step > 0 && step < 5 && (
                <button onClick={() => { setError(""); setStep((s) => s - 1); }} aria-label="Back" className="-ml-2 grid size-8 place-items-center rounded-full hover:bg-white/10"><ChevronLeft className="size-5" /></button>
              )}
              <p className="font-display text-base">New service request</p>
            </div>
            <span className="eyebrow text-signal">{step < 5 ? `${step + 1}/5` : "Done"}</span>
          </div>
          <div className="h-1 bg-navy-800" aria-hidden="true"><div className="h-full bg-signal transition-all duration-500" style={{ width: `${Math.min(step + 1, 5) * 20}%` }} /></div>

          <div className="flex flex-1 flex-col p-5">
            {step === 0 && (
              <fieldset>
                <legend className="mb-3 text-sm font-semibold text-navy-900">Select property</legend>
                <div className="space-y-2">
                  {PROPERTIES.map((p) => (
                    <label key={p} className={`flex cursor-pointer items-center gap-3 rounded-md border p-3 text-sm transition-colors ${property === p ? "border-brand bg-brand/5" : "border-line hover:border-brand/40"}`}>
                      <input type="radio" name={`${uid}-property`} value={p} checked={property === p} onChange={() => { setProperty(p); setError(""); }} className="sr-only" />
                      <Building2 className="size-4 text-brand" aria-hidden="true" />
                      <span className="flex-1 font-medium text-navy-900">{p}</span>
                      {property === p && <Check className="size-4 text-brand" aria-hidden="true" />}
                    </label>
                  ))}
                </div>
              </fieldset>
            )}

            {step === 1 && (
              <div>
                <p className="mb-3 text-sm font-semibold text-navy-900">Take / upload photo <span className="font-normal text-slate-ink">(optional)</span></p>
                <div className="grid aspect-[8/5] place-items-center overflow-hidden rounded-md border border-dashed border-line bg-mist">
                  {photo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={photo} alt="Selected issue" className="size-full object-cover" />
                  ) : <Camera className="size-8 text-slate-ink/50" aria-hidden="true" />}
                </div>
                <div className="mt-3 grid gap-2">
                  <label className="flex cursor-pointer items-center justify-center gap-2 rounded-md border border-navy-900/20 py-2.5 text-sm font-semibold text-navy-900 focus-within:outline focus-within:outline-2 focus-within:outline-signal hover:border-brand hover:text-brand">
                    <ImagePlus className="size-4" aria-hidden="true" /> Choose or take a photo
                    <input type="file" accept="image/*" capture="environment" onChange={onFile} className="sr-only" />
                  </label>
                  <button onClick={() => { setPhoto(SAMPLE_PHOTO); setError(""); }} className="rounded-md bg-mist py-2.5 text-sm font-semibold text-slate-ink hover:bg-line">Use a sample photo</button>
                </div>
                <p className="mt-3 text-xs text-slate-ink">Photos stay in your browser for this demo. Nothing is uploaded.</p>
              </div>
            )}

            {step === 2 && (
              <div>
                <label htmlFor={`${uid}-issue`} className="mb-3 block text-sm font-semibold text-navy-900">Describe the issue</label>
                <textarea id={`${uid}-issue`} value={desc} onChange={(e) => { setDesc(e.target.value); setError(""); }} rows={6} placeholder="e.g. Camera at the north entrance shows no image since this morning."
                  className="w-full resize-none rounded-md border border-line p-3 text-sm text-navy-900 placeholder:text-slate-ink/50 focus:border-brand focus:outline-none" aria-describedby={`${uid}-hint`} />
                <p id={`${uid}-hint`} className="mt-2 text-xs text-slate-ink">{desc.trim().length}/10 characters minimum</p>
              </div>
            )}

            {step === 3 && (
              <fieldset>
                <legend className="mb-3 text-sm font-semibold text-navy-900">Choose priority</legend>
                <div className="grid grid-cols-2 gap-2">
                  {(["Low", "Normal", "High", "Urgent"] as Priority[]).map((p) => (
                    <label key={p} className={`cursor-pointer rounded-md border p-3 text-center text-sm font-semibold transition-colors ${priority === p ? "border-brand bg-brand/5 text-brand" : "border-line text-navy-900 hover:border-brand/40"}`}>
                      <input type="radio" name={`${uid}-priority`} value={p} checked={priority === p} onChange={() => setPriority(p)} className="sr-only" />
                      {p}
                    </label>
                  ))}
                </div>
                <p className="mt-3 text-xs text-slate-ink">Concept only: response commitments for each priority would be defined by MoeTech.</p>
              </fieldset>
            )}

            {step === 4 && (
              <div>
                <p className="mb-3 text-sm font-semibold text-navy-900">Review &amp; submit</p>
                <dl className="space-y-3 rounded-md bg-mist p-4 text-sm">
                  <div><dt className="eyebrow text-slate-ink">Property</dt><dd className="font-medium text-navy-900">{property}</dd></div>
                  <div><dt className="eyebrow text-slate-ink">Issue</dt><dd className="text-navy-900">{desc}</dd></div>
                  <div><dt className="eyebrow text-slate-ink">Priority</dt><dd className="font-medium text-navy-900">{priority}</dd></div>
                  <div><dt className="eyebrow text-slate-ink">Photo</dt><dd className="text-navy-900">{photo ? "Attached" : "None"}</dd></div>
                </dl>
              </div>
            )}

            {step === 5 && (
              <div className="flex flex-1 flex-col items-center justify-center text-center">
                <span className="grid size-14 place-items-center rounded-full bg-emerald-100 text-emerald-700"><Check className="size-7" aria-hidden="true" /></span>
                <p className="mt-4 font-display text-lg text-navy-900">Demo ticket {createdId} created</p>
                <p className="mt-2 text-sm text-slate-ink" role="status">Concept demo. No request was sent to MoeTech. Watch it move through the sample dashboard and timeline.</p>
                <button onClick={reset} className="mt-5 inline-flex items-center gap-2 rounded-md border border-navy-900/20 px-4 py-2 text-sm font-semibold text-navy-900 hover:border-brand hover:text-brand"><RotateCcw className="size-4" aria-hidden="true" /> Start over</button>
              </div>
            )}

            <div className="mt-auto pt-5">
              {error && <p role="alert" className="mb-3 text-sm font-medium text-rose-600">{error}</p>}
              {step < 4 && <button onClick={next} className="w-full rounded-md bg-navy-900 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand">{step === 1 && !photo ? "Skip photo" : "Continue"}</button>}
              {step === 4 && <button onClick={submit} className="w-full rounded-md bg-brand py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-deep">Submit request (demo)</button>}
            </div>
          </div>
        </div>
      </div>
      <p className="eyebrow mt-4 text-center text-slate-ink">Interactive concept · not a live system</p>
    </div>
  );
}
