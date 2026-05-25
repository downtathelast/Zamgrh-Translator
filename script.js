const translator = new ZamgrhTranslator();
const audio = new ZombieAudio();

translator.loadLexicon();

function runTranslate() {
  // unlock browser audio on first interaction
  audio.init();

  // set translation mode
  translator.setMode(
    document.getElementById("mode").value
  );

  // get user input
  const input = document.getElementById("input").value;

  // translate
  const output = translator.translate(input);

  // display output
  document.getElementById("output").innerText = output;

  // zombie speech synthesis
  audio.speak(output);
}

function playGroan() {
  audio.init();

  // random undead vocalization
  audio.groan();
}
