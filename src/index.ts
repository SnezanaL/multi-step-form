console.log("Hello World");
let currentTab = 0;
showTab(currentTab);
function nextPrev(n: number) {
  console.log("showStep", n);
  var x = document.getElementsByClassName(
    "box__content"
  ) as HTMLCollectionOf<HTMLElement>;
  // Exit the function if any field in the current tab is invalid:
  // if (n == 1 && !validateForm()) return false;
  // Hide the current tab:
  x[currentTab].style.display = "none";
  // Increase or decrease the current tab by 1:
  currentTab = currentTab + n;
  console.log("🚀 ~ nextPrev ~ currentTab:", currentTab);
  // if you have reached the end of the form... :
  let regForm = document.getElementById("regForm") as HTMLFormElement;

  if (currentTab >= x.length) {
    //...the form gets submitted:
    regForm.submit();
    return false;
  }
  // Otherwise, display the correct tab:
  showTab(currentTab);
}

function showTab(n: number) {
  // This function will display the specified tab of the form...
  var x = document.getElementsByClassName(
    "box__content"
  ) as HTMLCollectionOf<HTMLElement>;
  x[n].style.display = "block";
  //... and fix the Previous/Next buttons:
  const prevButton = document.getElementById("prevBtn") as HTMLButtonElement;
  const nextButton = document.getElementById("nextBtn") as HTMLButtonElement;
  if (n == 0) {
    prevButton.style.display = "none";
  } else {
    prevButton.style.display = "inline";
  }
  if (n == x.length - 1) {
    nextButton.innerHTML = "Submit";
  } else {
    nextButton.innerHTML = "Next";
  }
  //... and run a function that will display the correct step indicator:
  fixStepIndicator(n);
}

function validateForm() {
  // This function deals with validation of the form fields
  var x,
    y,
    i,
    valid = true;
  x = document.getElementsByClassName(
    "box__content"
  ) as HTMLCollectionOf<HTMLElement>;
  y = x[currentTab].getElementsByTagName("input");
  // A loop that checks every input field in the current tab:
  for (i = 0; i < y.length; i++) {
    // If a field is empty...
    if (y[i].value == "") {
      // add an "invalid" class to the field:
      y[i].className += " invalid";
      // and set the current valid status to false
      valid = false;
    }
  }
  // If the valid status is true, mark the step as finished and valid:
  if (valid) {
    x[currentTab].className += " finish";
  }
  return valid; // return the valid status
}

function fixStepIndicator(n: number) {
  // This function removes the "active" class of all steps...
  var i,
    x = document.getElementsByClassName(
      "box__content"
    ) as HTMLCollectionOf<HTMLElement>;
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }
  //... and adds the "active" class to the current step:
  x[n].className += " active";
}

// Path: src/index.html
// Compare this snippet from src/index.html:
// <!-- One "tab" for each step in the form: -->
// <div class="tab">Name:
//   <p><input placeholder="First name..." oninput="this.className = ''" name="fname"></p>
//   <p><input placeholder="Last name..." oninput="this.className = ''" name="lname"></p>
// </div>
//
// <div class="tab">Contact Info:
//   <p><input placeholder="E-mail..." oninput="this.className = ''" name="email"></p>
//   <p><input placeholder="Phone..." oninput="this.className = ''" name="phone"></p>
// </div>
//
