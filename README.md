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

## 10.3

level 3基本完成？改bug改了好久:cry:

首页里"我"的那一部分好像没有什么要求我就暂时先没写，大概就是一个静态页面也没什么交互。。要是整活完后台还有时间我就把这个补上

在看nodejs和Socket.IO

## 10.4

上午看了一点websocket，感觉应该先创建用户就又跳去学express和MongoDB（然而东西太多了很多都记不住。。）

有在别的文件夹里做一些练习demo，补微信的登录界面的时候有一点晚，现在大概是前后端之间能互相传输数据的程度，页面内容的修改还没来得及做

server.js里用了一个async和await，看了一些博客还是有一点点懵，但是不加这个又会出问题。。