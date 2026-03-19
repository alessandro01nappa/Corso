const TOTALE_NUMERI = 76
const numeriUsciti = [] //Serve a memorizzare i numeri estratti.

console.log("tombola avviata")
console.log("totale numeri", TOTALE_NUMERI)

// FUNZIONE PER CREARE IL TABELLONE
const creaTabellone = () => {
    const contenitoreTabellone = document.getElementById('tabellone-principale')

    for (let i = 1; i <= TOTALE_NUMERI; i++) {
        const cella = document.createElement('div') //div per la cella
        
        cella.classList.add('cella')
        cella.innerText = i // NUMERO PER LA CELLA
        cella.id = "numero-" +i //id per ogni cella
        
        contenitoreTabellone.appendChild(cella)
    }
}
console.log("tabella creata")

// FUNZIONE PER ESTRARRE UN NUMERO
const estraiNumero = () => {
    // verifico se ho terminato i numeri
    if (numeriUsciti.length >= TOTALE_NUMERI) {
        alert("Gioco terminato!")
        return
    }

    let numeroRandom

    //numero che non sia già nell'array 
    do {
        numeroRandom = Math.floor(Math.random() * TOTALE_NUMERI) + 1
    } while (numeriUsciti.includes(numeroRandom))

        console.log("numero estratto", numeroRandom)

    // Aggiungo il numero all'array
    numeriUsciti.push(numeroRandom)

    console.log(numeriUsciti)
    aggiornaInterfaccia(numeroRandom)
}

//FUNZIONE PER AGGIORNARE LA GRAFICA
const aggiornaInterfaccia = (valoreEstratto) => {
    const cellaSelezionata = document.getElementById("numero-" + valoreEstratto)
    
    if (cellaSelezionata) {
        cellaSelezionata.classList.add('estratto')
    }
    console.log("cella n:", valoreEstratto, "colorata")
    
    document.getElementById('ultimo-numero').innerText = valoreEstratto
}
creaTabellone()

// Colleghiamo il click del bottone
const bottone = document.getElementById('bottone-estrai')
bottone.addEventListener('click', estraiNumero)