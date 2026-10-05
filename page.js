"use strict";

const savedTheme = localStorage.getItem("engi-theme");
if (savedTheme === "dark") {
    document.body.classList.add("dark");
}

const themeButton = document.querySelector("#themeButton");
themeButton?.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    localStorage.setItem(
        "engi-theme",
        document.body.classList.contains("dark") ? "dark" : "light"
    );
});
