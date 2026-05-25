class ZombieAudio {
  constructor() {
    this.enabled = true;
  }

  speak(text) {
    if (!window.meSpeak) return;

    const zombieText = text
      .toLowerCase()
      .replace(/\./g, "...")
      .replace(/s/g, "ss")
      .replace(/r/g, "rr")
      .replace(/z/g, "zz")
      .replace(/ing/g, "unng");

    meSpeak.speak(zombieText, {
      amplitude: 300,
      pitch: 1,
      speed: 10,
      wordgap: 2,
      variant: "whisperf"
    });
  }

  groan() {
    const sounds = [
      "grrrhh...",
      "unngghhh...",
      "braaainzz...",
      "raaaahhh...",
      "ggrrraahh..."
    ];

    const random =
      sounds[Math.floor(Math.random() * sounds.length)];

    this.speak(random);
  }
}
