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
