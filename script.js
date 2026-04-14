const translator = new ZamgrhTranslator();

function translateText() {
  const input = document.getElementById("input").value;
  const output = translator.translate(input);
  document.getElementById("output").innerText = output;
}
