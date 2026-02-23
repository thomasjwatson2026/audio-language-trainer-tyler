const words = [
  // Spanish
  { lang: 'es', foreign: 'hola', english: 'hello', aliases: ['hi'] },
  { lang: 'es', foreign: 'gracias', english: 'thank you', aliases: ['thanks'] },
  { lang: 'es', foreign: 'agua', english: 'water', aliases: [] },
  { lang: 'es', foreign: 'comida', english: 'food', aliases: [] },
  { lang: 'es', foreign: 'casa', english: 'house', aliases: ['home'] },
  { lang: 'es', foreign: 'adiós', english: 'goodbye', aliases: ['bye'] },

  // Chinese (Mandarin)
  { lang: 'zh', foreign: '你好', pinyin: 'nǐ hǎo', english: 'hello', aliases: ['hi'] },
  { lang: 'zh', foreign: '谢谢', pinyin: 'xiè xie', english: 'thank you', aliases: ['thanks'] },
  { lang: 'zh', foreign: '水', pinyin: 'shuǐ', english: 'water', aliases: [] },
  { lang: 'zh', foreign: '食物', pinyin: 'shí wù', english: 'food', aliases: [] },
  { lang: 'zh', foreign: '家', pinyin: 'jiā', english: 'house', aliases: ['home'] },
  { lang: 'zh', foreign: '再见', pinyin: 'zài jiàn', english: 'goodbye', aliases: ['bye'] },
];

const el = {
  languageSelect: document.getElementById('languageSelect'),
  directionSelect: document.getElementById('directionSelect'),
  audioOnly: document.getElementById('audioOnly'),
  newRoundBtn: document.getElementById('newRoundBtn'),
  playBtn: document.getElementById('playBtn'),
  promptText: document.getElementById('promptText'),
  recordBtn: document.getElementById('recordBtn'),
  textAnswer: document.getElementById('textAnswer'),
  submitBtn: document.getElementById('submitBtn'),
  heardText: document.getElementById('heardText'),
  feedback: document.getElementById('feedback'),
  reveal: document.getElementById('reveal'),
  score: document.getElementById('score'),
  total: document.getElementById('total'),
};

let current = null;
let score = 0;
let total = 0;
let lastTranscript = '';

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const canRecognize = !!SpeechRecognition;

if (!canRecognize) {
  el.heardText.textContent = 'Voice recognition is not supported in this browser. You can still type answers.';
}

function normalize(s) {
  return (s || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z\u4e00-\u9fff\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function pickWord() {
  const language = el.languageSelect.value;
  const pool = language === 'mixed' ? words : words.filter(w => w.lang === language);
  return pool[Math.floor(Math.random() * pool.length)];
}

function getLangCodeForSpeech(item, direction) {
  if (direction === 'toEnglish') return item.lang === 'es' ? 'es-ES' : 'zh-CN';
  return 'en-US';
}

function speakCurrent() {
  if (!current) return;
  window.speechSynthesis.cancel();

  const direction = el.directionSelect.value;
  const utterance = new SpeechSynthesisUtterance(
    direction === 'toEnglish' ? current.foreign : current.english
  );
  utterance.lang = getLangCodeForSpeech(current, direction);
  utterance.rate = 0.9;
  window.speechSynthesis.speak(utterance);
}

function renderPrompt() {
  if (!current) return;
  const direction = el.directionSelect.value;
  const audioOnly = el.audioOnly.checked;

  if (audioOnly) {
    el.promptText.textContent = '🎧 Listen and answer using voice';
  } else {
    if (direction === 'toEnglish') {
      el.promptText.textContent = `Say the English meaning for: ${current.foreign}`;
    } else {
      el.promptText.textContent = `Say the foreign word for: ${current.english}`;
    }
  }

  const zhHint = current.lang === 'zh' ? ` (${current.pinyin || ''})` : '';
  el.reveal.textContent = `Answer: ${current.foreign}${zhHint} = ${current.english}`;
}

function startRound() {
  current = pickWord();
  lastTranscript = '';
  el.heardText.textContent = '';
  el.feedback.textContent = '';
  el.textAnswer.value = '';
  renderPrompt();
  speakCurrent();
}

function expectedAnswers() {
  const direction = el.directionSelect.value;
  if (!current) return [];

  if (direction === 'toEnglish') {
    return [current.english, ...(current.aliases || [])].map(normalize);
  }

  // toForeign
  const list = [current.foreign];
  if (current.pinyin) list.push(current.pinyin);
  return list.map(normalize);
}

function checkAnswer(rawInput) {
  if (!current) return;

  total += 1;
  const actual = normalize(rawInput || '');
  const expects = expectedAnswers();
  const ok = expects.includes(actual);

  if (ok) {
    score += 1;
    el.feedback.textContent = '✅ Correct';
    el.feedback.className = 'ok';
  } else {
    el.feedback.textContent = `❌ Not quite. You said: “${rawInput || '...'}”`;
    el.feedback.className = 'bad';
  }

  el.score.textContent = String(score);
  el.total.textContent = String(total);
}

function startVoiceAnswer() {
  if (!canRecognize) {
    el.heardText.textContent = 'No voice recognition in this browser. Type answer instead.';
    return;
  }
  if (!current) startRound();

  const rec = new SpeechRecognition();
  const direction = el.directionSelect.value;
  const locale = direction === 'toEnglish' ? 'en-US' : (current.lang === 'es' ? 'es-ES' : 'zh-CN');

  rec.lang = locale;
  rec.interimResults = false;
  rec.maxAlternatives = 1;

  el.heardText.textContent = '🎙️ Listening...';
  rec.start();

  rec.onresult = (event) => {
    lastTranscript = event.results[0][0].transcript;
    el.heardText.textContent = `Heard: ${lastTranscript}`;
    checkAnswer(lastTranscript);
  };

  rec.onerror = (event) => {
    el.heardText.textContent = `Voice error: ${event.error}`;
  };
}

el.newRoundBtn.addEventListener('click', startRound);
el.playBtn.addEventListener('click', speakCurrent);
el.recordBtn.addEventListener('click', startVoiceAnswer);

el.submitBtn.addEventListener('click', () => {
  const typed = el.textAnswer.value.trim();
  checkAnswer(typed);
});

el.directionSelect.addEventListener('change', () => {
  if (current) {
    renderPrompt();
    speakCurrent();
  }
});

el.audioOnly.addEventListener('change', () => {
  if (current) renderPrompt();
});
