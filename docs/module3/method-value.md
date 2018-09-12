# 赋值与取值


> 取值

```js
/**
 * 1.获取选中数据
 *
 * formSelects.value(ID, TYPE);
 *
 * @param ID    xm-select的值
 * @param TYPE  all | val | valStr | name | nameStr
 */
var formSelects = layui.formSelects;
formSelects.value('select1');               // [{"name":"上海","val":"2"},{"name":"深圳","val":"4"}]
formSelects.value('select1', 'all');        // [{"name":"上海","val":"2"},{"name":"深圳","val":"4"}]
formSelects.value('select1', 'val');        // ["2","4"]
formSelects.value('select1', 'valStr');     // 2,4
formSelects.value('select1', 'name');       // ["上海","深圳"]
formSelects.value('select1', 'nameStr');    // 上海,深圳
```

> 赋值

```js
/**
 * 2.设置select的选中值
 *
 * formSelects.value(ID, ARR);
 *
 * @param ID    xm-select的值
 * @param ARR   value数组
 */
var formSelects = layui.formSelects;
formSelects.value('select1', [2, 4]);       // 选中value为2和4的option → 上海,深圳
 
 
/**
 * 3.追加或删除select的选中值
 *
 * formSelects.value(ID, ARR, isAppend);
 *
 * @param ID    xm-select的值
 * @param ARR   value数组
 */
var formSelects = layui.formSelects;
formSelects.value('select1', [2, 4], true); // 追加value为2和4的option, 如果该值已选中则跳过, 该值未选中则选中
formSelects.value('select1', [2, 4], false);// 删除value为2和4的option, 如果该值没有选中则跳过, 该值被选中则取消选中
```

> 示例


```js
<div style="width: 300px; display: inline-block;margin-right: 10px;">
	<select name="city" xm-select="method-value-example1">
		<option value="1" disabled="disabled">北京</option>
		<option value="2" selected="selected">上海</option>
		<option value="3">广州</option>
		<option value="4" selected="selected">深圳</option>
		<option value="5">天津</option>
	</select>
</div>
<br/><br/>
<button class="layui-btn" onclick="alert(JSON.stringify(formSelects.value('method-value-example1')))">获取已选中数据</button>
<button class="layui-btn" onclick="alert(JSON.stringify(formSelects.value('method-value-example1', 'val')))">获取已选中数据的值</button>
<button class="layui-btn" onclick="alert(JSON.stringify(formSelects.value('method-value-example1', 'valStr')))">获取已选中数据的字符串值</button>
<br/><br/>
<button class="layui-btn" onclick="alert(JSON.stringify(formSelects.value('method-value-example1', 'name')))">获取已选中数据的name</button>
<button class="layui-btn" onclick="alert(JSON.stringify(formSelects.value('method-value-example1', 'nameStr')))">获取已选中数据的字符串name</button>
<br/><br/>
<button class="layui-btn" onclick="formSelects.value('method-value-example1', [])">清空已选择的数据</button>
<br/><br/>
<button class="layui-btn" onclick="formSelects.value('method-value-example1', [2, 4])">设置选中 上海,深圳</button>
<br/><br/>
<button class="layui-btn" onclick="formSelects.value('method-value-example1', [5], true)">追加赋值天津</button>
<button class="layui-btn" onclick="formSelects.value('method-value-example1', [5], false)">删除选中的天津</button>

<script type="text/javascript">
	formSelects.render('method-value-example1');
	//获取已选中数据
	formSelects.value('method-value-example1');
	//获取已选中数据的值
	formSelects.value('method-value-example1', 'val');
	//获取已选中数据的字符串值
	formSelects.value('method-value-example1', 'valStr');
	//获取已选中数据的name
	formSelects.value('method-value-example1', 'name');
	//获取已选中数据的字符串name
	formSelects.value('method-value-example1', 'nameStr');
	//清空已选择的数据
	formSelects.value('method-value-example1', []);
	//设置选中 上海,深圳
	formSelects.value('method-value-example1', [2, 4]);
	//追加赋值天津
	formSelects.value('method-value-example1', [5], true);
	//删除选中的天津
	formSelects.value('method-value-example1', [5], false);
</script>
```

<button class="layui-btn runcode">在线运行</button>


!> 温馨提示

什么是赋值? 赋值就是把原来的选择的数据删除了, 重新设置自己想要的

什么是追加? 就是在原来选择的基础之上在多选一个

能针对所有的多选赋值吗? 没有直接的API操作, 请用循环自行设置

赋值是只能是数组, 数组, 数组, 不要写一个字符数组

为什么我还是不明白? 请移步 [学习交流](/module/study) 加群

