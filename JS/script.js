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
resultBtn.addEventListener("click", getResult);
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
function getResult() {
  const option = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "7c75dc8b0emsh6f35227c3ac1090p1db2cbjsnfb932147fd7d",
      "X-RapidAPI-Host": "love-calculator.p.rapidapi.com",
    },
  };
  let yourName = inputYou.value;
  let partName = inputPart.value;
  output.innerHTML = "";
  fetch(
    "https://love-calculator.p.rapidapi.com/getPercentage?sname=" +
      yourName +
      "&fname=" +
      partName,
    option
  )
    .then((response) => response.json())
    .then(
      (response) =>
        (output.innerHTML = `<p>Hey ${response.sname} and ${response.fname}</p><p>Your Love Test Result is ${response.percentage}% matching</p><p class="response-result"> ${response.result} </p> `),
      anotherCatch.classList.add("anotherCatch-visible"),
      anotherRandom.classList.add("anotherRandom-visible"),
      (form.style.display = "none"),
      options.classList.remove("options-visible"),
      output.classList.add("output-visible")
    )
    .catch((err) => console.error(err));
}

//choice gender

genders.addEventListener("change", setGender);
function setGender() {
  gender = this.value;
  return gender;
}
//choice origin

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
  yes.style.display = "none";
  no.style.display = "none";
}

no.addEventListener("click", showNo);
function showNo() {
  noTxt.classList.add("noTxt-visible");
  yes.style.display = "none";
  no.style.display = "none";
}
changeMind.addEventListener("click", showMainChange);
function showMainChange() {
  main.classList.add("main-visible");
  noTxt.classList.remove("noTxt-visible");
  yes.style.display = "none";
  no.style.display = "none";
}
