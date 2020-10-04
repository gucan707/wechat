const nav = document.querySelectorAll("nav>div");
// const btn = document.querySelector(".btn>button");

for (let i = 0; i < nav.length; i++) {
  nav[i].addEventListener("click", function () {
    nav[i].className = "checked";
    nav[1 - i].className = "";
    btn.innerText = nav[i].innerText;
  });
}
