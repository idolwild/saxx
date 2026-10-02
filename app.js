/* Saxx — flirtatious, romantic, connection-building roulette (vanilla, no deps) */
(function () {
  'use strict';

  var root = document.getElementById('root');
  var LS_KEY = 'saxx_settings_v1';

  /* Custom Saxx line icons — one continuous sensual stroke each, no emoji. */
  var ICONS = {
    touch: '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M32 56C22 46 12 38 12 26c0-7 5-12 11-12 4 0 7 2 9 5 2-3 5-5 9-5 6 0 11 5 11 12 0 12-10 20-20 30z"/><path d="M22 30c3 2 6 5 10 9 4-4 7-7 10-9"/></svg>',
    feels: '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M32 54C22 45 13 37 13 26c0-6 5-11 11-11 4 0 7 2 8 5 1-3 4-5 8-5 6 0 11 5 11 11 0 11-9 19-19 28z"/><path d="M8 12l3.5 3.5M56 12l-3.5 3.5M5 32h5M54 32h5"/></svg>',
    questions: '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 46l-7 7V20a6 6 0 0 1 6-6h30a6 6 0 0 1 6 6v16a6 6 0 0 1-6 6H26z"/><path d="M22 25c2-4 11-6 15-2 3 3 2 8-2 10l-4 3 1-5c-4 1-11-1-10-6z"/></svg>',
    dares: '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M32 6c2 8 8 12 8 20a8 8 0 0 1-16 0c0-4 2-6 3-8 1 2 3 3 5 3-.5-5-1-10 0-15z"/><path d="M20 42h24l-3 14H23z"/><path d="M18 42c0 6 6 10 14 10s14-4 14-10"/></svg>'
  };

  var CATS = [
    { id: 'touch', name: 'Touch', full: 'Micro-Intimacy & Touch', desc: 'Physical Oxytocin', color: '#ff2fb3', soft: '#ffc4e2', deep: '#7a0a52' },
    { id: 'feels', name: 'Feels', full: 'Feels & Vulnerability', desc: 'Tender Oxytocin', color: '#e0447c', soft: '#f6b8d0', deep: '#6e1035' },
    { id: 'questions', name: 'Connect', full: 'Connection & Curiosity', desc: 'Verbal Oxytocin', color: '#f5a623', soft: '#ffe3a8', deep: '#7a4a00' },
    { id: 'dares', name: 'Dare', full: 'Playful Dares & Temptation', desc: 'Playful Oxytocin', color: '#ff4d5e', soft: '#ffb3ba', deep: '#7d0e1c' }
  ];

  function catById(id) {
    for (var i = 0; i < CATS.length; i++) if (CATS[i].id === id) return CATS[i];
    return CATS[0];
  }

  /* Prompt decks: { title, text, timer (sec or 0) }
     Friends = platonic, group-friendly. Lovers levels rise in sensuality but
     stay      consensual, non-graphic, comfort-focused. X-Full is suggestive,
     never pornographic. Roots: Gottman rituals, Māori hongi, sobremesa,
     hygge, fika, Aron 36, EFT, tango, gongfu tea, kintsugi, ubuntu,
     passeggiata, tantra, four connections. */
  var PROMPTS = {
    friends: {
      touch: [
        { title: 'Hygge Nest', text: 'Denmark’s hygge = safe, cozy togetherness. Pile blankets and pillows, lights low, phones away. Sit shoulder-to-shoulder and breathe together.', timer: 45 },
        { title: 'High-Five Remix', text: 'Invent a secret 3-step handshake with someone here. Teach it to the group in 60 seconds.', timer: 60 },
        { title: 'Passeggiata Loop', text: 'Borrow Italy’s evening stroll: link arms in pairs and loop the room or block once, waving at strangers like locals.', timer: 90 },
        { title: 'Sobremesa Hands', text: 'Latin America lingers at the table after eating. Pass a warm mug hand-to-hand around the circle — whoever holds it shares one good thing from today.', timer: 60 },
        { title: 'Ubuntu Shoulders', text: 'Ubuntu: “I am because we are.” Stand in a circle, hands on neighbors’ shoulders, three slow breaths together. Silliest exhale gives the next compliment.', timer: 30 }
      ],
      questions: [
        { title: 'Sobremesa Rules', text: 'Sobremesa is where real selves come out after dessert. Deal one: what’s something you’d only admit after the plates are cleared?', timer: 0 },
        { title: 'Secret Superpower', text: 'What’s a hidden talent or party trick you’ve never shown this group?', timer: 0 },
        { title: 'Golden Crack', text: 'Kintsugi mends broken pottery with gold. What’s a crack in your life that turned golden?', timer: 0 },
        { title: 'Fated Thread', text: 'China’s yuànfèn says some meetings are fated. Which chance encounter changed your path?', timer: 0 },
        { title: 'Ubuntu Story', text: 'Ubuntu: I am because we are. Who made you who you are — and have you told them?', timer: 0 },
        { title: 'Shared Breath', text: 'With respect for the Māori hongi — the sharing of breath: stand close, no touching needed, hold kind eye contact and breathe in sync three times.', timer: 30 },
        { title: 'Mirror Faces', text: 'Face a partner and mirror their expressions for 30 seconds. No touching, just presence and laughter.', timer: 30 },
        { title: 'Fika Toast', text: 'Swedish fika = coffee plus presence. Pair up over real or imaginary coffee, hold warm eye contact 20 seconds, then toast: “to being here.”', timer: 30 },
        { title: 'Gratitude Glance', text: 'Look around the circle. Silently pick one thing you appreciate about each person, then share one out loud.', timer: 60 },
        { title: 'Weather Report', text: 'Connection starts in your own skin. Go around: what’s your body’s weather today — sunny, foggy, stormy — and what does it need?', timer: 0 },
        { title: 'Awe Audit', text: 'Awe shrinks the self and grows the bond. Describe a moment — cosmos, ocean, music — that made you feel tiny in the best way.', timer: 0 }
      ],
      dares: [
        { title: 'La Bise Run', text: 'France’s cheek-kiss greeting, speed round: air-kiss both cheeks down the line, each with a one-word blessing — joy! courage! snacks!', timer: 45 },
        { title: 'Compliment Bomb', text: 'Give rapid-fire compliments to the person on your right for 20 seconds. No repeats.', timer: 20 },
        { title: 'Flirt Fail Theater', text: 'Act out the worst flirty pickup line you can invent. Group votes: charming or tragic?', timer: 45 },
        { title: 'Hygge Skål', text: 'Raise a glass to hygge — the Danish art of cozy togetherness. Worst Danish accent wins.', timer: 30 }
      ],
      feels: [
        { title: 'Laugh Out Loud', text: 'What makes you laugh out loud — ugly-laugh, zero control? Tell the story. Bonus points for the impression.', timer: 0 },
        { title: 'Scar Stories', text: 'Show a scar — skin or story — and tell what it taught you. Everyone listens, nobody fixes.', timer: 0 },
        { title: 'Smell of Home', text: 'Which smell teleports you home? Fresh bread, rain on hot road, sunscreen? Go around the circle, one each.', timer: 0 },
        { title: 'Soft Fears', text: 'When do you feel most afraid? Silly fears welcome — pigeons, voicemail, the dark basement.', timer: 0 },
        { title: 'Heavy Thing, Held Lightly', text: 'Name one heavy thing you’re carrying in a single sentence. The circle answers with ten seconds of silent shoulder contact.', timer: 60 },
        { title: 'Borrowed Calm', text: 'Nervous systems lend each other calm — that’s co-regulation. Pair up, breathe slowly together for 30 seconds, then report: whose calm did you borrow?', timer: 30 }
      ]
    },
    sweet: {
      touch: [
        { title: '60-Second Hand Massage', text: 'Hold your partner’s hand, look in their eyes, and give a gentle hand massage without talking.', timer: 60 },
        { title: 'Gongfu Hands', text: 'In gongfu tea culture warmth passes hand to hand. Warm your palms, wrap your partner’s hands, and breathe together.', timer: 45 },
        { title: 'Three Soft Kisses', text: 'Kiss your partner in three places that aren’t the lips — e.g. forehead, cheek, hand. Ask first where they’d like it most.', timer: 60 },
        { title: 'La Bise, Slowly', text: 'Borrow France’s cheek-kiss and slow it down: one lingering kiss per cheek, then the forehead. Ask first; linger like you mean it.', timer: 45 },
        { title: 'Heartbeat Hands', text: 'Place your palm over their heart, theirs over yours. Feel the rhythm for 30 seconds without speaking.', timer: 30 },
        { title: 'The Tantric Seat', text: 'Tantra’s seated embrace, clothed: one sits cross-legged, the other settles into their lap, chest to chest. Breathe as one for a full minute.', timer: 60 }
      ],
      questions: [
        { title: 'Perfect Day', text: 'From Aron’s closeness lab: what would constitute a perfect day for you — and what role do I play in it?', timer: 0 },
        { title: 'Secret Spark', text: 'What is one subtle touch or gesture I do that secretly melts you?', timer: 0 },
        { title: 'Crystal Ball', text: 'Aron again: if a crystal ball answered one truth — about you, us, the future — what would you ask, and why that?', timer: 0 },
        { title: 'We Statements', text: 'Make three true “we” statements each. Begin: “We are both in this room feeling…”', timer: 0 },
        { title: 'Gratitude Trio', text: 'Name three small, specific things from this week you’re grateful I did. Specific beats grand.', timer: 0 },
        { title: 'Heart-Centered Gazing', text: 'Right hand over your partner’s heart. Hold eye contact 30 seconds, no speaking. Breathe in sync.', timer: 30 },
        { title: 'Namaste Rise', text: '“The light in me sees the light in you.” Palms together, bow to each other — then rise into 30 seconds of soft eye contact.', timer: 30 },
        { title: 'Sweet Appreciation', text: 'Gaze 45 seconds. Take turns finishing: “One small thing I love about the way you walk through the world is…”', timer: 45 },
        { title: 'Honi Rest', text: 'Hawai‘i’s honi greets by pressing foreheads. Touch foreheads, close your eyes, share three breaths — then open your eyes together.', timer: 45 },
        { title: 'Most Seen', text: 'When have you felt most seen by me — not praised, truly recognized? I want the blueprint so I can do it on purpose.', timer: 0 },
        { title: 'Hidden Room', text: 'Everyone has a locked room inside. Describe the door of yours — you don’t have to open it yet.', timer: 0 }
      ],
      dares: [
        { title: 'Back Word Trace', text: 'Trace a sweet word on your partner’s back with your fingertip. Two guesses — if they get it, they request a favor.', timer: 45 },
        { title: 'Tango Walk', text: 'Argentine tango begins with the embrace-walk: chest to chest, clothed and consensual, walk slowly around the room as one body.', timer: 60 },
        { title: 'Slow Dance Freeze', text: 'Slow dance with no music for 45 seconds. Freeze when one of you laughs — hold the pose 5 seconds.', timer: 45 },
        { title: 'Fika Service', text: 'Serve your partner an imaginary fika: describe the pastry, the coffee, the candlelight — then feed them one real bite of anything.', timer: 45 },
        { title: 'Six-Second Kiss', text: 'Gottman’s signature ritual: a kiss needs six seconds to turn romantic. Set the timer, kiss for the full six, no rushing the landing.', timer: 15 }
      ],
      feels: [
        { title: 'Rub Here?', text: 'Guide my hand somewhere safe — scalp, shoulders, hands — and rate it out loud 1 to 10 as I rub. Narrate everything you feel.', timer: 60 },
        { title: 'Laugh Files', text: 'What makes you laugh out loud? Reenact the exact moment for me. I’ll try not to fall harder.', timer: 0 },
        { title: 'Scent of You', text: 'What do I smell like to you? Bury your nose in my sweater, my skin, my hair — and report back poetically.', timer: 0 },
        { title: 'Afraid, Softly', text: 'When do you feel most afraid? Tell me one. I’ll just hold your hand and listen all the way through.', timer: 0 },
        { title: 'Goosebump Map', text: 'I trace slowly; you say “warmer” until I find the spot that gives you goosebumps. Then I stay there a while.', timer: 60 },
        { title: 'Arrive First', text: 'Tantra begins with yourself: eyes closed, thirty seconds on your own breath, heartbeat, skin — then open your eyes and meet me, already home.', timer: 30 }
      ]
    },
    romantic: {
      touch: [
        { title: 'Turning Toward', text: 'Gottman’s core move: answer your partner’s “bids.” One of you makes three tiny bids — a look, a touch, a question — and the other turns toward every single one.', timer: 90 },
        { title: 'Breath-Sync Hold', text: 'Spoon or sit back-to-chest. Inhale 4 counts together, exhale 6. Hands resting where both agree is comfortable.', timer: 60 },
        { title: 'Warm-Oil Prelude', text: 'Ayurveda’s abhyanga, clothed and consensual: warm lotion between your palms, slow shoulders, asking about pressure throughout.', timer: 120 },
        { title: 'Kintsugi Hold', text: 'Hold the part of them that aches today — hand, shoulder, knee — like gold in a crack. Sixty seconds, no fixing, just warmth.', timer: 60 },
        { title: 'Nordic Contrast', text: 'Borrow Finland: after warmth (blankets, bath, shower), press something cool — a glass, a smooth stone — to their wrists. Contrast wakes the skin.', timer: 60 },
        { title: 'First-Time Hands', text: 'The tantric rule: touch as if it’s the first time you’ve ever felt skin. Backs of hands, forearms, neck — glacially slow, full attention, nowhere to be.', timer: 120 },
        { title: 'Set the Temple', text: 'Tantra treats setting as sacred: together, dim the lights, one candle, one scent, phones in another room. The ritual IS the foreplay.', timer: 300 }
      ],
      questions: [
        { title: 'Love Maps, Updated', text: 'Gottman’s foundation: detailed love maps. Update yours — name their current stress, their current dream, and their current favorite small pleasure.', timer: 0 },
        { title: 'Name the Loop', text: 'Sue Johnson says every couple has a “demon dialogue” loop. Name yours with humor — then name what you actually need underneath it.', timer: 0 },
        { title: 'Deeper Current', text: 'When do you feel most emotionally safe with me — and how can I create more of that?', timer: 0 },
        { title: 'Treasured and Terrible', text: 'Aron’s pair, no shortcuts: your most treasured memory, then your most terrible. I’ll just listen.', timer: 0 },
        { title: 'Repair & Tenderness', text: 'What’s one small thing I could do after a hard day that would tell you “I’m here”?', timer: 0 },
        { title: 'Sobremesa for Two', text: 'No phones, no clearing up: five lingering minutes of table talk. Open with: what are you carrying that I can’t see?', timer: 300 },
        { title: 'Love Map Eyes', text: 'Eye contact 60 seconds, hand over heart. Then share: one stress plus one dream from this week.', timer: 60 },
        { title: 'Are You There', text: 'EFT’s key question is “are you there for me?” Gaze 30 seconds, then each answer: when did you feel me there this week — and when did you miss me?', timer: 60 },
        { title: 'Silent Thanks', text: 'Gaze 30 seconds thinking of something they did that carried you. Then tell them in one sentence.', timer: 45 },
        { title: 'Four-Minute Fall', text: 'The famous finale: four uninterrupted minutes of eye contact, no talking. Let your nervous systems introduce themselves.', timer: 240 },
        { title: 'Fondness & Admiration', text: 'Gottman’s antidote to contempt: gaze softly and trade three specific things you admire about each other. Character, not compliments on looks.', timer: 90 },
        { title: 'Never Asked', text: 'What do you need that you’ve never asked anyone for? I’m asking now — and I can handle the answer.', timer: 0 },
        { title: 'Adored Anyway', text: 'What would you try, say, or admit if you knew I’d adore you anyway?', timer: 0 }
      ],
      dares: [
        { title: 'Vow Whisper', text: 'Whisper a 10-second vow: one thing you promise to protect about “us.” Seal with a forehead kiss.', timer: 30 },
        { title: 'Passeggiata, Ours', text: 'Steal Italy’s evening stroll: walk arm in arm — around the block or just the room — no destination, pointing out beautiful things.', timer: 180 },
        { title: 'Hello Ritual', text: 'Invent our hello-and-goodbye ritual. Perform it three times until it feels like ours.', timer: 60 },
        { title: 'Tea for Two', text: 'Brew one small pot together in silence. Pour for each other with both hands. Drink it looking at each other.', timer: 180 },
        { title: 'Stress Download', text: 'Gottman’s end-of-day ritual, compressed: two minutes each to unload the day’s stress. Listener asks only curious questions — no advice, no fixing.', timer: 300 }
      ],
      feels: [
        { title: 'Wound to Gold', text: 'Share a wound that shaped you — only what feels safe to say aloud. I’ll listen, then mirror back the strength I hear in it. Pass anytime.', timer: 0 },
        { title: 'Rub Here, Precisely', text: 'Direct me exactly — place, pressure, pace — while I follow your words. Tell me the moment nice turns electric.', timer: 90 },
        { title: 'Scent Binding', text: 'Find the scent on me that smells like home. Breathe it in, eyes closed, for thirty seconds. That one is yours now.', timer: 30 },
        { title: 'Afraid Together', text: 'Tell me one fear you carry. I’ll answer with exactly how I’d show up inside it with you.', timer: 0 },
        { title: 'Shiver Confession', text: 'Slow fingertip trails, my eyes on yours. Confess the instant it shivers — words, no hiding.', timer: 60 },
        { title: 'Under Stars', text: 'Connection to the world: get under the sky — outside, or every window open — find the moon or one star together, and say one true thing each into the dark.', timer: 120 },
        { title: 'One Intention', text: 'Connection to something greater: light one candle and speak a single shared intention aloud — for us, for the year, for the world.', timer: 60 }
      ]
    },
    xfull: {
      touch: [
        { title: 'Slow Massage Prelude', text: 'With enthusiastic consent, offer a slow shoulder and neck massage with lotion or oil. Ask about pressure throughout — savor, don’t rush.', timer: 120 },
        { title: 'Oil and Attention', text: 'Warm oil between palms, slow strokes, shoulders to hands only unless you renegotiate. Narrate what you find: tension, warmth, shivers.', timer: 180 },
        { title: 'Kiss Map', text: 'Ask where they’d love slow kisses — neck, shoulders, hands. Explore only what they name, checking in as you go.', timer: 90 },
        { title: 'Breath on Skin', text: 'Hover your lips a breath above their neck or shoulder — no contact — and exhale slowly. Ask where they felt it most.', timer: 60 },
        { title: 'Breath Leads', text: 'The tantric rule: breath leads, hands follow. Sync breath first, then let one slow stroke land per exhale. Never rush the inhale.', timer: 120 }
      ],
      questions: [
        { title: 'Slow Burn Confession', text: 'What’s one subtle touch I do that secretly drives you wild — and when do you want more of it?', timer: 0 },
        { title: 'Beautiful Mystery', text: 'Esther Perel says desire needs a little mystery. What’s something about you I still haven’t discovered?', timer: 0 },
        { title: 'Yes / More / Pause', text: 'Each name one “yes,” one “more of this,” and one “pause” for tonight. Thank each other for the honesty.', timer: 0 },
        { title: 'Aftercare Pact', text: 'Before the heat: agree your aftercare. Water? A blanket? Quiet holding? Planning tenderness is sexy.', timer: 0 },
        { title: 'Charged Eye Lock', text: 'Close and clothed, chest to chest. Forty-five seconds of eye contact, breathing together. Let anticipation build — hands still.', timer: 45 },
        { title: 'Candle Mirror', text: 'One candle between you, lights low. Watch the flame reflected in each other’s eyes for a minute. Whisper what you see there.', timer: 60 },
        { title: 'Desire Mirror', text: 'Gaze 30 seconds, then take turns finishing: “Right now I’m craving more…” Honest and kind. Pass anytime.', timer: 60 },
        { title: 'To Be Witnessed', text: 'Being seen is the deepest turn-on: which part of your desire most wants to be witnessed — and by me?', timer: 0 }
      ],
      dares: [
        { title: 'Blindfold Trust', text: 'Only with an eager yes from both: one wears a soft blindfold while the other traces an ice cube or fingertip along pre-agreed safe spots. Safe word ends it instantly.', timer: 90 },
        { title: 'Slowest Kiss', text: 'One kiss, sixty seconds minimum, as slow as physically possible. If either pauses, hold each other instead.', timer: 60 },
        { title: 'Two-Minute Savor', text: 'Two minutes, one rule: slower is better. If either says pause, freeze and simply hold each other.', timer: 120 },
        { title: 'Words First', text: 'Take turns describing one thing you’d love to slowly unwrap later — proceed only on an eager yes from both. Otherwise savor the tease and move on.', timer: 60 }
      ],
      feels: [
        { title: 'Gentle Teeth', text: 'Only on an eager yes: one slow, gentle graze of teeth where they invite — earlobe, shoulder. Check in before, during, and after.', timer: 60 },
        { title: 'The Full Map', text: 'Your body, your rules: guide my hands anywhere you’ve cleared, rating 1 to 10 out loud. Red means stop instantly — honored, no questions.', timer: 120 },
        { title: 'Scent Worship', text: 'Necks, wrists, hair — explore me by scent. Tell me which one undoes you, and why.', timer: 90 },
        { title: 'Held Through It', text: 'Say the fear you never say out loud. Be held through the whole telling — breath synced, no fixing, no flinching.', timer: 0 },
        { title: 'The Signal Word', text: 'If old wounds surface tonight, we pause and hold. Agree our signal word now. Honoring it is the hottest thing we’ll do.', timer: 0 },
        { title: 'Witness Me', text: 'Look at me and tell me what you see — not my body, me. What am I carrying tonight? Be devastatingly precise, then hold what you find.', timer: 0 }
      ]
    }
  };

  var state = load() || {
    step: 0, ageOk: false, party: null, vibe: null, level: null,
    lastCat: null, lastIdx: {}, spinning: false, history: []
  };
  // Transient flags must never survive a reload — a mid-spin reload would
  // otherwise wedge the Spin button and card swipe forever.
  state.spinning = false;

  function load() {
    try { return JSON.parse(localStorage.getItem(LS_KEY) || 'null'); } catch (e) { return null; }
  }
  function save() {
    try {
      var c = {};
      for (var k in state) {
        if (k === 'spinning' || k === 'spinStarted') continue;
        if (Object.prototype.hasOwnProperty.call(state, k)) c[k] = state[k];
      }
      localStorage.setItem(LS_KEY, JSON.stringify(c));
    } catch (e) {}
  }
  function esc(s) {
    return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }
  function modeKey() {
    if (state.vibe === 'friends') return 'friends';
    return state.level || 'sweet';
  }
  function modeLabel() {
    if (state.vibe === 'friends') return 'Friends / Party';
    if (state.level === 'sweet') return 'Flirty & Sweet';
    if (state.level === 'romantic') return 'Deep & Romantic';
    if (state.level === 'xfull') return 'X-Full';
    return '';
  }

  /* ---------- timer ---------- */
  var tickId = null, remain = 0, total = 0, timerDone = false;
  function stopTimer() {
    if (tickId) { clearInterval(tickId); tickId = null; }
  }
  function fmt(s) {
    s = Math.max(0, Math.round(s));
    return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0');
  }
  function startTimer(secs) {
    stopTimer();
    if (!secs) return;
    remain = secs; total = secs; timerDone = false;
    paintTimer();
    armTimer();
  }
  function armTimer() {
    stopTimer();
    tickId = setInterval(function () {
      remain -= 1;
      if (remain <= 0) { remain = 0; stopTimer(); timerDone = true; buzz([60, 40, 60]); }
      paintTimer();
    }, 1000);
    var f = root.querySelector('#t-face');
    if (f) f.classList.remove('paused');
    paintTimer();
  }
  // Tap the countdown to pause / resume. No buttons.
  function toggleTimer() {
    if (timerDone || remain <= 0) return;
    if (tickId) {
      stopTimer();
      var f = root.querySelector('#t-face');
      if (f) f.classList.add('paused');
      paintTimer();
    } else {
      armTimer();
      buzz(10);
    }
  }
  function paintTimer() {
    var f = root.querySelector('#t-face'), b = root.querySelector('#t-bar');
    var hint = root.querySelector('#t-hint'), replay = root.querySelector('#t-replay');
    if (timerDone) {
      if (f) f.hidden = true;
      if (b) b.style.width = '0%';
      if (hint) hint.textContent = '';
      if (replay) replay.hidden = false;
      return;
    }
    if (!f) return;
    f.hidden = false;
    f.textContent = fmt(remain);
    f.classList.toggle('paused', !tickId);
    if (b) b.style.width = total ? (100 * remain / total) + '%' : '100%';
    if (hint) hint.textContent = tickId ? 'tap the time to pause' : 'paused — tap to resume';
    if (replay) replay.hidden = true;
  }
  function buzz(p) {
    try { if (navigator.vibrate) navigator.vibrate(p); } catch (e) {}
  }

  /* ---------- spin engine ---------- */
  function pickPrompt() {
    var mk = modeKey();
    var pool = PROMPTS[mk] || PROMPTS.sweet;
    var catIds = CATS.map(function (c) { return c.id; });
    var ci = Math.floor(Math.random() * catIds.length);
    if (catIds.length > 1 && catIds[ci] === state.lastCat) {
      ci = (ci + 1 + Math.floor(Math.random() * (catIds.length - 1))) % catIds.length;
    }
    var cat = catIds[ci];
    var list = pool[cat] || [];
    if (!list.length) return null;
    var used = state.lastIdx[mk + ':' + cat];
    var idx = Math.floor(Math.random() * list.length);
    if (list.length > 1 && idx === used) idx = (idx + 1) % list.length;
    state.lastIdx[mk + ':' + cat] = idx;
    state.lastCat = cat;
    save();
    var meta = CATS.filter(function (c) { return c.id === cat; })[0];
    return { cat: cat, meta: meta, prompt: list[idx] };
  }

  /* One image at a time: a single large card. Swipe it and the next
     random moment slides in with a touch transition. */
  function setFace(card, cat) {
    if (!card || !cat) return;
    card.setAttribute('data-cat', cat.id);
    card.style.setProperty('--c', cat.color);
    card.style.setProperty('--soft', cat.soft);
    card.style.setProperty('--deep', cat.deep);
    var art = card.querySelector('.swipe-art');
    if (art) art.innerHTML = ICONS[cat.id];
    var nm = card.querySelector('.swipe-name');
    if (nm) nm.textContent = cat.name;
    var glow = root.querySelector('#deck-glow');
    if (glow) glow.style.background = 'radial-gradient(closest-side, ' + cat.color + 'e6, transparent 72%)';
  }

  function randomFace() { return CATS[Math.floor(Math.random() * CATS.length)]; }

  function commitResult(result) {
    state.history.unshift({ cat: result.cat, title: result.prompt.title, at: Date.now() });
    state.history = state.history.slice(0, 20);
    save();
  }

  function randomize(dir) {
    var nowT = Date.now();
    if (state.spinning) {
      if (!state.spinStarted || nowT - state.spinStarted < 5000) return;
    }
    state.spinning = true;
    state.spinStarted = nowT;
    try {
      stopTimer();
      var result = pickPrompt();
      commitResult(result);
      buzz([30, 30, 60]);
      renderPrompt(result, dir || 'right');
      if (result.prompt.timer) startTimer(result.prompt.timer);
    } finally {
      state.spinning = false;
    }
  }

  // SPIN button + tap on the image: faces flash by, then the dealt card lands.
  function doSpin() {
    var nowT = Date.now();
    if (state.spinning) {
      if (!state.spinStarted || nowT - state.spinStarted < 5000) return;
    }
    var card = root.querySelector('#swipe-card');
    if (!card) return;
    state.spinning = true;
    state.spinStarted = nowT;
    stopTimer();
    buzz(20);
    card.classList.add('shuffling');
    var n = 0;
    var iv = setInterval(function () {
      n++;
      setFace(card, randomFace());
      buzz(6);
      if (n >= 8) {
        clearInterval(iv);
        card.classList.remove('shuffling');
        state.spinning = false;
        randomize('right');
      }
    }, 85);
  }

  /* ---------- render ---------- */
  function dots(n, on) {
    var s = '';
    for (var i = 0; i < n; i++) s += '<i class="' + (i === on ? 'on' : '') + '"></i>';
    return '<div class="dots">' + s + '</div>';
  }

  function consentHTML() {
    return '<div class="consent"><span class="dot">💚</span><span><b>Consent is sexy.</b> Every player has full permission to pass on any spin with zero pressure. Tap <b>Pass</b> anytime to spin again.</span></div>';
  }

  function shell(inner, pillText) {
    return '<div class="app">' +
      '<div class="screen">' + inner + '</div>' +
      '<div class="footbar"><span class="foot-logo">SAXX</span>' +
      '<span class="foot-sub">adults 18+ · consent is sexy</span>' +
      (pillText ? '<span class="foot-pill">' + esc(pillText) + '</span>' : '') +
      '</div></div>';
  }

  function render() {
    stopTimer();
    if (state.step < 4) renderOnboarding();
    else {
      // Deal immediately — no idle placeholder, the first moment is live.
      var r = pickPrompt();
      commitResult(r);
      renderGame(r, null);
    }
  }

  function renderOnboarding() {
    var inner = '';
    if (state.step === 0) {
      inner =
        '<div class="hero"><div class="eyebrow">Adults 18+ only</div>' +
        '<h2>Welcome to <em>Saxx.</em></h2>' +
        '<p>A flirtatious, romantic, connection-building roulette. Playful, warm, sensual — and grounded in emotional safety.</p></div>' +
        '<div class="card"><h3>How many people are playing tonight?</h3><p class="sub">Just the two of you, or the whole party?</p>' +
        '<div class="opt-grid two">' +
        '<button class="opt' + (state.party === 2 ? ' on' : '') + '" data-party="2"><span class="orb orb-touch"></span><b>2</b><span>Just us — intimate & focused</span></button>' +
        '<button class="opt' + (state.party === '3+' ? ' on' : '') + '" data-party="3+"><span class="orb orb-gaze"></span><b>3+</b><span>Group energy, everyone included</span></button>' +
        '</div></div>' +
        '<div class="card"><label class="age-row"><input type="checkbox" id="age" ' + (state.ageOk ? 'checked' : '') + ' /> <span>We’re all 18 or older and playing by choice.</span></label></div>' +
        dots(4, 0) +
        '<div class="actions"><button class="primary" id="next" ' + ((!state.party || !state.ageOk) ? 'disabled' : '') + '>Continue →</button></div>';
    } else if (state.step === 1) {
      inner =
        '<div class="hero"><div class="eyebrow">The vibe check</div>' +
        '<h2>What is the vibe of the group?</h2><p>Friends keeps it light and platonic. Lovers opens romance and consensual intimacy.</p></div>' +
        '<div class="card"><div class="opt-grid">' +
        '<button class="opt' + (state.vibe === 'friends' ? ' on' : '') + '" data-vibe="friends"><span class="orb orb-connect"></span><b>Friends / Party</b><span>Playful icebreakers, light flirting, no direct sexual intimacy.</span></button>' +
        '<button class="opt' + (state.vibe === 'lovers' ? ' on' : '') + '" data-vibe="lovers"><span class="orb orb-dare"></span><b>Lovers / Intimate</b><span>Romance, deep connection, consensual physical intimacy.</span></button>' +
        '</div></div>' + consentHTML() + dots(4, 1) +
        '<div class="actions"><div class="row2"><button class="ghost" id="back">← Back</button>' +
        '<button class="primary" id="next" ' + (!state.vibe ? 'disabled' : '') + '>Continue →</button></div></div>';
    } else if (state.step === 2) {
      // Skipped for friends (auto-advance handled in events), but render fallback
      inner =
        '<div class="hero"><div class="eyebrow">Intensity</div>' +
        '<h2>Choose your heat.</h2><p>You can lower the heat anytime. Pass is always okay.</p></div>' +
        '<div class="card"><div class="opt-grid">' +
        '<button class="opt' + (state.level === 'sweet' ? ' on' : '') + '" data-level="sweet"><span class="orb orb-touch"></span><b>Flirty & Sweet</b><span>Sensory touch, emotional connection, light kisses.</span></button>' +
        '<button class="opt' + (state.level === 'romantic' ? ' on' : '') + '" data-level="romantic"><span class="orb orb-gaze"></span><b>Deep & Romantic</b><span>Gottman-inspired connection, intimacy building.</span></button>' +
        '<button class="opt' + (state.level === 'xfull' ? ' on' : '') + '" data-level="xfull"><span class="orb orb-dare"></span><b>X-Full Version</b><span>Explicit passion, deep sensuality. 18+, enthusiastic consent only.</span></button>' +
        '</div></div>' + consentHTML() + dots(4, 2) +
        '<div class="actions"><div class="row2"><button class="ghost" id="back">← Back</button>' +
        '<button class="primary" id="next" ' + (!state.level ? 'disabled' : '') + '>Continue →</button></div></div>';
    } else if (state.step === 3) {
      inner =
        '<div class="hero slim"><div class="eyebrow">Safety first, always</div>' +
        '<h2>Ready to <em>spin?</em></h2><p>Playing as <b>' + esc(state.party === 2 ? '2 players' : '3+ players') + ' · ' + esc(modeLabel()) + '</b>. Change anytime.</p></div>' +
        consentHTML() +
        '<div class="card"><h3>How it works</h3><p class="sub">Swipe the big image — or tap Spin. Each swipe deals a fresh moment: Touch, Connect, Dare, or Feels, with a timer and a connection prompt. Enjoy it together, then swipe again.</p></div>' +
        dots(4, 3) +
        '<div class="actions"><button class="primary pink" id="spin-now">Spin</button>' +
        '<button class="ghost" id="back">← Back</button></div></div>';
    }
    root.innerHTML = shell('<div class="screen-scroll">' + inner + '</div>', state.vibe ? modeLabel() : null);
    wireOnboarding();
  }

  /* Single large image card markup. */
  function cardHTML(result, dir) {
    var m = result.meta;
    var enter = dir === 'left' ? ' enter-left' : ' enter-right';
    return '<div class="deck-field">'
      + '<div class="deck-glow" id="deck-glow" style="background:radial-gradient(closest-side, ' + m.color + 'e6, transparent 72%)"></div>'
      + '<div class="swipe-card' + enter + '" id="swipe-card" data-cat="' + result.cat + '" style="--c:' + m.color + ';--soft:' + m.soft + ';--deep:' + m.deep + '">'
      + '<div class="swipe-art">' + ICONS[result.cat] + '</div>'
      + '<div class="swipe-sheen"></div>'
      + '<div class="swipe-name">' + m.name + '</div>'
      + '<div class="swipe-desc">' + esc(m.desc) + '</div>'
      + '</div>'
      + '<div class="deck-hint">swipe for the next moment</div>'
      + '</div>';
  }

  function renderGame(result, dir) {
    var pill = (state.party === 2 ? '2 · ' : '3+ · ') + modeLabel();
    var t = result.prompt.timer;
    var promptPart =
      '<div class="card prompt-card cat-' + result.cat + '" style="--c:' + result.meta.color + ';--soft:' + result.meta.soft + ';--deep:' + result.meta.deep + '">' +
      '<div class="kicker">' + esc(result.meta.full) + '</div>' +
      '<h3>' + esc(result.prompt.title) + '</h3>' +
      '<p class="p-text">' + esc(result.prompt.text) + '</p>' +
      (t ? '<div class="timer slim"><div class="timer-face tappable" id="t-face">' + fmt(t) + '</div><div class="timer-bar"><i id="t-bar"></i></div>' +
      '<div class="timer-hint" id="t-hint">tap the time to pause</div>' +
      '<button class="timer-replay" id="t-replay" hidden>↻ Replay</button></div>'
        : '<p class="p-title">No timer — take your time ♥</p>') +
      '</div>';
    var inner =
      '<div class="game">' +
      cardHTML(result, dir) +
      '<div class="prompt-zone">' + promptPart + '</div>' +
      '<div class="actions compact">' +
      '<button class="primary pink spin-btn" id="spin">Spin</button>' +
      '<div class="row2"><button class="ghost" id="pass">Pass</button><button class="ghost" id="settings">Vibe</button></div>' +
      '</div>' +
      '<div class="micro-consent">Pass anytime · zero pressure · 18+ only</div>' +
      '</div>';
    root.innerHTML = shell(inner, pill);
    wireGame();
    if (result.prompt.timer) startTimer(result.prompt.timer);
  }

  function renderPrompt(result, dir) {
    renderGame(result, dir);
  }

  /* ---------- events ---------- */
  function wireOnboarding() {
    var age = root.querySelector('#age');
    if (age) age.addEventListener('change', function () {
      state.ageOk = age.checked; save();
      var n = root.querySelector('#next'); if (n) n.disabled = (!state.party || !state.ageOk);
    });
    root.querySelectorAll('[data-party]').forEach(function (b) {
      b.addEventListener('click', function () {
        state.party = b.getAttribute('data-party') === '2' ? 2 : '3+'; save(); renderOnboarding(); buzz(10);
      });
    });
    root.querySelectorAll('[data-vibe]').forEach(function (b) {
      b.addEventListener('click', function () {
        state.vibe = b.getAttribute('data-vibe'); save(); renderOnboarding(); buzz(10);
      });
    });
    root.querySelectorAll('[data-level]').forEach(function (b) {
      b.addEventListener('click', function () {
        state.level = b.getAttribute('data-level'); save(); renderOnboarding(); buzz(10);
      });
    });
    var back = root.querySelector('#back');
    if (back) back.addEventListener('click', function () {
      state.step = Math.max(0, state.step - 1);
      if (state.step === 2 && state.vibe === 'friends') state.step = 1;
      save(); render();
    });
    var next = root.querySelector('#next');
    if (next) next.addEventListener('click', function () {
      if (state.step === 0 && (!state.party || !state.ageOk)) return;
      if (state.step === 1 && !state.vibe) return;
      if (state.step === 2 && state.vibe === 'lovers' && !state.level) return;
      if (state.step === 1 && state.vibe === 'friends') { state.level = null; state.step = 3; }
      else if (state.step === 1 && state.vibe === 'lovers' && !state.level) { state.level = 'sweet'; state.step = 2; }
      else state.step = Math.min(4, state.step + 1);
      if (state.step === 4) { state.step = 4; }
      save(); render(); buzz(15);
    });
    var now = root.querySelector('#spin-now');
    if (now) now.addEventListener('click', function () { state.step = 4; save(); render(); });
    attachSwipeTo(root.querySelector('#swipe'), function () { state.step = 4; save(); render(); });
  }

  function wireGame() {
    var spin = root.querySelector('#spin');
    if (spin) spin.addEventListener('click', function () { doSpin(); });
    var pass = root.querySelector('#pass');
    if (pass) pass.addEventListener('click', function () {
      stopTimer();
      pass.textContent = 'Passed …';
      buzz(10);
      setTimeout(function () { randomize('right'); }, 350);
    });
    // The image is the control: drag it and it follows your finger —
    // release past the edge and the next moment slides in. Tap = Spin.
    var card = root.querySelector('#swipe-card');
    if (card) {
      var sx = 0, sy = 0, dx = 0, dy = 0, dragging = false;
      card.addEventListener('pointerdown', function (e) {
        if (state.spinning) return;
        dragging = true; sx = e.clientX; sy = e.clientY; dx = 0; dy = 0;
        card.classList.add('dragging');
        try { card.setPointerCapture(e.pointerId); } catch (err) {}
      });
      card.addEventListener('pointermove', function (e) {
        if (!dragging) return;
        dx = e.clientX - sx;
        dy = (e.clientY - sy) * 0.6;
        card.style.transform = 'translate(' + dx + 'px,' + dy + 'px) rotate(' + (dx / 14) + 'deg)';
      });
      var release = function () {
        if (!dragging) return;
        dragging = false;
        card.classList.remove('dragging');
        var totalX = dx, totalY = dy;
        dx = 0; dy = 0;
        if (Math.abs(totalX) > 90 || Math.abs(totalY) > 90) {
          var goneLeft = totalX < 0;
          var goneUp = Math.abs(totalY) >= Math.abs(totalX) && totalY < 0;
          card.style.transition = 'transform 0.2s ease-in';
          card.style.transform = 'translate(' + (goneLeft ? '-140' : '140') + '%,' + (goneUp ? '-40' : '40') + 'px) rotate(' + (goneLeft ? '-16' : '16') + 'deg)';
          buzz(15);
          setTimeout(function () { randomize(goneLeft ? 'right' : 'left'); }, 190);
        } else if (Math.abs(totalX) < 12 && Math.abs(totalY) < 12) {
          card.style.transform = '';
          doSpin();
        } else {
          card.style.transform = '';
        }
      };
      card.addEventListener('pointerup', release);
      card.addEventListener('pointercancel', function () {
        dragging = false; dx = 0; dy = 0;
        card.classList.remove('dragging');
        card.style.transform = '';
      });
    }
    var set = root.querySelector('#settings');
    if (set) set.addEventListener('click', function () { state.step = 1; save(); render(); });
    var fc = root.querySelector('#t-face');
    if (fc) fc.addEventListener('click', function () { toggleTimer(); });
    var rp = root.querySelector('#t-replay');
    if (rp) rp.addEventListener('click', function () {
      if (!total) return;
      timerDone = false; remain = total;
      buzz(10);
      armTimer();
    });
  }

  function attachSwipeTo(el, fn) {
    if (!el) return;
    var y0 = null;
    el.addEventListener('touchstart', function (e) {
      y0 = e.touches[0].clientY;
    }, { passive: true });
    el.addEventListener('touchend', function (e) {
      if (y0 == null) return;
      var dy = y0 - e.changedTouches[0].clientY;
      y0 = null;
      if (dy > 40) fn();
    }, { passive: true });
    el.addEventListener('click', fn);
  }

  render();
})();
