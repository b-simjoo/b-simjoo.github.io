const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const floatSpeed = 10; //px/s
const animationTiming = 5; //s
const divisor = 400000;
const floatingTexts = [
  "Python",
  "Flask",
  "JS",
  "CSS",
  "HTML",
  "C#",
  "PHP",
  "Dev",
  "{",
  "}",
  "(",
  ")",
  "+",
  "-",
  "/",
  "\\",
  "&",
  "$",
  "1",
  "0",
  "10",
  "01",
  "</>",
  "*",
  "#",
];

var r = document.querySelector(":root");
r.style.setProperty("--animation-timing", animationTiming.toString() + "s");
const floatingObjects = [];
let floatContainer, R;

function spawnFloatingObject() {
  let floatingObject = document.createElement("span");
  floatingObject.classList.add("float-object");
  let top = rand(0, floatContainer.clientHeight);
  let left = rand(0, floatContainer.clientWidth);
  floatingObject.style.top = top.toString() + "px";
  floatingObject.style.left = left.toString() + "px";
  let rotation = Math.random() * 360;
  floatingObject.dataset.rotation = rotation;
  floatingObject.style.transform = `rotate(${rotation}deg)`;
  let dir = Math.random() * 2 * Math.PI;
  floatingObject.dataset.direction = dir;
  let floatingInner = document.createElement("span");
  floatingInner.classList.add("inner");
  floatingObject.appendChild(floatingInner);
  floatingInner.innerText = floatingTexts[rand(0, floatingTexts.length - 1)];
  floatContainer.appendChild(floatingObject);
  let d = floatSpeed * animationTiming;
  floatingObject.style.top = (Math.sin(dir) * d + top).toString() + "px";
  floatingObject.style.left = (Math.cos(dir) * d + left).toString() + "px";
  floatingObjects.push(floatingObject);
}

function floatAnimate() {
  for (let i = 0; i < floatingObjects.length; i++) {
    let fo = floatingObjects[i];
    let top = parseFloat(fo.style.top.slice(0, -2));
    let left = parseFloat(fo.style.left.slice(0, -2));
    let d = floatSpeed * animationTiming;
    let dir = parseFloat(fo.dataset.direction);
    let rot = parseFloat(fo.dataset.rotation);
    if (
      top > -20 &&
      top < floatContainer.clientHeight + 20 &&
      left > -20 &&
      left < floatContainer.clientWidth + 20
    ) {
      fo.style.top = (Math.sin(dir) * d + top).toString() + "px";
      fo.style.left = (Math.cos(dir) * d + left).toString() + "px";
      fo.dataset.direction = dir + (Math.random() - 0.5) * 0.083 * Math.PI;
      rot += (Math.random() - 0.5) * 360;
      fo.dataset.rotation = rot;
      fo.style.transform = `rotate(${rot}deg)`;
    } else {
      floatingObjects.splice(i, 1);
      fo.remove();
      spawnFloatingObject();
    }
  }

  setTimeout(requestAnimationFrame, animationTiming * 1000, floatAnimate);
}

window.onload = function () {
  floatContainer = document.getElementsByClassName("float-container")[0];
  R = (floatContainer.clientHeight * floatContainer.clientWidth) / divisor;
  let elements = document.getElementsByClassName("fancy");
  for (var i = 0; i < elements.length; i++) {
    let element = elements[i];
    for (const line of element.children) {
      let words = line.innerText.split(" ");
      line.innerHTML = "";
      words.forEach((word) => {
        let letters = word.split("");
        word = document.createElement("span");
        word.classList.add("word");
        line.appendChild(word);
        letters.forEach((letter) => {
          let outer = document.createElement("span");
          outer.classList.add("letter");
          word.appendChild(outer);
          let inner = document.createElement("span");
          inner.classList.add("inner");
          inner.style.animationDelay = `${rand(-10000, 0)}ms`;
          inner.innerText = letter;
          outer.appendChild(inner);
        });
      });
    }
  }
  for (let i = 0; i < R * floatingTexts.length; i++) spawnFloatingObject();
  requestAnimationFrame(floatAnimate);
};
