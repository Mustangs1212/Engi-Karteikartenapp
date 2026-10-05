"use strict";

const DB_NAME = "flashcardApp";
const DB_VERSION = 1;
const stats = document.querySelector("#stats");

function readCards() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);
        request.onerror = () => reject(request.error);
        request.onsuccess = () => {
            const db = request.result;
            if (!db.objectStoreNames.contains("cards")) {
                resolve([]);
                return;
            }
            const transaction = db.transaction("cards", "readonly");
            const cardsRequest = transaction.objectStore("cards").getAll();
            cardsRequest.onsuccess = () => resolve(cardsRequest.result || []);
            cardsRequest.onerror = () => reject(cardsRequest.error);
        };
    });
}

function render(cards) {
    const total = cards.length;
    const finished = cards.filter((card) => card.isActive === false).length;
    const answers = cards.reduce((sum, card) => sum + (card.totalAnswers || 0), 0);
    const correct = cards.reduce((sum, card) => sum + (card.correctAnswers || 0), 0);
    const percentage = total === 0 ? 0 : Math.round((finished / total) * 100);

    stats.innerHTML = `
        <div class="stat-card"><strong>${total}</strong><span>Karten insgesamt</span></div>
        <div class="stat-card"><strong>${finished}</strong><span>Karten abgeschlossen</span></div>
        <div class="stat-card"><strong>${answers}</strong><span>Antworten</span></div>
        <div class="stat-card"><strong>${correct}</strong><span>Richtige Antworten</span></div>
        <div class="progress-card"><strong>${percentage} %</strong><span>Gesamtfortschritt</span>
            <div class="progress-track"><span style="width:${percentage}%"></span></div>
        </div>`;
}

readCards().then(render).catch(() => {
    stats.textContent = "Die lokalen Statistiken konnten nicht geladen werden.";
});
