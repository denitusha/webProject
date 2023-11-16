const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');

setInterval(() => {
    document.getElementById("currentYear").innerHTML = new Date().toLocaleTimeString();
}, 1000)

registerLink.addEventListener('click', ()=>{
    event.preventDefault();
    resetErrors();
    resetInputs()
    wrapper.classList.add('active');
})

loginLink.addEventListener('click', ()=>{
    event.preventDefault();
    resetErrors();
    resetInputs()
    wrapper.classList.remove('active');
})
function validateAndSubmit(formType) {
    console.log('validateAndSubmit function called');
    event.preventDefault();
    var isValidated = true;
    

    // Reset error messages
    resetErrors();
    

    if (formType === 'login') {
        const username = $("#loginUsername").val();
        const password = $("#loginPassword").val();

        if (username.length <= 8 || password.length <= 8) {
            $("#UsernameSpn").html("Wrong username or password");
            isValidated = false;
        }
    } else if (formType === 'register') {
        const username = $("#registerUsername").val();
        const email = $("#registerEmail").val();
        const password = $("#registerPassword").val();

        if (username.length <= 8) {
            $("#usernameSpn").html("Username must be at least 8 characters");
            isValidated = false;
        }

        if (!isValidEpokaEmail(email)) {
            $("#emailSpn").html("It must be a valid Epoka email");
            isValidated = false;
        }

        if (password.length < 8) {
            $("#passwordSpn").html("Password must be at least 8 characters");
            isValidated = false;
        }

        if ($("#checkbox").prop("checked") === false) {
            $("#checkboxSpn").html("You must agree to terms & conditions");
            isValidated = false;
        }
    }

    

    if(isValidated == false)
    {
        return
    }

    handleFormSubmission();
    
}

function resetErrors() {
    $("#UsernameSpn").html("");
    $("#usernameSpn").html("");
    $("#emailSpn").html("");
    $("#passwordSpn").html("");
    $("#checkboxSpn").html("");
}

function resetInputs(){
    $("#loginUsername").val("");
    $("#loginPassword").val("");
    $("#registerEmail").val("");
    $("#registerUsername").val("");
    $("#registerPassword").val("");
    document.getElementById("checkbox").checked = false;

}



function isValidEpokaEmail(email) {
    // Simple check for Epoka email (ends with @epoka.edu.al)
    return email.endsWith("@epoka.edu.al");
}

function handleFormSubmission() {
    // Assume a successful registration/login for demonstration purposes
    // In a real scenario, you would send data to the server for processing
    window.location.href = "home.html";
}
