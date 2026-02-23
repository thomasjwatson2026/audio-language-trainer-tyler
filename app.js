const PHRASES = [
  // Spanish (19)
  { lang: 'es', prompt: 'Hola, ¿cómo estás?', promptEn: 'Hello, how are you?', response: 'Estoy bien, gracias.', responseEn: 'I am good, thank you.' },
  { lang: 'es', prompt: '¿Cómo te llamas?', promptEn: 'What is your name?', response: 'Me llamo Tyler.', responseEn: 'My name is Tyler.' },
  { lang: 'es', prompt: 'Mucho gusto.', promptEn: 'Nice to meet you.', response: 'Igualmente.', responseEn: 'Likewise.' },
  { lang: 'es', prompt: '¿De dónde eres?', promptEn: 'Where are you from?', response: 'Soy de Estados Unidos.', responseEn: 'I am from the United States.' },
  { lang: 'es', prompt: '¿Hablas inglés?', promptEn: 'Do you speak English?', response: 'Sí, hablo un poco.', responseEn: 'Yes, I speak a little.' },
  { lang: 'es', prompt: 'No entiendo.', promptEn: 'I do not understand.', response: 'Puedo repetir, por favor.', responseEn: 'Can you repeat, please.' },
  { lang: 'es', prompt: '¿Puedes hablar más despacio?', promptEn: 'Can you speak more slowly?', response: 'Sí, claro.', responseEn: 'Yes, of course.' },
  { lang: 'es', prompt: '¿Dónde está el baño?', promptEn: 'Where is the bathroom?', response: 'Está allí.', responseEn: 'It is over there.' },
  { lang: 'es', prompt: '¿Cuánto cuesta?', promptEn: 'How much does it cost?', response: 'Cuesta diez dólares.', responseEn: 'It costs ten dollars.' },
  { lang: 'es', prompt: 'Quiero agua, por favor.', promptEn: 'I want water, please.', response: 'Aquí tienes agua.', responseEn: 'Here is water.' },
  { lang: 'es', prompt: '¿Qué hora es?', promptEn: 'What time is it?', response: 'Son las tres.', responseEn: 'It is three o’clock.' },
  { lang: 'es', prompt: 'Tengo hambre.', promptEn: 'I am hungry.', response: 'Vamos a comer.', responseEn: 'Let’s go eat.' },
  { lang: 'es', prompt: 'Tengo sueño.', promptEn: 'I am sleepy.', response: 'Descansa un poco.', responseEn: 'Rest a little.' },
  { lang: 'es', prompt: 'Estoy perdido.', promptEn: 'I am lost.', response: 'Te ayudo con el mapa.', responseEn: 'I will help you with the map.' },
  { lang: 'es', prompt: 'Necesito ayuda.', promptEn: 'I need help.', response: 'Estoy aquí para ayudarte.', responseEn: 'I am here to help you.' },
  { lang: 'es', prompt: '¿Dónde vives?', promptEn: 'Where do you live?', response: 'Vivo en California.', responseEn: 'I live in California.' },
  { lang: 'es', prompt: '¿Te gusta la música?', promptEn: 'Do you like music?', response: 'Sí, me encanta la música.', responseEn: 'Yes, I love music.' },
  { lang: 'es', prompt: 'Gracias por tu tiempo.', promptEn: 'Thanks for your time.', response: 'De nada.', responseEn: 'You are welcome.' },
  { lang: 'es', prompt: 'Hasta mañana.', promptEn: 'See you tomorrow.', response: 'Nos vemos mañana.', responseEn: 'See you tomorrow.' },

  // Chinese (19)
  { lang: 'zh', prompt: '你好，你怎么样？', promptEn: 'Hello, how are you?', response: '我很好，谢谢。', responseEn: 'I am good, thank you.', responsePinyin: 'Wǒ hěn hǎo, xièxie.' },
  { lang: 'zh', prompt: '你叫什么名字？', promptEn: 'What is your name?', response: '我叫 Tyler。', responseEn: 'My name is Tyler.', responsePinyin: 'Wǒ jiào Tyler.' },
  { lang: 'zh', prompt: '很高兴认识你。', promptEn: 'Nice to meet you.', response: '我也很高兴认识你。', responseEn: 'Nice to meet you too.', responsePinyin: 'Wǒ yě hěn gāoxìng rènshi nǐ.' },
  { lang: 'zh', prompt: '你从哪里来？', promptEn: 'Where are you from?', response: '我来自美国。', responseEn: 'I come from the U.S.', responsePinyin: 'Wǒ láizì Měiguó.' },
  { lang: 'zh', prompt: '你会说英语吗？', promptEn: 'Do you speak English?', response: '会一点。', responseEn: 'A little.', responsePinyin: 'Huì yìdiǎn.' },
  { lang: 'zh', prompt: '我不懂。', promptEn: 'I do not understand.', response: '请再说一遍。', responseEn: 'Please say it again.', responsePinyin: 'Qǐng zài shuō yí biàn.' },
  { lang: 'zh', prompt: '请说慢一点。', promptEn: 'Please speak more slowly.', response: '好的，没问题。', responseEn: 'Okay, no problem.', responsePinyin: 'Hǎo de, méi wèntí.' },
  { lang: 'zh', prompt: '洗手间在哪里？', promptEn: 'Where is the bathroom?', response: '在那边。', responseEn: 'Over there.', responsePinyin: 'Zài nàbiān.' },
  { lang: 'zh', prompt: '多少钱？', promptEn: 'How much is it?', response: '十美元。', responseEn: 'Ten dollars.', responsePinyin: 'Shí měiyuán.' },
  { lang: 'zh', prompt: '我想要水。', promptEn: 'I want water.', response: '给你水。', responseEn: 'Here is water.', responsePinyin: 'Gěi nǐ shuǐ.' },
  { lang: 'zh', prompt: '现在几点？', promptEn: 'What time is it?', response: '三点。', responseEn: 'Three o’clock.', responsePinyin: 'Sān diǎn.' },
  { lang: 'zh', prompt: '我饿了。', promptEn: 'I am hungry.', response: '我们去吃饭吧。', responseEn: 'Let us go eat.', responsePinyin: 'Wǒmen qù chīfàn ba.' },
  { lang: 'zh', prompt: '我困了。', promptEn: 'I am sleepy.', response: '休息一下。', responseEn: 'Take a rest.', responsePinyin: 'Xiūxi yíxià.' },
  { lang: 'zh', prompt: '我迷路了。', promptEn: 'I am lost.', response: '我帮你看地图。', responseEn: 'I will help with the map.', responsePinyin: 'Wǒ bāng nǐ kàn dìtú.' },
  { lang: 'zh', prompt: '我需要帮助。', promptEn: 'I need help.', response: '我来帮你。', responseEn: 'I will help you.', responsePinyin: 'Wǒ lái bāng nǐ.' },
  { lang: 'zh', prompt: '你住在哪里？', promptEn: 'Where do you live?', response: '我住在加州。', responseEn: 'I live in California.', responsePinyin: 'Wǒ zhù zài Jiāzhōu.' },
  { lang: 'zh', prompt: '你喜欢音乐吗？', promptEn: 'Do you like music?', response: '喜欢，我很喜欢音乐。', responseEn: 'Yes, I like music a lot.', responsePinyin: 'Xǐhuan, wǒ hěn xǐhuan yīnyuè.' },
  { lang: 'zh', prompt: '谢谢你的时间。', promptEn: 'Thanks for your time.', response: '不客气。', responseEn: 'You are welcome.', responsePinyin: 'Bú kèqi.' },
  { lang: 'zh', prompt: '明天见。', promptEn: 'See you tomorrow.', response: '明天见！', responseEn: 'See you tomorrow!', responsePinyin: 'Míngtiān jiàn!' },
];

