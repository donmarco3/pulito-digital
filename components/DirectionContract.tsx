/**
 * Emits the direction contract as a real HTML comment in the built markup, so
 * the committed direction survives the production build and can be grepped
 * out of the served page rather than living only in source.
 */
export function DirectionContract({ contract }: { contract: string }) {
  return (
    <div
      hidden
      dangerouslySetInnerHTML={{ __html: `<!--\n${contract.trim()}\n-->` }}
    />
  );
}
