// const prevButton = document.getElementById("prevBtn") as HTMLButtonElement;
// const nextButton = document.getElementById("nextBtn") as HTMLButtonElement;

// const boxContent = document.getElementsByClassName(
//   "box__content"
// ) as HTMLCollectionOf<HTMLElement>;
// let currentStep = 0;

// const regForm = document.getElementById("regForm") as HTMLFormElement;

// let input = boxContent[currentStep].getElementsByTagName("input");
// const isEmpty = (str: string) => !str.trim().length;

// console.log("🚀 ~ input:", input.item);
// // console.log("🚀 ~ isEmpty:", isEmpty(input.target.value));

// showTab(currentStep);
// function nextPrev(n: number) {
//   console.log("showStep", n);

//   // Exit the function if any field in the current tab is invalid:
//   if (n == 1 && !validateForm()) return false;
//   // Hide the current tab:
//   boxContent[currentStep].style.display = "none";
//   // Increase or decrease the current tab by 1:
//   currentStep = currentStep + n;
//   console.log("🚀 ~ nextPrev ~ currentStep:", currentStep);
//   // if you have reached the end of the form... :

//   if (currentStep >= boxContent.length) {
//     //...the form gets submitted:
//     regForm.submit();
//     return false;
//   }
//   // Otherwise, display the correct tab:
//   showTab(currentStep);
// }

// function showTab(n: number) {
//   // This function will display the specified tab of the form...
//   boxContent[n].style.display = "block";
//   //... and fix the Previous/Next buttons:

//   if (n == 0) {
//     prevButton.style.display = "none";
//   } else {
//     prevButton.style.display = "inline";
//   }
//   if (n == boxContent.length - 2) {
//     nextButton.innerHTML = "Submit";
//   } else {
//     nextButton.innerHTML = "Next Step";
//   }
//   if (n == boxContent.length - 1) {
//     prevButton.style.display = "none";
//     nextButton.style.display = "none";
//   }
//   //... and run a function that will display the correct step indicator:
//   fixStepIndicator(n);
// }

// const errorEmail = document.getElementById("email-error") as HTMLElement;
// const errorName = document.getElementById("name-error") as HTMLElement;
// console.log("🚀 ~ errorName:", errorName);
// const errorPhone = document.getElementById("phone-error") as HTMLElement;
// console.log("🚀 ~ errorPhone:", errorPhone);

// // Validates email address of course.
// //validateEmail is not defined at HTMLInputElement.onblur
// function validateEmail(e: any) {
//   console.log("🚀 ~ validateEmail ~ e:", e);

//   const atpos = e.indexOf("@");
//   console.log("🚀 ~ validateEmail ~ atpos:", atpos);
//   const dotpos = e.lastIndexOf(".");

//   if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= e.length) {
//     //alert("Not a valid e-mail address");
//     errorEmail.style.display = "inline";
//     return false;
//   }
//   errorEmail.style.display = "none";
//   email.classList.remove("invalid");
//   return true;
// }
// const validateInput = (val: any) => {
//   console.log("🚀 ~ validateName ~ val:", val);
//   const error = document.getElementById(val.id + "-error") as HTMLElement;
//   console.log("🚀 ~ validateInput ~ error:", error);

//   let valInput = isEmpty(val.value);
//   console.log("🚀 ~ validateInput ~ valInput:", valInput);

//   if (val.value === "") {
//     error.style.display = "inline";
//     val.classList.add("invalid");
//     return false;
//   }
//   error.style.display = "none";
//   val.classList.remove("invalid");
//   return true;
// };
// const validateName = (val: string) => {
//   //   return false;
//   // }
//   // return true;
// };

// // function validEmail(email: string) {
// //   console.log("🚀 ~ validEmail ~ email:", email);

// //   // var filter =
// //   //   /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;
// //   // return String(email).search(filter) != -1;
// //   var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
// //   if (reg.test(email) === false) {
// //     alert("Invalid Email Address");
// //     return false;
// //   }

// //   return true;
// // }
// const email = document.getElementById("email") as HTMLInputElement; //input[0]

// function validateForm() {
//   console.log("🚀 ~ validateForm ~ input:", input);
//   // This function deals with validation of the form fields
//   let valid = true;
//   // Reset error messages
//   errorEmail.style.display = "none";
//   errorName.style.display = "none";
//   errorPhone.style.display = "none";
//   // A loop that checks every input field in the current tab:
//   for (let i = 0; i < input.length; i++) {
//     // If a field is empty...
//     if (isEmpty(input[i].value)) {
//       // add an "invalid" class to the field:
//       input[i].className += " invalid";
//       // and set the current valid status to false
//       valid = false;
//       console.log("🚀 ~ validateForm ~ valid:", valid);
//     } else {
//       input[i].classList.remove("invalid");
//       valid = true;
//     }
//     // if (
//     //   isEmpty(input[i].value) ||
//     //   validateEmail(email.value) === false
//     //   //input[i].value == ""
//     // ) {
//     //   errorEmail.style.display = "inline";
//     //   errorName.style.display = "inline";
//     //   errorPhone.style.display = "inline";
//     //   // add an "invalid" class to the field:
//     //   input[i].className += " invalid";
//     //   // and set the current valid status to false
//     //   valid = false;
//     //   console.log("🚀 ~ validateForm ~ valid:", valid);
//     // } else {
//     //   errorEmail.style.display = "none";
//     //   errorName.style.display = "none";
//     //   errorPhone.style.display = "none";
//     //   valid = true;
//     // } //
//     if (validateEmail(email.value) === true && input[i].value) {
//       errorEmail.style.display = "none";
//       input[i].classList.remove("invalid");
//       valid = true;
//     }
//     console.log(
//       "🚀 ~ validateForm ~ validateEmail(input[0].value):",
//       validateEmail(email.value)
//     );
//   }

//   // If the valid status is true, mark the step as finished and valid:
//   if (valid) {
//     boxContent[currentStep].className += " finish";
//   }
//   return valid; // return the valid status
// }

// function fixStepIndicator(n: number) {
//   // This function removes the "active" class of all steps...
//   var i,
//     stepCircle = document.getElementsByClassName(
//       "sidebar__circle"
//     ) as HTMLCollectionOf<HTMLElement>;
//   for (i = 0; i < stepCircle.length; i++) {
//     stepCircle[i].className = stepCircle[i].className.replace(" active", "");
//   }
//   //... and adds the "active" class to the current step:
//   stepCircle[n].className += " active";
// }

// // Path: src/index.html
// // Compare this snippet from src/index.html:
// // <!-- One "tab" for each step in the form: -->
// // <div class="tab">Name:
// //   <p><input placeholder="First name..." oninput="this.className = ''" name="fname"></p>
// //   <p><input placeholder="Last name..." oninput="this.className = ''" name="lname"></p>
// // </div>
// //
// // <div class="tab">Contact Info:
// //   <p><input placeholder="E-mail..." oninput="this.className = ''" name="email"></p>
// //   <p><input placeholder="Phone..." oninput="this.className = ''" name="phone"></p>
// // </div>
// //
