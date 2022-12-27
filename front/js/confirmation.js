// Récupération de orderId et insertion dans le HTML
const product_url = window.location.search;
console.log(product_url);
const urlSearchParams = new URLSearchParams(product_url);
const orderId = urlSearchParams.get("id");
console.log(orderId);
document.getElementById("orderId").innerHTML = orderId;

// Effacer tout le localStorage
localStorage.clear();
