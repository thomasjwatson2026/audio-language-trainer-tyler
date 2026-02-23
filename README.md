# Audio Response Trainer (Spanish + Chinese)

Audio-first mobile web app for speaking practice.

## What it does
- Plays a spoken prompt (Spanish or Chinese)
- You respond out loud (self practice)
- Tap **Show Correct Response** to compare
- Tap **Play Correct Response** to hear ideal reply
- No auto-grading (by design)

## Why audio sometimes fails on phones
Some browsers require a direct user tap before speech starts. This app includes **Enable Audio** to unlock speech synthesis reliably.

## Run locally
```bash
cd language-audio-trainer
python3 -m http.server 8080
# http://localhost:8080
```
