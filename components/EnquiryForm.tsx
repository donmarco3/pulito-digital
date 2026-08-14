"use client";

import { useEffect, useRef } from "react";
import { INTERESTS, useLeadForm } from "@/lib/leadForm";
import { site } from "@/content/site";

/**
 * One form, two skins.
 *
 * Markup, validation, accessibility wiring and the demo-only submit are shared
 * so the two variants can never drift apart on behaviour. Everything a variant
 * is allowed to change is a class string below.
 */
export type FormSkin = {
  /** Prefix for element ids, so three forms can coexist on the compare page. */
  id: string;
  label: string;
  hint: string;
  input: string;
  option: string;
  placeholder: string;
  error: string;
  button: string;
  buttonWrap?: string;
  success: {
    wrap: string;
    title: string;
    body: string;
    link: string;
  };
};

export function EnquiryForm({ skin }: { skin: FormSkin }) {
  const { values, errors, status, update, onSubmit } = useLeadForm(skin.id);
  const id = (name: string) => `${skin.id}-${name}`;
  const done = useRef<HTMLDivElement>(null);

  /*
    Submitting unmounts the form, and with it the button that had focus, which
    drops a keyboard or switch user back to the top of the document with no
    position. `role="status"` announces the text but does not move anyone to
    it. Focusing the panel puts them where the outcome is.
  */
  useEffect(() => {
    if (status === "done") done.current?.focus();
  }, [status]);

  if (status === "done") {
    return (
      <div ref={done} role="status" tabIndex={-1} className={skin.success.wrap}>
        <h3 className={skin.success.title}>{site.form.successHeadline}</h3>
        <p className={skin.success.body}>{site.form.successBody}</p>
        <a href={`mailto:${site.contactEmail}`} className={skin.success.link}>
          {site.contactEmail}
        </a>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={onSubmit} className="@container flex flex-col gap-7">
      {/*
        Name and email pair up on the CONTAINER, not on the viewport.

        This was `sm:grid-cols-2`, which asked the wrong question: `sm` is a
        media query, so the pairing was keyed to how wide the SCREEN is while
        the thing that decides whether two fields fit is how wide this form's
        COLUMN is. The two only agreed by luck. MERIDIAN's enquiry form now
        sits in the narrow column of its section, where the old rule matched on
        every desktop and crammed two fields into a third of the shell.

        The threshold is `@xl`, 36rem, and it is measured rather than picked:
        PLINTH's form column is 696px and LATTICE's is 595px, so both keep the
        pair they render today, while MERIDIAN's is 444px and folds to one
        column. 42rem was tried first and quietly cost LATTICE its pairing —
        a container query still regresses whatever sits below its breakpoint.

        One column is the better form in the narrow case anyway: every field
        shares a left edge to scan down, and there is nothing to skip past.
      */}
      <div className="grid grid-cols-1 gap-7 @xl:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor={id("name")} className={skin.label}>
            Your name
          </label>
          <input
            id={id("name")}
            name="name"
            autoComplete="name"
            value={values.name}
            onChange={(e) => update("name", e.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? id("name-error") : undefined}
            className={skin.input}
          />
          {errors.name && (
            <p id={id("name-error")} className={skin.error}>
              {errors.name}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor={id("email")} className={skin.label}>
            Email
          </label>
          <input
            id={id("email")}
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={(e) => update("email", e.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? id("email-error") : undefined}
            className={skin.input}
          />
          {errors.email && (
            <p id={id("email-error")} className={skin.error}>
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor={id("website")} className={skin.label}>
          Business website
        </label>
        <p id={id("website-hint")} className={skin.hint}>
          Optional. Leave it blank if you don&apos;t have one yet.
        </p>
        <input
          id={id("website")}
          name="website"
          autoComplete="url"
          placeholder="acme.com.au"
          value={values.website}
          onChange={(e) => update("website", e.target.value)}
          aria-invalid={Boolean(errors.website)}
          aria-describedby={
            errors.website
              ? `${id("website-hint")} ${id("website-error")}`
              : id("website-hint")
          }
          className={skin.input}
        />
        {errors.website && (
          <p id={id("website-error")} className={skin.error}>
            {errors.website}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor={id("interest")} className={skin.label}>
          What do you need?
        </label>
        <select
          id={id("interest")}
          name="interest"
          value={values.interest}
          onChange={(e) => update("interest", e.target.value)}
          aria-invalid={Boolean(errors.interest)}
          aria-describedby={errors.interest ? id("interest-error") : undefined}
          className={`${skin.input} ${values.interest ? "" : skin.placeholder}`}
        >
          <option value="" className={skin.option}>
            Choose one
          </option>
          {INTERESTS.map((option) => (
            <option key={option} value={option} className={skin.option}>
              {option}
            </option>
          ))}
        </select>
        {errors.interest && (
          <p id={id("interest-error")} className={skin.error}>
            {errors.interest}
          </p>
        )}
      </div>

      {/* Honeypot. Off-screen, hidden from assistive tech, out of the tab order. */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor={id("company")}>Company</label>
        <input id={id("company")} name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <div className={skin.buttonWrap ?? ""}>
        <button type="submit" disabled={status === "pending"} className={skin.button}>
          {status === "pending" ? "Sending" : site.cta}
        </button>
      </div>
    </form>
  );
}
