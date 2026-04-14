/**
 * Zamgrh Phoneme Filter Layer
 * Enforces canonical Zamgrh phoneme constraints
 */

const VALID_CHARS = new Set([
  "z", "a", "m", "g", "r", "h", "n", "b",
  "!", "-", ".", ",", "?", " "
]);

const REPLACEMENTS = {
  e: "a",
  i: "a",
  o: "a",
  u: "a",
  y: "a",

  s: "z",
  t: "g",
  p: "b",
  d: "g",
  c: "k",
  k: "g",
  f: "h",
  v: "b",

  l: "r",
  w: "u",
  q: "g",
  x: "gz"
};

/**
 * Normalize raw input into Zamgrh-safe phoneme space
 */
export function filterPhonemes(input = "") {
  return input
    .toLowerCase()
    .split("")
    .map(ch => {
      if (VALID_CHARS.has(ch)) return ch;
      return REPLACEMENTS[ch] ?? "";
    })
    .join("")
    .replace(/\s+/g, " ")
    .replace(/ +/g, " ")
    .trim();
}

/**
 * Ensures Zamgrh constraints like:
 * - no isolated vowels
 * - enforced consonant framing
 */
export function enforceConstraints(text = "") {
  return text
    .replace(/\b(a|i|e|o|u)\b/g, "hr$1")
    .replace(/\s+/g, " ")
    .trim();
}
