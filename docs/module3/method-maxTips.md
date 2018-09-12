# 超出选择上限后的提示


```js
/**
 * 1.多选select超出最大值的提示, 默认闪烁红色边框
 *
 * formSelects.maxTips(ID, Function);
 *
 * @param ID        xm-select的值
 * @param Function  自定义处理方法
 */
var formSelects = layui.formSelects;
formSelects.maxTips('select1', function(id, vals, choice, max){
    //id:     点击select的id
    //vals:   当前select已选中的值
    //choice: 当前select点击的值
    //max:    当天多选最大值
    alert("选超了...");
});
 
//以下两种方式则配置所有的多选select
formSelects.maxTips(function(id, vals, choice, max){
    ...
});
formSelects.maxTips(null, function(id, vals, choice, max){
    ...
});
```

> 示例

超出上限后alert提示

```js
<select name="city" xm-select="method-maxTips-example1" xm-select-max="2">
	<option value="1">北京</option>
	<option value="2">上海</option>
	<option value="3">广州</option>
	<option value="4">深圳</option>
	<option value="5">天津</option>
</select>

<script type="text/javascript">
	formSelects.render('method-maxTips-example1');
	formSelects.maxTips('method-maxTips-example1', function(id, vals, choice, max){
	    alert('选超了, ' + choice.name + ' 不能再选了, 当前上限: ' + max);
	});
</script>

```

<button class="layui-btn runcode">在线运行</button>