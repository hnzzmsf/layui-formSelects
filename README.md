# Layui - formSelects

示例: [https://faysunshine.com/layui/template/index.html](https://faysunshine.com/layui/template/index.html)
交流贴: [http://fly.layui.com/jie/26337/](http://fly.layui.com/jie/26337)

基于Layui的多选插件, 使用了Layui的模块化机制

> 使用方式

```
//html
//只需要添加xm-select就可以完成自动渲染
<select name="city" xm-select="select1" xm-select-type="1">
	<option value=""></option>
	<option value="1">北京</option>
	<option value="2" selected="selected">上海</option>
	<option value="3">广州</option>
	<option value="4" selected="selected">深圳</option>
	<option value="5">天堂xxxx</option>
	<option value="6">地狱</option>
	<option value="7">仙界x</option>
	<option value="8">神界</option>
</select>

//js
layui.config({
	base: '../dist/'
}).extend({
	formSelects: 'formSelects-v3.min'
}).use(['form', 'formSelects'], function() {
	
});
```
