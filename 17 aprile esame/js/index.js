import { API_URL, getHeaders, checkResponse, formatPrice } from "./helpers.js";

const productContainer = document.getElementById("product-container");
const mainLoader = document.getElementById("main-loader");

// Funzione per gestire la visualizzazione degli errori
const showError = (message) => {
  productContainer.innerHTML = `
        <div class="col-12">
            <div class="alert alert-danger d-flex align-items-center shadow-sm" role="alert">
                <div class="flex-grow-1">
                    <h5 class="alert-heading fw-bold">Si è verificato un problema</h5>
                    <p class="mb-0">${message}</p>
                </div>
                <button class="btn btn-outline-danger btn-sm ms-3" onclick="location.reload()">Riprova</button>
            </div>
        </div>
    `;
};

// Genera html
const createProductCard = (product) => {
  const col = document.createElement("div");
  col.className = "col-12 col-md-6 col-lg-4 col-xl-3";

  // SICUREZZA: Verifica dove l'API ha salvato l'ID
  const pid = product._id || product.id;

  col.innerHTML = `
        <div class="card h-100 shadow-sm border-0 position-relative overflow-hidden">
            <span class="position-absolute top-0 end-0 badge rounded-pill bg-dark m-2 opacity-75">
                ${product.brand}
            </span>
            
            <img src="${product.imageUrl}" class="card-img-top" alt="${product.name}" 
                 style="height: 200px; object-fit: cover;">
            
            <div class="card-body d-flex flex-column">
                <h5 class="card-title fw-bold text-primary text-truncate">${product.name}</h5>
                
                <p class="card-text text-muted small flex-grow-1" 
                   style="display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;">
                    ${product.description}
                </p>
                
                <div class="mt-auto pt-3 border-top">
                    <div class="d-flex justify-content-between align-items-center">
                        <span class="fw-bold fs-5 text-dark">${formatPrice(product.price)}</span>
                        <div class="btn-group">
                            <a href="details.html?id=${pid}" class="btn btn-sm btn-outline-primary">
                                Dettagli
                            </a>
                            <a href="backoffice.html?id=${pid}" class="btn btn-sm btn-primary">
                                Modifica
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
  return col;
};

// recuoero prodotti da server
const fetchProducts = async () => {
  if (mainLoader) mainLoader.classList.remove("d-none");

  productContainer.innerHTML = `
        <div class="col-12 text-center my-5 py-5">
            <div class="spinner-grow text-primary" style="width: 3rem; height: 3rem;" role="status"></div>
            <p class="mt-3 text-white fw-light">Caricamento prodotti in corso...</p>
        </div>
    `;

  try {
    const response = await fetch(API_URL, { headers: getHeaders() });
    const products = await checkResponse(response);

    productContainer.innerHTML = "";

    if (products.length === 0) {
      productContainer.innerHTML = `
                <div class="col-12 text-center py-5">
                    <p class="text-muted fs-4">Nessun prodotto disponibile.</p>
                    <a href="backoffice.html" class="btn btn-primary mt-2">Aggiungi Prodotto</a>
                </div>
            `;
      return;
    }

    products.forEach((product) => {
      productContainer.appendChild(createProductCard(product));
    });
  } catch (error) {
    showError(error.message);
  } finally {
    if (mainLoader) mainLoader.classList.add("d-none");
  }
};

document.addEventListener("DOMContentLoaded", fetchProducts);
