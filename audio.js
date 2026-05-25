class ZombieAudio {
  constructor() {
    this.ctx = null;
    this.enabled = false;
  }

  // browser audio unlock
  init() {
    if (this.ctx) return;

    this.ctx = new (
      window.AudioContext ||
      window.webkitAudioContext
    )();

    this.enabled = true;
  }

  // zombie speech/growl system
  speak(text) {
    if (!this.ctx) this.init();
    if (!this.enabled) return;

    const clean = text.toLowerCase();

    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = "sawtooth";

    // base zombie tone
    let baseFreq = 85;

    // text influences growl
    for (const char of clean) {
      switch (char) {
        case "a":
          baseFreq += 3;
          break;

        case "z":
          baseFreq -= 2;
          break;

        case "r":
          baseFreq -= 4;
          break;

        case "g":
          baseFreq -= 3;
          break;

        case "u":
          baseFreq -= 5;
          break;
      }
    }

    // clamp range
    baseFreq = Math.max(
      45,
      Math.min(baseFreq, 140)
    );

    osc.frequency.setValueAtTime(
      baseFreq,
      now
    );

    // descending undead pitch
    osc.frequency.exponentialRampToValueAtTime(
      baseFreq * 0.55,
      now + 1.2
    );

    // muffled speaker sound
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(
      450,
      now
    );

    gain.gain.setValueAtTime(
      0.001,
      now
    );

    gain.gain.linearRampToValueAtTime(
      0.25,
      now + 0.05
    );

    gain.gain.exponentialRampToValueAtTime(
      0.001,
      now + 1.2
    );

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 1.2);
  }

  // random classic zombie sounds
  groan() {
    const sounds = [
      "grrrh",
      "unnggh",
      "raaaah",
      "braaains",
      "ggrrraah"
    ];

    const random =
      sounds[
        Math.floor(Math.random() * sounds.length)
      ];

    this.speak(random);
  }

  // optional ambient hum
  ambient() {
    if (!this.ctx) this.init();
    if (!this.enabled) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "triangle";

    osc.frequency.setValueAtTime(
      38,
      this.ctx.currentTime
    );

    gain.gain.setValueAtTime(
      0.02,
      this.ctx.currentTime
    );

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();

    return osc;
  }
}
