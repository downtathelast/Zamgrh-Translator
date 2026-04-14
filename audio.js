class ZombieAudio {
  constructor() {
    this.ctx = null;
    this.enabled = false;
  }

  // must be triggered by user interaction (browser rule)
  init() {
    if (this.ctx) return;

    this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    this.enabled = true;
  }

  groan() {
    if (!this.ctx) this.init();
    if (!this.enabled) return;

    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    // low undead rumble
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(90, now);
    osc.frequency.exponentialRampToValueAtTime(35, now + 1.2);

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 1.2);
  }

  // optional ambience loop
  ambient() {
    if (!this.ctx) this.init();
    if (!this.enabled) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(40, this.ctx.currentTime);

    gain.gain.setValueAtTime(0.03, this.ctx.currentTime);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    return osc; // so you can stop it later if needed
  }
}
