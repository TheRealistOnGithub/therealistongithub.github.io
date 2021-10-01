/**
 * main email function, checks if users input form is valid, and alerts if it isnt
 */
window.onload = function () {
    document.getElementById('contact-form').addEventListener('submit', function (event) {
        event.preventDefault();
        if (checkFName() && checkLName() && checkPhone() && checkEmail() && checkMessage()) {
            emailjs.sendForm("service_oh9v42p","template_5xvd9wk", document.getElementById('contact-form'))
                .then(function () {
                    console.log('SUCCESS!');

                }, function (error) {
                    console.log('FAILED...', error);
                });
            document.getElementById("contact-form").reset();
            window.alert("email sent!");
        } else if (!checkFName()) {
            alert("Enter a valid first name!")
        } else if (!checkLName()) {
            alert("Enter a valid last name!")
        } else if (!checkPhone()) {
            alert("Enter a valid phone number!")
        } else if (!checkEmail()) {
            alert("Enter a valid email address!")
        } else if (!checkMessage()) {
            alert("Enter a message!")
        } else {
            alert("fail");
        }
    });
}


function checkFName() {
    return document.getElementById("user_fname").value !== ""
}

/**
 * checks if the user has a non-empty last name
 * @returns {boolean}
 */
function checkLName() {
    return document.getElementById("user_lname").value !== ""
}

/**
 * checks if the users phone follows the correct format xxx-xxx-xxxx
 * @returns {boolean}
 */
function checkPhone() {
    return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("user_phone").value);


}

/**
 * Checks if the users email is valid by checking if it has all the parts of a proper email (valid domain and address)
 * @returns {boolean} is the email valid
 */
function checkEmail() {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(document.getElementById("user_email").value);


}


/**
 * checks if a message is empty
 * @returns {boolean} is the message valid or not
 */
function checkMessage() {
    return document.getElementById("user_message").value !== "";

}