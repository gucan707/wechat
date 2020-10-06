// 通讯录页右侧的索引
const friendsNav = document.querySelector(".friends_nav");
for (let i = 0; i < 27; i++) {
  let friendsNavMark = document.createElement("a");
  let friendsNavMarkLi = document.createElement("li");
  let index = "A".charCodeAt() + i;
  friendsNavMark.innerText = String.fromCharCode(index);
  if (i == 26) {
    friendsNavMark.innerText = "#";
  }
  friendsNavMark.href = "#mark" + friendsNavMark.innerText;
  friendsNavMarkLi.appendChild(friendsNavMark);
  friendsNav.appendChild(friendsNavMarkLi);
}

const navIndex = document.querySelectorAll(".friends_nav li");
const friendsIndex = document.querySelectorAll(".friends_list_index");
const indexHeader = document.querySelector("header");
var arr = [];
for (let i = 0; i < friendsIndex.length; i++) {
  arr.push(friendsIndex[i].innerText);
}
console.log(arr);
for (let i = 0; i < navIndex.length; i++) {
  navIndex[i].addEventListener("click", function () {
    if (i > 1) {
      console.log(this.innerText);
      let index = arr.findIndex(function (value) {
        return value == navIndex[i].innerText;
      });
      console.log(index);
      if (index != -1) {
        let up = friendsIndex[index].offsetTop - indexHeader.offsetHeight;
        console.log(up);
        window.scrollTo(0, up);
      }
    }
  });
}

// 首页几个页面的转换
const page = document.querySelectorAll(".page");
const header = document.querySelector("header");
const navBtns = document.querySelectorAll(".nav");
const navIco = ["message", "friends", "find", "me"];

function clear() {
  for (let i = 0; i < navBtns.length; i++) {
    navBtns[i].querySelector("img").src = "../img/" + navIco[i] + ".png";
    navBtns[i].className = "nav";
    page[i].className = "page hidden";
  }
}

for (let i = 0; i < navBtns.length; i++) {
  navBtns[i].addEventListener("click", function () {
    if (i != 3) {
      clear();
      this.querySelector("img").src = "../img/" + navIco[i] + "_check.png";
      this.className = "nav green";
      page[i].className = "page";
    } else {
      alert("这个页面没写");
    }
  });
}

var username = "";
document.onreadystatechange = function (event) {
  if (document.readyState === "complete") {
    window.addEventListener("message", function (event) {
      if (event.origin !== "http://localhost:3001") {
        return;
      }
      username = event.data.username;
      onlineUser(username);

      console.log("message:", event.data);
      console.log("origin:", event.source);
    });
  }
};

// 聊天界面发送消息（level 2）
const input = document.querySelector("input");
const content = document.querySelector(".content");

document.addEventListener("keyup", function (e) {
  if (e.key == "Enter" && input.value) {
    let myContent = document.querySelector(".content_me");
    let myNewContent = myContent.cloneNode(true);
    let myNewWords = myNewContent.querySelector(".content_me_words");

    myNewWords.innerText = input.value;
    toServer(username, myNewWords.innerText, "小红");
    let update = content.appendChild(myNewContent);
    input.value = "";
    update.scrollIntoView();
  }
});

var socket = io();
console.log(socket);
function toServer(name, message, receiver) {
  // socket.emit("send", message);
  socket.emit("message", {
    message: message,
    username: name,
    receiver: receiver,
  });
  // socket.on("toClient");
}

function onlineUser(name) {
  socket.emit("online", { username: name, socketID: socket.id });
}

socket.on("toSomeone", function (message) {
  console.log(message);
});
