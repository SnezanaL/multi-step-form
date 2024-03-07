// Show Tabs
const prevButton = document.getElementById("prevBtn") as HTMLButtonElement;
const nextButton = document.getElementById("nextBtn") as HTMLButtonElement;
let submitButton;
const boxContent = document.getElementsByClassName(
  "box__content"
) as HTMLCollectionOf<HTMLElement>;
let currentStep = 0; // Current tab is set to be the first tab (0)

const inputName = document.getElementById("name") as HTMLInputElement;
const inputEmail = document.getElementById("email") as HTMLInputElement;
const inputPhone = document.getElementById("phone") as HTMLInputElement;

const checkBox = document.getElementById("select__plan") as HTMLInputElement;
const yearly = document.getElementById("yearly") as HTMLElement;
const monthly = document.getElementById("monthly") as HTMLElement;

const regForm = document.getElementById("regForm") as HTMLFormElement;
const formData = new FormData();
let formValues = {
  name: "",
  email: "",
  phone: "",
  option: "",
  plan: "",
  addons: {
    onlineService: false,
    customizableProfile: false,
    largerStorage: false,
  },
};

showTab(currentStep); // Display the current tab
// console.log("🚀 ~ currentStep:", currentStep);

function showTab(n: number) {
  // This function will display the specified tab of the form...
  boxContent[n].style.display = "block";
  //... and fix the Previous/Next buttons:

  if (n == 0) {
    prevButton.style.display = "none";

    nextButton.addEventListener("click", (e) => {
      formValues = {
        name: inputName.value,
        email: inputEmail.value,
        phone: inputPhone.value,
        option: "",
        plan: "",
        addons: {
          onlineService: false,
          customizableProfile: false,
          largerStorage: false,
        },
      };
      console.log("🚀 ~ nextButton.addEventListener ~ formValues:", formValues);
      // formData.append("name", inputName.value);
      // formData.append("email", inputEmail.value);
      // formData.append("phone", inputPhone.value);
      // console.log("🚀 ~ submitForm ~ formData:", formData.values());
      // for (const value of formData.values()) {
      //   console.log(value);
      // }
    });
  } else {
    prevButton.style.display = "inline";
  }
  if (n == 1) {
    nextButton.addEventListener("click", (e) => {
      e.preventDefault();
      const cardSelected = document.getElementsByClassName("selected");
      console.log("🚀 ~ cardSelected:", cardSelected);
      formValues.option = cardSelected[0].id;
      formValues.plan = checkBox.checked ? "yearly" : "monthly";
      console.log("🚀 ~ nextButton.addEventListener ~ formValues:", formValues);
    });
  }
  if (n == 2) {
    nextButton.addEventListener("click", (e) => {
      e.preventDefault();
      formValues.addons.onlineService = addOnlineService.checked;
      formValues.addons.customizableProfile = addCustomizableProfile.checked;
      formValues.addons.largerStorage = addLargerStorage.checked;
      console.log("🚀 ~ nextButton.addEventListener ~ formValues:", formValues);
    });
  }
  if (n == boxContent.length - 2) {
    nextButton.innerHTML = "Submit";
    nextButton.id = "submitBtn";
    submitButton = document.getElementById("submitBtn") as HTMLButtonElement; // Assert the type to HTMLButtonElement
    console.log("🚀 ~ showTab ~ submitButton:", submitButton);
    submitButton.addEventListener("click", (e) => {
      e.preventDefault();
      submitForm();
    });
  } else {
    nextButton.innerHTML = "Next Step";
  }
  if (n == boxContent.length - 1) {
    prevButton.style.display = "none";
    nextButton.style.display = "none";
  }
  //... and run a function that will display the correct step indicator:
  fixStepIndicator(n);
}

function fixStepIndicator(n: number) {
  // This function removes the "active" class of all steps...
  var i,
    stepCircle = document.getElementsByClassName(
      "sidebar__circle"
    ) as HTMLCollectionOf<HTMLElement>;
  for (i = 0; i < stepCircle.length; i++) {
    stepCircle[i].className = stepCircle[i].className.replace(" active", "");
  }
  //... and adds the "active" class to the current step:
  if (n === 4) {
    stepCircle[3].className += " active";
  } else {
    stepCircle[n].className += " active";
  }
}

