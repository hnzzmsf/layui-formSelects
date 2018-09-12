# 本地搜索过滤

```js
/**
 * 1.自定义本地搜索过滤方式, 默认匹配文本是否包含
 *
 * formSelects.filter(ID, Function);
 *
 * @param ID        xm-select的值
 * @param Function  自定义处理方法
 */
var formSelects = layui.formSelects;
formSelects.filter('select1', function(id, inputVal, choice, isDisabled){
    //id:           点击select的id
    //inputVal:     当前input搜索框中的数值
    //choice:          格式: {"name":"上海","val":"2"}
    //isDisabled:   当前options是否被禁用
     
    //return true时该选项被过滤, 隐藏不显示
    return true;
});
 
//以下两种方式则配置所有的多选select
formSelects.filter(function(id, inputVal, choice, isDisabled){
    ...
});
formSelects.filter(null, function(id, inputVal, choice, isDisabled){
    ...
});
```

> 示例

根据选项文本过滤

```js
<div style="width: 300px; display: inline-block;margin-right: 10px;">
	<select name="city" xm-select="method-filter-example1" xm-select-search>
		<option value="1">北京</option>
		<option value="2">上海</option>
		<option value="3">广州</option>
		<option value="4">深圳</option>
		<option value="5">天津</option>
	</select>
</div>

<script type="text/javascript">
	formSelects.render('method-filter-example1');
	formSelects.filter('method-filter-example1', function(id, inputVal, choice, isDisabled){
		if(choice.name.indexOf(inputVal) != -1){
			return false;
		}
		return true;
	});
</script>
```

<button class="layui-btn runcode">在线运行</button>

---

根据选项文本和val过滤

```js
<div style="width: 300px; display: inline-block;margin-right: 10px;">
	<select name="city" xm-select="method-filter-example2" xm-select-search>
		<option value="1">北京</option>
		<option value="2">上海</option>
		<option value="3">广州</option>
		<option value="4">深圳</option>
		<option value="5">天津</option>
	</select>
</div>

<script type="text/javascript">
	formSelects.render('method-filter-example2');
	formSelects.filter('method-filter-example2', function(id, inputVal, choice, isDisabled){
		if(choice.name.indexOf(inputVal) != -1 || choice.value.indexOf(inputVal) != -1){
			return false;
		}
		return true;
	});
</script>
```

<button class="layui-btn runcode">在线运行</button>