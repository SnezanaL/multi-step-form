"use strict";
// Show Tabs
const prevButton = document.getElementById("prevBtn");
const nextButton = document.getElementById("nextBtn");
let submitButton;
const boxContent = document.getElementsByClassName("box__content");
let currentStep = 0; // Current tab is set to be the first tab (0)
const inputName = document.getElementById("name");
const inputEmail = document.getElementById("email");
const inputPhone = document.getElementById("phone");
const checkBox = document.getElementById("select__plan");
const yearly = document.getElementById("yearly");
const monthly = document.getElementById("monthly");
const regForm = document.getElementById("regForm");
const step2summary = document.getElementById("summary__step2");
const changePlan = document.getElementById("changePlan");
const addOnPrice = document.getElementsByClassName("add-on__price");
const addOnlineService = document.getElementById("onlineService");
const addCustomizableProfile = document.getElementById("customizableProfile");
const addLargerStorage = document.getElementById("largerStorage");
const summaryTitle = document.getElementById("summary__title");
const summaryPrice = document.getElementById("summary__price");
const totalTitle = document.getElementById("totalTitle");
const totalSum = document.getElementById("totalSum");
let formAddons = [];
const PriceLookup = {
    monthly: {
        text: "mo",
        arcade: 9,
        advanced: 12,
        pro: 15,
    },
    yearly: {
        text: "yr",
        arcade: 90,
        advanced: 120,
        pro: 150,
    },
};
const Addons = {
    title: {
        onlineService: "Online Service",
        customizableProfile: "Customizable Profile",
        largerStorage: "Larger Storage",
    },
    monthly: {
        onlineService: 1,
        customizableProfile: 2,
        largerStorage: 2,
    },
    yearly: {
        onlineService: 10,
        customizableProfile: 20,
        largerStorage: 20,
    },
};
let formValues = {
    name: "",
    email: "",
    phone: "",
    option: "",
    plan: "",
    addons: [],
};
let planPrice = 0;
showTab(currentStep); // Display the current tab
function showTab(n) {
    if (n == 4) {
        boxContent[4].style.display = "flex";
    }
    else {
        boxContent[n].style.display = "block";
    }
    if (n == 0) {
        prevButton.style.display = "none";
        nextButton.addEventListener("click", (e) => {
            e.preventDefault();
            step1(inputName.value, inputEmail.value, inputPhone.value);
        });
    }
    else {
        prevButton.style.display = "inline";
    }
    if (n == 1) {
        nextButton.addEventListener("click", (e) => {
            e.preventDefault();
            step2();
            addOnPlan(formValues.plan);
        });
    }
    if (n == 2) {
        nextButton.addEventListener("click", (e) => {
            // e.preventDefault();
            step3();
            showPlan(formValues.plan, formValues.option, formValues.addons[0]);
        });
    }
    if (n == boxContent.length - 2) {
        nextButton.innerHTML = "Submit";
    }
    else {
        nextButton.innerHTML = "Next Step";
    }
    if (n == boxContent.length - 1) {
        prevButton.style.display = "none";
        nextButton.style.display = "none";
    }
    fixStepIndicator(n);
    mobileStepIndicator(n);
}
function nextPrev(n) {
    if (n == 1 && !validateForm())
        return false;
    boxContent[currentStep].style.display = "none";
    currentStep = currentStep + n;
    if (currentStep >= boxContent.length) {
        //regForm.submit();
        return false;
    }
    showTab(currentStep);
}
async function fixStepIndicator(n) {
    // This function removes the "active" class of all steps...
    var i, stepCircle = (await document.getElementsByClassName("sidebar__circle"));
    for (i = 0; i < stepCircle.length; i++) {
        stepCircle[i].className = stepCircle[i].className.replace(" active", "");
    }
    //... and adds the "active" class to the current step:
    if (n === 4) {
        stepCircle[3].className += " active";
    }
    else {
        stepCircle[n].className += " active";
    }
}
async function mobileStepIndicator(n) {
    // MOBILE: This function removes the "active" class of all steps...
    let i, stepCircle = (await document.getElementsByClassName("header__circle"));
    for (i = 0; i < stepCircle.length; i++) {
        stepCircle[i].className = stepCircle[i].className.replace(" active", "");
    }
    //... and adds the "active" class to the current step:
    if (n === 4) {
        stepCircle[3].className += " active";
    }
    else {
        stepCircle[n].className += " active";
    }
}
let input = boxContent[currentStep].getElementsByTagName("input");
function validateEmail(e) {
    const email = document.getElementById("email");
    const errorEmail = document.getElementById("email-error");
    let message = "";
    const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (e === "") {
        message = "Email is required!";
        errorEmail.style.display = "inline";
        errorEmail.innerHTML = message;
        email.classList.add("invalid");
        nextButton.disabled = true;
        return false;
    }
    else if (reg.test(e) === false) {
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
const validateInput = async (val) => {
    const error = (await document.getElementById(val.id + "-error"));
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
    if (error) {
        error.style.display = "none";
        val.classList.remove("invalid");
        message = "";
        error.innerHTML = message;
    }
    nextButton.disabled = false;
    return true;
};
function validatePlan() {
    const cardSelected = document.getElementsByClassName("selected");
    let message = "";
    if (cardSelected === undefined || cardSelected.length === 0) {
        message = "Please select a plan";
        nextButton.disabled = true;
        return false;
    }
    message = "";
    nextButton.disabled = false;
    return true;
}
async function validateForm() {
    let valid = true;
    if (currentStep === 0) {
        valid = await validateInput(inputName.value);
        valid = await validateEmail(inputEmail.value);
        valid = await validateInput(inputPhone.value);
        if (valid) {
            formValues.name = inputName.value;
            formValues.email = inputEmail.value;
            formValues.phone = inputPhone.value;
        }
    }
    else if (currentStep === 1) {
        valid = validatePlan();
        if (valid) {
            const cardSelected = document.getElementsByClassName("selected");
            formValues.option = await cardSelected[0].id;
            formValues.plan = (await checkBox.checked) ? "yearly" : "monthly";
        }
    }
    else if (currentStep === 2) {
        const addOnlineService = document.getElementById("onlineService");
        const addCustomizableProfile = document.getElementById("customizableProfile");
        const addLargerStorage = document.getElementById("largerStorage");
        if (addOnlineService.checked) {
            formValues.addons.push(addOnlineService.id);
        }
        if (addCustomizableProfile.checked) {
            formValues.addons.push(addCustomizableProfile.id);
        }
        if (addLargerStorage.checked) {
            formValues.addons.push(addLargerStorage.id);
        }
    }
    else if (currentStep === 3) {
        const summary = (await document.getElementsByClassName("summary"));
    }
    return valid;
}
/* ----------------------------------- */
// ####  Step 2 ########
/* ----------------------------------- */
const card = document.getElementsByClassName("card");
let current = document.getElementsByClassName("selected");
for (let i = 0; i < card.length; i++) {
    card[i].addEventListener("click", function () {
        if (current.length > 0) {
            current[0].className = current[0].className.replace(" selected", "");
        }
        card[i].className += " selected";
    });
}
const cardPrice = document.getElementsByClassName("card__price");
const cardDescription = document.getElementsByClassName("card__description");
if (checkBox) {
    checkBox.addEventListener("click", function () {
        if (checkBox.checked) {
            yearly.classList.add("active");
            monthly.classList.remove("active");
            cardPrice[0].innerHTML = "$90/yr";
            cardPrice[1].innerHTML = "$120/yr";
            cardPrice[2].innerHTML = "$150/yr";
            cardDescription[0].innerHTML = "2 months free";
            cardDescription[1].innerHTML = "2 months free";
            cardDescription[2].innerHTML = "2 months free";
        }
        else {
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
// ####  Step 3 ########
/* ----------------------------------- */
const addOnPlan = (plan) => {
    if (plan === "yearly") {
        addOnPrice[0].innerHTML = "+$10/yr";
        addOnPrice[1].innerHTML = "+$20/yr";
        addOnPrice[2].innerHTML = "+$20/yr";
    }
    else {
        addOnPrice[0].innerHTML = "+$1/mo";
        addOnPrice[1].innerHTML = "+$2/mo";
        addOnPrice[2].innerHTML = "+$2/mo";
    }
};
/* ----------------------------------- */
// #### Functions  ########
/* ----------------------------------- */
const step1 = (name, email, phone) => {
    formValues = {
        name: "",
        email: "",
        phone: "",
        option: "",
        plan: "",
        addons: [],
    };
    formValues = {
        name: name,
        email: email,
        phone: phone,
        option: "",
        plan: "",
        addons: [],
    };
};
const step2 = () => {
    formValues.option = "";
    formValues.plan = "";
    const cardSelected = document.getElementsByClassName("selected");
    formValues.option = cardSelected[0].id;
    formValues.plan = checkBox.checked ? "yearly" : "monthly";
    formValues = {
        ...formValues,
        option: cardSelected[0].id,
        plan: checkBox.checked ? "yearly" : "monthly",
    };
};
const step3 = () => {
    formAddons = [];
    if (addOnlineService.checked) {
        formAddons.push(addOnlineService.id);
    }
    if (addCustomizableProfile.checked) {
        formAddons.push(addCustomizableProfile.id);
    }
    if (addLargerStorage.checked) {
        formAddons.push(addLargerStorage.id);
    }
    formValues = {
        ...formValues,
        addons: [formAddons],
    };
    return formValues;
};
const showPlan = (plan, option, addons) => {
    const selectedOption = option;
    const selectedPlan = plan;
    const priceText = PriceLookup[selectedPlan].text;
    if (PriceLookup[selectedPlan] &&
        PriceLookup[selectedPlan][selectedOption] !== undefined) {
        planPrice = PriceLookup[selectedPlan][selectedOption];
    }
    else {
        // Handle invalid plan or option value
        console.error("Invalid plan or option value");
    }
    summaryTitle.innerHTML = `${selectedOption.charAt(0).toUpperCase() + selectedOption.slice(1)} (${selectedPlan.charAt(0).toUpperCase() + selectedPlan.slice(1)})`; // Capitalize the first letter
    summaryPrice.innerHTML = `+${planPrice}/${priceText}`;
    let template = "";
    let step2summaryArray = [];
    let addonPrices = 0;
    let total = 0;
    let noAddons = "";
    if (addons.length === 0) {
        noAddons = `
      <div class="summary__step2__group"> 
      <p class="summary__title">No Addons</p>
      <p class="summary__price">+$0/${priceText}</p>
      </div>`;
    }
    else {
        for (const item of addons) {
            const itemTitle = Addons.title[item];
            const price = Addons[selectedPlan][item];
            template = ` <div class="summary__step2__group">
      <p class="summary__title">${itemTitle}</p>
      <p class="summary__price">+${price}/${priceText}</p>
     
      </div>`;
            addonPrices += price;
            step2summaryArray.push(template);
        }
    }
    step2summary.innerHTML =
        addons.length === 0 ? noAddons : step2summaryArray.join("");
    total = sumTotal(planPrice, addonPrices);
    totalTitle.innerHTML = `Total (per ${selectedPlan})`;
    totalSum.innerHTML = ` +$${total}/${priceText}`;
};
const sumTotal = (planPrice, addons) => {
    if (addons === undefined) {
        addons = 0;
    }
    return planPrice + addons;
};
changePlan.addEventListener("click", function (e) {
    e.preventDefault();
    nextPrev(-2);
});
//# sourceMappingURL=index.js.map