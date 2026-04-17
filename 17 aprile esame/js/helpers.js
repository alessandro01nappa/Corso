export const API_URL = "https://striveschool-api.herokuapp.com/api/product/";
export const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OWUxZjEwMDczOWY4NzAwMTU3YWIwOTYiLCJpYXQiOjE3NzY0MTQ5NzYsImV4cCI6MTc3NzYyNDU3Nn0.LBR2oLv4Hv4tCIGQ8zBngbF1cPMnARnGNhJ-w4BgGcw";

export const getHeaders = () => ({
  Authorization: `Bearer ${TOKEN}`,
  "Content-Type": "application/json",
});

// gestione errori
export const handleError = (response) => {
  switch (response.status) {
    case 400:
      throw new Error("400: Dati non validi.");
    case 401:
      throw new Error("401: Token non autorizzato.");
    case 404:
      throw new Error("404: Risorsa non trovata.");
    case 500:
      throw new Error("500: Errore server.");
    default:
      throw new Error(`Errore: ${response.status}`);
  }
};
// funzione di verifica e trascrizione
export const checkResponse = async (response) => {
  if (!response.ok) handleError(response);
  return await response.json();
};

// funzione per i prezzi
export const formatPrice = (price) => {
  return new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "EUR",
  }).format(price);
};
