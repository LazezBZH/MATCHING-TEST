// dark mode generalities

const body = document.querySelector("body");
const modeBtn = document.querySelector(".choose-mode");
const sound = document.querySelector(".audio");

let darkMode = localStorage.getItem("dark-mode");
let kitch = "";

modeBtn.addEventListener("click", toggleMode);

const enableDarkMode = () => {
  body.classList.add("dark");
  body.classList.remove("kitch");
  localStorage.setItem("dark-mode", "enabled");
  kitch = false;
  setSound();
};

const disableDarkMode = () => {
  body.classList.remove("dark");
  body.classList.add("kitch");
  localStorage.setItem("dark-mode", "disabled");
  kitch = true;
  setSound();
};

function setSound() {
  if (noChosen) {
    sound.innerHTML = `<audio
        autoplay
        loop
        src="./assets/sounds/soundNo.mp3">
    </audio>`;
  } else if (kitch && percent < 50 && percent >= 0) {
    console.log("couco");
    sound.innerHTML = `<audio
        autoplay
        loop
        src="./assets/sounds/soundMain.mp3">
    </audio>`;
  } else if (!kitch && !noChosen && percent < 50 && percent >= 0) {
    sound.innerHTML = `<audio
        autoplay
        loop
        src="./assets/sounds/soundMainDark.mp3">
    </audio>`;
  } else if (kitch && !noChosen && percent >= 50) {
    sound.innerHTML = `<audio
        autoplay
        loop
        src="./assets/sounds/soundTop.mp3">
    </audio>`;
  } else if (!kitch && !noChosen && percent >= 50) {
    sound.innerHTML = `<audio
        autoplay
        loop
        src="./assets/sounds/soundTopDark.mp3">
    </audio>`;
  } else {
    sound.innerHTML = `<audio
        autoplay
       loop
      src="./assets/sounds/home.mp3">
   </audio>`;
  }
}

// change mode

function toggleMode() {
  darkMode = localStorage.getItem("dark-mode"); // update darkMode when clicked
  if (darkMode === "disabled") {
    enableDarkMode();
    kitch = false;
  } else {
    disableDarkMode();
    kitch = true;
  }
}

// define mode on load according to previous choice (localstorage)

function setMode() {
  darkMode = localStorage.getItem("dark-mode") || "disabled";
  if (darkMode === "disabled") {
    disableDarkMode();
  } else {
    enableDarkMode();
  }
}
