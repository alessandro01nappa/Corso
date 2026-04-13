// Test 
const utente1 = new Utente("Mario", "Rossi", 30, "Roma")
const utente2 = new Utente("Paola", "Verdi", 25, "Milano")
console.log("Confronto Utenti:", utente1.confrontaEta(utente2))

// Logica Esercizio 
const elencoAnimali = []
const mioForm = document.getElementById('formAnimale')
const miaLista = document.getElementById('listaAnimali')

mioForm.onsubmit = function(evento) {
  evento.preventDefault()

  const nuovoAnimale = new Animale(
    document.getElementById('nomeAnimale').value,
    document.getElementById('nomeProprietario').value,
    document.getElementById('specie').value,
    document.getElementById('razza').value
  );

  // Controllo padrone e log in console
  elencoAnimali.forEach(animaleEsistente => {
    if(nuovoAnimale.stessoProprietario(animaleEsistente)) {
      console.log(`AVVISO: ${nuovoAnimale.nomeAnimale} e ${animaleEsistente.nomeAnimale} hanno lo stesso padrone!`)
    }
  })

  elencoAnimali.push(nuovoAnimale)
  console.log("Elenco attuale:", elencoAnimali)
  
  aggiornaLista()
  mioForm.reset()
}

function aggiornaLista() {
  miaLista.innerHTML = ""
  elencoAnimali.forEach(animale => {
    const li = document.createElement('li')
    li.innerText = `${animale.nomeAnimale} (${animale.specie} - ${animale.razza}), Proprietario: ${animale.nomeProprietario}`
    miaLista.appendChild(li)
  })
}