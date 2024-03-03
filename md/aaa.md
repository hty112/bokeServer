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