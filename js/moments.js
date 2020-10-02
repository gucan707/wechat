// 朋友圈内容展开收起
const moments = document.querySelector(".moments");
const momentsList = document.querySelectorAll(".moments_info");
for (let i = 0; i < momentsList.length; i++) {
  // 判断朋友圈文本行数
  let momentsText = momentsList[i].querySelector(".moments_info_text_content");
  let style = window.getComputedStyle(momentsText, null);
  let lineHeight = parseInt(style.lineHeight);
  let height = parseInt(style.height);
  let rowNum = Math.ceil(height / lineHeight);
  let foldBtn = momentsList[i].querySelector(".moments_info_text_unfold");

  if (rowNum > 3) {
    momentsText.className = "moments_info_text_content fold";
    foldBtn.className = "moments_info_text_unfold";
    foldBtn.addEventListener("click", function () {
      if (this.innerText == "展开") {
        momentsText.className = "moments_info_text_content";
        this.innerText = "收起";
      } else {
        momentsText.className = "moments_info_text_content fold";
        this.innerText = "展开";
      }
    });
  } else {
    momentsText.className = "moments_info_text_content";
    foldBtn.className = "moments_info_text_unfold hidden";
  }
}

// 朋友圈header随滚动发生变化
const momentsHeader = document.querySelector("header");
const momentsBack = document.querySelector(".back");
const momentsText = document.querySelector(".title");
const momentsCamera = document.querySelector(".camera");
window.addEventListener("scroll", function () {
  let yScroll = document.documentElement.scrollTop;
  // let style = window.getComputedStyle(momentsHeader, null);
  if (yScroll > 500) {
    momentsHeader.className = "";
    momentsText.innerText = "朋友圈";
    momentsBack.className = "back";
    momentsCamera.className = "camera";
  } else {
    momentsText.innerText = "";
    momentsHeader.className = "transparent";
    momentsBack.className = "back white";
    momentsCamera.className = "camera white";
  }
});
