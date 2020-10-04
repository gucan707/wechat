const btn = document.querySelector(".btn>button");

btn.addEventListener("click", function () {
  let xhr = new XMLHttpRequest();
  let params = "username=" + username.value + "&password=" + password.value;

  if (btn.innerText == "注册") {
    xhr.open("post", "http://localhost:3001/register");
  } else {
    xhr.open("post", "http://localhost:3001/login");
  }
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.send(params);
  xhr.onload = function () {
    console.log(params);
    console.log(xhr.responseText);
  };
});
