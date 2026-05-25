class ZamgrhTranslator {
  constructor() {
    this.lexicon = {};
    this.mode = "zombie"; // zombie | survivor
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

  // =========================
  // ENGLISH -> ZAMGRH
  // =========================

  toZamgrh(text) {
    return text
      .toLowerCase()
      .split(/(\s+|[.,!?])/g)
      .filter(Boolean)
      .map(token => this.processToken(token))
      .join("")
      .replace(/\s+/g, " ")
      .trim();
  }

  processToken(token) {
    // punctuation
    if (/^[.,!?]+$/.test(token)) {
      return token;
    }

    // dictionary lookup first
    let result =
      this.lexicon[token] ||
      this.zombify(token);

    // enforce zombie phonology
    result = this.applyZombiePhonemes(result);

    // style rules
    result = this.applyRules(result);

    return result + " ";
  }

  zombify(word) {
    return word
      .replace(/th/g, "z")
      .replace(/ing/g, "ng")
      .replace(/ck/g, "g")
      .replace(/oo/g, "u")
      .replace(/ee/g, "a")
      .replace(/er/g, "ur")
      .replace(/or/g, "ur")
      .replace(/tion/g, "shun");
  }

  // =========================
  // PURE ZAMGRH FILTER
  // =========================

  applyZombiePhonemes(word) {
    let w = word.toLowerCase();

    // remove illegal letters
    w = w.replace(/c/g, "g");
    w = w.replace(/q/g, "g");
    w = w.replace(/x/g, "gz");

    // y -> ah / ur depending context
    w = w.replace(/y/g, "ah");

    // soften vowels
    w = w.replace(/e/g, "a");
    w = w.replace(/i/g, "a");
    w = w.replace(/o/g, "u");

    // remove sharp consonants
    w = w.replace(/t/g, "d");
    w = w.replace(/p/g, "b");

    // zombie drag
    w = w.replace(/s/g, "z");

    // collapse impossible combos
    w = w.replace(/aa+/g, "a");
    w = w.replace(/uu+/g, "u");

    return w;
  }

  // =========================
  // STYLE LAYER
  // =========================

  applyRules(word) {
    let w = word;

    // zombie emphasis
    w = w.replace(/!/g, "!!");

    // trailing growl
    if (
      Math.random() > 0.7 &&
      !w.endsWith("h")
    ) {
      w += "h";
    }

    return w;
  }

  // =========================
  // ZAMGRH -> ENGLISH
  // =========================

  toSurvivor(text) {
    let out = text;

    // reverse lexicon
    for (const [k, v] of Object.entries(this.lexicon)) {
      const regex = new RegExp(v, "gi");
      out = out.replace(regex, k);
    }

    // reverse approximations
    return out
      .replace(/bra!nz/gi, "brains")
      .replace(/zambah/gi, "zombie")
      .replace(/harman/gi, "human")
      .replace(/harmanz/gi, "humans")
      .replace(/garh/gi, "grab")
      .replace(/mah/gi, "me");
  }
}
