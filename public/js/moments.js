// 朋友圈内容展开收起
const moments = document.querySelector(".moments");

momentsFold();
function momentsFold() {
  let momentsList = document.querySelectorAll(".moments_info");

  for (let i = 0; i < momentsList.length; i++) {
    // 判断朋友圈文本行数
    let momentsText = momentsList[i].querySelector(
      ".moments_info_text_content"
    );
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
}

// 朋友圈header随滚动发生变化
const momentsHeader = document.querySelector("header");
const momentsBack = document.querySelector(".back");
const momentsText = document.querySelector(".title");
const momentsCamera = document.querySelector(".camera");
window.addEventListener("scroll", function () {
  let yScroll = document.documentElement.scrollTop;
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

// 获得选择图片的地址并展示图片
function imgShow(e) {
  let imgBox = document.querySelector(".input_choosed-img");
  let imgChoosed = imgBox.querySelectorAll(".input_choosed-img>img");
  let img = document.createElement("img");
  img.src = window.URL.createObjectURL(e.target.files[0]);
  let label = imgBox.querySelector("label");
  imgBox.insertBefore(img, imgChoosed.length ? imgChoosed[0] : label);
}
const imgBtn = document.querySelector("#imgBtn");
imgBtn.addEventListener("change", imgShow);

// 发布功能
const inputOri = document.querySelector(".input").cloneNode(true);
const push = document.querySelector(".push");
push.addEventListener("click", function () {
  momentsSave();
  let text = document.querySelector(".input_text");
  let imgChoosed = document.querySelectorAll(".input_choosed-img>img");
  if (imgChoosed.length || text.value) {
    let momentsList = document.querySelectorAll(".moments_info");
    let myMoments = momentsList[0].cloneNode(true);
    myMoments.querySelector(
      ".moments_info_text_name"
    ).innerText = document.querySelector(".user_info_name").innerText;
    myMoments.querySelector(".moments_info_text_content").innerText =
      text.value;
    text.value = "";
    myMoments.querySelector(".moments_info_photo").src = document.querySelector(
      ".user_info_photo>img"
    ).src;

    // 图片部分
    let myMomentsImgBox = document.createElement("div");
    myMoments
      .querySelector(".moments_info_text")
      .replaceChild(
        myMomentsImgBox,
        myMoments.querySelector(".moments_info_text_img")
      );
    myMomentsImgBox.className = "moments_info_text_img";

    let myImg = document.querySelector(".input_choosed-img");
    let myImgAll = document.querySelectorAll(".input_choosed-img img"); // 插入的图片
    let imgNum = myImgAll.length - 1; // 插入的图片数量
    console.log(imgNum);
    myImg.removeChild(myImg.querySelector("label"));
    for (let i = 0; i < imgNum; i++) {
      let myMomentsImg = document.createElement("div");
      myMomentsImg.style.backgroundImage = "url(" + myImgAll[i].src + ")";
      if (imgNum > 1) {
        myMomentsImg.className = "miti_img plural";
      } else {
        myMomentsImg.className = "miti_img";
      }
      myMomentsImgBox.appendChild(myMomentsImg);
    }

    moments.appendChild(myMoments);
    let show = document.querySelector(".show");
    let write = document.querySelector(".write");

    // 恢复发布页原本状态
    let imgChoosed = document.querySelectorAll(".input_choosed-img>img");
    for (let i = 0; i < imgChoosed.length; i++) {
      myImg.removeChild(imgChoosed[i]);
    }
    let labelStr =
      '<label for="imgBtn"><img src="../img/choose-img.png" /></label>';
    myImg.insertAdjacentHTML("beforeend", labelStr);

    show.className = "show";
    write.className = "write hidden";
    momentsFold(); // 更新展开收起按键
    enlarge(); // 更新能放大的图片
  }
});

// 朋友圈展示页和发布朋友圈页面的切换
const camera = document.querySelector(".camera");
const showPage = document.querySelector(".show");
const writePage = document.querySelector(".write");

camera.addEventListener("click", function () {
  showPage.className = "show hidden";
  writePage.className = "write";
});

// 朋友圈展示页点击图片放大
enlarge();
function enlarge() {
  let miniImgs = document.querySelectorAll(".miti_img");
  let bigImgPage = document.querySelector(".big-img");

  for (let i = 0; i < miniImgs.length; i++) {
    miniImgs[i].addEventListener("click", function () {
      let yScroll = document.documentElement.scrollTop;
      let bigImg = miniImgs[i].cloneNode();
      if (bigImgPage.childNodes.length) {
        bigImgPage.replaceChild(bigImg, bigImgPage.childNodes[0]);
      } else {
        bigImgPage.appendChild(bigImg);
      }
      bigImgPage.className = "big-img";
      showPage.className = "show hidden";
      bigImgPage.addEventListener("click", function () {
        bigImgPage.className = "big-img hidden";
        showPage.className = "show";
        console.log(yScroll);
        window.scrollTo(0, yScroll);
      });
    });
  }
}

document.onreadystatechange = function (event) {
  if (document.readyState === "complete") {
    window.addEventListener("message", function (event) {
      if (event.origin !== "http://localhost:3001") {
        return;
      }
      console.log("message:", event.data);
      console.log("origin:", event.source);
      let username = document.querySelector(".user_info_name");
      username.innerText = event.data.username;

      // 将曾经储存在数据库中的信息显示到朋友圈
      momentsPast(event.data.moments, event.data.img);
    });
  }
};

// 存储发布的朋友圈文字
function momentsSave() {
  let xhr = new XMLHttpRequest();
  let username = document.querySelector(".user_info_name").innerText;
  let moments =
    "username=" +
    username +
    "&content=" +
    document.querySelector("textarea").value;
  console.log(moments);
  xhr.open("post", "http://localhost:3001/moments");
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.send(moments);
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status >= 200 && xhr.status < 300) {
      console.log(xhr.responseText);
    }
  };
}

// 加载过去的朋友圈
function momentsPast(text, img) {
  for (let i = 0; i < text.length; i++) {
    let momentsList = document.querySelectorAll(".moments_info");
    let myMoments = momentsList[momentsList.length - 1].cloneNode(true);
    console.log(myMoments);

    myMoments.querySelector(
      ".moments_info_text_name"
    ).innerText = document.querySelector(".user_info_name").innerText;
    myMoments.querySelector(".moments_info_text_content").innerText = text[i];
    myMoments.querySelector(".moments_info_photo").src = document.querySelector(
      ".user_info_photo>img"
    ).src;

    for (let j = 0; j < img.length; j++) {
      let imgSrc = img[i][j];
      // console.log(imgSrc);
      let imgNode = document.createElement("div");
      let myMomentsImgBox = document.createElement("div");
      myMoments
        .querySelector(".moments_info_text")
        .removeChild(myMoments.querySelector(".moments_info_text_img"));
      // console.log(myMoments);

      myMomentsImgBox.className = "moments_info_text_img";
      myMoments
        .querySelector(".moments_info_text")
        .appendChild(myMomentsImgBox);
      // console.log(myMoments);

      if (imgSrc) {
        console.log(i + ":" + imgSrc);
        imgSrc = imgSrc.replace(/\\/g, "/");
        imgNode.style.backgroundImage = "url(" + imgSrc + ")";
        console.log("ok");
      }
      if (img.length > 1) {
        imgNode.className = "miti_img plural";
      } else {
        imgNode.className = "miti_img";
      }
      myMomentsImgBox.appendChild(imgNode);
    }
    moments.appendChild(myMoments);
  }
}

// 上传图片
imgUpload();
function imgUpload() {
  let file = document.querySelector("#imgBtn");
  file.addEventListener("change", function () {
    let formData = new FormData();
    formData.append("imgs", this.files[0]);
    formData.set(
      "username",
      document.querySelector(".user_info_name").innerText
    );
    let xhr = new XMLHttpRequest();
    xhr.open("post", "http://localhost:3001/upload");
    xhr.send(formData);
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status >= 200 && xhr.status < 300) {
        console.log(xhr.responseText);
      }
    };
  });
}
