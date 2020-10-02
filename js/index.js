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

const friendsIndex = document.querySelectorAll(".friends_list ul");
for (let i = 0; i < friendsIndex.length; i++) {
  let friendsIndexText = friendsIndex[i].querySelector(".friends_list_index");
  if (i != 0) {
    friendsIndex[i].id = "mark" + friendsIndexText.innerText;
  } else {
    friendsIndex[i].id = "star";
  }
}
