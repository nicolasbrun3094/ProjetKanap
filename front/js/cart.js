const inputs = document.querySelectorAll(
  'input[type="text"], input[type="email"]'
);

// REGEX DES INPUTS //

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

// OPTIMISER LE CODE CI DESSOUS //
// const errorDisplay = ?
const firstNameChecker = (value) => {
  const errorDisplay = document.getElementById("firstNameErrorMsg"); //DYNAMIQUE ?
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
  const errorDisplay = document.getElementById("lastNameErrorMsg"); //DYNAMIQUE ?
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
  const errorDisplay = document.getElementById("addressErrorMsg"); //DYNAMIQUE ?
  if (value.length > 0 && value.length < 3) {
    errorDisplay.textContent = "Veuillez saisir plus de cartères";
  } else if (!value.match(/^[a-zA-Z0-9 éè]*$/)) {
    errorDisplay.textContent = "Veuillez ne pas inclure caractères spéciaux ";
  } else {
    errorDisplay.textContent = "";
  }
};

const cityChecker = (value) => {
  const errorDisplay = document.getElementById("cityErrorMsg"); //DYNAMIQUE ?
  if (!value.match(/^[a-zA-Z0-9 éè]*$/)) {
    errorDisplay.textContent = "Veuillez ne pas inclure caractères spéciaux ";
  } else {
    errorDisplay.textContent = "";
  }
};

const emailChecker = (value) => {
  const errorDisplay = document.getElementById("emailErrorMsg"); //DYNAMIQUE ?
  if (!value.match(/^[\w_-]+@[\w-]+\.[a-z]{2,4}$/i)) {
    errorDisplay.textContent = "Veuillez saisir une adresse mail correcte";
  } else {
    errorDisplay.textContent = "";
  }
};

// RÉCUPÉRATION DU LOCAL STORAGE //

let product = [];
let totalQuantity = document.getElementById("totalQuantity");
let totalPrice = document.getElementById("totalPrice");

function localSProduct() {
  const numberProduct = localStorage.length;
  //console.log(numberProduct);
  for (let i = 0; i < numberProduct; i++) {
    const item = localStorage.getItem(localStorage.key(i));
    //console.log(item);
    const itemObject = JSON.parse(item);
    //console.log(itemObject);
    product.push(itemObject);
  }
}
console.log(product);

// AFFICHAGE DU / DES PRODUITS SÉLECTIONNER
/*

<div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
                    </div>

*/
const cartItem = document.querySelector("#cart__items");
const sofaDisplay = () => {
  localSProduct();
  cartItem.innerHTML += product
    .map(
      (sofa) =>
        `
      <article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
        <div class="cart__item__img">
          <img src=${sofa.img} alt="photo de ${sofa.name}">
        </div>
        <div class="cart__item__content">
          <h2>${sofa.name}</h2>
          <p>${sofa.color}</p>
          <p> API PRIX </p>
        </div>
        <div class="cart__item__content__settings">
          <div class="cart__item__content__settings__quantity">
            <p>QTE :</p>
            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${sofa.nbArticle}>
          </div>
          <div class="cart__item__content__settings__delete">
            <p class="deleteItem">Supprimer</p>
          </div>
        </div>
      </article>
  `
    )
    .join("");
  // Pointé les balises
  //cartItem.innerHTML = `<img src=${product.img}</img>`;
};

sofaDisplay();

// ADDITION LORS DE L'AJOUT AU PANIER PLUTOT QUE ÉCRASER ?
