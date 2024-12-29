const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");
const login_btn = document.querySelector("#nav");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});

async function signUp() {
  const username = document.getElementById("sign-user").value;
  const email = document.getElementById("sign-email").value;
  const password = document.getElementById("sign-pwd").value;

  const response = await fetch("http://localhost:3000/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password }),
  });

  const result = await response.json();
  alert(result.message);

  // Clear the fields after signup
  document.getElementById("sign-user").value = "";
  document.getElementById("sign-email").value = "";
  document.getElementById("sign-pwd").value = "";
}

async function signIn() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const response = await fetch("http://localhost:3000/signin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const result = await response.json();
  alert(result.message);

  if (response.ok) {
    window.location.href = result.redirectTo;

    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
  } else {
    alert(result.message);
  }
}
