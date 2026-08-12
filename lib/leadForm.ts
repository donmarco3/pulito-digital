/**
 * Enquiry form logic, shared by all three variants.
 *
 * Only the presentation differs between variants. Validation rules, field
 * names and the demo-only submit behaviour are identical, so a change here
 * lands in all three at once.
 */

import { useState, type FormEvent } from "react";

/**
 * Four fields, matching the "Four fields" promise in the page copy. Anything
 * longer belongs on the call, not in the form.
 */
export type Fields = {
  name: string;
  email: string;
  website: string;
  interest: string;
};

export type Errors = Partial<Record<keyof Fields, string>>;

export const INTERESTS = [
  "A new website",
  "A redesign of our current site",
  "SEO",
  "AI automation",
  "Not sure yet",
];

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const EMPTY: Fields = {
  name: "",
  email: "",
  website: "",
  interest: "",
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

export function validate(values: Fields): Errors {
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

/** Focus order, used to send the person to the first field that needs them. */
const ORDER: (keyof Fields)[] = ["name", "email", "website", "interest"];

export function useLeadForm(idPrefix: string) {
  const [values, setValues] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "pending" | "done">("idle");

  function update<K extends keyof Fields>(key: K, value: string) {
    setValues((prev) => ({ ...prev, [key]: value }));
    // Clear a field's error as soon as the person starts fixing it.
    setErrors((prev) => (prev[key] ? { ...prev, [key]: undefined } : prev));
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Honeypot: a real person never fills a field they cannot see.
    const honeypot = event.currentTarget.elements.namedItem(
      "company",
    ) as HTMLInputElement | null;
    if (honeypot?.value) return;

    const found = validate(values);
    setErrors(found);

    const firstInvalid = ORDER.find((key) => found[key]);
    if (firstInvalid) {
      // Focus after the errors have painted. Querying for [aria-invalid] here
      // would run against the previous render, where nothing is marked yet.
      requestAnimationFrame(() => {
        document.getElementById(`${idPrefix}-${firstInvalid}`)?.focus();
      });
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
    //   if (!res.ok) { setStatus("idle"); return; }
    //
    // Note: once real submissions are stored or emailed, this page is
    // collecting personal information and needs a privacy notice.
    await new Promise((resolve) => setTimeout(resolve, 700));

    setStatus("done");
  }

  return { values, errors, status, update, onSubmit };
}