const el = {
  languageSelect: document.getElementById('languageSelect'),
  unlockBtn: document.getElementById('unlockBtn'),
  nextBtn: document.getElementById('nextBtn'),
  playPromptBtn: document.getElementById('playPromptBtn'),
  revealBtn: document.getElementById('revealBtn'),
  playAnswerBtn: document.getElementById('playAnswerBtn'),
  status: document.getElementById('status'),
  promptHint: document.getElementById('promptHint'),
  answerBox: document.getElementById('answerBox'),
  answerText: document.getElementById('answerText'),
  answerTranslit: document.getElementById('answerTranslit'),
  answerEnglish: document.getElementById('answerEnglish'),
};

let current = null;
let audioUnlocked = false;
let voicesReady = false;

function getPool() {
  const selected = el.languageSelect.value;
  if (selected === 'mixed') return PHRASES;
  return PHRASES.filter((p) => p.lang === selected);
}

function chooseRandom() {
  const pool = getPool();
  return pool[Math.floor(Math.random() * pool.length)];
}

function speechLang(item) {
  return item.lang === 'es' ? 'es-ES' : 'zh-CN';
}

function ensureVoicesLoaded() {
  const v = window.speechSynthesis.getVoices();
  voicesReady = v.length > 0;
  return voicesReady;
}

