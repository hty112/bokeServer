### CSS 匹配

`nav .user`（中间有空格）：
	匹配到class属性是nav标签下面的class属性含有user的元素。

`.user.login`（中间没有空格）：
	匹配到class属性同时含有user和login的元素。` 

### CSS 弹性布局（一维布局）


水平居中： `margin: 0 auto;`

CSS3:

```css
div{
	display: flex;	  /*弹性布局*/
	flex-direction: row;	/*行（默认）*/
	flex-direction: column;	/*列*/
	flex: 1;	/*占满*/
	flex-wrap: wrap;	/*自动换行*/
	
	justify-content: space-between;	//左右两端开始排列
	justify-content: space-around;	//每个元素两侧的间隔相等
	justify-content: flex-start;	//从行首起始位置开始排列（默认）
	justify-content: flex-end;	//从行尾位置开始排列
	justify-content:center; //水平居中
	
	align-items: center;	/*垂直居中（必须设置height）*/
	
	align-content: space-around;	//交叉对齐
	
	order: 1;	//单个元素排序
	align-self: center;	//单个元素位置
}
```
[弹性布局](https://www.runoob.com/w3cnote/flex-grammar.html)

### CSS 行 块 内联块

```css
div{
	display: block;    //块标签
    display: inline;//行标签
    display: inline-block;	//内联块
}
```

### CSS 定位

```css
div{
	position: relative;	/*相对定位（相对父级的容器进行定位*/
	top: 50%;
	left: 50%;
	
	position: absolute;	//绝对定位（父级要有relative，然后相对父级的容器进行定位）
	top:50%;
	left: 50%;
	
	position: fixed;	//固定定位
    
    z-index: 1;	//显示权重
}
```

### CSS 单位


`em`: 根据父级元素进行设置

`rem`: 根据根级元素进行设置

`vh`: 浏览器可视窗口高度百分比（100vh）

`vw`: 浏览器可视窗口宽度百分比（100vw）


### CSS Grid 网格布局（二维布局）

```css
div{
	display: grid;
	
	grid-template-columns: 70% 30%;	//列
	grid-template-columns: 1fr 2fr 1fr; //列
    grid-column-gap: 1rem;	//列间距
    grid-row-gap: 1rem;	//行间距

    grid-auto-rows: minmax(100px, auto);	//行高

    justify-items: center;	//行对其
    align-items: center;	//列对其

    justify-self  : start;	//单个元素位置
    align-self: end;	//单个元素位置

    grid-row: 1/3;	//单个元素跨行（1到3）
    grid-column: 1/3;	//单个元素跨列（1到3）
}
```

### CSS 响应式

`@media screen and (max-width: 768px){}` 

### CSS 背景图片

```css
background: #333 url('') no-repeat center center/cover;
height: 100vh;
```

视差滚动页:

```css
div{
	background-position: center;
	background-size: cover;
	background-repeat: no-repeat;
	background-attachment: fixed;
	height: 100%;
}
```

### CSS 模糊切换

```css
.show::after{
	content: '';
	height: 100vh;
	width: 100%;
	background-image: url('');
	background-position: center;
	background-size: cover;
	background-repeat: no-repeat;
	display: block;
	filter: blur(10px);	//模糊
	-webkit-filter: blur(10px);
	transition: all 1s;
}

.show:hover::after{
	filter: blur(0px);
	-webkit-filter: blur(0px);
}
```

### CSS 选择器[#]

```css
div>p
	所有直接父级标签是div的p标签

div+p
	div标签下的第一个兄弟p标签

a[name]
	具有name属性的a标签

a[name="ld"]
	name属性值为ld的a标签

li:first-child
	li标签的第一个子标签

li:nth-child(3)
	li标签的第三个子标签

li:nth-child(3n)
	li标签的三的倍数个子标签（基数odd，偶数even）
```

### CSS 伪元素

适合配置背景图片
```css
.class::before {
	content: '';
	background: url('') no-repeat center center/cover;
	opacity: 0.4;
	position: absolute;
	width: 100%;
	height: 100%;
	z-index: -1;
}

.class::after {
	content: '';
	color: red;
}
```

### CSS box-shadow text-shadow 阴影

```css
box-shadow: 10px 10px 5px 1px teal;
box-shadow: 10px 10px 5px 1px rgba(0, 0, 0, 0.5);

text-shadow: 10px 10px 5px 1px teal;
text-shadow: 10px 10px 5px 1px rgba(0, 0, 0, 0.5);
```

### CSS 全局变量

```css
:root {
	--m-color: teal;
}

body {
	background: var(--m-color);
}
```

### CSS animation 动画

```css
.box {
	position: relative;
	top: 0;
	left: 0;
	width: 200px;
	height: 200px;

	animation-name: an;	//动画名
	animation-duration: 2s;	//动画周期
	animation-iteration-count: infinite;	//动画次数（无限次）
	animation-fill-mode: forwards;	//动画最终停留状态
	animation-direction: alternate;	//动画方向（奇偶切换）
	animation-delay: 2s;	//动画延迟时间
	animation-timing-function: ease-in-out;	//缓慢开始缓慢结束
	
	//简写
	animation: an 2s infinite forwards alternate ease-in-out;
}

@keyframes an {
	//两点
	from {
		width: 200px;
	}
	to {
		width: 400px;
	}

	//运动轨迹
	25% {
		top: 0;
		left: 200px;
		background: red;
		border-radius: 50%;
	}
	
	50% {
		top: 200px;
		left: 200px;
		background: blue;
		border-radius: 50%;
	}
	
	75% {
		top: 200px;
		left: 0;
		background: teal;
		border-radius: 50%;
	}
}
```

### CSS transition 过度

```css
.box {
	background: blue;
	transition-property: background;	//需要过度的属性
	transition-duration: 2s;	//过度周期
	transition-delay: 2s;	//过度延迟
	transition-timing-function: ease-in-out;	//缓慢开始缓慢结束

	//简写
	transition： all 2s ease-in-out;
}

.box:hover {
	background: teal;
	transform: rotate(25deg);	//旋转
	transform: scale(2);	//放大2倍
	transform: translateX(100px);	//向右移动
	transform: translate(100px, 100px);	//向右下移动
}
```