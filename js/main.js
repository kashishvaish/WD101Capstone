const email = document.getElementById("email");

const dob = document.getElementById("dob");
const date = new Date(dob.value);
var minValidDob = new Date();
minValidDob.setFullYear(minValidDob.getFullYear() - 55);
var dd = minValidDob.getDate();
var mm = minValidDob.getMonth() + 1;
if (dd < 10) {
  dd = "0" + dd;
}
if (mm < 10) {
  mm = "0" + mm;
}
minValidDob = minValidDob.getFullYear() + "-" + mm + "-" + dd;

var maxValidDob = new Date();
maxValidDob.setFullYear(maxValidDob.getFullYear() - 18);
dd = maxValidDob.getDate();
mm = maxValidDob.getMonth() + 1;
if (dd < 10) {
  dd = "0" + dd;
}
if (mm < 10) {
  mm = "0" + mm;
}
maxValidDob = maxValidDob.getFullYear() + "-" + mm + "-" + dd;
document.getElementById("dob").min = minValidDob;
document.getElementById("dob").max = maxValidDob;

email.addEventListener("input", function (event) {
  if (email.validity.typeMismatch) {
    email.setCustomValidity("This is not a valid email address!");
    email.reportValidity();
  } else {
    email.setCustomValidity("");
  }
});

let userEntries = localStorage.getItem("user-entries");
if (userEntries) {
  userEntries = JSON.parse(userEntries);
} else {
  userEntries = [];
}

const displayEntries = () => {
  const savedUserEntries = localStorage.getItem("user-entries");
  let entries = "";
  if (savedUserEntries) {
    const parsedUserEntries = JSON.parse(savedUserEntries);
    entries = parsedUserEntries
      .map((entry) => {
        const name = `<td>${entry.name}</td>`;
        const email = `<td>${entry.email}</td>`;
        const password = `<td>${entry.password}</td>`;
        const dob = `<td>${entry.dob}</td>`;
        const acceptTerms = `<td>${entry.acceptTermsAndConditions}</td>`;
        const row = `<tr>${name} ${email} ${password} ${dob} ${acceptTerms}</tr>`;
        return row;
      })
      .join("\n");
  }
  var table = `<table><tr>
        <th>Name</th>
        <th>Email</th>
        <th>Password</th>
        <th>DOB</th>
        <th>Accepted Terms</th>
        </tr>${entries} </table>`;
  let details = document.getElementById("user-entries");
  details.innerHTML = table;
};

const saveUserForm = (event) => {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const dob = document.getElementById("dob").value;
  const acceptTermsAndConditions =
    document.getElementById("acceptTerms").checked;
  const userDetails = {
    name,
    email,
    password,
    dob,
    acceptTermsAndConditions,
  };
  userEntries.push(userDetails);
  localStorage.setItem("user-entries", JSON.stringify(userEntries));
  document.getElementById("notificationBody").innerHTML = "Added Successfully!";
  document.getElementById("notification").style.visibility = "visible";
  const inputs = document.querySelectorAll(
    "#name, #email, #password, #dob, #acceptTerms"
  );
  inputs.forEach((input) => {
    input.value = "";
  });
  displayEntries();
};

let form = document.getElementById("user_form");
form.addEventListener("submit", saveUserForm, true);
displayEntries();

const closeNotification = document.getElementById("notificationClose");

closeNotification.addEventListener("click", function (event) {
  document.getElementById("notification").style.visibility = "hidden";
});
