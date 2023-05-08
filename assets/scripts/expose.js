// expose.js
const jsConfetti = new JSConfetti();

window.addEventListener('DOMContentLoaded', init);

function init() {
  // Assign all elements to a variable
  let section = document.getElementById("expose");
  let assetImg = section.getElementsByTagName("img")[0];
  let assetSelect = document.getElementById("horn-select");
  
  let volumeControl = document.getElementById("volume-controls");
  let volumeControlInput = volumeControl.getElementsByTagName("input")[0];
  let volumeControlImg = volumeControl.getElementsByTagName("img")[0];

  let soundBtn = section.getElementsByTagName("button")[0];
  let soundSrc = section.getElementsByTagName("audio")[0];

  // select horn from dropdown
  assetSelect.addEventListener("change", (event) => {
    let prefix = event.target.value;
    if (prefix == "select") return;
    
    assetImg.src = "assets/images/" + prefix + ".svg";
    soundSrc.src = "assets/audio/" + prefix + ".mp3";
  });

  // initialize volume to 50%
  soundSrc.volume = volumeControlInput.value / 100;
  // change volume with slider
  volumeControlInput.addEventListener("change", (event) => {
    let value = event.target.value;
    soundSrc.volume = value / 100;
    if (value == 0) {
      volumeControlImg.src = "assets/icons/volume-level-0.svg";
    } else if (value < 33) {
      volumeControlImg.src = "assets/icons/volume-level-1.svg";
    } else if (value < 67) {
      volumeControlImg.src = "assets/icons/volume-level-2.svg";
    } else {
      volumeControlImg.src = "assets/icons/volume-level-3.svg";
    }
  });

  // play sound when clicked
  soundBtn.addEventListener("click", (event) => {
    if (assetSelect.value == "select") return;
    soundSrc.currentTime = 0;
    soundSrc.play();
    if (assetSelect.value == "party-horn") jsConfetti.addConfetti();
  });
}