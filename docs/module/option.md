## xm-select

!> 多选核心, 其值代表着多选的ID, 请保证唯一性

xm-select="id"

```
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title></title>
	</head>
	<body>
		<div style="max-width: 400px; margin: 20px;">
			<select xm-select="select-demo1" >
				<option value="">请选择</option>
				<option value="1">北京</option>
				<option value="2" selected="selected">上海</option>
				<option value="3">广州</option>
				<option value="4" selected="selected">深圳</option>
			</select>
		</div>
		<script src="//unpkg.com/jquery@3.3.1/dist/jquery.min.js" type="text/javascript" charset="utf-8"></script>
		<script src="//sandbox.runjs.cn/uploads/rs/96/wiqefzh7/formSelects-v4.js" type="text/javascript" charset="utf-8"></script>
	</body>
</html>
```

效果如下:
<html>
	<div style="max-width: 400px; margin: 20px;">
		<select xm-select="select-demo1" >
			<option value="">请选择</option>
			<option value="1">北京</option>
			<option value="2" selected="selected">上海</option>
			<option value="3">广州</option>
			<option value="4" selected="selected">深圳</option>
		</select>
	</div>
</html>

[在线运行](http://runjs.cn/code/hytdpb85)

## xm-select-max

!> 多选最多选择数量

xm-select-max="3"

```
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title></title>
	</head>
	<body>
		<div style="max-width: 400px; margin: 20px;">
			<select xm-select="select-demo2" xm-select-max="3" ><!-- 最多选择3个 -->
				<option value="">请选择</option>
				<option value="1">北京</option>
				<option value="2" selected="selected">上海</option>
				<option value="3">广州</option>
				<option value="4" selected="selected">深圳</option>
			</select>
		</div>
		<script src="//unpkg.com/jquery@3.3.1/dist/jquery.min.js" type="text/javascript" charset="utf-8"></script>
		<script src="//sandbox.runjs.cn/uploads/rs/96/wiqefzh7/formSelects-v4.js" type="text/javascript" charset="utf-8"></script>
	</body>
</html>
```

效果如下:
<html>
	<div style="max-width: 400px; margin: 20px;">
		<select xm-select="select-demo2" xm-select-max="3">
			<option value="">请选择</option>
			<option value="1">北京</option>
			<option value="2" selected="selected">上海</option>
			<option value="3">广州</option>
			<option value="4" selected="selected">深圳</option>
		</select>
	</div>
</html>

[在线运行](http://runjs.cn/code/d1wleqww)


## xm-select-skin

!> 多选皮肤

xm-select-skin=" default | primary | normal | warm | danger "


## xm-select-search

!> 本地搜索 & 远程搜索

xm-select-search, xm-select-search="/search", 值为空时已有条目过滤搜索, 有值时开启远程搜索


## xm-select-create

!> 条目不存在时创建, 标记性属性

xm-select-create


## xm-select-direction

!>多选下拉方向

xm-select-direction="auto|up|down", 自动, 上, 下, 默认自动模式


## xm-select-height

!> 标记select高度是否固定

xm-select-height="36px", 高度不再随数据变化而变化


## xm-select-radio

!> 单选模式

xm-select-radio, 最多只能选择一个





