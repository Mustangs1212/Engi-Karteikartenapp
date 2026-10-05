import { defineConfig } from "vite";

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                app: "index.html",
                statistik: "statistik.html",
                einstellungen: "einstellungen.html",
                kontakt: "kontakt.html",
                impressum: "impressum.html",
                datenschutz: "datenschutz.html"
            }
        }
    }
});
