class Animale {
  constructor(_nomeAnimale, _nomeProprietario, _specie, _razza) {
    this.nomeAnimale = _nomeAnimale
    this.nomeProprietario = _nomeProprietario
    this.specie = _specie
    this.razza = _razza
  }
  stessoProprietario(altroAnimale) {
    return this.nomeProprietario.toLowerCase() === altroAnimale.nomeProprietario.toLowerCase()
  }
}

class Utente {
  constructor(_nome, _cognome, _eta, _localita) {
    this.nome = _nome
    this.cognome = _cognome
    this.eta = _eta
    this.localita = _localita
  }
  confrontaEta(altroUtente) {
    if (this.eta > altroUtente.eta) return `${this.nome} è più vecchio di ${altroUtente.nome}`
    if (this.eta < altroUtente.eta) return `${this.nome} è più giovane di ${altroUtente.nome}`
    return `${this.nome} e ${altroUtente.nome} hanno la stessa età`
  }
}