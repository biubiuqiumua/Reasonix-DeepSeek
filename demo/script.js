const timerEl = document.getElementById('timer');
const modeEl = document.getElementById('mode');
const countEl = document.getElementById('count');
const startBtn = document.getElementById('start');
const pauseBtn = document.getElementById('pause');
const resetBtn = document.getElementById('reset');
const focusBtn = document.getElementById('focusBtn');
const shortBreakBtn = document.getElementById('shortBreakBtn');
const longBreakBtn = document.getElementById('longBreakBtn');

const MODES = {
  focus:    { label: '专注时间', minutes: 25, emoji: '🍅' },
  short:    { label: '短休息',   minutes: 5,  emoji: '☕' },
  long:     { label: '长休息',   minutes: 15, emoji: '🌴' }
};

let currentMode = 'focus';
let timeLeft = MODES.focus.minutes * 60;
let timerId = null;
let sessions = 0;

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

function updateDisplay() {
  timerEl.textContent = formatTime(timeLeft);
  document.title = `${formatTime(timeLeft)} - ${MODES[currentMode].emoji} 番茄钟`;
}

function switchMode(mode) {
  currentMode = mode;
  timeLeft = MODES[mode].minutes * 60;
  modeEl.textContent = MODES[mode].label;
  updateDisplay();

  [focusBtn, shortBreakBtn, longBreakBtn].forEach(b => b.classList.remove('active'));
  if (mode === 'focus') focusBtn.classList.add('active');
  if (mode === 'short') shortBreakBtn.classList.add('active');
  if (mode === 'long') longBreakBtn.classList.add('active');

  stopTimer();
}

function stopTimer() {
  if (timerId) {
    clearInterval(timerId);
    timerId = null;
  }
}

function tick() {
  if (timeLeft <= 0) {
    stopTimer();
    if (currentMode === 'focus') {
      sessions++;
      countEl.textContent = sessions;
      alert('🍅 一个番茄完成！休息一下吧~');
      switchMode('short');
    } else {
      alert('⏰ 休息结束，开始新的番茄吧！');
      switchMode('focus');
    }
    return;
  }
  timeLeft--;
  updateDisplay();
}

startBtn.addEventListener('click', () => {
  if (timerId) return;
  timerId = setInterval(tick, 1000);
});

pauseBtn.addEventListener('click', stopTimer);

resetBtn.addEventListener('click', () => {
  stopTimer();
  timeLeft = MODES[currentMode].minutes * 60;
  updateDisplay();
});

focusBtn.addEventListener('click', () => switchMode('focus'));
shortBreakBtn.addEventListener('click', () => switchMode('short'));
longBreakBtn.addEventListener('click', () => switchMode('long'));

updateDisplay();