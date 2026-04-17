import { API_URL, getHeaders, checkResponse, formatPrice } from "./helpers.js";

const detailsContainer = document.getElementById("details-container");

// Recuperiamo l'ID del prodotto
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");

// recupera e visualizza i dettagli del prodotto
const fetchProductDetails = async () => {
  // Se non c'è l'ID, torna in Home
  if (!productId) {
    window.location.href = "index.html";
    return;
  }

  // CARICAMENTO
  detailsContainer.innerHTML = `
        <div class="col-12 text-center my-5 py-5">
            <div class="spinner-border text-primary" role="status"></div>
            <p class="mt-3 text-muted">Il pesciolino sta arrivando...</p>
        </div>
    `;

  try {
    const response = await fetch(API_URL + productId, {
      headers: getHeaders(),
    });

    const product = await checkResponse(response);

    // LAYOUT DETTAGLIO
    detailsContainer.innerHTML = `
            <div class="col-md-6 mb-4 mb-md-0">
                <div class="card border-0 shadow-sm">
                    <img src="${product.imageUrl}" class="img-fluid rounded" alt="${product.name}" 
                         style="width: 100%; max-height: 500px; object-fit: contain; background: #ffff; padding: 20px;">
                </div>
            </div>
            
            <div class="col-md-6 ps-md-5">
                <nav aria-label="breadcrumb" class="mb-4">
                  <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="index.html" class="text-decoration-none">Home</a></li>
                    <li class="breadcrumb-item active" aria-current="page">Scheda Prodotto</li>
                  </ol>
                </nav>
                
                <h1 class="display-5 fw-bold text-dark">${product.name}</h1>
                <span class="badge bg-secondary mb-4 px-3 py-2 fs-6">${product.brand}</span>
                
                <h2 class="text-primary fw-bold mb-4">${formatPrice(product.price)}</h2>
                
                <div class="description-section p-4 bg-white border rounded mb-4 shadow-sm">
                    <h5 class="fw-bold text-muted mb-3">Descrizione prodotto</h5>
                    <p class="mb-0 text-secondary" style="line-height: 1.8;">${product.description}</p>
                </div>
                
                <div class="d-grid gap-2 d-md-flex mt-5">
                    <button class="btn btn-primary btn-lg px-5 shadow-sm">
                        Aggiungi al Carrello
                    </button>
                    
                    <a href="backoffice.html?id=${product._id}" class="btn btn-outline-warning btn-lg px-4">
                        Modifica Prodotto
                    </a>
                </div>
            </div>
        `;
  } catch (error) {
    detailsContainer.innerHTML = `
            <div class="col-12 text-center my-5">
                <div class="alert alert-danger shadow-sm border-0">
                    <h4 class="alert-heading fw-bold">Risorsa non trovata</h4>
                    <p>Il prodotto potrebbe essere stato rimosso o l'ID non è valido.</p>
                    <hr>
                    <a href="index.html" class="btn btn-danger mt-3 px-4">Torna alla Home</a>
                </div>
            </div>
        `;
  }
};

// Avvio
fetchProductDetails();
