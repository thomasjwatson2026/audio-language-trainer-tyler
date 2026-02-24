const el = {
  playNew: document.getElementById('playNew'),
  replay: document.getElementById('replay'),
  show: document.getElementById('show'),
  status: document.getElementById('status'),
  currentText: document.getElementById('currentText'),
  list: document.getElementById('list'),
};

const audio = new Audio();
audio.preload = 'auto';
let phrases = [];
let current = null;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const setStatus = (s) => (el.status.textContent = s);

async function loadData() {
  phrases = await (await fetch('toolkit38.json', { cache: 'no-store' })).json();
  renderList();
  setStatus(`Loaded ${phrases.length} phrases.`);
}

async function play(src) {
  try {
    audio.pause();
    audio.src = src;
    audio.currentTime = 0;
    await audio.play();
    return new Promise((resolve) => {
      audio.onended = () => resolve(true);
      audio.onerror = () => resolve(false);
    });
  } catch {
    return false;
  }
}

async function playPair(item) {
  current = item;
  setStatus('Playing English...');
  const a = await play(`audio38/${String(item.id).padStart(2, '0')}_en.mp3`);
  if (!a) return setStatus('English audio failed.');
  await sleep(300);
  setStatus('Playing Chinese...');
  const b = await play(`audio38/${String(item.id).padStart(2, '0')}_zh.mp3`);
  if (!b) return setStatus('Chinese audio failed.');
  setStatus('Done.');
}

function renderList() {
  el.list.innerHTML = '';
  for (const p of phrases) {
    const row = document.createElement('div');
    row.className = 'list-row';
    row.innerHTML = `
      <div><div class="pill">#${p.id} English</div>${p.english}</div>
      <div><div class="pill">Pinyin</div>${p.pinyin}</div>
      <div><div class="pill">Chinese</div>${p.chinese}</div>
      <div class="row">
        <button data-action="en">🔊 EN</button>
        <button data-action="zh">🔊 ZH</button>
        <button data-action="pair" class="primary">▶️ EN→ZH</button>
      </div>
    `;
    row.querySelector('[data-action="en"]').addEventListener('click', () => play(`audio38/${String(p.id).padStart(2, '0')}_en.mp3`));
    row.querySelector('[data-action="zh"]').addEventListener('click', () => play(`audio38/${String(p.id).padStart(2, '0')}_zh.mp3`));
    row.querySelector('[data-action="pair"]').addEventListener('click', () => playPair(p));
    el.list.appendChild(row);
  }
}

function randomItem() {
  return phrases[Math.floor(Math.random() * phrases.length)];
}

async function playNew() {
  if (!phrases.length) return;
  el.currentText.classList.add('hidden');
  await playPair(randomItem());
}

function replay() {
  if (!current) return setStatus('Press Play New first.');
  playPair(current);
}

function show() {
  if (!current) return setStatus('Press Play New first.');
  el.currentText.classList.remove('hidden');
  el.currentText.innerHTML = `
    <div><strong>English:</strong> ${current.english}</div>
    <div><strong>Pinyin:</strong> ${current.pinyin}</div>
    <div><strong>Chinese:</strong> ${current.chinese}</div>
  `;
}

el.playNew.addEventListener('click', playNew);
el.replay.addEventListener('click', replay);
el.show.addEventListener('click', show);

loadData().catch(() => setStatus('Failed to load toolkit38.json'));
