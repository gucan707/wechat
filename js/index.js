//聊天界面发送消息（level 2）
var input = document.querySelector("input");
var content = document.querySelector(".content");

document.addEventListener("keyup", function (e) {
  if (e.key == "Enter" && input.value) {
    let myContent = document.querySelector(".content_me");
    let myNewContent = myContent.cloneNode(true);
    let myNewWords = myNewContent.querySelector(".content_me_words");

    myNewWords.innerText = input.value;
    content.appendChild(myNewContent);
    input.value = "";
  }
});

//订阅号消息页面的展开收起
var passageList = document.querySelectorAll(".list_passage");
var passageFoldBtn = document.querySelectorAll(".list_passage_unfold");
console.log(passageFoldBtn);

for (let i = 0; i < passageList.length; i++) {
  let briefPassage = passageList[i].querySelectorAll(".list_passage_brief");
  if (briefPassage.length > 1) {
    passageFoldBtn[i].className = "list_passage_unfold";
    let passageFoldInfo = passageFoldBtn[i].querySelector(
      ".list_passage_unfold_info"
    );
    foldNum(briefPassage, passageFoldInfo);

    passageFoldBtn[i].addEventListener("click", function () {
      console.log(this);
      for (let i = 1; i < briefPassage.length; i++) {
        if (briefPassage[i].className == "list_passage_brief hidden") {
          briefPassage[i].className = "list_passage_brief";
          passageFoldInfo.innerText = "收起";
          this.querySelector(".list_passage_unfold_ico").className =
            "list_passage_unfold_ico fold";
        } else {
          briefPassage[i].className = "list_passage_brief hidden";
          foldNum(briefPassage, passageFoldInfo);
          this.querySelector(".list_passage_unfold_ico").className =
            "list_passage_unfold_ico";
        }
      }
    });
  } else {
    passageFoldBtn[i].className = "list_passage_unfold hidden";
  }
}
//检测折叠起了多少篇文章
function foldNum(briefPassage, passageFoldInfo) {
  let leave = briefPassage.length - 1;
  passageFoldInfo.innerText = "余下" + leave + "篇";
}
