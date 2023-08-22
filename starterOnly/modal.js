// This function toggles a responsive class for navigation bar on click.
function editNav(e) {
  e.preventDefault();
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const closeBtn = document.querySelectorAll(".close");

// launch modal event (This section adds click event listeners to open the modal)
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// close modal event (This section adds click event listeners to close the modal)
closeBtn.forEach((btn) => btn.addEventListener("click", closeModal));

// Function to launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

const contentElement = document.querySelector(".content");

// Function to close modal event
function closeModal() {
  modalbg.style.display = "none";
  modalbg.classList.add("fade-out");

  setTimeout(() => {
    contentElement.classList.remove("close-modal");
    modalbg.classList.replace("show-center-flex", "hide");
    modalbg.classList.remove("fade-out");
  }, 800);
}

// HANDLING THE FORM

// Setting the form inputs  
const firstNameInput = document.getElementById("first");
const lastNameInput = document.getElementById("last");
const emailInput = document.getElementById("email");
const birthdateInput = document.getElementById("birthdate");
const participationAmount = document.getElementById("quantity");
const locationInput = document.querySelectorAll('input[name="location"]');
const termsAndConditionsInput = document.getElementById("checkbox1");
const notifyMeInput = document.getElementById("checkbox2");
const dataError = Array.from(document.querySelectorAll(".formData"));
const dataSuccess = Array.from(document.querySelectorAll(".formData"));

// Manipulate error and success messages on form inputs

// Function to show error message
function showErrorMessage(i) {
  dataError[i].setAttribute("data-error-visible", "true");
  dataError[i].setAttribute("data-success-visible", "false");
}

// Function to show success message
function showSuccessMessage(i) {
  dataError[i].setAttribute("data-error-visible", "false");
  dataError[i].setAttribute("data-success-visible", "true");
}

// Functions to validate first name, last name, email, birthdate, etc.
// Function to validate first name
function validateFirstName(firstName) {
  const trimmFirstName = firstName.value.trim();
  if (trimmFirstName.length < 2 || trimmFirstName === "") {
    console.log("Le champ 'Prénom' doit avoir minimum 2 caracteres.");
    showErrorMessage(0);
    return false;
  }
  if (trimmFirstName.length >= 2) {
    showSuccessMessage(0);
    console.log("Le champ 'Prénom' est OK");
  }

  return true;
}

// Function to validate last name
function validateLastName(lastName) {
  const trimmLastName = lastName.value.trim();
  if (trimmLastName.length < 2 || trimmLastName === "") {
    console.log("Le champ 'Nom' doit avoir minimum 2 caractere.");
    showErrorMessage(1);
    return false;
  }
  if (trimmLastName.length > 2) console.log("Le champ 'Nom' est OK");
  showSuccessMessage(1);
  return true;
}

// Function to validate e-mail
function validateEmail(email) {
  const trimmedValue = email.value.trim();
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!regex.test(trimmedValue) || trimmedValue === "") {
    console.log("veuillez saisir une adresse e-mail valide");
    return showErrorMessage(2);
  } else {
    console.log("E-mail OK");
    showSuccessMessage(2);
  }

  return true;
}

// Function to calculate age
function calculateAge(birthdate) {
  const selectedDate = new Date(birthdate.value);
  const currentDate = new Date();
  const ageInMillis = currentDate - selectedDate;
  const ageInYears = ageInMillis / (1000 * 60 * 60 * 24 * 365.25); // Approximate value 365.25 days in a year to master leap years
  return ageInYears;
}

// This function calculates the age based on the birthdate input.
function validateBirthdate(birthdate) {
  const age = calculateAge(birthdate);
  const formData = document.querySelector(".formData");

  if (!validateBirthdateFormat(birthdate.value) || age < 18) {
    console.log("Veuillez saisir une date de naissance valide");
    formData.setAttribute("data-error-visible", "true");
    return false;
  }

  if (birthdate.value === "") {
    formData.setAttribute("data-error-visible", "true");
    console.log("Veuillez saisir une date de naissance valide");
    showErrorMessage(3);
    return false;
  }

  if (age >= 18) {
    formData.setAttribute("data-error-visible", "false");
    formData.removeAttribute("data-error");
    formData.setAttribute("data-success-visible", "true");
  }

  return true;
}

// Function to validate amount of participation on GameOn events
function validateParticipationQuantity(quantity) {
  const value = quantity.value;
  if (isNaN(value) || value < 0 || value > 99 || value == "") {
    console.log("Insérer un numéro valide entre 0 e 99.");
    showErrorMessage(4);
    return false;
  } else {
    console.log("Nombre de participations OK");
    showSuccessMessage(4);
  }

  return true;
}

// Function to validate participation location
function validateParticipationLocation(locationInputs) {
  for (const locationInput of locationInputs) {
    if (locationInput.checked) {
      console.log(
        "Participation Location OK " + "city: " + locationInput.value
      );
      showSuccessMessage(5);
      return locationInput.value; // Return du valeur de l'input selectionné
    }
  }
  showErrorMessage(5);
  console.log("Vous devez sélectionner une option de participation.");
  return false; // Fait un Return false si aucune ville et selectionné
}

// Function to validate terms and conditions
function validateTermsAndConditions() {
  const termsAndConditionsInput = document.getElementById("checkbox1");

  if (!termsAndConditionsInput.checked) {
    console.log("Termes et conditions not checked");
    showErrorMessage(6);
    return false;
  }
  console.log("Terms ok");
  showSuccessMessage(6);
  return true;
}

