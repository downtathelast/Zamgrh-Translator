class ZamgrhTranslator {
  constructor() {
    this.lexicon = {};
    this.mode = "zombie"; // "zombie" | "survivor"
  }

  async loadLexicon(path = "lexicon.json") {
    const res = await fetch(path);
    this.lexicon = await res.json();
  }

  setMode(mode) {
    this.mode = mode;
  }

  translate(text) {
    return this.mode === "zombie"
      ? this.toZamgrh(text)
      : this.toSurvivor(text);
  }

  // 🧟 English → Zamgrh
  toZamgrh(text) {
    return text
      .toLowerCase()
      .split(/(\s+|[.,!?])/g)
      .filter(Boolean)
      .map(w => this.processWord(w))
      .join("")
      .replace(/\s+/g, " ")
      .trim();
  }

  processWord(word) {
    if (/^[.,!?]+$/.test(word)) return word;

    let z = this.lexicon[word] || this.zombify(word);
    z = this.applyRules(z);
    return z + " ";
  }

  zombify(word) {
    return word
      .replace(/th/g, "z")
      .replace(/ing/g, "g")
      .replace(/ck/g, "g")
      .replace(/oo/g, "u")
      .replace(/ee/g, "a")
      .replace(/a/g, "ah")
      .replace(/o/g, "ah");
  }

  applyRules(word) {
    let w = word;

    if (/^[aeiou]$/i.test(w)) w = "hr" + w;
    if (w.endsWith("r")) w += "h";
    w = w.replace(/!/g, "!!");

    return w;
  }

  // 🧍 Zombie → Survivor (reverse approximation)
  toSurvivor(text) {
    let out = text;

    for (const [k, v] of Object.entries(this.lexicon)) {
      const regex = new RegExp(v, "gi");
      out = out.replace(regex, k);
    }

    return out
      .replace(/barg/g, "eat")
      .replace(/bra!nz/g, "brains")
      .replace(/harman/g, "human")
      .replace(/harmanz/g, "humans")
      .replace(/zambah/g, "zombie");
  }
}
