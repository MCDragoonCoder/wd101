document.addEventListener("DOMContentLoaded", function () {
    loadEntriesFromStorage();
});

document.getElementById("registrationForm").addEventListener("submit", function(event){
    event.preventDefault();
    
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let dob = document.getElementById("dob").value;
    let termsAccepted = document.getElementById("terms").checked;

    let today = new Date();
    let birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    let monthDiff = today.getMonth() - birthDate.getMonth();
    let dayDiff = today.getDay() - birthDate.getDay();

    if (monthDiff<0 || (monthDiff==0 && dayDiff<0)) {
        age--;
    }
    if (age<18 || age>55) {
        alert("Your age must be between 18 and 55 to register.");
        return;
    }
    if(!termsAccepted) {
        alert("Check this box");
        return;
    }

    let newEntry = { name, email, password, dob, termsAccepted };
    let entries = JSON.parse(localStorage.getItem("entries")) || [];
    entries.push(newEntry);
    localStorage.setItem("entries", JSON.stringify(entries));
    document.getElementById("registrationForm").reset();
    addEntryToTable(newEntry);
});

function addEntryToTable(entry) {
    let tableBody = document.getElementById("entriesTableBody");
    let newRow = document.createElement("tr");
    newRow.innerHTML = `
      <td>${entry.name}</td>
      <td>${entry.email}</td>
      <td>${entry.password}</td>
      <td>${entry.dob}</td>
      <td>${entry.termsAccepted ? "true" : "false"}</td>
    `;
    tableBody.appendChild(newRow);
}

function loadEntriesFromStorage() {
    let entries = JSON.parse(localStorage.getItem("entries")) || [];    
    entries.forEach(entry => {
        addEntryToTable(entry);
    });
}
