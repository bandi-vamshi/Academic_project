const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");
const login_btn = document.querySelector("#nav")

sign_up_btn.addEventListener('click', () =>{
    container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener('click', () =>{
    container.classList.remove("sign-up-mode");
});

let infodetails=[];
function signUp() {
    var username = document.getElementById('sign-user').value;
    var password = document.getElementById('sign-pwd').value;
    var email = document.getElementById('sign-email').value;

    var user = {
        user: username,
        pwd: password,
        mail: email
    };
    
    infodetails.push(user);
    for (x of infodetails)
        console.log(x)

    localStorage.setItem('user', JSON.stringify(user));

    console.log(user)
    console.log('User signed up:', user);
    alert('Sign up successful!');
}
function signIn() {
    var enteredemail = document.getElementById('email').value;
    var enteredPassword = document.getElementById('password').value;

    var storedUser = JSON.parse(localStorage.getItem('user'));

    if (storedUser) {
        if (storedUser.mail == enteredemail && storedUser.pwd == enteredPassword) {
            console.log('Sign in successful');
            alert('Sign in successful!');
            window.open("htmlfile.html");
        } else {
            console.log('Invalid username or password');
            alert('Invalid username or password');
        }
    } else {
        console.log('No user found. Please sign up first.');
        alert('No user found. Please sign up first.');
    }
}






