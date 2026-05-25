class ZombieAudio {

  constructor() {

    this.ready = true;

  }

  speak(text) {

    if (!window.meSpeak) {
      console.error("meSpeak not loaded");
      return;
    }

    meSpeak.speak(text, {

      amplitude: 300,
      pitch: 1,
      speed: 10,
      wordgap: 2,
      variant: "whisperf"

    });

  }

  groan() {

    const sounds = [

      "grrrhhh...",
      "unnggghhh...",
      "braaainzzz...",
      "raaaahhh...",
      "ggrrraaaahh..."

    ];

    const random =
      sounds[Math.floor(Math.random() * sounds.length)];

    this.speak(random);

  }

}
