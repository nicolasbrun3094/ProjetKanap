// REGEX DES INPUTS
/*
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const address = document.getElementById("address");
const city = document.getElementById("city");
const mail = document.getElementById("email");
*/
const inputs = document.querySelectorAll(
  'input[type="text"], input[type="email"]'
);

// OPTI ?
/*
const errorDisplay =
*/

const firstNameChecker = (value) => {
  const errorDisplay = document.getElementById("firstNameErrorMsg"); //DYNAMIQUE ?
  if (value.length > 0 && (value.length < 3 || value.length > 20)) {
    errorDisplay.textContent =
      "Veuillez entrer un prénom entre 3 et 20 lettres";
  } else if (!value.match(/^[a-zA-Z]*$/)) {
    errorDisplay.textContent =
      "Veuillez ne pas inclure de chiffres ou caractères spéciaux ";
  } else {
    errorDisplay.textContent = "";
  }
};

const lastNameChecker = (value) => {
  const errorDisplay = document.getElementById("lastNameErrorMsg"); //DYNAMIQUE ?
  if (value.length > 0 && (value.length < 3 || value.length > 20)) {
    errorDisplay.textContent =
      "Veuillez entrer un nom de famille entre 3 et 20 lettres";
  } else if (!value.match(/^[a-zA-Z]*$/)) {
    errorDisplay.textContent =
      "Veuillez ne pas inclure de chiffres ou caractères spéciaux ";
  } else {
    errorDisplay.textContent = "";
  }
};

const addressChecker = (value) => {
  const errorDisplay = document.getElementById("addressErrorMsg"); //DYNAMIQUE ?
  if (!value.match(/^[a-zA-Z0-9 ]*$/)) {
    errorDisplay.textContent = "Veuillez ne pas inclure caractères spéciaux ";
  } else {
    errorDisplay.textContent = "";
  }
};

const cityChecker = (value) => {
  const addressChecker = (value) => {
    const errorDisplay = document.getElementById("cityErrorMsg"); //DYNAMIQUE ?
    if (!value.match(/^[a-zA-Z0-9 ]*$/)) {
      errorDisplay.textContent = "Veuillez ne pas inclure caractères spéciaux ";
    } else {
      errorDisplay.textContent = "";
    }
  };
};

const emailChecker = (value) => {
  const errorDisplay = document.getElementById("emailErrorMsg"); //DYNAMIQUE ?
  if (!value.match(/^[\w_-]+@[\w-]+\.[a-z]{2,4}$/i)) {
    errorDisplay.textContent = "Veuillez saisir une adresse mail correcte";
  } else {
    errorDisplay.textContent = "";
  }
};

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
        null;
    }
  });
});
