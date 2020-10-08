const nav = document.querySelectorAll("nav>div");
// const btn = document.querySelector(".btn>button");

for (let i = 0; i < nav.length; i++) {
  nav[i].addEventListener("click", function () {
    nav[i].className = "checked";
    nav[1 - i].className = "";
    btn.innerText = nav[i].innerText;
  });
}

const btn = document.querySelector(".btn>button");
var thisUser = {};

if (btn) {
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

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status >= 200 && xhr.status < 300) {
          thisUser = xhr.responseText;
          sendMessage(
            xhr.responseText,
            "http://localhost:3001/html/index.html"
          );
        } else if (xhr.status == 422) {
          alert(xhr.responseText);
        } else if (xhr.status == 500) {
          alert("用户名已存在");
        }
      }
    };
  });
}

//封装页面之间发送信息函数
function sendMessage(message, receiveUrl) {
  let receive = window.open(receiveUrl);
  receive.onload = function () {
    receive.postMessage(JSON.parse(message), "*");
    window.addEventListener("message", function (event) {
      if (event.origin !== "http://localhost:3001") {
        return;
      }
      console.log(event.data);
    });
  };
}
