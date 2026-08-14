/**
 * Addressing one element on the page, and putting it back.
 *
 * The element editor has to survive a reload, a route change and React
 * re-rendering the page underneath it, so an edit cannot hold a reference to a
 * DOM node — the node it points at will not be the same object a moment later.
 * It holds a PATH instead: the chain of tag-plus-index steps from `<body>` down
 * to the element, scoped to the page it was made on.
 *
 * That works here because every page on this site is statically rendered from
 * fixed content — the same markup comes back every time, so the same path
 * resolves to the same element. It would not survive a list whose length
 * depends on data, and the resolver returns `null` rather than guessing when a
 * step no longer matches.
 */

/** Tags the editor refuses to select — its own furniture, and the page shell. */
const OPAQUE = new Set(["HTML", "BODY", "SCRIPT", "STYLE", "LINK", "META"]);

export function isSelectable(el: Element | null): el is HTMLElement {
  if (!el || OPAQUE.has(el.tagName)) return false;
  /* Never let the bar edit itself. */
  return !el.closest("[data-tweak]");
}

export function pathOf(el: Element): string {
  const parts: string[] = [];
  let node: Element | null = el;

  while (node && node !== document.body) {
    const parent: Element | null = node.parentElement;
    if (!parent) break;
    /*
      Indexed among SIBLINGS OF THE SAME TAG, not among all children. Whitespace
      and comments are already excluded from `children`, but a conditional
      wrapper appearing or disappearing would shift every later index; counting
      within a tag keeps a path stable against the far more common case of a
      sibling of a different kind being added beside it.
    */
    const kin = Array.from(parent.children).filter((c) => c.tagName === node!.tagName);
    parts.unshift(`${node.tagName.toLowerCase()}[${kin.indexOf(node)}]`);
    node = parent;
  }

  return `${window.location.pathname}|${parts.join(">")}`;
}

export function elementAt(path: string): HTMLElement | null {
  const [page, chain] = path.split("|");
  /* An edit made on /about must not be applied to whatever happens to sit at
     the same coordinates on /process. */
  if (page !== window.location.pathname || !chain) return null;

  let node: Element = document.body;
  for (const step of chain.split(">")) {
    const m = /^([a-z0-9-]+)\[(\d+)\]$/.exec(step);
    if (!m) return null;
    const kin = Array.from(node.children).filter(
      (c) => c.tagName === m[1].toUpperCase(),
    );
    const next = kin[Number(m[2])];
    if (!next) return null;
    node = next;
  }
  return node as HTMLElement;
}

/** Which page a path belongs to — used to filter the export and the hidden list. */
export function pageOf(path: string) {
  return path.split("|")[0];
}

/**
 * A name a human can find in the source: the tag, up to three of its classes,
 * and the first few words it contains. The path itself is precise and
 * unreadable; this is what goes in the export.
 */
export function describe(el: HTMLElement) {
  const classes = Array.from(el.classList)
    .filter((c) => !c.startsWith("tweak"))
    .slice(0, 3);
  const tag = el.tagName.toLowerCase() + (classes.length ? `.${classes.join(".")}` : "");
  const text = (el.textContent ?? "").replace(/\s+/g, " ").trim().slice(0, 46);
  return text ? `${tag} — “${text}${text.length === 46 ? "…" : ""}”` : tag;
}

/** The short label shown on the selection chip. */
export function shortLabel(el: HTMLElement) {
  const role = Array.from(el.classList).find((c) => /^t-(h[123]|lead|body|label|control)$/.test(c));
  return role ? `${el.tagName.toLowerCase()} · ${role}` : el.tagName.toLowerCase();
}
