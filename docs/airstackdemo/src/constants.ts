export const apiKey = process.env.API_KEY || '';

// Used for options in Blockchain filter
// Used in queries for generating sub-queries throughout the app
export const tokenBlockchains = [
  'ethereum',
  'base',
  'polygon',
  'zora'
] as const;

// Used in queries for generating sub-queries for snapshots
export const snapshotBlockchains = ['ethereum', 'base', 'zora'] as const;

// Used for options in Blockchain filter in @mentions for Advanced Search
export const mentionBlockchains = [
  'ethereum',
  'base',
  'polygon',
  'zora',
  'gnosis'
] as const;
