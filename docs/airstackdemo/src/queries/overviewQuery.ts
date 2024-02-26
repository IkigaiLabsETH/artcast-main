export function getOverviewQuery({
  hasPolygon,
  hasEvents,
  hasEthereum,
  hasBase,
  hasZora
}: {
  hasPolygon: boolean;
  hasEvents: boolean;
  hasEthereum: boolean;
  hasBase: boolean;
  hasZora: boolean;
}) {
  const variables = [];
  const filters = [];
  if (hasPolygon) {
    variables.push('$polygonTokens: [Address!]');
    filters.push(`polygonTokens: {_intersection: $polygonTokens}`);
  }
  if (hasEvents) {
    variables.push('$eventIds: [Address!]');
    filters.push(`eventId: {_intersection: $eventIds}`);
  }
  if (hasEthereum) {
    variables.push('$ethereumTokens: [Address!]');
    filters.push(`ethereumTokens: {_intersection: $ethereumTokens}`);
  }
  if (hasBase) {
    variables.push('$baseTokens: [Address!]');
    filters.push(`baseTokens: {_intersection: $baseTokens}`);
  }
  if (hasZora) {
    variables.push('$zoraTokens: [Address!]');
    filters.push(`zoraTokens: {_intersection: $zoraTokens}`);
  }
  const variablesString = variables.join(',');
  const filtersString = filters.join(',');

  return `query TokenHolders(${variablesString}) {
    TokenHolders(input: {filter: {${filtersString}}}) {
      farcasterProfileCount
      primaryEnsUsersCount
      totalHolders
      xmtpUsersCount
      lensProfileCount
      ensUsersCount
    }
  }`;
}
