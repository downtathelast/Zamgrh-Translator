class ZombieAudio {
  constructor() {
    this.ctx = null;
    this.enabled = false;

    // fake phoneme map
    this.phonemes = {
      a: 140,
      e: 220,
      i: 260,
      o: 120,
      u: 100,

      r: 80,
      g: 70,
      h: 60,
      z: 50,
      m: 90,
      b: 75,
      n: 95
    };
  }

  // browser audio unlock
  init() {
    if (this.ctx) return;

    this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    this.enabled = true;
  }

  // play a single zombie phoneme
  playPhoneme(char, startTime) {
    const freq = this.phonemes[char.toLowerCase()] || 110;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = "sawtooth";

    // crunchy wobble
    osc.frequency.setValueAtTime(freq, startTime);
    osc.frequency.exponentialRampToValueAtTime(
      Math.max(40, freq * 0.7),
      startTime + 0.08
    );

    // muffled zombie throat
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(500, startTime);

    gain.gain.setValueAtTime(0.0001, startTime);
    gain.gain.linearRampToValueAtTime(0.12, startTime + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.1);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(startTime);
    osc.stop(startTime + 0.1);
  }

  // speak zombie text
  speak(text) {
    if (!this.ctx) this.init();
    if (!this.enabled) return;

    const clean = text
      .toLowerCase()
      .replace(/[^a-z\s]/g, "");

    let time = this.ctx.currentTime;

    for (const char of clean) {
      if (char === " ") {
        time += 0.05;
        continue;
      }

      this.playPhoneme(char, time);

      // random stagger for undead effect
      time += 0.06 + Math.random() * 0.03;
    }
  }

  // classic random groan
  groan() {
    const sounds = [
      "grrrrhh",
      "braaaains",
      "unnghh",
      "rahhh",
      "ggrraahh"
    ];

    const random = sounds[
      Math.floor(Math.random() * sounds.length)
    ];

    this.speak(random);
  }

  // optional ambience
  ambient() {
    if (!this.ctx) this.init();
    if (!this.enabled) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(38, this.ctx.currentTime);

    gain.gain.setValueAtTime(0.02, this.ctx.currentTime);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();

    return osc;
  }
}
