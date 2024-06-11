var signupName = document.getElementById('signupName');
var signupEmail = document.getElementById('signupEmail');
var signupPassword = document.getElementById('signupPassword');
var signinEmail = document.getElementById('signinEmail');
var signinPassword = document.getElementById('signinPassword');

var pathparts = location.pathname.split('/');
var baseURL = pathparts.slice(0, -1).join('/');

var username = localStorage.getItem('sessionUsername');
if (username && document.getElementById('username')) {
    document.getElementById('username').innerHTML = "Welcome " + username;
}

var signUpArray = JSON.parse(localStorage.getItem('users')) || [];

function isEmpty() {
    return signupName.value !== "" && signupEmail.value !== "" && signupPassword.value !== "";
}

function isEmailExist() {
    for (var i = 0; i < signUpArray.length; i++) {
        if (signUpArray[i].email.toLowerCase() === signupEmail.value.toLowerCase()) {
            return true;
        }
    }
    return false;
}

function signUp() {
    if (!isEmpty()) {
        document.getElementById('exist').innerHTML = '<span class="text-danger m-3">All inputs are required</span>';
        return;
    }

    if (isEmailExist()) {
        document.getElementById('exist').innerHTML = '<span class="text-danger m-3">Email already exists</span>';
        return;
    }

    var signUp = {
        name: signupName.value,
        email: signupEmail.value,
        password: signupPassword.value
    };

    signUpArray.push(signUp);
    localStorage.setItem('users', JSON.stringify(signUpArray));
    document.getElementById('exist').innerHTML = '<span class="text-success m-3">Success</span>';
}

function isLoginEmpty() {
    return signinEmail.value !== "" && signinPassword.value !== "";
}

function login() {
    if (!isLoginEmpty()) {
        document.getElementById('incorrect').innerHTML = '<span class="text-danger m-3">All inputs are required</span>';
        return;
    }

    var email = signinEmail.value;
    var password = signinPassword.value;
    var userFound = false;

    for (var i = 0; i < signUpArray.length; i++) {
        if (signUpArray[i].email.toLowerCase() === email.toLowerCase() && signUpArray[i].password === password) {
            localStorage.setItem('sessionUsername', signUpArray[i].name);
            location.replace(baseURL + '/hello.html');
            userFound = true;
            break;
        }
    }

    if (!userFound) {
        document.getElementById('incorrect').innerHTML = '<span class="p-2 text-danger">Incorrect email or password</span>';
    }
}

function logout() {
    localStorage.removeItem('sessionUsername');
    location.replace(baseURL + '/index.html');
}