function setStatus(msg) {
  el.status.textContent = msg;
}

function speak(text, lang) {
  if (!audioUnlocked) {
    setStatus('Audio locked. Tap "Enable Audio" first.');
    return;
  }
  if (!text) return;

  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = lang || 'en-US';
  u.rate = 0.92;
  u.pitch = 1;
  u.volume = 1;

  const voices = window.speechSynthesis.getVoices();
  const preferred = voices.find(v => v.lang.toLowerCase().startsWith((lang || 'en').toLowerCase().split('-')[0]));
  if (preferred) u.voice = preferred;

  u.onstart = () => setStatus('Playing audio...');
  u.onend = () => setStatus('Done.');
  u.onerror = (e) => setStatus(`Audio error: ${e.error || 'unknown'}`);

  window.speechSynthesis.speak(u);
}

function renderCard() {
  if (!current) return;
  el.promptHint.textContent = `Listen and answer out loud. (${current.lang.toUpperCase()})`;
  el.answerText.textContent = current.response;
  el.answerTranslit.textContent = current.responsePinyin ? `Pinyin: ${current.responsePinyin}` : '';
  el.answerEnglish.textContent = `English: ${current.responseEn}`;
  el.answerBox.classList.add('hidden');
}

function newPrompt() {
  current = chooseRandom();
  renderCard();
  playPrompt();
}

function playPrompt() {
  if (!current) {
    setStatus('Pick a prompt first.');
    return;
  }
  speak(current.prompt, speechLang(current));
}

function playAnswer() {
  if (!current) return;
  speak(current.response, speechLang(current));
}

function unlockAudio() {
  ensureVoicesLoaded();
  audioUnlocked = true;

  // tiny unlock utterance; required on some mobile browsers
  const test = new SpeechSynthesisUtterance('Audio enabled');
  test.lang = 'en-US';
  test.volume = 0.01;
  window.speechSynthesis.speak(test);
  window.speechSynthesis.cancel();

  setStatus(voicesReady ? 'Audio enabled. Ready.' : 'Audio enabled. Voices still loading...');
}

window.speechSynthesis.onvoiceschanged = () => {
  voicesReady = true;
  if (audioUnlocked) setStatus('Audio voices loaded. Ready.');
};

el.unlockBtn.addEventListener('click', unlockAudio);
el.nextBtn.addEventListener('click', newPrompt);
el.playPromptBtn.addEventListener('click', playPrompt);
el.revealBtn.addEventListener('click', () => el.answerBox.classList.remove('hidden'));
el.playAnswerBtn.addEventListener('click', playAnswer);

// initial
ensureVoicesLoaded();
