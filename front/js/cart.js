// ---------------- REGEX DES INPUTS ---------------- //

// ---- Ciblage de tous les inputs ---- //
const inputs = document.querySelectorAll(
  'input[type="text"], input[type="email"]'
);

// ---- Checking des valeurs rentrer dans l'input---- //
inputs.forEach((input) => {
  input.addEventListener("input", (e) => {
    switch (e.target.id) {
      case "firstName":
        firstNameChecker(e.target.value);
        break;
      case "lastName":
        lastNameChecker(e.target.value);
        break;
      case "address":
        addressChecker(e.target.value);
        break;
      case "city":
        cityChecker(e.target.value);
        break;
      case "email":
        emailChecker(e.target.value);
        break;
      default:
        console.log("err");
        break;
    }
  });
});

// ---- Logique et fonctionnement des REGEX ---- //

const firstNameChecker = (value) => {
  const errorDisplay = document.getElementById("firstNameErrorMsg");
  if (value.length > 0 && (value.length < 2 || value.length > 20)) {
    errorDisplay.textContent =
      "Veuillez entrer un prénom entre 2 et 20 lettres";
  } else if (!value.match(/^[a-zA-Z éè]*$/)) {
    errorDisplay.textContent =
      "Veuillez ne pas inclure de chiffres ou caractères spéciaux ";
  } else {
    errorDisplay.textContent = "";
  }
};

const lastNameChecker = (value) => {
  const errorDisplay = document.getElementById("lastNameErrorMsg");
  if (value.length > 0 && (value.length < 2 || value.length > 20)) {
    errorDisplay.textContent =
      "Veuillez entrer un nom de famille entre 2 et 20 lettres";
  } else if (!value.match(/^[a-zA-Z éè]*$/)) {
    errorDisplay.textContent =
      "Veuillez ne pas inclure de chiffres ou caractères spéciaux ";
  } else {
    errorDisplay.textContent = "";
  }
};

const addressChecker = (value) => {
  const errorDisplay = document.getElementById("addressErrorMsg");
  if (value.length > 0 && value.length < 3) {
    errorDisplay.textContent = "Veuillez saisir plus de cartères";
  } else if (!value.match(/^[a-zA-Z0-9 éè]*$/)) {
    errorDisplay.textContent = "Veuillez ne pas inclure caractères spéciaux ";
  } else {
    errorDisplay.textContent = "";
  }
};

const cityChecker = (value) => {
  const errorDisplay = document.getElementById("cityErrorMsg");
  if (!value.match(/^[a-zA-Z0-9 éè]*$/)) {
    errorDisplay.textContent = "Veuillez ne pas inclure caractères spéciaux ";
  } else {
    errorDisplay.textContent = "";
  }
};

const emailChecker = (value) => {
  const errorDisplay = document.getElementById("emailErrorMsg");
  if (!value.match(/^[\w_-]+@[\w-]+\.[a-z]{2,4}$/i)) {
    errorDisplay.textContent = "Veuillez saisir une adresse mail correcte";
  } else {
    errorDisplay.textContent = "";
  }
};

// ---------------- RÉCUPÉRATION DU LOCAL STORAGE ---------------- //

// ---- Converti la chaine de caractère objet JS ---- //
let cart = JSON.parse(localStorage.getItem("cartObject"));
console.log(cart);

// ---- Ciblage + création des sommes du total panier ----//
let articles = document.querySelector("#cart__items");
let totalPrice = document.querySelector("#totalPrice");
let totalQuantity = document.querySelector("#totalQuantity");
let totalArticlesPrice = 0;
let totalArticlesQuantity = 0;

// ---- Création de la boucle pour tout les articles présent  ---- //
async function cartDisplay() {
  for (let i = 0; i < cart.length; i++) {
    // ---- Prix par rapport à ID produit ---- //
    let price = await productId(cart[i].id);

    // ---- Implémentation de la quantité & l'obtention du prix total ---- //
    totalArticlesQuantity += parseInt(cart[i].nbArticle);
    totalArticlesPrice += parseInt(cart[i].nbArticle * price);
    console.log(totalArticlesPrice);

    // ---- Injection des différents produits dans le HTML / Prix / Quantité ---- //
    let article = `<article class="cart__item" data-id="${cart[i].id}" data-color="${cart[i].color}">
                  <div class="cart__item__img">
                    <img src="${cart[i].img}" alt="${cart[i].altTxt}">
                  </div>
                  <div class="cart__item__content">
                    <div class="cart__item__content__description">
                      <h2>${cart[i].name}</h2>
                      <p>Vert</p>
                      <p>${price} €</p>
                    </div>
                    <div class="cart__item__content__settings">
                      <div class="cart__item__content__settings__quantity">
                        <p>Qté : </p>
                        <input  data-id="${cart[i].id}" data-color="${cart[i].color}" type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${cart[i].nbArticle}">
                      </div>
                      <div class="cart__item__content__settings__delete">
                        <p  data-id="${cart[i].id}" data-color="${cart[i].color}" class="deleteItem">Supprimer</p>
                      </div>
                    </div>
                  </div>
                </article>`;

    articles.innerHTML += article;

    totalPrice.innerHTML = totalArticlesPrice;
    totalQuantity.innerHTML = totalArticlesQuantity;

    deleteProduct();
    uptQuantity();
  }
}
cartDisplay();

// ---- On récupère le prix de l'article suivant son id dans la l'API ---- //
async function productId(prdId) {
  return fetch("http://localhost:3000/api/products/")
    .then(function (res) {
      return res.json();
    })
    .then((response) => {
      for (let i = 0; i < response.length; i++) {
        if (response[i]._id == prdId) {
          return response[i].price;
        }
      }
    });
}

// ---------------- SUPPRESSION DE L'ARTICLE ---------------- //
function deleteProduct() {}

// ---------------- MISE À JOUR QUANTITÉ ---------------- //
function uptQuantity() {}

// ---------------- MISE À JOUR PANIER ---------------- //
function uptBasket() {}

// ---------------- SI PANIER VIDE ---------------- //
// ---- Fonction de redirection vers l'accueil ---- //
function redirectionIndex() {
  document.location.href = "./index.html";
}

// ---- Condition si oui ou non on reste sur la page ---- //
// ---- A venir modal ---- //
function store() {
  let store = localStorage.length;
  console.log(store);

  if (store < 1) {
    alert("Merci de bien vouloir selectionner l'un de nos produits");
    redirectionIndex();
  } else {
    console.log("Client approuvé");
  }
}
store();

//---------------------------------------//

// Si panier vide ? Message ? -> oui .lenght = alert
// Modification de la quantité lors d'un keypress event sur input de type number ? Totalité des articles ou juste un -1 ? attention nmbr négatif
// Obtention du prix via l'api -> fetch ? -> pour injecter le prix ? OK
// Additionner OK
// Cibler les id totalQuantity & totalPrice pour injecter le resultat OK
// Action lors du click sur le btn commander / envoi au local ou API ?
// Page CONFIRM ->

//---------------------------------------//
