// scrolling text
let text =
  "Time, it needs time to win back your love again I will be there, I will be there! Love, only love, can bring back your love someday I'll fight, babe, I'll fight to win back your love again I will be there, I will be there. Love, only love, can break down the wall someday, I will be there, I will be there. If we'd go again all the way from the start, I would try to change the things that killed our love. Your pride has built a wall, so strong that I can't get through. Is there really no chance to start once again? I'm loving you. Try, baby try to trust in my love again. I will be there, I will be there. Love, our love just shouldn't be thrown away. I will be there, I will be there. If we'd go again all the way from the start, I would try to change the things that killed our love. Your pride has built a wall, so strong that I can't get through. Is there really no chance to start once again? If we'd go again all the way from the start, I would try to change the things that killed our love. Yes, I've hurt your pride, and I know what you've been through. You should give me a chance. This can't be the end. I'm still loving you. I'm still loving you, I need your love. I'm still loving you!...-SCORPIONS-STILL LOVING YOU-";

let timerID = null;
let scrollDelay = 100;
let space = "          ";
let repeat = 4;
let msg = "";
for (i = 0; i < repeat; i++) {
  msg += text + space;
}

function scrollTxt() {
  document.formScroll.textScroll.value = msg;
  window.status = msg;
  msg = msg.substring(1, msg.length) + msg.substring(0, 1);
  timerID = setTimeout("scrollTxt()", scrollDelay);
}

scrollTxt();

// dark mode
const modeBtn = document.querySelector(".choose-mode");
const body = document.querySelector("body");
modeBtn.addEventListener("click", toggleMode);
function toggleMode() {
  body.classList.toggle("dark");
}
