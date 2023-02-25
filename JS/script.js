const inputPart = document.getElementById("input-part");
const inputYou = document.getElementById("input-you");
const anotherCatch = document.querySelector(".anotherCatch");
const anotherRandom = document.querySelector(".anotherRandom");
const options = document.querySelector(".options");
const output = document.getElementById("output");
const form = document.querySelector("#radio-form");
let resultBtn = document.getElementById("resultBtn");
const go = document.getElementById("go");
const origins = document.getElementById("origin");
let origin = "";
const genders = document.getElementById("gender");
let gender = "";
let comptOthers = 0;
let comptOthersTowrite = 0;
let comptRandom = 0;
let comptRandomTowrite = 0;
const sound = document.querySelector(".audio");
const defil = document.querySelector(".defil");

resultBtn.addEventListener("click", displayResult);
// change partner name with a catch
anotherCatch.addEventListener("click", setOthers);
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
  console.log(comptOthers);
}
// change your name with random
anotherRandom.addEventListener("click", setRandom);
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

go.addEventListener("click", getRandom);
//change partner
form.addEventListener("submit", function (event) {
  event.preventDefault();
  const names = document.querySelectorAll('input[name="change"]:checked');
  for (let name of names) {
    inputPart.value = name.value;
    form.reset();
    form.style.display = "none";
    output.innerHTML = "";
    output.classList.remove("output-visible");
  }
});

// get result

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
  let result = await fetchResult();
  if (result.percentage >= 50) {
    sound.innerHTML = `<audio
        autoplay
        loop
        src="/assets/soundTop.mp3">
    </audio>`;
  } else {
    sound.innerHTML = `<audio
        autoplay
        loop
        src="/assets/mainSound.wav">
    </audio>`;
  }
  output.innerHTML = `<p>Hey ${result.sname} and ${result.fname}</p><p>Your Love Test Result is ${result.percentage}% matching</p><p class="response-result"> ${result.result} </p> `;
  anotherCatch.classList.add("anotherCatch-visible");
  anotherRandom.classList.add("anotherRandom-visible");
  form.style.display = "none";
  options.classList.remove("options-visible");
  output.classList.add("output-visible");
}

genders.addEventListener("change", setGender);
function setGender() {
  gender = this.value;
  return gender;
}

origins.addEventListener("change", setOrigin);
function setOrigin() {
  origin = this.value;
  return origin;
}

function getRandom() {
  let url = "https://randomuser.me/api/?gender=" + gender + "&nat=" + origin;
  console.log("URL fetched", url);
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
        console.log("RESPONSE", response),
        options.classList.remove("options-visible"),
        (output.innerHTML = ""),
        output.classList.remove("output-visible")
      )
    )
    .catch((err) => console.error(err));
}

const yes = document.getElementById("yes");
const main = document.querySelector(".main");
const no = document.getElementById("no");
const noTxt = document.querySelector(".noTxt");
const changeMind = document.getElementById("change-mind");
yes.addEventListener("click", showMain);
function showMain() {
  main.classList.add("main-visible");
  defil.classList.add("defil-visible");
  yes.style.opacity = "0";
  no.style.opacity = "0";
}

no.addEventListener("click", showNo);
function showNo() {
  noTxt.classList.add("noTxt-visible");
  defil.classList.add("defil-visible");
  yes.style.opacity = "0";
  no.style.opacity = "0";
}
changeMind.addEventListener("click", showMainChange);
function showMainChange() {
  main.classList.add("main-visible");
  noTxt.classList.remove("noTxt-visible");
  yes.style.opacity = "0";
  no.style.opacity = "0";
}
