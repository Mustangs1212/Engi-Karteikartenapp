# ENGI – Karteikarten-App

ENGI ist eine lokale Karteikarten-App als Portfolio-Demo. Sie zeigt eine vollständige kleine Browser-Anwendung mit Decks, Kartenverwaltung, Lernmodus, Fortschritt und Theme-Umschaltung.

## Ziel

Das Projekt soll zeigen, wie eine clientseitige Anwendung geplant und umgesetzt werden kann. Es ist bewusst kein kommerzielles Lernprodukt: Es gibt kein Backend, keinen Login und keine Cloud-Synchronisation.

## Funktionen

- Stapel und Karteikarten erstellen, bearbeiten und löschen
- Lernmodus mit einer einfachen Regel: Eine Karte gilt nach zwei richtigen Antworten als abgeschlossen; falsche Antworten setzen die Karte zurück in den Lernlauf
- Lernfortschritt über IndexedDB
- Statistikübersicht
- JSON-Import und -Export für Datensicherung
- Helles und dunkles Design
- Responsive und tastaturfreundliche Oberfläche
- Kontakt-, Datenschutz- und Impressumsseiten

## Entwicklung

```bash
npm install
npm run dev
```

Für einen Produktions-Build:

```bash
npm run build
npm run preview
```

Die App liegt in diesem Repository unter `JavaScript/Karteikarten`. Die Daten werden nur im jeweiligen Browser gespeichert. Beim Löschen der Browserdaten gehen sie verloren.

## Struktur

- `index.html`, `style.css`, `index.js`: Hauptansicht und bestehende App-Logik
- `statistik.html`, `stats.js`: einfache Auswertung der gespeicherten Karten
- `einstellungen.html`, `kontakt.html`, `impressum.html`, `datenschutz.html`: Demo-Seiten
- `src/learning.js`: testbare Lern- und Zusammenfassungslogik
- `src/learning.test.js`: fokussierte Tests für die Lernregel

## Kontakt

- E-Mail: [enessercann2018@gmail.com](mailto:enessercann2018@gmail.com)
- [LinkedIn](https://www.linkedin.com/in/m-enes-ercan/)
