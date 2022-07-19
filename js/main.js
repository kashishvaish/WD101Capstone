const email = document.getElementById("email");

email.addEventListener("input", function (event) {
  if (email.validity.typeMismatch) {
    email.setCustomValidity("This is not a valid email address!");
    email.reportValidity();
  } else {
    email.setCustomValidity("");
  }
});


function ageValidate() {
  const dob = document.getElementById("dob");
  const date = new Date(dob.value);
  const minValidDob = new Date();
  minValidDob.setFullYear(minValidDob.getFullYear()-55);
  const maxValidDob = new Date();
  maxValidDob.setFullYear(maxValidDob.getFullYear()-18);
  if (minValidDob.getTime() <= date.getTime()  && date.getTime() <= maxValidDob.getTime()) {
    document.getElementById("dobError").innerHTML = "";
    return true;
  } else if (minValidDob.getTime() > date.getTime()) {
    document.getElementById("dobError").innerHTML = "Age cannot be more than 55 years.";
    return false;
  } else {
    document.getElementById("dobError").innerHTML = "Age cannot be less than 18 years.";
    return false;
  }
};


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
  if (!ageValidate()) {
    return
  }
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
  const inputs = document.querySelectorAll('#name, #email, #password, #dob, #acceptTerms');
  inputs.forEach(input => {
    input.value = '';
  });
  displayEntries();
};


let form = document.getElementById("user_form");
form.addEventListener("submit", saveUserForm, true);
displayEntries();


const closeNotification = document.getElementById("notificationClose")

closeNotification.addEventListener("click", function (event) {
  document.getElementById("notification").style.visibility = "hidden";
});

