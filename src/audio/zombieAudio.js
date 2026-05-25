export class ZombieAudio {
  constructor() {
    this.audioCtx = null;
  }

  init() {
    if (!this.audioCtx) {
      this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
  }

  createNoiseBuffer() {
    const bufferSize = this.audioCtx.sampleRate * 2;
    const buffer = this.audioCtx.createBuffer(1, bufferSize, this.audioCtx.sampleRate);

    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    return buffer;
  }

  makeDistortionCurve(amount = 40) {
    const samples = 44100;
    const curve = new Float32Array(samples);

    for (let i = 0; i < samples; i++) {
      const x = (i * 2) / samples - 1;
      curve[i] = ((3 + amount) * x * 20 * (Math.PI / 180)) /
        (Math.PI + amount * Math.abs(x));
    }

    return curve;
  }

  playZombieGroan() {
    this.init();

    const ctx = this.audioCtx;
    const now = ctx.currentTime;

    // -----------------------------
    // MAIN GROWL OSCILLATOR
    // -----------------------------

    const osc = ctx.createOscillator();
    osc.type = 'sawtooth';

    osc.frequency.setValueAtTime(85, now);
    osc.frequency.exponentialRampToValueAtTime(45, now + 1.2);

    // Slight pitch wobble
    const lfo = ctx.createOscillator();
    lfo.frequency.value = 6;

    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 4;

    lfo.connect(lfoGain);
    lfoGain.connect(osc.frequency);

    // -----------------------------
    // NOISE LAYER
    // -----------------------------

    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = this.createNoiseBuffer();

    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = 'lowpass';
    noiseFilter.frequency.value = 900;

    const noiseGain = ctx.createGain();
    noiseGain.gain.value = 0.05;

    noiseSource.connect(noiseFilter);
    noiseFilter.connect(noiseGain);

    // -----------------------------
    // FILTER
    // -----------------------------

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';

    filter.frequency.setValueAtTime(1200, now);
    filter.frequency.exponentialRampToValueAtTime(300, now + 1.2);

    // -----------------------------
    // DISTORTION
    // -----------------------------

    const distortion = ctx.createWaveShaper();
    distortion.curve = this.makeDistortionCurve(80);
    distortion.oversample = '4x';

    // -----------------------------
    // MASTER GAIN
    // -----------------------------

    const gain = ctx.createGain();

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.3, now + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

    // -----------------------------
    // CONNECT GRAPH
    // -----------------------------

    osc.connect(filter);
    filter.connect(distortion);
    distortion.connect(gain);

    noiseGain.connect(gain);

    gain.connect(ctx.destination);

    // -----------------------------
    // START / STOP
    // -----------------------------

    osc.start(now);
    lfo.start(now);
    noiseSource.start(now);

    osc.stop(now + 1.2);
    lfo.stop(now + 1.2);
    noiseSource.stop(now + 1.2);
  }
}
