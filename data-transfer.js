"use strict";

const DB_NAME = "flashcardApp";
const DB_VERSION = 1;
const message = document.querySelector("#transferMessage");

function showMessage(text, type = "success") {
    if (!message) return;
    message.textContent = text;
    message.className = `app-message ${type}`;
    message.hidden = false;
}

function openDatabase() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);
        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve(request.result);
    });
}

function readStore(transaction, name) {
    return new Promise((resolve, reject) => {
        const request = transaction.objectStore(name).getAll();
        request.onsuccess = () => resolve(request.result || []);
        request.onerror = () => reject(request.error);
    });
}

async function exportData() {
    const db = await openDatabase();
    const transaction = db.transaction(["decks", "cards"], "readonly");
    const data = {
        format: "engi-flashcards",
        version: 1,
        exportedAt: new Date().toISOString(),
        decks: await readStore(transaction, "decks"),
        cards: await readStore(transaction, "cards")
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `engi-backup-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
    showMessage("Die Daten wurden exportiert.");
}

function validateImport(data) {
    if (!data || data.format !== "engi-flashcards" || data.version !== 1) {
        throw new Error("Unbekanntes ENGI-Exportformat.");
    }
    if (!Array.isArray(data.decks) || !Array.isArray(data.cards)) {
        throw new Error("Die Exportdatei enthält keine gültigen Daten.");
    }
    const deckIds = new Set(data.decks.map((deck) => deck.id));
    if (data.decks.some((deck) => !Number.isInteger(deck.id) || typeof deck.name !== "string" || !deck.name.trim())) {
        throw new Error("Ein Stapel ist ungültig.");
    }
    if (data.cards.some((card) => !Number.isInteger(card.id) || !deckIds.has(card.deckId) || typeof card.front !== "string" || typeof card.back !== "string")) {
        throw new Error("Eine Karte ist ungültig.");
    }
}

async function importData(data) {
    validateImport(data);
    const db = await openDatabase();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(["decks", "cards"], "readwrite");
        const decks = transaction.objectStore("decks");
        const cards = transaction.objectStore("cards");
        decks.clear();
        cards.clear();
        data.decks.forEach((deck) => decks.put(deck));
        data.cards.forEach((card) => cards.put(card));
        transaction.oncomplete = resolve;
        transaction.onerror = () => reject(transaction.error);
        transaction.onabort = () => reject(transaction.error || new Error("Import abgebrochen."));
    });
}

document.querySelector("#exportButton")?.addEventListener("click", () => {
    exportData().catch(() => showMessage("Die Daten konnten nicht exportiert werden.", "error"));
});

document.querySelector("#importFile")?.addEventListener("change", async (event) => {
    const [file] = event.target.files;
    if (!file) return;
    try {
        const data = JSON.parse(await file.text());
        if (!window.confirm("Der Import ersetzt die aktuell gespeicherten Stapel und Karten. Fortfahren?")) return;
        await importData(data);
        showMessage("Die Daten wurden importiert. Öffne die Stapelübersicht neu.");
    } catch (error) {
        console.error("ENGI-Import fehlgeschlagen:", error);
        showMessage(error.message || "Die Datei konnte nicht importiert werden.", "error");
    } finally {
        event.target.value = "";
    }
});
