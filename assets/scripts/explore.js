// explore.js
window.addEventListener('DOMContentLoaded', init);
const synth = window.speechSynthesis;
let speakSelect;
let voices;
let voiceOptions = [];

function init() {

  // Assign all elements to a variable
  const section = document.getElementById("explore");
  const assetImg = section.getElementsByTagName("img")[0];
  const speakText = document.getElementById("text-to-speak");
  speakSelect = document.getElementById("voice-select");
  const speakBtn = section.getElementsByTagName("button")[0];

  // delay to ensure synth is loaded
  synth.addEventListener("voiceschanged", populateVoiceList);

  // play voice on button click
  speakBtn.addEventListener("click", (event) => {
    if (speakSelect.value == "select") return;

    // stop previous utterance 
    synth.cancel();
    const utterThis = new SpeechSynthesisUtterance(speakText.value);
    let indexSelected = speakSelect.selectedIndex - 1;
    utterThis.voice = voices[indexSelected];
    
    // change face
    utterThis.addEventListener("start", (event) => {
      assetImg.src = "assets/images/smiling-open.png";
    });
    utterThis.addEventListener("end", (event) => {
      assetImg.src = "assets/images/smiling.png";
    });
    synth.speak(utterThis);
  });
}


function populateVoiceList() {
  // Populate Voice List
  voices = synth.getVoices();

  // Clear OG voice
  for (let option of voiceOptions) {
    option.remove();
  }
  voiceOptions = [];

  // Update current voice
  for (let i = 0; i < voices.length; i++) {
    const option = document.createElement("option");
    option.textContent = `${voices[i].name} (${voices[i].lang})`;

    if (voices[i].default) {
      option.textContent += " — DEFAULT";
    }

    option.setAttribute("data-lang", voices[i].lang);
    option.setAttribute("data-name", voices[i].name);
    speakSelect.appendChild(option);
    voiceOptions.push(option);
  }
}
