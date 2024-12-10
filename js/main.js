let userName = document.getElementById("userName")
let signUpEmail = document.getElementById("signUpEmail")
let signUpPass = document.getElementById("signUpPass")
let loginEmail = document.getElementById("loginEmail")
let loginPass = document.getElementById("loginPass")

let emailExists = document.getElementById("emailExists")
let hintAlert = document.getElementById("signUpAlert")
let success = document.getElementById("success")
let loginFailed = document.getElementById("incorrect")
let loginSuccess = document.getElementById("correct")


let usersData = []

if (localStorage.getItem("res") != null) {
    usersData = JSON.parse(localStorage.getItem("res"))
}

function clr() {
    userName.value = ""
    signUpEmail.value = ""
    signUpPass.value = ""
}

function addUser() {
    if (emailExist() == true){
        emailExists.classList.remove("d-none")
    } else if (validName() == true && validEmail() == true && validPass() == true) {
            let user = {
                uName: userName.value,
                uEmail: signUpEmail.value,
                uPass: signUpPass.value
            }
            hintAlert.classList.add("d-none")
            emailExists.classList.add("d-none")
            success.classList.remove("empty")
            success.classList.remove("d-none")
            usersData.push(user)
            localStorage.setItem("res", JSON.stringify(usersData))
        clr()
        window.location.href = "../index.html"
    } else {
        hintAlert.classList.remove("d-none")
        success.classList.remove("empty")
        success.classList.add("d-none")
    }
}


// check if email exists
function emailExist() {
    for (let i = 0; i < usersData.length; i++) {
        if (usersData[i].uEmail == signUpEmail.value) {
            return true
        }
        else {
            return false
        }
    }
}




// ======VALIDALITY======

function validName() {
    let nameRegax = /^[a-zA-Z ']{2,}$/
    let nameText = userName.value

    if (nameRegax.test(nameText)) {
        userName.classList.remove("empty")
        userName.classList.remove("is-invalid")
        userName.classList.add("is-valid")
        return true
    } else {
        userName.classList.remove("empty")
        userName.classList.remove("is-valid")
        userName.classList.add("is-invalid")
        return false
    }
}

function validEmail() {
    let emailRegax = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    let emailText = signUpEmail.value
    
    if (emailRegax.test(emailText)) {
        userName.classList.remove("empty")
        signUpEmail.classList.remove("is-invalid")
        signUpEmail.classList.add("is-valid")
        return true
    } else {
        userName.classList.remove("empty")
        signUpEmail.classList.remove("is-valid")
        signUpEmail.classList.add("is-invalid")
        return false
    }
}

function validPass() {
    let passRegax = /^[a-zA-Z0-9!@#$%^&*]{8,}$/
    let passText = signUpPass.value
    
    if (passRegax.test(passText)) {
        userName.classList.remove("empty")
        signUpPass.classList.remove("is-invalid")
        signUpPass.classList.add("is-valid")
        return true
    } else {
        userName.classList.remove("empty")
        signUpPass.classList.remove("is-valid")
        signUpPass.classList.add("is-invalid")
        return false
    }
}


//===========login==============

function login() {
    let email = loginEmail.value
    let pass = loginPass.value
    for (let n = 0; n < usersData.length; n++){
        if (usersData[n].uEmail == email && usersData[n].uPass == pass) {
            loginFailed.classList.add("d-none")
            localStorage.setItem("currentUser",usersData[n].uName)
        goHome()
        } else {
            loginFailed.classList.remove("d-none")
        }
    }
}
let uWelcome = document.getElementById("welcomeDiv")

if (uWelcome != null) {
    uWelcome.innerHTML = `<h1 class="text-info">welcome  ${localStorage.getItem("currentUser")}</h1>`
}

// if ( localStorage.getItem("currentUser") == null) {
//     window.location.href = "../index.html";
// }

function goHome() {
    window.location.href = 'html/home.html';
}


function logout(){
    localStorage.removeItem("currentUser")

}