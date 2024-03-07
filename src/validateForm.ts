const regForm = document.querySelector("regForm");
console.log("🚀 ~ file: validateForm.ts ~ line 1 ~ regForm");

const validateEmail = (email: string) => {
  let message = "";
  const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  if (reg.test(email) === false) {
    message = "Please provide a valid email address";
    return false;
  }
  if (email === "") {
    message = "Email is required";
    return false;
  }
  return true;
};

function validateInput(val: string) {
  console.log("🚀 ~ validateInput ~ val:", val);

  let message = "";
  if (val === "") {
    message = "This field is required";
    return false;
  }
  return true;
}

// Validate Form
export function validateForm() {
  console.log("Validating form...");
}
