/**
 * A single running band of words.
 *
 * Server component: the loop is pure CSS, so it costs no JavaScript and does
 * not need a client boundary. The second run of items is aria-hidden so screen
 * readers hear the list once.
 */
export function Marquee({
  items,
  className = "",
  itemClassName = "",
  separatorClassName = "",
}: {
  items: readonly string[];
  className?: string;
  itemClassName?: string;
  separatorClassName?: string;
}) {
  const run = (hidden: boolean) => (
    <ul
      aria-hidden={hidden || undefined}
      className="flex shrink-0 items-center"
    >
      {items.map((item) => (
        <li key={item} className="flex items-center">
          <span className={`px-8 whitespace-nowrap md:px-12 ${itemClassName}`}>
            {item}
          </span>
          <span aria-hidden className={separatorClassName}>
            &bull;
          </span>
        </li>
      ))}
    </ul>
  );

  return (
    <div className={`overflow-hidden ${className}`}>
      <div className="marquee-track flex w-max">
        {run(false)}
        {run(true)}
      </div>
    </div>
  );
}
