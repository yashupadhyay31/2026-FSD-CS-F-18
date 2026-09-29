document.getElementById("registrationForm").addEventListener("submit", function(e){

    e.preventDefault();

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let mobile = document.getElementById("mobile").value.trim();
    let branch = document.getElementById("branch").value.trim();
    let password = document.getElementById("password").value;

    let message = document.getElementById("message");

    // Name Validation
    if(name === ""){
        message.style.color="red";
        message.innerHTML="Name cannot be empty";
        return;
    }

    // Email Validation
    if(!email.includes("@")){
        message.style.color="red";
        message.innerHTML="Email must contain @";
        return;
    }

    // Mobile Validation
    if(!/^[0-9]{10}$/.test(mobile)){
        message.style.color="red";
        message.innerHTML="Mobile number must be exactly 10 digits";
        return;
    }

    // Branch Validation
    if(branch === ""){
        message.style.color="red";
        message.innerHTML="Branch cannot be empty";
        return;
    }

    // Password Validation
    // (Requirement says "must less 6 digit")
    if(password.length >= 6){
        message.style.color="red";
        message.innerHTML="Password must be less than 6 characters";
        return;
    }

    message.style.color="green";
    message.innerHTML="Registration Successful!";
});