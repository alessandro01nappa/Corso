import { API_URL, getHeaders, checkResponse } from "./helpers.js";

// Riferimenti DOM
const productForm = document.getElementById("product-form");
const deleteBtn = document.getElementById("delete-btn");
const formTitle = document.getElementById("form-title");
const alertContainer = document.getElementById("alert-container");

// ID dall'URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");

// Errori tecnici
const getFriendlyErrorMessage = (error) => {
  const status = error.message.split(":")[0].trim();
  switch (status) {
    case "400":
      return "Dati non validi. Controlla i campi inseriti.";
    case "401":
      return "Non autorizzato. Controlla il tuo Token.";
    case "404":
      return "Prodotto non trovato.";
    case "500":
      return "Errore interno del server.";
    default:
      return `Si è verificato un problema: ${error.message}`;
  }
};

// Gestione stato di caricamento
const toggleLoading = (button, isLoading, originalText) => {
  if (isLoading) {
    button.disabled = true;
    button.innerHTML = `<span class="spinner-border spinner-border-sm" role="status"></span> Attendere...`;
  } else {
    button.disabled = false;
    button.innerHTML = originalText;
  }
};

// Allert
const showAlert = (message, type = "success") => {
  alertContainer.innerHTML = `
        <div class="alert alert-${type} alert-dismissible fade show shadow-sm" role="alert">
            <strong class="me-2">${type === "success" ? "Operazione completata:" : "Attenzione:"}</strong> 
            <span>${message}</span>
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
    `;
  if (type === "success") {
    setTimeout(() => {
      const alertElement = document.querySelector(".alert");
      if (alertElement) {
        const bsAlert = new bootstrap.Alert(alertElement);
        bsAlert.close();
      }
    }, 4000);
  }
};

// Riempie il form se in modifica
const initPage = async () => {
  if (productId) {
    formTitle.innerText = "Modifica Prodotto";
    deleteBtn.classList.remove("d-none");

    try {
      const response = await fetch(API_URL + productId, {
        headers: getHeaders(),
      });
      const product = await checkResponse(response);

      // Popolamento dei campi
      document.getElementById("name").value = product.name;
      document.getElementById("description").value = product.description;
      document.getElementById("brand").value = product.brand;
      document.getElementById("imageUrl").value = product.imageUrl;
      document.getElementById("price").value = product.price;
    } catch (error) {
      showAlert(getFriendlyErrorMessage(error), "danger");
    }
  }
};

// salvataggio
productForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const submitBtn = productForm.querySelector('button[type="submit"]');
  const originalText = "Salva Prodotto";

  toggleLoading(submitBtn, true);

  const productPayload = {
    name: document.getElementById("name").value,
    description: document.getElementById("description").value,
    brand: document.getElementById("brand").value,
    imageUrl: document.getElementById("imageUrl").value,
    price: parseFloat(document.getElementById("price").value),
  };

  const method = productId ? "PUT" : "POST";
  const url = productId ? API_URL + productId : API_URL;

  try {
    const response = await fetch(url, {
      method: method,
      body: JSON.stringify(productPayload),
      headers: getHeaders(),
    });
    await checkResponse(response);

    showAlert(
      productId
        ? "Modifica avvenuta con successo."
        : "Prodotto creato con successo.",
      "success",
    );

    if (!productId) productForm.reset();
  } catch (error) {
    showAlert(getFriendlyErrorMessage(error), "danger");
  } finally {
    toggleLoading(submitBtn, false, originalText);
  }
});

// eleiminazione e conferma
deleteBtn.addEventListener("click", async () => {
  if (
    confirm("Sei sicuro di voler eliminare definitivamente questo elemento?")
  ) {
    const originalText = "Elimina";
    toggleLoading(deleteBtn, true);
    try {
      const response = await fetch(API_URL + productId, {
        method: "DELETE",
        headers: getHeaders(),
      });
      await checkResponse(response);
      alert("Prodotto eliminato correttamente.");
      window.location.href = "index.html";
    } catch (error) {
      showAlert(getFriendlyErrorMessage(error), "danger");
      toggleLoading(deleteBtn, false, originalText);
    }
  }
});

// reset
productForm.addEventListener("reset", (e) => {
  if (e.isTrusted && !confirm("Confermi l'operazione?")) {
    e.preventDefault();
  }
});

initPage();
