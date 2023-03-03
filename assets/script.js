const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const rand = (min, max) => Math.random() * (max - min + 1) + min;
const d2r = (d) => (d / 180) * Math.PI;

const floatSpeed = 20; // px/s
const animationTiming = 5; // s
const divisor = 400000;
const doFloatAnim = true;
const floatingTexts = [
  'Python',
  'Flask',
  'JS',
  'CSS',
  'HTML',
  'C#',
  'PHP',
  'Dev',
  '{}',
  '()',
  '&amp;',
  '$',
  '*',
  '#',
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

const r = document.querySelector(':root');
r.style.setProperty('--animation-timing', `${animationTiming.toString()}s`);
let floatContainer;
let R;

function spawnFloatingObject() {
  const floatingObject = document.createElement('span');
  floatingObject.classList.add('float-object');
  const top = rand(0, floatContainer.clientHeight);
  const left = rand(0, floatContainer.clientWidth);
  floatingObject.style.top = `${top.toString()}px`;
  floatingObject.style.left = `${left.toString()}px`;
  const rotation = rand(0, 360);
  floatingObject.dataset.rotation = rotation;
  floatingObject.style.transform = `rotate(${rotation}deg)`;
  const dir = d2r(rand(0, 360));
  floatingObject.dataset.direction = dir;
  const floatingInner = document.createElement('span');
  floatingInner.classList.add('inner');
  floatingObject.appendChild(floatingInner);
  floatingInner.innerHTML = floatingTexts[randInt(0, floatingTexts.length - 1)];
  floatContainer.appendChild(floatingObject);
  return floatingObject;
}

function moveFloatingObject(fo) {
  const top = parseFloat(fo.style.top.slice(0, -2));
  const left = parseFloat(fo.style.left.slice(0, -2));
  const movement = floatSpeed * animationTiming;
  const direction = parseFloat(fo.dataset.direction);
  let rotation = parseFloat(fo.dataset.rotation);
  if (top > -20 && top < floatContainer.clientHeight + 20 && left > -20 && left < floatContainer.clientWidth + 20) {
    fo.style.top = `${(Math.sin(direction) * movement + top).toString()}px`;
    fo.style.left = `${(Math.cos(direction) * movement + left).toString()}px`;
    fo.dataset.direction = direction + d2r(rand(-15, 15));
    rotation += rand(-30, 30);
    fo.dataset.rotation = rotation;
    fo.style.transform = `rotate(${rotation}deg)`;
  } else {
    fo.remove();
    const newObject = spawnFloatingObject();
    setTimeout(() => moveFloatingObject(newObject), 1);
  }
}

function floatAnimation() {
  Array.from(floatContainer.children).forEach((fo) => moveFloatingObject(fo));

  if (doFloatAnim) {
    setTimeout(requestAnimationFrame, animationTiming * 1000, floatAnimation);
  }
}

window.onload = function () {
  [floatContainer] = document.getElementsByClassName('float-container');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        switch (entry.target) {
          case floatContainer:
            if (entry.isIntersecting) {
              for (let i = 0; i < R * floatingTexts.length; i += 1) {
                spawnFloatingObject();
              }
              setTimeout(floatAnimation, 0); // start animation in another thread
            }
            break;

          default:
            break;
        }
      });
    },
    { threshold: 0.5 }
  );
  observer.observe(floatContainer);

  R = (floatContainer.clientHeight * floatContainer.clientWidth) / divisor;
  const elements = document.getElementsByClassName('fancy');
  for (let i = 0; i < elements.length; i += 1) {
    const element = elements[i];
    Array.from(element.children).forEach((line) => {
      const words = line.innerText.split(' ');
      line.innerHTML = '';
      words.forEach((word) => {
        const letters = word.split('');
        word = document.createElement('span');
        word.classList.add('word');
        line.appendChild(word);
        letters.forEach((letter) => {
          const outer = document.createElement('span');
          outer.classList.add('letter');
          word.appendChild(outer);
          const inner = document.createElement('span');
          inner.classList.add('inner');
          inner.style.animationDelay = `${randInt(-10000, 0)}ms`;
          inner.innerText = letter;
          outer.appendChild(inner);
        });
      });
    });
  }

  if ('data-darkreader-scheme' in document.documentElement.attributes) {
    console.log(
      'Darkreader add-on detected, It is a good plugin and I use it but it will change the colors I used! I recommend to add my webpage to whitelist!'
    );
  }
};