function nextPrev(n: number) {
  // console.log("showStep", n);

  // Exit the function if any field in the current tab is invalid:
  if (n == 1 && !validateForm()) return false;
  // Hide the current tab:
  boxContent[currentStep].style.display = "none";
  // Increase or decrease the current tab by 1:
  currentStep = currentStep + n;
  // console.log("🚀 ~ nextPrev ~ currentStep:", currentStep);
  // if you have reached the end of the form... :
  console.log("🚀 ~ nextPrev ~ boxContent.length:", boxContent.length);
  console.log("🚀 ~ nextPrev ~ currentStep:", currentStep);

  if (currentStep >= boxContent.length - 1) {
    //...the form gets submitted:
    // regForm.submit();
    // console.log("🚀 ~ nextPrev ~ regForm.submit();:", regForm.submit());
    // return false;
    //regForm.submit();

    return false;
  }

  // Otherwise, display the correct tab:
  showTab(currentStep);
}
/* ----------------------------------- */
// #### Validate form Step 1 ########
/* ----------------------------------- */

let input = boxContent[currentStep].getElementsByTagName("input");

// Validates email address
function validateEmail(e: string) {
  // console.log("🚀 ~ validateEmail ~ email:", e);
  const email = document.getElementById("email") as HTMLInputElement;
  const errorEmail = document.getElementById("email-error") as HTMLElement;

  let message = "";
  const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  // console.log("🚀 ~ validateEmail ~ reg.test(e):", reg.test(e));
  if (e === "") {
    message = "Email is required!";
    errorEmail.style.display = "inline";
    errorEmail.innerHTML = message;
    email.classList.add("invalid");
    nextButton.disabled = true;
    return false;
  } else if (reg.test(e) === false) {
    message = "Please provide a valid email address";
    errorEmail.style.display = "inline";
    errorEmail.innerHTML = message;
    email.classList.add("invalid");
    nextButton.disabled = true;
    return false;
  }
  errorEmail.style.display = "none";
  email.classList.remove("invalid");
  nextButton.disabled = false;
  message = "";
  errorEmail.innerHTML = message;

  return true;
}

nextButton.disabled = true;
const validateInput = (val: any) => {
  const error = document.getElementById(val.id + "-error") as HTMLElement;
  let message = "";
  if (val.value === "") {
    message = "This field is required";
    error.style.display = "inline";
    error.innerHTML = message;
    val.classList.add("invalid");
    nextButton.disabled = true;
    return false;
  }
  if (val.id === "name" && val.value.length < 3) {
    message = "This field must be at least 3 characters";
    error.style.display = "inline";
    error.innerHTML = message;
    val.classList.add("invalid");
    nextButton.disabled = true;
    return false;
  }
  error.style.display = "none";
  val.classList.remove("invalid");
  message = "";
  error.innerHTML = message;
  nextButton.disabled = false;
  return true;
};
// Validate form
function validateForm() {
  if (currentStep === 0) {
    let valid = validateInput(input[0]);
    valid = validateInput(input[2]);
    valid = validateEmail(input[1].value);
    // console.log("🚀 ~ validateForm ~ valid0:", valid);
    return valid;
  }
  if (currentStep === 1) {
    //let valid = validateInput(input[3]);
    // valid = validateInput(input[4]);
    // valid = validateInput(input[5]);
    // console.log("🚀 ~ validateForm ~ valid1:");
    nextButton.disabled = false;
    return true;
  } else {
    nextButton.disabled = false;
    return true;
  }
}

/* ----------------------------------- */
// ####  Step 2 ########
/* ----------------------------------- */
const card = document.getElementsByClassName("card");
console.log("🚀 ~ card:", card);
let current = document.getElementsByClassName("selected");
for (let i = 0; i < card.length; i++) {
  card[i].addEventListener("click", function () {
    console.log("🚀 ~ card[i].addEventListener ~ i:", i);

    if (current.length > 0) {
      current[0].className = current[0].className.replace(" selected", "");
    }
    card[i].className += " selected";
  });
}
console.log("🚀 ~ current:", current);

console.log("🚀 ~ checkBox:", checkBox);

