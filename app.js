const elems = {
  startBtn: document.querySelector("#start-btn"),
  score: document.querySelector("#score-val"),
  badge: document.querySelector("#lives"),
  hearts: [...document.querySelector("#lives").children],
  fruit: document.querySelector(".fruit"),
  canvas: document.querySelector("#canvas"),
  counter: document.querySelector(".timer"),
};

const state = {
  timer: 0,
  fruit: {
    top: 0,
  },
  time: 60,
  interval: 0
};

const fruits = [
  "apple.png",
  "banana.png",
  "cherries.png",
  "grapes.png",
  "mango.png",
  "orange.png",
  "peach.png",
  "pear.png",
  "watermelon.png",
];

const start = () => {
  // 1. show lives
  showLives();

  // 2. hide start btn
  elems.startBtn.remove();

  // 3. choose random fruit
  chooseRandomFruit();

  // 4. make it move down
  state.timer = setInterval(loop, 1);

  elems.fruit.addEventListener("mouseover", sliceTheFruit);
   state.interval = setInterval(() => {
    elems.counter.innerText = state.time -= 1;
    if (state.time == 0) {
      clearInterval(state.interval);
      window.alert("Finish gaming, your score is: "+elems.score.innerText);
      location.reload();
    }
  }, 1000);
};

const showLives = () => {
  elems.badge.style.opacity = 1;
};

const chooseRandomFruit = () => {
  elems.fruit.style.backgroundImage = `url(images/${
    fruits[giveMeRandomNumber(fruits.length - 1)]
  })`;
};

const resetNewFruit = () => {
  // move the fruit to top
  state.fruit.top = 0;

  // choose random fruit
  chooseRandomFruit();

  // set the fruit in random position
  elems.fruit.style.left =
    giveMeRandomNumber(elems.canvas.clientWidth - elems.fruit.clientWidth) +
    "px";
};

const giveMeRandomNumber = (max, min = 0) =>
  Math.round(Math.random() * (max - min) + min);

const loop = () => {
  elems.fruit.style.top = ++state.fruit.top + "px";

  if (state.fruit.top >= elems.canvas.clientHeight) {
    resetNewFruit();

    // minus a heart
    if (elems.hearts.length == 1) {
      clearInterval(state.timer);
      alert("Game over! score is: "+elems.score.innerText);
      location.reload();
    } else elems.hearts.pop().style.opacity = 0.4;
  }
};

const sliceTheFruit = () => {
  if (elems.fruit.classList.contains("sliced")) return;
  // increase score
  elems.score.innerText++;

  elems.fruit.classList.add("sliced");
  // elems.fruit.removeEventListener('mouseover', sliceTheFruit)

  setTimeout(() => {
    resetNewFruit();
    elems.fruit.classList.remove("sliced");
    // elems.fruit.addEventListener('mouseover', sliceTheFruit)
  }, 500);
};

elems.startBtn.addEventListener("click", start);
