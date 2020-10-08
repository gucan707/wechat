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
    clear();
    this.querySelector("img").src = "../img/" + navIco[i] + "_check.png";
    this.className = "nav green";
    page[i].className = "page";
  });
}

// 换头像
var myPhoto = document.querySelector("#photo");
myPhoto.addEventListener("change", function () {
  let formData = new FormData();
  formData.append("myPhoto", this.files[0]);
  formData.set("username", username);
  let xhr = new XMLHttpRequest();
  xhr.open("post", "http://localhost:3001/photo");
  xhr.send(formData);
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status >= 200 && xhr.status < 300) {
    }
  };
});

var username = "";
var userInfo = {};
document.onreadystatechange = function (event) {
  if (document.readyState === "complete") {
    window.addEventListener("message", function (event) {
      if (event.origin !== "http://localhost:3001") {
        return;
      }
      username = event.data.username;
      userInfo = event.data;
      // onlineUser(username);
      checkCookie(username);
      const momentsPage = document.querySelector(".find_describe");
      momentsPage.addEventListener("click", function () {
        sendMessage(event.data, "http://localhost:3001/html/moments.html");
      });
    });
  }
};

// 聊天界面发送消息（level 2）
const input = document.querySelector(".chat-page .input>input");
const content = document.querySelector(".content");
var receiver = "";
document.addEventListener("keyup", function (e) {
  if (e.key == "Enter" && input.value) {
    toFriend(input.value);
    toServer(username, input.value, receiver);
    input.value = "";
  }
});

// 封装函数，发出消息
function toFriend(message) {
  let myContent = document.querySelector(".content_me");
  let myNewContent = myContent.cloneNode(true);
  myNewContent.className = "content_me";
  let myNewWords = myNewContent.querySelector(".content_me_words");
  let myPhoto = myNewContent.querySelector("img");
  myPhoto.src = userInfo.photo
    ? userInfo.photo.replace(/\\/g, "/")
    : "../img/myPhoto.jpg";
  myNewWords.innerText = message;
  let update = content.appendChild(myNewContent);
  update.scrollIntoView();
}

// 将消息存入数据库
function messageSave(username, friend, message, isReceiver) {
  let xhr = new XMLHttpRequest();
  xhr.open("post", "http://localhost:3001/message");
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  let params =
    "username=" +
    username +
    "&friend=" +
    friend +
    "&message=" +
    message +
    "&isReceiver=" +
    isReceiver;
  xhr.send(params);

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status >= 200 && xhr.status < 300) {
        // console.log(xhr.responseText);
      }
    }
  };
}

var socket = io();
function toServer(name, message, receiver) {
  messageSave(name, receiver, message, false);
  socket.emit("message", {
    message: message,
    username: name,
    receiver: receiver,
  });
}

function onlineUser(name) {
  socket.emit("online", { username: name });
}

var receiveMessage = "";

// 接收朋友发来的消息，封装函数
socket.on("toSomeone", function (data) {
  console.log(data);
  let xhr = new XMLHttpRequest();
  xhr.open("post", "http://localhost:3001/userSearch");
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.send("username=" + data.username); // 查找发送方
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status >= 200 && xhr.status < 300) {
      let friendInfo = JSON.parse(xhr.responseText); // 发送方信息
      console.log(friendInfo);
      // fromFriend(data.message, friendInfo);
    }
  };
});
function fromFriend(message) {
  if (
    document.querySelector(".chat-page").className != "chat-page hidden" &&
    document.querySelector(".name").innerText == chatFriend.username
  ) {
    console.log("发送消息");
    receiveMessage = message;
    let friendContent = document.querySelector(".content_friend");
    let friendNewContent = friendContent.cloneNode(true);
    friendNewContent.className = "content_friend";
    let friendNewWords = friendNewContent.querySelector(
      ".content_friend_words"
    );
    friendNewWords.innerText = message;
    let friendPhoto = chatFriend.photo
      ? chatFriend.photo.replace(/\\/g, "/")
      : "../img/myPhoto.jpg";
    friendNewContent.querySelector("img").src = friendPhoto;
    let update = content.appendChild(friendNewContent);
    let name = document.querySelector(".name").innerText;
    messageSave(username, name, message, true);
    update.scrollIntoView();
  } else {
    console.log(chatFriend.username);
    messageSave(username, chatFriend.username, message, true);
  }
}