const cardPrice = document.getElementsByClassName("card__price");
const cardDescription = document.getElementsByClassName("card__description");
if (checkBox) {
  checkBox.addEventListener("click", function () {
    console.log("🚀 ~ checkBox.addEventListener ~ checkBox:", checkBox);
    if (checkBox.checked) {
      yearly.classList.add("active");
      monthly.classList.remove("active");
      cardPrice[0].innerHTML = "$90/yr";
      console.log("🚀 ~ cardPrice[0].innerHTML:", cardPrice[0].innerHTML);
      cardPrice[1].innerHTML = "$120/yr";
      cardPrice[2].innerHTML = "$150/yr";
      cardDescription[0].innerHTML = "2 months free";
      cardDescription[1].innerHTML = "2 months free";
      cardDescription[2].innerHTML = "2 months free";
    } else {
      monthly.classList.add("active");
      yearly.classList.remove("active");
      cardPrice[0].innerHTML = "$9/mo";
      cardPrice[1].innerHTML = "$12/mo";
      cardPrice[2].innerHTML = "$15/mo";
      cardDescription[0].innerHTML = "";
      cardDescription[1].innerHTML = "";
      cardDescription[2].innerHTML = "";
    }
  });
}

/* ----------------------------------- */
// #### Validate form Step 3 ########
/* ----------------------------------- */

// const addOn = document.getElementsByClassName("add-on");
// const addOnTitle = document.getElementsByClassName("add-on__title");
// const addOnPrice = document.getElementsByClassName("add-on__price");
// const addOnLabel = document.getElementsByClassName("addon-label");
const addOnlineService = document.getElementById(
  "online-service"
) as HTMLInputElement;
const addCustomizableProfile = document.getElementById(
  "customizable-profile"
) as HTMLInputElement;
const addLargerStorage = document.getElementById(
  "larger-storage"
) as HTMLInputElement;
// addOnlineService.addEventListener("change", function () {
//   console.log("🚀 ~ addOnlineService.checked:", addOnlineService.checked);
//   if (addOnlineService.checked) {
//     formValues.addons.onlineService = true;
//   } else {
//     formValues.addons.onlineService = false;
//   }
// });
// addCustomizableProfile.addEventListener("change", function () {
//   console.log(
//     "🚀 ~ addCustomizableProfile.checked:",
//     addCustomizableProfile.checked
//   );
//   if (addCustomizableProfile.checked) {
//     formValues.addons.customizableProfile = true;
//   } else {
//     formValues.addons.customizableProfile = false;
//   }
// });
// addLargerStorage.addEventListener("change", function () {
//   console.log("🚀 ~ addLargerStorage.checked:", addLargerStorage.checked);
//   if (addLargerStorage.checked) {
//     formValues.addons.largerStorage = true;
//   } else {
//     formValues.addons.largerStorage = false;
//   }
// });

// console.log("🚀 ~ formValues:", formValues);
// for (let i = 0; i < addOn.length; i++) {
//   // const hasBefore = (selector: any) => {
//   //   const el = document.getElementsByClassName(selector)[i] as HTMLElement;
//   //   return el;
//   // };
//   // addOnInput[i].addEventListener("change", function () {
//   //   console.log("🚀 ~ addOn[i].addEventListener ~ i:", addOnInput[i]);
//   //   // if (addOnInput[i]. === true) {
//   //   //   console.log(
//   //   //     "🚀 ~ addOn[i].addEventListener ~ addOnInput[i].checked:",
//   //   //     addOnInput[i].checked
//   //   //   );
//   //   //   // addOnInput[i].checked = false;
//   //   //   // addOn[i].classList.remove("selected");
//   //   // }
//   //   // if (addOn[i].classList.contains("selected")) {
//   //   //   addOn[i].classList.remove("selected");
//   //   // } else {
//   //   //   addOn[i].classList.add("selected");
//   //   // }
//   //   //addOn[i].classList.toggle("selected");
//   // });
// }

/* ----------------------------------- */
// #### Validate form Step 4 ########
/* ----------------------------------- */

/* ----------------------------------- */
// #### Validate form Step 5 ########
/* ----------------------------------- */

/* ----------------------------------- */
// #### Collect data ########
/* ----------------------------------- */

// console.log("🚀 ~ currentStep:", currentStep);
// console.log("🚀 ~ submitButton:", submitButton);

// submitButton.addEventListener("click", (e) => {
//   e.preventDefault();
//   const formData = new FormData(regForm);
//   console.log("🚀 ~ formData:", formData);
// });
function submitForm() {
  console.log("🚀 ~ formData:", formData);
  return false;
}
