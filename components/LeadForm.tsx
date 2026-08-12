"use client";

import { useState, type FormEvent } from "react";
import { CheckIcon } from "@phosphor-icons/react/dist/ssr";
import { motion, useReducedMotion } from "motion/react";
import { site } from "@/content/site";

type Fields = {
  name: string;
  email: string;
  website: string;
  interest: string;
  message: string;
};

type Errors = Partial<Record<keyof Fields, string>>;

const INTERESTS = [
  "A new website",
  "A redesign of our current site",
  "SEO",
  "AI automation",
  "Not sure yet",
];

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const empty: Fields = {
  name: "",
  email: "",
  website: "",
  interest: "",
  message: "",
};

/** Accepts "acme.com.au" as readily as "https://acme.com.au". */
function looksLikeUrl(value: string) {
  const candidate = /^https?:\/\//i.test(value) ? value : `https://${value}`;
  try {
    const url = new URL(candidate);
    return url.hostname.includes(".") && !url.hostname.endsWith(".");
  } catch {
    return false;
  }
}

function validate(values: Fields): Errors {
  const errors: Errors = {};

  if (!values.name.trim()) {
    errors.name = "Please tell us your name.";
  }

  if (!values.email.trim()) {
    errors.email = "We need an email address to reply to.";
  } else if (!EMAIL.test(values.email.trim())) {
    errors.email = "That email address doesn't look right.";
  }

  if (values.website.trim() && !looksLikeUrl(values.website.trim())) {
    errors.website = "Enter a web address, for example acme.com.au.";
  }

  if (!values.interest) {
    errors.interest = "Pick the closest option.";
  }

  return errors;
}

const fieldClass =
  "w-full border border-ink-line-strong bg-ink px-4 py-3.5 text-[15px] text-bone placeholder:text-bone-faint transition-colors hover:border-bone-faint focus:border-rust focus:outline-none";

export function LeadForm() {
  const reduce = useReducedMotion();
  const [values, setValues] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "pending" | "done">("idle");

  function update<K extends keyof Fields>(key: K, value: string) {
    setValues((prev) => ({ ...prev, [key]: value }));
    // Clear a field's error as soon as the person starts fixing it.
    setErrors((prev) => (prev[key] ? { ...prev, [key]: undefined } : prev));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Honeypot: a real person never fills a field they cannot see.
    if ((event.currentTarget.elements.namedItem("company") as HTMLInputElement)?.value) {
      return;
    }

    const found = validate(values);
    setErrors(found);

    if (Object.keys(found).length > 0) {
      const firstInvalid = document.querySelector<HTMLElement>("[aria-invalid='true']");
      firstInvalid?.focus();
      return;
    }

    setStatus("pending");

    // DEMO BUILD: nothing is sent anywhere. The submission is validated and
    // acknowledged locally so the page can be shown end to end.
    //
    // TODO: POST to a real endpoint here, e.g.
    //   const res = await fetch("/api/enquiry", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(values),
    //   });
    //   if (!res.ok) { setStatus("idle"); setErrors({ ... }); return; }
    //
    // Note: once real submissions are stored or emailed, this page is
    // collecting personal information and needs a privacy notice.
    await new Promise((resolve) => setTimeout(resolve, 700));

    setStatus("done");
  }

  if (status === "done") {
    return (
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="border border-ink-line-strong bg-ink-raised p-8 md:p-10"
        role="status"
      >
        <CheckIcon
          weight="bold"
          className="size-7 text-rust"
          aria-hidden
        />
        <h3 className="mt-5 font-display text-2xl font-semibold tracking-tight text-bone">
          {site.form.successHeadline}
        </h3>
        <p className="mt-3 max-w-[44ch] leading-relaxed text-bone-muted">
          {site.form.successBody}
        </p>
        <a
          href={`mailto:${site.contactEmail}`}
          className="mt-6 inline-block border-b border-ink-line-strong pb-1 text-[15px] text-bone transition-colors hover:border-rust"
        >
          {site.contactEmail}
        </a>
      </motion.div>
    );
  }

  return (
    <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Field
          id="name"
          label="Your name"
          error={errors.name}
          value={values.name}
          onChange={(v) => update("name", v)}
          autoComplete="name"
        />
        <Field
          id="email"
          label="Email"
          type="email"
          error={errors.email}
          value={values.email}
          onChange={(v) => update("email", v)}
          autoComplete="email"
        />
      </div>

      <Field
        id="website"
        label="Business website"
        hint="Optional. Leave it blank if you don't have one yet."
        error={errors.website}
        value={values.website}
        onChange={(v) => update("website", v)}
        placeholder="acme.com.au"
        autoComplete="url"
      />

      <div className="flex flex-col gap-2">
        <label htmlFor="interest" className="text-[14px] text-bone">
          What do you need?
        </label>
        <select
          id="interest"
          name="interest"
          value={values.interest}
          onChange={(e) => update("interest", e.target.value)}
          aria-invalid={Boolean(errors.interest)}
          aria-describedby={errors.interest ? "interest-error" : undefined}
          className={`${fieldClass} ${errors.interest ? "border-rust" : ""} ${
            values.interest ? "text-bone" : "text-bone-faint"
          }`}
        >
          <option value="">Choose one</option>
          {INTERESTS.map((option) => (
            <option key={option} value={option} className="bg-ink text-bone">
              {option}
            </option>
          ))}
        </select>
        {errors.interest && (
          <p id="interest-error" className="text-[13px] text-rust">
            {errors.interest}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="text-[14px] text-bone">
          Anything else
        </label>
        <p id="message-hint" className="text-[13px] text-bone-faint">
          Optional. The kind of work you do, or what is going wrong with the
          current site.
        </p>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={values.message}
          onChange={(e) => update("message", e.target.value)}
          aria-describedby="message-hint"
          className={`${fieldClass} resize-y`}
        />
      </div>

      {/* Honeypot. Hidden from sight and from assistive tech, off the tab order. */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <button
        type="submit"
        disabled={status === "pending"}
        className="mt-2 self-start bg-rust px-7 py-4 text-[15px] font-medium whitespace-nowrap text-ink transition-all hover:bg-rust-bright active:translate-y-px disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === "pending" ? "Sending…" : site.cta}
      </button>
    </form>
  );
}

function Field({
  id,
  label,
  hint,
  error,
  value,
  onChange,
  type = "text",
  placeholder,
  autoComplete,
}: {
  id: keyof Fields;
  label: string;
  hint?: string;
  error?: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
}) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-[14px] text-bone">
        {label}
      </label>
      {hint && (
        <p id={hintId} className="text-[13px] text-bone-faint">
          {hint}
        </p>
      )}
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        placeholder={placeholder}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy}
        className={`${fieldClass} ${error ? "border-rust" : ""}`}
      />
      {error && (
        <p id={errorId} className="text-[13px] text-rust">
          {error}
        </p>
      )}
    </div>
  );
}
