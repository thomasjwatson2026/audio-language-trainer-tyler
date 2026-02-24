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

function setStatus(s){ el.status.textContent = s; }

function sleep(ms){ return new Promise(r => setTimeout(r, ms)); }

async function loadData(){
  const data = await (await fetch('phrases.json', {cache:'no-store'})).json();

  const es = data.filter(p => p.lang === 'es');
  const zh = data.filter(p => p.lang === 'zh');
  const n = Math.min(es.length, zh.length);

  phrases = Array.from({length: n}, (_, i) => ({
    id: i + 1,
    english: es[i].english,
    spanish: es[i].prompt,
    chinese: zh[i].prompt,
    esAudio: es[i].promptAudio,
    zhAudio: zh[i].promptAudio,
  }));

  renderList();
  setStatus(`Loaded ${phrases.length} phrase pairs.`);
}

function renderList(){
  el.list.innerHTML = '';
  phrases.forEach(p => {
    const row = document.createElement('div');
    row.className = 'list-row';
    row.innerHTML = `
      <div><div class="pill">Spanish</div>${p.spanish}</div>
      <div><div class="pill">Chinese</div>${p.chinese}</div>
      <button data-id="${p.id}">▶️ Play ES→ZH</button>
    `;
    row.querySelector('button').addEventListener('click', () => playPairById(p.id));
    el.list.appendChild(row);
  });
}

async function play(src){
  try {
    audio.pause();
    audio.src = src;
    audio.currentTime = 0;
    await audio.play();
    return new Promise(res => {
      audio.onended = () => res(true);
      audio.onerror = () => res(false);
    });
  } catch (e) {
    return false;
  }
}

async function playPair(p){
  current = p;
  setStatus('Playing Spanish...');
  const a = await play(p.esAudio);
  if (!a) return setStatus('Could not play Spanish audio.');
  await sleep(350);
  setStatus('Playing Chinese...');
  const b = await play(p.zhAudio);
  if (!b) return setStatus('Could not play Chinese audio.');
  setStatus('Done.');
}

async function playNew(){
  if (!phrases.length) return;
  const p = phrases[Math.floor(Math.random() * phrases.length)];
  el.currentText.classList.add('hidden');
  await playPair(p);
}

async function playPairById(id){
  const p = phrases.find(x => x.id === id);
  if (p) await playPair(p);
}

function replay(){
  if (!current) return setStatus('Press Play New first.');
  playPair(current);
}

function showText(){
  if (!current) return setStatus('Press Play New first.');
  el.currentText.classList.remove('hidden');
  el.currentText.innerHTML = `
    <div><strong>English:</strong> ${current.english}</div>
    <div><strong>Spanish:</strong> ${current.spanish}</div>
    <div><strong>Chinese:</strong> ${current.chinese}</div>
  `;
}

el.playNew.addEventListener('click', playNew);
el.replay.addEventListener('click', replay);
el.show.addEventListener('click', showText);

loadData().catch(() => setStatus('Failed to load phrases.json'));
