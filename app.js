const el = {
  lang: document.getElementById('lang'),
  mainBtn: document.getElementById('mainBtn'),
  replayBtn: document.getElementById('replayBtn'),
  showBtn: document.getElementById('showBtn'),
  answerBtn: document.getElementById('answerBtn'),
  status: document.getElementById('status'),
  answerCard: document.getElementById('answerCard'),
  answerText: document.getElementById('answerText'),
  answerEn: document.getElementById('answerEn'),
};

let phrases = [];
let current = null;
const audio = new Audio();
audio.preload = 'auto';

audio.addEventListener('playing', () => setStatus('Playing...'));
audio.addEventListener('ended', () => setStatus('Done.'));
audio.addEventListener('error', () => setStatus('Audio failed to load/play on this phrase.'));

function setStatus(msg) { el.status.textContent = msg; }

async function loadData() {
  const res = await fetch('phrases.json', { cache: 'no-store' });
  phrases = await res.json();
  setStatus(`Loaded ${phrases.length} phrases.`);
}

function pool() {
  const v = el.lang.value;
  return v === 'mixed' ? phrases : phrases.filter(p => p.lang === v);
}

function choose() {
  const p = pool();
  return p[Math.floor(Math.random() * p.length)];
}

async function play(src) {
  if (!src) return;
  try {
    audio.pause();
    audio.src = src;
    audio.currentTime = 0;
    await audio.play();
  } catch (e) {
    setStatus(`Play blocked or failed: ${e?.name || 'unknown error'}`);
  }
}

async function playNewPrompt() {
  if (!phrases.length) return;
  current = choose();
  el.answerCard.classList.add('hidden');
  el.answerText.textContent = current.response;
  el.answerEn.textContent = `English: ${current.english}`;
  await play(current.promptAudio);
}

async function replayPrompt() {
  if (!current) return setStatus('Press Play New Prompt first.');
  await play(current.promptAudio);
}

function showAnswer() {
  if (!current) return setStatus('Press Play New Prompt first.');
  el.answerCard.classList.remove('hidden');
}

async function playAnswer() {
  if (!current) return setStatus('Press Play New Prompt first.');
  await play(current.answerAudio);
}

el.mainBtn.addEventListener('click', playNewPrompt);
el.replayBtn.addEventListener('click', replayPrompt);
el.showBtn.addEventListener('click', showAnswer);
el.answerBtn.addEventListener('click', playAnswer);

loadData().catch(() => setStatus('Could not load phrase data.'));
