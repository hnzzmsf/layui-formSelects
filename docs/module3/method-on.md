# 监听选择数据变化

```js
/**
 * 监听select的选中与取消
 *
 * formSelects.on(ID, Function, isEnd);
 *
 * @param ID        xm-select的值
 * @param Function  自定义处理方法
 * @param isEnd     是否后置
 */
var formSelects = layui.formSelects;
formSelects.on('select1', function(id, vals, choice, isAdd, isDisabled){
    //id:           点击select的id
    //vals:         当前select已选中的值
    //choice:       当前select点击的值
    //isAdd:        当前操作选中or取消
    //isDisabled:   当前选项是否是disabled
     
    //如果return false, 那么将取消本次操作
    return false;   
});
 
//以下两种方式则配置所有的多选select
formSelects.on(function(id, vals, choice, isAdd, isDisabled){
    ...
});
formSelects.on(null, function(id, vals, choice, isAdd, isDisabled){
    ...
});
```

题外话: 4.0的时候其实on的作用只有一个, 那就是控制用户能否选择这项数据, 可是大多小伙伴用这个方法来实时获取已选中的值。所以在0813之后的版本新增了一个参数isEnd,
当isEnd=true时, 此时不再能控制用户了, 你拿到的vals也是一个正确的结果, isEnd=false与isEnd=true可以同时使用 



> 示例


```js
正常监听用户的选择数据

<div style="width: 300px; display: inline-block;margin-right: 10px;">
	<select name="city" xm-select="method-on-example1">
		<option value="1">北京</option>
		<option value="2">上海</option>
		<option value="3">广州</option>
		<option value="4">深圳</option>
		<option value="5">天津</option>
	</select>
</div>

控制用户 北京,上海 二选一

<div style="width: 300px; display: inline-block;margin-right: 10px;">
	<select name="city" xm-select="method-on-example2">
		<option value="1">北京</option>
		<option value="2">上海</option>
		<option value="3">广州</option>
		<option value="4">深圳</option>
		<option value="5">天津</option>
	</select>
</div>

实时获取用户已选择数据

<div style="width: 300px; display: inline-block;margin-right: 10px;">
	<select name="city" xm-select="method-on-example3">
		<option value="1">北京</option>
		<option value="2">上海</option>
		<option value="3">广州</option>
		<option value="4">深圳</option>
		<option value="5">天津</option>
	</select>
</div>

实时获取用户已选择数据, 控制用户 北京,上海 二选一

<div style="width: 300px; display: inline-block;margin-right: 10px;">
	<select name="city" xm-select="method-on-example4">
		<option value="1">北京</option>
		<option value="2">上海</option>
		<option value="3">广州</option>
		<option value="4">深圳</option>
		<option value="5">天津</option>
	</select>
</div>

<script type="text/javascript">
	//正常监听用户的选择数据
	formSelects.render('method-on-example1');
	formSelects.on('method-on-example1', function(id, vals, choice, isAdd, isDisabled){
		if(isAdd){
			alert('选择了: ' + JSON.stringify(choice));
		}else{
			alert('删除了: ' + JSON.stringify(choice));
		}
	});

	//控制用户 北京,上海 二选一
	formSelects.render('method-on-example2');
	formSelects.on('method-on-example2', function(id, vals, choice, isAdd, isDisabled){
		if(isAdd){
			var opt = vals.filter(function(item){
				return item.value == 1 || item.value == 2;
			});
			console.log(opt, choice)
			if(opt.length && (choice.value == 1 || choice.value == 2)){
				alert('已选择了: ' + opt[0].name + ', 不能在选择: ' + choice.name);
				return false;
			}
		}
	});

	//实时获取用户已选择数据
	formSelects.render('method-on-example3');
	formSelects.on('method-on-example3', function(id, vals, choice, isAdd, isDisabled){
		alert('已选择了: ' + JSON.stringify(vals));
	}, true);

	//实时获取用户已选择数据, 控制用户 北京,上海 二选一
	formSelects.render('method-on-example4');
	formSelects.on('method-on-example4', function(id, vals, choice, isAdd, isDisabled){
		alert('实时, 已选择了: ' + JSON.stringify(vals));
	}, true).on('method-on-example4', function(id, vals, choice, isAdd, isDisabled){
		if(isAdd){
			var opt = vals.filter(function(item){
				return item.value == 1 || item.value == 2;
			});
			if(opt.length && (choice.value == 1 || choice.value == 2)){
				alert('已选择了: ' + opt[0].name + ', 不能在选择: ' + choice.name);
				return false;
			}
		}
	});
</script>
```

<button class="layui-btn runcode">在线运行</button>

<hr/>

<div class="card">
	<div class="card-header">
		<img src="public/ju_top.jpg" data-no-zoom width="100%" />
	</div>
	<div class="card-content">
		天将降大任于斯人也，必先苦其心志<br>
		劳其筋骨，饿其体肤，空乏其身，行拂乱其所为<br>
		所以动心忍性，曾益其所不能。
	</div>
	<div class="card-footer">
		<img src="public/ju_ce.jpg" data-no-zoom width="100%" />
	</div>
</div>
