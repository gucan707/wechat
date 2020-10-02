# 微信

## 10.1

完成了Level 1和Level 2，Level 3刚起步，在通讯录页面上

暂时还没有遇到什么疑问。。（出现的疑问直接百度出来了）

感觉页面写得有点慢

## 10.2

level 3中未完成的功能：

**发布朋友圈**，一开始（因为不想改input type=file的样式）设置了一个背景图片为“添加图片”的div，然后点击这个div时触发input的onclick事件，但是不知道为什么会报错。 div和input均没有onclick函数。（div可以通过addEventListener监听click，但onclick就报错。。）最后还是用了伪类改css。

发布朋友圈的write.js上还没写东西（写了会报错的onclick。。）就暂时不push

**通讯录的索引**，想法是用a标签的href实现，但是通讯录上方的header部分用了固定定位不占位置，导致页面滚动之后会有一部分被header盖住

**朋友圈页面的header**，这个header会随着页面滚动渐变透明度，获取到了header的background属性但是发现这个是只读的不能修改，暂时只实现到随着页面滚动瞬间改变透明度

各个页面之间的跳转联系等我把level 3搞完再整体处理