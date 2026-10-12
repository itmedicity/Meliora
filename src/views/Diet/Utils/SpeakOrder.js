let speechEnabled = false;
let speaking = false;
let speechQueue = [];
let voices = [];

/* ===============================
   LOAD VOICES PROPERLY (CRITICAL)
================================= */
const loadVoices = () => {
    voices = window.speechSynthesis.getVoices();
};

// Chrome async voice loading fix
if (typeof window !== "undefined" && window.speechSynthesis) {
    window.speechSynthesis.onvoiceschanged = loadVoices;
    loadVoices();
}

/* ===============================
   GET BEST FEMALE VOICE
================================= */
const getFemaleVoice = () => {

    if (!voices.length) {
        voices = window.speechSynthesis.getVoices();
    }

    return (
        voices.find(v => v.name?.includes("Google UK English Female")) ||
        voices.find(v => v.name?.includes("Samantha")) ||
        voices.find(v => v.name?.includes("Zira")) ||
        voices.find(v => v.lang?.includes("en")) ||
        voices[0] ||
        null
    );
};

/* ===============================
   INIT SPEECH (UNLOCK CHROME)
================================= */
export const initSpeech = () => {

    const unlock = () => {

        if (speechEnabled) return;

        speechEnabled = true;

        // silent unlock speech (required for Chrome)
        const silent = new SpeechSynthesisUtterance(" ");
        silent.volume = 0;

        window.speechSynthesis.speak(silent);

        window.removeEventListener("pointerdown", unlock);
    };

    window.addEventListener("pointerdown", unlock);
};

/* ===============================
   PLAY NEXT IN QUEUE
================================= */
const speakNext = () => {

    if (!speechQueue.length) {
        speaking = false;
        return;
    }

    speaking = true;

    // IMPORTANT: prevent Chrome stuck bug
    window.speechSynthesis.cancel();

    const text = speechQueue.shift();

    const speech = new SpeechSynthesisUtterance(text);

    const voice = getFemaleVoice();
    if (voice) speech.voice = voice;

    speech.lang = "en-US";
    speech.rate = 0.9;
    speech.pitch = 1;
    speech.volume = 1;

    speech.onstart = () => {
        console.log(" Speaking:", text);
    };

    speech.onend = () => {
        speakNext();
    };

    speech.onerror = (e) => {
        console.log(" Speech Error:", e);
        speakNext();
    };

    window.speechSynthesis.speak(speech);
};

/* ===============================
   MAIN FUNCTION (QUEUE SAFE)
================================= */
export const speakOrder = (text = "", priority = false) => {

    if (!speechEnabled) {
        console.log("Speech not enabled yet (user interaction needed)");
        return;
    }

    if (!text) return;

    // clean text (VERY IMPORTANT for natural speech)
    const cleanText = text
        .replace(/\s+/g, " ")
        .replace(/\n/g, " ")
        .trim();

    if (priority) {
        speechQueue.unshift(cleanText);
    } else {
        speechQueue.push(cleanText);
    }

    if (!speaking) {
        speakNext();
    }
};

/* ===============================
   FORCE STOP (optional use)
================================= */
export const stopSpeech = () => {
    speechQueue = [];
    speaking = false;
    window.speechSynthesis.cancel();
};