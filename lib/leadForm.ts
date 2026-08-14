/**
 * Enquiry form logic, shared by every instance of the form on the site.
 *
 * Only the presentation differs between instances. Validation rules, field
 * names and the submit behaviour are identical, so a change here lands
 * everywhere at once.
 *
 * THE SUBMIT IS LIVE when `NEXT_PUBLIC_WEB3FORMS_KEY` is set: the fields go
 * to Web3Forms, which delivers them to the studio's inbox. The key is the
 * owner's, lives in `.env.local` (see `.env.example`), and is safe to be
 * public by Web3Forms' design — it identifies the destination inbox, not a
 * secret. WITHOUT the key the form falls back to validate-and-acknowledge
 * locally, exactly the old demo behaviour, so review builds keep working;
 * PRODUCT.md records which state the build is in.
 */

import { useState, type FormEvent } from "react";

const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
const ENDPOINT = "https://api.web3forms.com/submit";

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
  const [status, setStatus] = useState<
    "idle" | "pending" | "done" | "failed"
  >("idle");

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

    // No key yet: validate-and-acknowledge locally so review builds keep
    // working end to end. The owner's key makes this branch dead.
    if (!WEB3FORMS_KEY) {
      if (process.env.NODE_ENV === "development") {
        console.warn(
          "EnquiryForm: NEXT_PUBLIC_WEB3FORMS_KEY is not set — submission acknowledged locally, nothing was sent.",
        );
      }
      await new Promise((resolve) => setTimeout(resolve, 700));
      setStatus("done");
      return;
    }

    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `Enquiry from ${values.name.trim()} — pulitodigital.com.au`,
          from_name: "Pulito Digital website",
          name: values.name.trim(),
          email: values.email.trim(),
          website: values.website.trim() || "(none given)",
          interest: values.interest,
        }),
      });
      const data = (await res.json()) as { success?: boolean };
      if (!res.ok || !data.success) throw new Error("delivery failed");
      setStatus("done");
    } catch {
      // The visible message and the mailto recovery are the form's job;
      // see `failBody` in the skinned markup.
      setStatus("failed");
    }
  }

  return { values, errors, status, update, onSubmit };
}