// Function to validate notification activation
function validateNotification() {
  const notifyMeInput = document.getElementById("checkbox2");

  if (!notifyMeInput.checked) {
    console.log("Notification not checked");
    return false;
  }

  console.log("Notification ok");
  return true;
}


// Main validation function for the entire form
// This function calls all the individual validation functions and checks whether the form data is valid or not.
function validate() {
  // Appel fonction validation prénom
  const isFirstNameValid = validateFirstName(firstNameInput);
  // Appel fonction validation nom
  const isLastNameValid = validateLastName(lastNameInput);
  // Appel fonction validation email
  const isEmailValid = validateEmail(emailInput);
  // Appel fonction validation nombre participations
  const isBirthdateValid = validateBirthdate(birthdateInput);
  // Appel fonction validation nombre participations
  const isParticipationQuantityValid =
    validateParticipationQuantity(participationAmount);
  // Appel fonction validation local
  const selectedLocation = validateParticipationLocation(locationInput);
  const isParticipationLocationValid = selectedLocation !== false;
  // Appel fonction validation termes et conditions
  const isTermsAndConditionsChecked = validateTermsAndConditions(
    termsAndConditionsInput
  );
  // Appel fonction validation activation notification
  const isNotificationChecked = validateNotification(notifyMeInput);

  if (
    isFirstNameValid &&
    isLastNameValid &&
    isEmailValid &&
    isBirthdateValid &&
    isParticipationQuantityValid &&
    isParticipationLocationValid &&
    isTermsAndConditionsChecked
  ) {
    // Exibir o resultado no console
    function createUserInfo() {
      const userInfo = {
        Prenom: firstNameInput.value,
        Nom: lastNameInput.value,
        Email: emailInput.value,
        Naissance: birthdateInput.value,
        Participations: participationAmount.value,
        Location: selectedLocation,
        Notification: notifyMeInput.checked ? "Accepté" : "Non accepté",
      };

      return userInfo;
    }

    const formDataObject = createUserInfo();
    console.log(formDataObject);

    changeModal();
  }

  let isValid = true;

  document
    .querySelectorAll(
      '.text-control, [type="email"], [type="date"], [type="number"]'
    )
    .forEach((input) => {
      if (!validateInput(input)) {
        isValid = false;
        updateFieldStatus(input); // Atualiza as mensagens de erro/sucesso
      }
    });

  return isValid;
}

// Ajouter un evenement de clique dans le bouton d'envoi du formulaire
document
  .querySelector(".btn-submit")
  .addEventListener("click", function (event) {
    event.preventDefault(); // Evita que o formulário seja enviado

    // Appel fonction de validation du formulaire
    validate();
  });

// Fonction pour changer la modale une fois le formulaire validé
function changeModal() {
  const modalFormAfter = document.querySelector(".modal-body");
  modalFormAfter.innerHTML =
    "<p>Merci pour votre inscription</p><button class='modal-success-btn' onclick='closeModal()'>Fermer</button><span class='close'>";

  const modal = document.querySelector(".modal-body");
  modal.classList.add("modal-success");
  modal.classList.remove("modal-body");


}

// Fonction pour valider les inputs
const form = document.forms["reserve"];

function validateInput(input) {
  const formData = input.closest(".formData");
  const inputValue = input.value.trim();

  if (
    inputValue === "" ||
    (input.hasAttribute("required") && inputValue.length < 2)
  ) {
    formData.setAttribute("data-error-visible", "true");
    return false;
  }

  if (input.type === "text") {
    if (inputValue.length === 1) {
      formData.setAttribute("data-error-visible", "true");
      return false;
    }
  }

  if (input.type === "email" && !validateEmailFormat(inputValue)) {
    formData.setAttribute("data-error-visible", "true");
    return false;
  }

  if (input.type === "date") {
    const age = calculateAge(birthdateInput);
    console.log(age);
    console.log(validateBirthdateFormat(inputValue));
    if (!validateBirthdateFormat(inputValue) || age < 18) {
      formData.setAttribute("data-error-visible", "true");
      console.log("salut");
      return false;
    } else {
      formData.setAttribute("data-success-visible", "true");
      formData.setAttribute("data-error-visible", "false");
      formData.removeAttribute("data-error");
      return true;
    }
  } else {
    formData.removeAttribute("data-error");
    return true;
  }
}

// Fonction pour montrer les messages d'erreur/succes dans les champs/inputs
function updateFieldStatus(input) {
  if (validateInput(input)) {
    input.closest(".formData").setAttribute("data-success-visible", "true");
  } else {
    input.closest(".formData").setAttribute("data-success-visible", "false");
  }
}

// Evenement pour valider les champs en modifiant les valeurs
document
  .querySelectorAll(
    '.text-control, [type="email"], [type="date"], [type="number"]'
  )
  .forEach((input) => {
    input.addEventListener("input", () => {
      updateFieldStatus(input);
    });
  });

// Evenement pour valider tous les champs avant l'envoi du formulaire
form.addEventListener("submit", (event) => {
  let isValid = true;

  document
    .querySelectorAll(
      '.text-control, [type="email"], [type="date"], [type="number"]'
    )
    .forEach((input) => {
      if (!validateInput(input)) {
        isValid = false;
      }
    });

  if (!isValid) {
    event.preventDefault();
  }
});

// Fonction pour valider le format de email
function validateEmailFormat(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// Fonction pour valider le format birthdate
function validateBirthdateFormat(birthdate) {
  const birthdateFormat = /^\d{4}-\d{2}-\d{2}$/;
  return birthdateFormat.test(birthdate);
}
