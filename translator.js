class ZamgrhTranslator {
  constructor() {
    this.lexicon = {
      i: "mah zambah",
      me: "mah zambah",
      we: "mah zambah brazzahz",
      you: "gaa",
      eat: "barg",
      brain: "bra!nz",
      brains: "bra!nz",
      human: "harman",
      humans: "harmanz",
      zombie: "zambah",
      help: "hab",
      want: "habganna",
      are: "am",
      is: "am",
      here: "haarh",
      attack: "hammarh",
      love: "amarh",
      not: "nah",
      and: "an",
      to: "ahn"
    };
  }

  translate(text) {
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
}
