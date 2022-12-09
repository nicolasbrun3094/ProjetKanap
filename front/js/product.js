function redirectionIndex() {
  document.location.href = "./index.html";
}

const img = document.querySelector(".item__img");
const price = document.getElementById("price");
const desc = document.getElementById("description");
const color = document.getElementById("colors");
const button = document.getElementById("addToCart");

let sofaData = [];
let params = new URL(document.location).searchParams;
let id = params.get("productid");

// Affichage API //

const fetchSofa = async () => {
  await fetch(`http://localhost:3000/api/products/${id}`)
    .then((res) => res.json())
    .then((data) => (sofaData = data));

  console.log(sofaData);
};

// Affichage du produit //

const sofaDisplay = async () => {
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
      return false;
    }
    return true;
  }

  // Verification que la quantité ne soit pas inférieur à 1//

  function checkQuantity() {
    let value = document.querySelector("#quantity").value;

    if (value < 1 || value > 100) {
      alert("Veuillez sélectionner un minimum de 1 article, au maximum 100 ");
      document.querySelector("#quantity").value = 1;
      return false;
    }
    return true;
  }

  button.addEventListener("click", (e) => {
    if (checkColor() && checkQuantity()) {
      let modal = document.querySelector("#modal");
      let btn_open = document.querySelector(".btn_show");
      let btn_close = document.querySelector("#btn_close");

      modal.show();
      setTimeout(function () {
        modal.close();
      }, 10000);

      btn_close.addEventListener("click", () => {
        modal.close();
        redirectionIndex();
      });

      // Envoi des donnés au local storage //
      localStorage.setItem(
        // Recuperer l'option selectionner //
        sofaData.name + color.value,
        JSON.stringify({
          id: sofaData._id,
          name: sofaData.name,
          color: color.value,
          nbArticle: quantity.value,
        })
      );
    }
  });
};
sofaDisplay();

// BONUS //
/*
AJOUT D'UNE PASTILLE ROUGE AU NIVEAU DU PANIER
*/
