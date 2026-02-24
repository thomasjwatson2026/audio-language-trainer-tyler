const el = {
  playNew: document.getElementById('playNew'),
  replay: document.getElementById('replay'),
  show: document.getElementById('show'),
  status: document.getElementById('status'),
  currentText: document.getElementById('currentText'),
  list: document.getElementById('list'),
  convButtons: document.getElementById('convButtons'),
  stopConv: document.getElementById('stopConv'),
  speed: document.getElementById('speed'),
};

const audio = new Audio();
audio.preload = 'auto';
let phrases = [];
let conversations = [];
let current = null;
let stopConversation = false;
let appSpeed = 1;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const setStatus = (s) => (el.status.textContent = s);

async function loadData() {
  const zh = await (await fetch('toolkit38.json', { cache: 'no-store' })).json();
  const es = await (await fetch('spanish38.json', { cache: 'no-store' })).json();
  conversations = await (await fetch('conversations.json', { cache: 'no-store' })).json();
  phrases = zh.map((z) => {
    const s = es.find((x) => x.id === z.id) || { spanish: '' };
    return { ...z, spanish: s.spanish };
  });
  renderConversationButtons();
  renderList();
  setStatus(`Loaded ${phrases.length} phrases + ${conversations.length} conversations.`);
}

function applySpeed() {
  appSpeed = Number(el.speed?.value || 1);
  audio.playbackRate = appSpeed;
  setStatus(`Speed set to ${appSpeed}x`);
}

async function play(src) {
  try {
    audio.pause();
    audio.src = src;
    audio.currentTime = 0;
    audio.playbackRate = appSpeed;
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
  const id = String(item.id).padStart(2, '0');
  setStatus('Playing Spanish...');
  const a = await play(`audio38/${id}_es.mp3`);
  if (!a) return setStatus('Spanish audio failed.');
  await sleep(300);
  setStatus('Playing Chinese...');
  const b = await play(`audio38/${id}_zh.mp3`);
  if (!b) return setStatus('Chinese audio failed.');
  setStatus('Done.');
}

function renderList() {
  el.list.innerHTML = '';
  for (const p of phrases) {
    const id = String(p.id).padStart(2, '0');
    const row = document.createElement('div');
    row.className = 'list-row';
    row.innerHTML = `
      <div><div class="pill">#${p.id} English</div>${p.english}</div>
      <div><div class="pill">Spanish</div>${p.spanish}</div>
      <div>
        <div class="pill">Chinese</div>${p.chinese}
        <div class="pill">Pinyin</div>${p.pinyin}
        <div class="pill">(${p.pronounce})</div>
      </div>
      <div class="row">
        <button data-action="es">🔊 ES</button>
        <button data-action="zh">🔊 ZH</button>
        <button data-action="pair" class="primary">▶️ ES→ZH</button>
      </div>
    `;
    row.querySelector('[data-action="es"]').addEventListener('click', () => play(`audio38/${id}_es.mp3`));
    row.querySelector('[data-action="zh"]').addEventListener('click', () => play(`audio38/${id}_zh.mp3`));
    row.querySelector('[data-action="pair"]').addEventListener('click', () => playPair(p));
    el.list.appendChild(row);
  }
}

function renderConversationButtons() {
  el.convButtons.innerHTML = '';
  for (const c of conversations) {
    const b = document.createElement('button');
    b.className = 'primary';
    b.textContent = `🗣️ Conversation ${c.id}`;
    b.title = c.title;
    b.addEventListener('click', () => playConversation(c.id));
    el.convButtons.appendChild(b);
  }
}

async function playConversation(convId) {
  const conv = conversations.find((x) => x.id === convId);
  if (!conv) return;
  stopConversation = false;
  setStatus(`Playing conversation ${conv.id}: ${conv.title}`);

  for (let i = 0; i < conv.turns.length; i++) {
    if (stopConversation) return setStatus('Conversation stopped.');
    const t = conv.turns[i];
    const n = i + 1;
    const prefix = `conv_audio/c${conv.id}_t${n}`;

    setStatus(`Conversation ${conv.id} • ${t.speaker}: Spanish`);
    const ok1 = await play(`${prefix}_es.mp3`);
    if (!ok1 || stopConversation) return setStatus('Conversation stopped/failed.');

    await sleep(220);
    setStatus(`Conversation ${conv.id} • ${t.speaker}: Chinese`);
    const ok2 = await play(`${prefix}_zh.mp3`);
    if (!ok2 || stopConversation) return setStatus('Conversation stopped/failed.');

    await sleep(240);
  }

  setStatus(`Conversation ${conv.id} complete.`);
}

function randomItem() { return phrases[Math.floor(Math.random() * phrases.length)]; }

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
    <div><strong>Spanish:</strong> ${current.spanish}</div>
    <div><strong>Chinese:</strong> ${current.chinese}</div>
    <div><strong>Pinyin:</strong> ${current.pinyin}</div>
    <div><strong>English-sound hint:</strong> (${current.pronounce})</div>
  `;
}

el.playNew.addEventListener('click', playNew);
el.replay.addEventListener('click', replay);
el.show.addEventListener('click', show);
el.speed.addEventListener('change', applySpeed);
el.stopConv.addEventListener('click', () => {
  stopConversation = true;
  audio.pause();
  setStatus('Conversation stopped.');
});

applySpeed();
loadData().catch(() => setStatus('Failed to load phrase files'));
