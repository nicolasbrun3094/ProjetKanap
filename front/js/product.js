function redirectionIndex() {
  document.location.href = "./index.html";
  swal({
    title: "Votre article à bien était ajouté à votre panier",
    text: "Vous allez être redirigé vers la page d'accueil",
    icon: "success",
    button: "Accueil",
  });
}
const img = document.querySelector(".item__img");
const price = document.getElementById("price");
const desc = document.getElementById("description");
const color = document.getElementById("colors");
const button = document.getElementById("addToCart");
let sofaData = [];
let params = new URL(document.location).searchParams;
let id = params.get("productid");

console.log(sofaData);
// Affichage API’
const fetchSofa = async () => {
  await fetch(`http://localhost:3000/api/products/${id}`)
    .then((res) => res.json())
    .then((data) => (sofaData = data));

  console.log(sofaData);
};

// Affichage du produit

const sofaDispaly = async () => {
  await fetchSofa();

  price.innerHTML = `<span>${sofaData.price}</span>`;
  img.innerHTML = `<img src=${sofaData.imageUrl} alt="photo de ${sofaData.name}"></img>`;
  desc.innerHTML = `
                    <p>
                        Dis enim malesuada risus sapien gravida nulla nisl arcu.</br>
                        Dis enim malesuada risus sapien gravida nulla nisl arcu.
                    </p>
                    `;

  let selectColor = `<option value="">--SVP, choissez une couleur --</option>`;
  sofaData.colors.forEach((c) => {
    selectColor += color.innerHTML += `<option value="${c}">${c}</option>`;
  });

  // Verification qu'une couleur à bien était séléctioner //
  function checkColor() {
    let color = document.querySelector("#colors").value;

    if (color === "" || color === null) {
      alert("Veuillez choisir une couleur");
      return;
    }
    redirectionIndex();
  }

  // Verification que la quantité ne soit pas inférieur à 1//

  function checkQuantity() {
    let value = document.querySelector("#quantity").value;

    if (value < 1 || value > 100) {
      alert("Veuillez sélectionner un minimum de 1 article, au maximum 100 ");
      document.querySelector("#quantity").value = 1;
      return;
    }
  }

  button.addEventListener("click", (e) => {
    // Envoi des donnés au local storage
    localStorage.setItem(
      // Recuperer l'option selectionner

      sofaData.name + color.value,
      JSON.stringify({
        id: sofaData._id,
        name: sofaData.name,
        color: color.value,
        nbArticle: quantity.value,
      })
    );
    checkColor();
    checkQuantity();
  });
};
sofaDispaly();

// BONUS //
/*

AJOUT D'UNE PASTILLE ROUGE AU NIVEAU DU PANIER

*/

// PROBLEMES //
/*

VALIDATION DES DEUX CONDITIONS :
checkColor();
checkQuantity();
POUR ENSUITE ÊTRE REDIRIGÉ
REDIRECTION VERS LA PAGE D'ACCUEIL (ALERT INSTANTANÉE)
link tuto : "https://www.youtube.com/watch?v=43kJSL4sieE"
site : "https://sweetalert2.github.io/#methods"

*/
