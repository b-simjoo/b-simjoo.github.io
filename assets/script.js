const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const rand = (min, max) => Math.random() * (max - min + 1) + min;
const d2r = (d) => (d / 180) * Math.PI;

const floatSpeed = 20; //px/s
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
  "{}",
  "()",
  "&amp;",
  "$",
  "*",
  "#",
  '<i class="fa-brands fa-python"></i>',
  '<i class="fa-brands fa-github"></i>',
  '<i class="fa-brands fa-wordpress"></i>',
  '<i class="fa-brands fa-html5"></i>',
  '<i class="fa-solid fa-code"></i>',
  '<i class="fa-brands fa-square-js"></i>',
  '<i class="fa-brands fa-dev"></i>',
  '<i class="fa-solid fa-database"></i>',
  '<i class="fa-brands fa-linux"></i>',
  '<i class="fa-brands fa-stack-overflow"></i>',
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
  let rotation = rand(0, 360);
  floatingObject.dataset.rotation = rotation;
  floatingObject.style.transform = `rotate(${rotation}deg)`;
  let dir = d2r(rand(0, 360));
  floatingObject.dataset.direction = dir;
  let floatingInner = document.createElement("span");
  floatingInner.classList.add("inner");
  floatingObject.appendChild(floatingInner);
  floatingInner.innerHTML = floatingTexts[randInt(0, floatingTexts.length - 1)];
  floatContainer.appendChild(floatingObject);
  return floatingObject;
}

function moveFloatingObject(fo) {
  let top = parseFloat(fo.style.top.slice(0, -2));
  let left = parseFloat(fo.style.left.slice(0, -2));
  let movement = floatSpeed * animationTiming;
  let direction = parseFloat(fo.dataset.direction);
  let rotation = parseFloat(fo.dataset.rotation);
  if (
    top > -20 &&
    top < floatContainer.clientHeight + 20 &&
    left > -20 &&
    left < floatContainer.clientWidth + 20
  ) {
    fo.style.top = (Math.sin(direction) * movement + top).toString() + "px";
    fo.style.left = (Math.cos(direction) * movement + left).toString() + "px";
    fo.dataset.direction = direction + d2r(rand(-15, 15));
    rotation += rand(-30, 30);
    fo.dataset.rotation = rotation;
    fo.style.transform = `rotate(${rotation}deg)`;
  } else {
    fo.remove();
    let newObject = spawnFloatingObject();
    setTimeout(() => moveFloatingObject(newObject), 1);
  }
}

function floatAnimation() {
  Array.from(floatContainer.children).forEach((fo) => moveFloatingObject(fo));

  setTimeout(requestAnimationFrame, animationTiming * 1000, floatAnimation);
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
          inner.style.animationDelay = `${randInt(-10000, 0)}ms`;
          inner.innerText = letter;
          outer.appendChild(inner);
        });
      });
    }
  }
  for (let i = 0; i < R * floatingTexts.length; i++) spawnFloatingObject();

  if ("data-darkreader-scheme" in document.documentElement.attributes) {
    console.log(
      "Darkreader add-on detected, It is a good plugin and I use it but it will change the colors I used! I recommend to add my webpage to whitelist!"
    );
  }

  floatAnimation();
};
