# Zamgrh-Translator
A WWDead-era Zamgrh ↔ English translation terminal built for survivor <-> zombie communication, featuring phonetic mutation rules, lexicon loading, survivor decoding, and ambient undead audio effects.

Live Demo

https://downtathelast.github.io/Zamgrh-Translator/

Features
Dual Language Modes
Zombie Mode → English → Zamgrh (kiZombie language system:https://wiki.urbandead.com/index.php/Guides:kiZombie-English_Dictionary)
Survivor Mode → Zamgrh → approximate English decoding
External Lexicon System
Fully JSON-based dictionary (lexicon.json)
Easy expansion without touching core code

Audio Layer
Procedural zombie groan generator

Phonology Engine
Implements Zamgrh linguistic rules (sourced from:https://wiki.urbandead.com/index.php/Zamgrh)

vowel isolation handling (hr prefix)
trailing r modification rules
fallback zombification for unknown words

Immersive UI
CRT-style terminal interface
Glitch text effects
Dark “survival interface” aesthetic
WWDead-inspired visual tone

How to Run Locally
Just open index.html in a browser:

git clone https://github.com/yourusername/zamgrh-translator.git
cd zamgrh-translator
open index.html

No build tools required.

Deploy to GitHub Pages
Push repo to GitHub
Go to Settings → Pages
Set:
Source: Deploy from branch
Branch: main / root
Save
Access your live translator URL
Zamgrh System Overview

Zamgrh is a reconstructed kiZombie communication dialect, featuring:

Subject-Verb-Object structure (loose form)
Emotion-driven phoneme mutation
Context-based word substitution
Survival-era semantic drift

Example:

Human: I eat brains
Zamgrh: mah zambah barg bra!nz

Lexicon System

All vocabulary is stored in:

lexicon.json

Example entry:

"eat": "barg",
"human": "harman",
"brains": "bra!nz"

You can extend the language infinitely without modifying core logic.

Future Ideas

Planned / expandable features:
Full Zamgrh grammar parser (tense + imperative system)

Notes
Designed for browser environments only
No backend required
Works fully on GitHub Pages
Audio requires a user click to activate

Credits
Built as part of a WWDead-inspired linguistic system exploring:
kiZombie phonology (sourced from:https://wiki.urbandead.com/index.php/Guides:kiZombie-English_Dictionary)
Malton survival communication systems
undead semantic drift modeling
Zamgrh linguistic rules (sourced from:https://wiki.urbandead.com/index.php/Zamgrh)
