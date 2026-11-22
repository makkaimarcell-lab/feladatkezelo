
import { initializeApp } from "https://www.gstatic.com/firebasejs/13.4.0/firebase-app.js";

// Firebase beállítások
const firebaseConfig = {
    apiKey: "AIzaSyA92juG_RYS36AZYM9NVoLmlGsDoaIPVx0",
    authDomain: "easy-feladatkezelo.firebaseapp.com",
    projectId: "easy-feladatkezelo",
    storageBucket: "easy-feladatkezelo.firebasestorage.app",
    messagingSenderId: "1083951304432",
    appId: "1:1083951304432:web:aeb8ad3ab1c4c842423c35"
};

// Firebase elindítása
const app = initializeApp(firebaseConfig);

// Feladatok mentése
function mentes(listaAzonosito) {
    const lista = document.getElementById(listaAzonosito);
    const pipak = lista.querySelectorAll("input");

    pipak.forEach(function(pipa) {
        if (pipa.checked) {
            pipa.setAttribute("checked", "");
        } else {
            pipa.removeAttribute("checked");
        }
    });

    localStorage.setItem(listaAzonosito, lista.innerHTML);
}

// Feladatok visszatöltése
function visszatoltes(listaAzonosito) {
    const lista = document.getElementById(listaAzonosito);
    lista.innerHTML = localStorage.getItem(listaAzonosito) || "";
}

// Események hozzáadása a feladatokhoz
function esemenyekHozzaadasa(listaAzonosito) {
    const lista = document.getElementById(listaAzonosito);
    const elemek = lista.querySelectorAll("li");

    elemek.forEach(function(ujElem) {
        const pipa = ujElem.querySelector("input");
        const szoveg = ujElem.querySelector("span");
        const torlesGomb = ujElem.querySelector("button");

        // Feladat szerkesztése dupla kattintással
        szoveg.addEventListener("dblclick", function() {
            let ujSzoveg = prompt(
                "Írd át a feladatot:",
                szoveg.textContent
            );

            if (ujSzoveg !== null && ujSzoveg.trim() !== "") {
                szoveg.textContent = ujSzoveg.trim();
                mentes(listaAzonosito);
            }
        });

        // Áthúzás visszaállítása
        if (pipa.checked) {
            szoveg.style.textDecoration = "line-through";
        }

        // Törlés
        torlesGomb.addEventListener("click", function() {
            ujElem.remove();
            mentes(listaAzonosito);
        });

        // Kipipálás
        pipa.addEventListener("change", function() {
            if (pipa.checked) {
                szoveg.style.textDecoration = "line-through";
            } else {
                szoveg.style.textDecoration = "none";
            }

            mentes(listaAzonosito);
        });
    });
}

// Új feladat hozzáadása
function teendoHozzaadas(gombAzonosito, listaAzonosito) {
    const gomb = document.getElementById(gombAzonosito);
    const lista = document.getElementById(listaAzonosito);

    gomb.addEventListener("click", function() {
        let feladat = prompt("Mi a teendőd?");

        if (feladat !== null && feladat.trim() !== "") {
            let ujElem = document.createElement("li");

            // Törlés gomb
            let torlesGomb = document.createElement("button");
            torlesGomb.textContent = "X";
            torlesGomb.classList.add("torlesGomb");

            torlesGomb.addEventListener("click", function() {
                ujElem.remove();
                mentes(listaAzonosito);
            });

            // Jelölőnégyzet
            let pipa = document.createElement("input");
            pipa.type = "checkbox";

            // Feladat szövege
            let szoveg = document.createElement("span");
            szoveg.textContent = feladat.trim();

            // Kipipálás
            pipa.addEventListener("change", function() {
                if (pipa.checked) {
                    szoveg.style.textDecoration = "line-through";
                } else {
                    szoveg.style.textDecoration = "none";
                }

                mentes(listaAzonosito);
            });

            // Elemeink összeállítása
            ujElem.appendChild(pipa);
            ujElem.appendChild(szoveg);
            ujElem.appendChild(torlesGomb);

            lista.appendChild(ujElem);

            mentes(listaAzonosito);
        }
    });
}

// Korábban elmentett feladatok visszatöltése
visszatoltes("teendoLista");
visszatoltes("teendoLista2");

// Események hozzárendelése
esemenyekHozzaadasa("teendoLista");
esemenyekHozzaadasa("teendoLista2");

// Gombok működésének beállítása
teendoHozzaadas("ujTeendoBtn", "teendoLista");
teendoHozzaadas("ujTeendoBtn2", "teendoLista2");
