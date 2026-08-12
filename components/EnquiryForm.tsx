"use client";

import { INTERESTS, useLeadForm } from "@/lib/leadForm";
import { site } from "@/content/site";

/**
 * One form, three skins.
 *
 * Markup, validation, accessibility wiring and the demo-only submit are shared
 * so the three variants can never drift apart on behaviour. Everything a
 * variant is allowed to change is a class string below.
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

  if (status === "done") {
    return (
      <div role="status" className={skin.success.wrap}>
        <h3 className={skin.success.title}>{site.form.successHeadline}</h3>
        <p className={skin.success.body}>{site.form.successBody}</p>
        <a href={`mailto:${site.contactEmail}`} className={skin.success.link}>
          {site.contactEmail}
        </a>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={onSubmit} className="flex flex-col gap-7">
      <div className="grid grid-cols-1 gap-7 sm:grid-cols-2">
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
