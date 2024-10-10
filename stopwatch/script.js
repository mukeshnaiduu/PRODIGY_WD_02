let startTime;
let elapsedTime = 0;
let timerInterval;
let lapTimes = [];

const timeDisplay = document.querySelector('.time-display');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapList = document.getElementById('lapList');

function startTimer() {
    startTime = Date.now() - elapsedTime;
    timerInterval = requestAnimationFrame(updateTime);
    startBtn.disabled = true;
    pauseBtn.disabled = false;
    lapBtn.disabled = false;
}

function pauseTimer() {
    cancelAnimationFrame(timerInterval);
    startBtn.disabled = false;
    pauseBtn.disabled = true;
}

function resetTimer() {
    cancelAnimationFrame(timerInterval);
    elapsedTime = 0;
    lapTimes = [];
    updateDisplay();
    updateLapList();
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    lapBtn.disabled = true;
}

function recordLap() {
    lapTimes.push(elapsedTime);
    updateLapList();
}

function updateTime() {
    elapsedTime = Date.now() - startTime;
    updateDisplay();
    timerInterval = requestAnimationFrame(updateTime);
}

function updateDisplay() {
    const formattedTime = formatTime(elapsedTime);
    timeDisplay.textContent = formattedTime;
}

function updateLapList() {
    lapList.innerHTML = '';
    lapTimes.forEach((lapTime, index) => {
        const li = document.createElement('li');
        li.textContent = `Lap ${index + 1}: ${formatTime(lapTime)}`;
        lapList.appendChild(li);
    });
}

function formatTime(time) {
    const date = new Date(time);
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    const seconds = date.getUTCSeconds().toString().padStart(2, '0');
    const milliseconds = date.getUTCMilliseconds().toString().padStart(3, '0');
    return `${minutes}:${seconds}.${milliseconds}`;
}

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
lapBtn.addEventListener('click', recordLap);

// Initialize button states
pauseBtn.disabled = true;
lapBtn.disabled = true;