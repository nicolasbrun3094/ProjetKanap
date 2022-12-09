const section = document.getElementById("items");
let sofaData = [];

// Importation API
const fetchSofa = async () => {
  await fetch("http://localhost:3000/api/products")
    .then((res) => res.json())
    .then((data) => (sofaData = data));
};

// Affichage des produits
const sofaDispaly = async () => {
  await fetchSofa();
  section.innerHTML += sofaData
    .map(
      (sofa) =>
        `
      <a href="./product.html?productid=${sofa._id}">
          <article>
            <img src=${sofa.imageUrl} alt="photo de ${sofa.name}">
            <h3>${sofa.name}</h3>
             <p>
                Dis enim malesuada risus sapien gravida nulla nisl arcu.
                Dis enim malesuada risus sapien gravida nulla nisl arcu.
              </p>
              <p class=""price>  
                ${sofa.price} Є
              </p>
          </article>
        </a>
  `
    )
    .join("");
};

sofaDispaly();
