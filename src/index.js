(function () {
    // inits email js service
    emailjs.init('user_e3JyZJM7g7sO936ULyS71');
})();

/**
 * main email function, checks if users input form is valid, and alerts if it isnt
 */
function sendEmail() {
    document.getElementById('contact-form').addEventListener('submit', function (event) {
        event.preventDefault();
        if(checkFName()&&checkLName()&&checkPhone()&&checkEmail()&&checkMessage()){
            emailjs.sendForm("contact_service", "contact_form", this)
                .then(function () {
                    console.log("SUCCESS");
                });
            document.getElementById("contact-form").reset();
            window.alert("Email sent!");
            console.log("TEST");
        } else if(!checkFName()){
            alert("Enter a valid first name!")
        } else if(!checkLName()){
            alert("Enter a valid last name!")
        } else if(!checkPhone()){
            alert("Enter a valid phone number!")
        } else if(!checkEmail()){
            alert("Enter a valid email address!")
        }else if(!checkMessage()){
            alert("Enter a message!")
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
    const domains = getDomains()
    const email = document.getElementById("user_email").split('@')

    if (email.length === 2) {
        const firsthalf = email[1].split('.')
        if (firsthalf.length === 2) {
            const address = firsthalf[1]

            for (const item of domains) {
                if (address === item.toLowerCase()) {
                    return true
                }
            }
            return true
        }

    }
    return false
}

/**
 *  scrapes list of domains to check for valid addresses
 * @returns {*|string[]} list of domains
 */
function getDomains() {
    const list = fetch('http://data.iana.org/TLD/tlds-alpha-by-domain.txt')
    const rawdata = list.text()
    const domains = rawdata.split('\n')
    domains.splice(0, 1) //removes the first line of the text file
    return domains;
}

/**
 * checks if a message is empty
 * @returns {boolean} is the message valid or not
 */
function checkMessage() {
    return document.getElementById("user_message").value !== "";

}