var userList = [];
socket.on("onlineUser", function (obj) {
  userList = obj.onlineUsername;
  // console.log(onlineUserArr);
  let chatIndex = document.querySelector("#chat-index");
  let chatList = chatIndex.querySelectorAll(".chat_list");
  for (let i = 1; i < chatList.length; i++) {
    chatIndex.removeChild(chatList[i]);
  }
  for (let i = 0; i < userList.length; i++) {
    if (i == obj.index) {
      let xhr = new XMLHttpRequest();
      xhr.open("post", "http://localhost:3001/userSearch");
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhr.send("username=" + userList[obj.index]);
      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
          if (xhr.status >= 200 && xhr.status < 300) {
            console.log(JSON.parse(xhr.responseText));
            if (JSON.parse(xhr.responseText).photo) {
              console.log("换头像");
            }
          }
        }
      };
      continue;
    } else {
      let str =
        '<div class="chat_list">\
      <div class="chat_list_photo"></div>\
      <div class="chat_list_info">\
        <div>\
          <div class="chat_list_info_name">' +
        userList[i] +
        '</div>\
          <div class="chat_list_info_time">19:00</div>\
        </div>\
        <div class="chat_list_info_message">' +
        receiveMessage +
        "</div>\
      </div>\
    </div>";
      chatIndex.insertAdjacentHTML("beforeend", str);

      let xhr = new XMLHttpRequest();
      xhr.open("post", "http://localhost:3001/userSearch");
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhr.send("username=" + userList[i]);
      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
          if (xhr.status >= 200 && xhr.status < 300) {
            console.log(JSON.parse(xhr.responseText));
            let friendInfo = JSON.parse(xhr.responseText);
            if (friendInfo.photo) {
              friendInfo.photo = friendInfo.photo.replace(/\\/g, "/");
              console.log(friendInfo.photo);
              let onlineUserPhoto = document.querySelectorAll(
                ".chat_list_photo"
              );
              let nameList = document.querySelectorAll(".chat_list_info_name");
              for (let j = 0; j < nameList.length; j++) {
                // console.log(userList[i]);
                if (nameList[j].innerText == userList[i]) {
                  onlineUserPhoto[j].style.backgroundImage =
                    "url(" + friendInfo.photo + ")";
                }
              }
            }
          }
        }
      };
    }
  }
  privacyChat();
});

// 复制了菜鸟教程的代码，不过还是有别的问题
function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  var expires = "expires=" + d.toGMTString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function checkCookie(uname) {
  let user = getCookie("username");
  if (user == uname && user != "") {
    onlineUser(user);
  } else {
    setCookie("username", uname, 30);
    checkCookie(uname);
  }
}

// 和某个人的私聊
const indexPage = document.querySelector(".index-page");
const chatPage = document.querySelector(".chat-page");
var chatFriend = {};
function privacyChat() {
  let userList = document.querySelectorAll(".chat_list");
  for (let i = 1; i < userList.length; i++) {
    userList[i].addEventListener("click", function () {
      indexPage.className = "index-page hidden";
      chatPage.className = "chat-page";
      let name = document.querySelector(".name");
      name.innerText = this.querySelector(".chat_list_info_name").innerText;
      receiver = name.innerText;
      let xhr = new XMLHttpRequest();
      xhr.open("post", "http://localhost:3001/userSearch");
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhr.send("username=" + name.innerText);
      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status >= 200 && xhr.status < 300) {
          chatFriend = JSON.parse(xhr.responseText);
          console.log(chatFriend);
        }
      };
      chatBefore(userInfo, name.innerText);
    });
  }
}

// 把数据库中曾经的聊天记录取出来
function chatBefore(userInfo, friendName) {
  for (let i = 0; i < userInfo.chat.length; i++) {
    if (userInfo.chat[i].friends == friendName) {
      if (userInfo.chat[i].isReceiver) {
        fromFriend(userInfo.chat[i].message, userInfo);
      } else {
        toFriend(userInfo.chat[i].message);
      }
    }
  }
}

const chatPageBack = document.querySelector(".chat-page .back");
chatPageBack.addEventListener("click", function () {
  indexPage.className = "index-page";
  chatPage.className = "chat-page hidden";
});

//封装页面之间发送信息函数
function sendMessage(message, receiveUrl) {
  let receive = window.open(receiveUrl);
  receive.onload = function () {
    receive.postMessage(message, "*");
    window.addEventListener("message", function (event) {
      if (event.origin !== "http://localhost:3001") {
        return;
      }
      console.log(event.data);
    });
  };
}

if (document.cookie) {
  console.log(getCookie("username"));
}
