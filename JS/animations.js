var texte =
  "Time, it needs time to win back your love again I will be there, I will be there! Love, only love, can bring back your love someday I'll fight, babe, I'll fight to win back your love again I will be there, I will be there. Love, only love, can break down the wall someday, I will be there, I will be there. If we'd go again all the way from the start, I would try to change the things that killed our love. Your pride has built a wall, so strong that I can't get through. Is there really no chance to start once again? I'm loving you. Try, baby try to trust in my love again. I will be there, I will be there. Love, our love just shouldn't be thrown away. I will be there, I will be there. If we'd go again all the way from the start, I would try to change the things that killed our love. Your pride has built a wall, so strong that I can't get through. Is there really no chance to start once again? If we'd go again all the way from the start, I would try to change the things that killed our love. Yes, I've hurt your pride, and I know what you've been through. You should give me a chance. This can't be the end. I'm still loving you. I'm still loving you, I need your love. I'm still loving you";
// var msg = "";
// //espace entre chaque répétition du texte
// var blanc = "          ";
// //nombre de répétition du texte, doit être >= 1
// var nbTexte = 1;

// for (i = 0; i < nbTexte; i++) msg += texte + blanc;

var timerID = null;
var delaiScroll = 120;

function startScroll() {
  document.formScroll.textScroll.value = texte;
  window.status = texte;
  texte = texte.substring(1, texte.length) + texte.substring(0, 1);
  timerID = setTimeout("startScroll()", delaiScroll);
}

function stopScroll() {
  clearTimeout(timerID);
}
