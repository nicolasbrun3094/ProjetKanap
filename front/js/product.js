function redirectionIndex() {
  document.location.href = "./index.html";
  swal(
    "Votre article à bien était ajouté à votre panier",
    "Vous allez être redirigé vers la page d'accueil"
  );
}
const img = document.querySelector(".item__img");
const price = document.getElementById("price");
const desc = document.getElementById("description");
const color = document.getElementById("colors");
const button = document.getElementById("addToCart");
let sofaData = [];
let params = new URL(document.location).searchParams;
let id = params.get("productid");

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

  // OPTIMISER ?’”
  /*
  LOOP
  */
  color.innerHTML += `<option value="Vert">Vert</option>`;
  color.innerHTML += `<option value="Rouge">Rouge</option>`;
  color.innerHTML += `<option value="Bleu">Bleu</option>`;
  button.innerHTML += `<a href="./index.html"></a>`;

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

//////////////////////////////////////
/*”
Bonus :
Ajout nb article
*/

// Ajout Local Storage ( Renvoi sur la page panier )
// Pastille rouge du nombre article panier visuel ?

// Ajout Panier
