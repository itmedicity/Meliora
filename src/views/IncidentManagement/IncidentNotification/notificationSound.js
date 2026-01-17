let audio = null;

export const initNotificationSound = () => {
    if (!audio) {
        audio = new Audio("/sounds/preview.mp3"); // URL, not import
        audio.load();
    }
};

export const playNotificationSound = () => {
    if (!audio) return;

    audio.currentTime = 0;
    audio.play().catch(err => {
        console.error("Audio blocked:", err);
    });
};
