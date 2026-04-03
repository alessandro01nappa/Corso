// Aspetta che la pagina sia caricata completamente
document.addEventListener("DOMContentLoaded", () => { // questo ho dovuto cercarlo su internet 
    
    // 1. CARICAMENTO DELLE "M" NELLA HERO
    fetch('m.html')
        .then(risposta => risposta.text())
        .then(codice => {
            document.getElementById('box-animazione-m').innerHTML = codice
        }) // questa funzione non la conoscevo mi smebrava l'unica soluzione per evitare 3000 righe di html, l'ho cercata su internet

    // CAMBIO COLORE ALLO SCORRIMENTO
    const testata = document.getElementById('testata-principale')
    const hero = document.getElementById('hero')

    window.onscroll = () => {
        if (window.scrollY > hero.offsetHeight - 75) {
            testata.classList.add('testata-bianca')
        } else {
            testata.classList.remove('testata-bianca')
        }
    }
})