type AirSymbolKind = 'breath' | 'leaf' | 'care';

/** Quiet line drawings echoing air currents, a living leaf, and a sheltered breath. */
export default function AirSymbol({ kind }: { kind: AirSymbolKind }) {
  return <svg className="pac-air-symbol" viewBox="0 0 80 80" fill="none" aria-hidden="true" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round">
    {kind === 'breath' && <><path d="M8 32c14-14 25 14 40 0s25-5 24 0M8 43c14-14 25 14 40 0s25-5 24 0M8 54c14-14 25 14 40 0s25-5 24 0"/><path d="M40 10v7M25 15l3 5M55 15l-3 5"/></>}
    {kind === 'leaf' && <><path d="M20 62C3 25 36 10 67 12c2 31-13 63-47 50Z"/><path d="M14 70 56 23M27 55l-1-21M37 43l18-2M44 35l-1-14"/><path d="M62 62c5-3 9-3 13-1"/></>}
    {kind === 'care' && <><path d="M7 49c8-2 11 1 15 9l14 7c7 2 20-4 32-17 4-5 7-2 5 3-8 18-23 26-36 22L17 65 7 67"/><path d="M30 54c-4-8 1-14 7-20 6 6 13 13 8 20-4 6-11 6-15 0Z"/><path d="M17 22c9-9 17 9 28 0s18-5 19 0M22 12c6-6 13 6 20 0"/></>}
  </svg>;
}
