const translator = new ZamgrhTranslator();
const audio = new ZombieAudio();

translator.loadLexicon();

function runTranslate() {

  translator.setMode(
    document.getElementById("mode").value
  );

  const input =
    document.getElementById("input").value;

  const output =
    translator.translate(input);

  document.getElementById("output").innerText =
    output;

  // creepy speech
  audio.speak(output);

}

function playGroan() {

  audio.groan();

}
