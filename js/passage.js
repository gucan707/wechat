// 订阅号消息页面的展开收起
const passageList = document.querySelectorAll(".list_passage");
const passageFoldBtn = document.querySelectorAll(".list_passage_unfold");

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
// 检测折叠起了多少篇文章
function foldNum(briefPassage, passageFoldInfo) {
  let leave = briefPassage.length - 1;
  passageFoldInfo.innerText = "余下" + leave + "篇";
}
