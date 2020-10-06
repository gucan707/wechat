// 聊天界面发送消息（level 2）
const input = document.querySelector("input");
const content = document.querySelector(".content");

document.addEventListener("keyup", function (e) {
  if (e.key == "Enter" && input.value) {
    let myContent = document.querySelector(".content_me");
    let myNewContent = myContent.cloneNode(true);
    let myNewWords = myNewContent.querySelector(".content_me_words");

    myNewWords.innerText = input.value;
    toServer(myNewWords.innerText);
    let update = content.appendChild(myNewContent);
    input.value = "";
    update.scrollIntoView();
  }
});

var socket = io();
console.log(socket);
function toServer(message) {
  // socket.emit("send", message);
  socket.emit("message", { message: message });
  // socket.on("toClient");
}
