const yes = document.getElementById("yes");
const no = document.getElementById("no");
const noTxt = document.querySelector(".noTxt");
const changeMind = document.getElementById("change-mind");

const main = document.querySelector(".main");

const inputPart = document.getElementById("input-part");
const inputYou = document.getElementById("input-you");
const resultBtn = document.getElementById("resultBtn");
const emptyInput = document.getElementById("empty-input");
const output = document.getElementById("output");

const anotherCatch = document.querySelector(".anotherCatch");
const form = document.querySelector("#radio-form");

const anotherRandom = document.querySelector(".anotherRandom");
const options = document.querySelector(".options");
const origins = document.getElementById("origin");
const genders = document.getElementById("gender");
const go = document.getElementById("go");

const sound = document.querySelector(".audio");
const defil = document.querySelector(".defil");

let gender = "";
let origin = "";
let comptOthers = 0;
let comptOthersTowrite = 0;
let comptRandom = 0;
let comptRandomTowrite = 0;
let percent = "";

yes.addEventListener("click", showMain);
no.addEventListener("click", showNo);
changeMind.addEventListener("click", showMainChange);

resultBtn.addEventListener("click", displayResult);

anotherCatch.addEventListener("click", setOthers);
genders.addEventListener("change", setGender);
origins.addEventListener("change", setOrigin);

form.addEventListener("submit", submitCatched);
anotherRandom.addEventListener("click", setRandom);
go.addEventListener("click", getRandom);

// Yes/No choice at opening
function showMain() {
  main.classList.add("main-visible");
  defil.classList.add("defil-visible");
  yes.style.opacity = "0";
  no.style.opacity = "0";
  if (kitch) {
    sound.innerHTML = `<audio
        autoplay
        loop
        src="/assets/soundMain.wav">
    </audio>`;
  } else if (!kitch) {
    sound.innerHTML = `<audio
        autoplay
        loop
        src="/assets/soundMainDark.mp3">
    </audio>`;
  }
}
function showNo() {
  noTxt.classList.add("noTxt-visible");
  defil.classList.add("defil-visible");
  yes.style.opacity = "0";
  no.style.opacity = "0";
  sound.innerHTML = `<audio
        autoplay
        loop
        src="/assets/soundNo.mp3">
    </audio>`;
}
function showMainChange() {
  main.classList.add("main-visible");
  noTxt.classList.remove("noTxt-visible");
  yes.style.opacity = "0";
  no.style.opacity = "0";
  sound.innerHTML = `<audio
        autoplay
        loop
        src="/assets/soundMain.wav">
    </audio>`;
}

// get and display result
async function fetchResult() {
  const option = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "7c75dc8b0emsh6f35227c3ac1090p1db2cbjsnfb932147fd7d",
      "X-RapidAPI-Host": "love-calculator.p.rapidapi.com",
    },
  };
  output.innerHTML = "";
  let yourName = inputYou.value;
  let partName = inputPart.value;
  try {
    let res = await fetch(
      "https://love-calculator.p.rapidapi.com/getPercentage?sname=" +
        yourName +
        "&fname=" +
        partName,
      option
    );
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}
async function displayResult() {
  if (inputYou.value && inputPart.value) {
    emptyInput.innerHTML = ``;
    let result = await fetchResult();
    percent = result.percentage;
    if (percent >= 50 && kitch) {
      sound.innerHTML = `<audio
        autoplay
        loop
        src="/assets/soundTop.mp3">
    </audio>`;
    } else if (percent < 50 && kitch) {
      sound.innerHTML = `<audio
        autoplay
        loop
        src="/assets/soundMain.wav">
    </audio>`;
    }
    if (percent >= 50 && !kitch) {
      sound.innerHTML = `<audio
        autoplay
        loop
        src="/assets/soundTopDark.mp3">
    </audio>`;
    } else if (percent < 50 && !kitch) {
      sound.innerHTML = `<audio
        autoplay
        loop
        src="/assets/soundMainDark.mp3">
    </audio>`;
    }
    output.innerHTML = `<p>Hey ${result.sname} and ${result.fname}</p><p>Your Love Test Result is ${percent}% matching</p><p class="response-result"> ${result.result} </p> `;
    anotherCatch.classList.add("anotherCatch-visible");
    anotherRandom.classList.add("anotherRandom-visible");
    form.style.display = "none";
    options.classList.remove("options-visible");
    output.classList.add("output-visible");
  } else {
    emptyInput.innerHTML = `* Please give us 2 firstnames!`;
  }
}

// change partner name with a catch
function setOthers() {
  form.style.display = "block";
  anotherCatch.classList.remove("anotherCatch-visible");
  anotherRandom.classList.remove("anotherRandom-visible");
  comptOthers++;
  comptOthersTowrite = comptOthers - 1;
  if (comptOthers > 3) {
    alert(
      "You've allready change " +
        comptOthersTowrite +
        " times of partner, you should be more serious!"
    );
  }
}
function submitCatched(e) {
  e.preventDefault();
  const names = document.querySelectorAll('input[name="change"]:checked');
  for (let name of names) {
    inputPart.value = name.value;
    form.reset();
    form.style.display = "none";
    output.innerHTML = "";
    output.classList.remove("output-visible");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

// change your name with random
function setRandom() {
  options.classList.add("options-visible");
  anotherRandom.classList.remove("anotherRandom-visible");
  anotherCatch.classList.remove("anotherCatch-visible");
  comptRandom++;
  comptRandomTowrite = comptRandom - 1;
  if (comptRandom > 3) {
    alert(
      "You've allready change " +
        comptRandomTowrite +
        " times of firstname, shouldn't it be easier to change your partner?"
    );
  }
}
function setGender() {
  gender = this.value;
  return gender;
}
function setOrigin() {
  origin = this.value;
  return origin;
}
function getRandom() {
  let url = "https://randomuser.me/api/?gender=" + gender + "&nat=" + origin;
  fetch(url)
    .then((response) => response.json())
    .then(
      (response) => (
        (inputYou.value = response.results[0].name.first),
        alert(
          "' " +
            response.results[0].name.first.toUpperCase() +
            "' will be your new firstname, click on OK and it will be writen in the input!"
        ),
        options.classList.remove("options-visible"),
        (output.innerHTML = ""),
        output.classList.remove("output-visible")
      )
    )
    .catch((err) => console.error(err));
}
