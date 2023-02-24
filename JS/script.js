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

resultBtn.addEventListener("click", getResult);
// change partner name with a catch
anotherCatch.addEventListener("click", setOthers);
function setOthers() {
  form.style.display = "block";
  anotherCatch.classList.remove("anotherCatch-visible");
  anotherRandom.classList.remove("anotherRandom-visible");
}
// change your name with random
anotherRandom.addEventListener("click", setRandom);
function setRandom() {
  options.style.display = "block";
  anotherRandom.classList.remove("anotherRandom-visible");
  anotherCatch.classList.remove("anotherCatch-visible");
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
  }
});

// get result
function getResult() {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "7c75dc8b0emsh6f35227c3ac1090p1db2cbjsnfb932147fd7d",
      "X-RapidAPI-Host": "love-calculator.p.rapidapi.com",
    },
  };
  let yourName = inputYou.value;
  let partName = inputPart.value;
  fetch(
    "https://love-calculator.p.rapidapi.com/getPercentage?sname=" +
      yourName +
      "&fname=" +
      partName,
    options
  )
    .then((response) => response.json())
    .then(
      (response) =>
        (output.innerHTML = `<p>Hey ${response.sname} and ${response.fname}</p><p>Your Love Test Result is ${response.percentage}% matching</p><p> ${response.result} </p> `)
    )
    .catch((err) => console.error(err));
  anotherCatch.classList.add("anotherCatch-visible");
  anotherRandom.classList.add("anotherRandom-visible");
  form.style.display = "none";
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
        (options.style.display = "none"),
        (output.innerHTML = "")
      )
    )
    .catch((err) => console.error(err));
}
