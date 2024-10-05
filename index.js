document.getElementById("registrationForm").addEventListener("submit", function(event){
    event.preventDefault();
    
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
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
    document.getElementById("registrationForm").reset();

    let tableBody = document.getElementById("entries");
    let newRow = document.createElement("tr");
    
    newRow.innerHTML = `
      <td>${name}</td>
      <td>${email}</td>
      <td>${dob}</td>
      <td>${termsAccepted ? "true" : "false"}</td>
    `;

    tableBody.appendChild(newRow);
});
