let startTime;
let elapsedTime = 0;
let intervalId;
let isRunning = false;

const display = document.getElementById('display');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsList = document.getElementById('laps');

startButton.addEventListener('click', start);
pauseButton.addEventListener('click', pause);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', lap);

function start() {
  if (!isRunning) {
    startTime = Date.now() - elapsedTime;
    intervalId = setInterval(update, 10);
    isRunning = true;
  }
}

function pause() {
  if (isRunning) {
    clearInterval(intervalId);
    elapsedTime = Date.now() - startTime;
    isRunning = false;
  }
}

function reset() {
  clearInterval(intervalId);
  startTime = null;
  elapsedTime = 0;
  isRunning = false;
  display.textContent = '00:00:00.00';
  lapsList.innerHTML = '';
}

function lap() {
  if (isRunning) {
    const li = document.createElement('li');
    li.textContent = display.textContent;
    lapsList.appendChild(li);
  }
}

function update() {
  elapsedTime = Date.now() - startTime;
  display.textContent = timeToString(elapsedTime);
}

function timeToString(time) {
  let diffInHrs = time / 3600000;
  let hh = Math.floor(diffInHrs);

  let diffInMin = (diffInHrs - hh) * 60;
  let mm = Math.floor(diffInMin);

  let diffInSec = (diffInMin - mm) * 60;
  let ss = Math.floor(diffInSec);

  let diffInMs = (diffInSec - ss) * 100;
  let ms = Math.floor(diffInMs);

  let formattedHH = hh.toString().padStart(2, '0');
  let formattedMM = mm.toString().padStart(2, '0');
  let formattedSS = ss.toString().padStart(2, '0');
  let formattedMS = ms.toString().padStart(2, '0');

  return `${formattedHH}:${formattedMM}:${formattedSS}.${formattedMS}`;
}
