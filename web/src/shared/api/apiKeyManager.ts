// each key has a limit
type KeyInfo = {
  key: string;
  remaining: number | null;
};

// API keys
export const API_KEYS: KeyInfo[] = [
  { key: process.env.NEWS_API_KEY_1!, remaining: null },
  { key: process.env.NEWS_API_KEY_2!, remaining: null },
  { key: process.env.NEWS_API_KEY_3!, remaining: null },
  { key: process.env.NEWS_API_KEY_4!, remaining: null },
  { key: process.env.NEWS_API_KEY_5!, remaining: null },
  { key: process.env.NEWS_API_KEY_6!, remaining: null },
  { key: process.env.NEWS_API_KEY_7!, remaining: null },
];

let current = 0;

export function getCurrentKey() {
  return API_KEYS[current];
}

export function rotateKey() {
  current = (current + 1) % API_KEYS.length;
}

export function pickBestKey(): KeyInfo {
  const positives = API_KEYS.filter(
    (k) => typeof k.remaining === 'number' && k.remaining > 0
  ).sort((a, b) => b.remaining! - a.remaining!);
  const nulls = API_KEYS.filter((k) => k.remaining === null);
  const zerosOrNegatives = API_KEYS.filter(
    (k) => typeof k.remaining === 'number' && k.remaining <= 0
  );

  const combined = [...positives, ...nulls, ...zerosOrNegatives];
  console.log(combined);

  if (combined.length > 0) {
    const best = combined[0];
    current = API_KEYS.indexOf(best);
    return best;
  }

  return getCurrentKey();
}
