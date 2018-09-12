# 基础参数

| 属性名 | 说明 | 示例 |
| ------ | ---  | ---- |
| xm-select | 多选核心, 多选ID | xm-select="id" |
| xm-select-max | 多选最多选择数量 | xm-select-max="3" |
| xm-select-skin | 皮肤 | xm-select-skin=" default,primary,normal,warm,danger " |
| xm-select-search | 本地搜索 & 远程搜索 | xm-select-search, xm-select-search="/search"<br/>值为空时已有条目过滤搜索, 有值时开启远程搜索 |
| xm-select-create | 条目不存在时创建 | xm-select-create |
| xm-select-direction | 下拉方向 | xm-select-direction="auto,up,down"<br/>自动, 上, 下, 默认自动模式 |
| xm-select-height | 标记select高度是否固定 | xm-select-height="36px", 高度不再随数据变化而变化 |
| xm-select-radio | 单选模式 | xm-select-radio, 最多只能选择一个 |
| xm-select-search-type | 搜索框的显示位置 | xm-select-search-type="title" 在下拉选title部分显示<br/>xm-select-search-type="dl"  在选项的第二条显示 |
| xm-select-show-count | 多选显示的label数量 | xm-select-show-count="2", 超出后隐藏 |

## xm-select

!> 核心属性标记, 类似于ID的效果, 用于区分不同的多选, API调用的**重要参数**

## xm-select-max

!> 控制多选的选择数量, 超出后默认闪烁红框提示

```
<select name="city" xm-select="select5" xm-select-max="3">
    <option value="">啦啦, 我是自定义的</option>
    <option value="1" disabled="disabled">北京</option>
    <option value="2" selected="selected">上海</option>
    <option value="3">广州</option>
    <option value="4" selected="selected">深圳</option>
    <option value="5">天津</option>
</select>
```

<button class="layui-btn runcode">在线运行</button>

一个小栗子, 可以试下选超3个的效果


## xm-select-skin

!> 多选皮肤, 目前内置了五大色系

| 皮肤属性 	| 皮肤说明 	| 皮肤示例	| 
| ---------	| ---------	| ---------	|
| default 	| 浅灰style	| <html><span class="table-span" style="background-color: #F0F2F5; color: #909399">示例</span></html>	|
| primary 	| 墨绿style	| <html><span class="table-span" style="background-color: #009688; color: #FFF">示例</span></html>	|
| normal 	| 深蓝style	| <html><span class="table-span" style="background-color: #1E9FFF; color: #FFF">示例</span></html>	|
| warm	 	| 屎黄sytle	| <html><span class="table-span" style="background-color: #FFB800; color: #FFF">示例</span></html>	|
| danger 	| 橘红style	| <html><span class="table-span" style="background-color: #FF5722; color: #FFF">示例</span></html>	|

其中 `primary` 墨绿style被内置成为了默认皮肤


> xm-select-skin="default"

``` html
<select name="city" xm-select="skin-default" xm-select-skin="default">
    <option value=""></option>
    <option value="1">北京</option>
    <option value="2" selected="selected">上海</option>
    <option value="3">广州</option>
    <option value="4" selected="selected">深圳</option>
    <option value="5">天津</option>
</select>
```

<button class="layui-btn runcode">在线运行</button>


> xm-select-skin="primary"

``` html
<select name="city" xm-select="skin-primary" xm-select-skin="primary">
    <option value=""></option>
    <option value="1">北京</option>
    <option value="2" selected="selected">上海</option>
    <option value="3">广州</option>
    <option value="4" selected="selected">深圳</option>
    <option value="5">天津</option>
</select>
```

<button class="layui-btn runcode">在线运行</button>

> xm-select-skin="normal"

``` html
<select name="city" xm-select="skin-normal" xm-select-skin="normal">
    <option value=""></option>
    <option value="1">北京</option>
    <option value="2" selected="selected">上海</option>
    <option value="3">广州</option>
    <option value="4" selected="selected">深圳</option>
    <option value="5">天津</option>
</select>
```

<button class="layui-btn runcode">在线运行</button>


> xm-select-skin="warm"

``` html
<select name="city" xm-select="skin-warm" xm-select-skin="warm">
    <option value=""></option>
    <option value="1">北京</option>
    <option value="2" selected="selected">上海</option>
    <option value="3">广州</option>
    <option value="4" selected="selected">深圳</option>
    <option value="5">天津</option>
</select>
```

<button class="layui-btn runcode">在线运行</button>


> xm-select-skin="danger"

``` html
<select name="city" xm-select="skin-danger" xm-select-skin="danger">
    <option value=""></option>
    <option value="1">北京</option>
    <option value="2" selected="selected">上海</option>
    <option value="3">广州</option>
    <option value="4" selected="selected">深圳</option>
    <option value="5">天津</option>
</select>
```

<button class="layui-btn runcode">在线运行</button>

> 同样你也可以通过css自定义皮肤, 下面定义一个 `zhongguohong`, 中国红

``` html
<style type="text/css">
div[xm-select-skin=zhongguohong] .xm-select-title div.xm-select-label>span {background-color: #FF0000;color: #FFF;border: 1px solid #FF0000}
div[xm-select-skin=zhongguohong] .xm-select-title div.xm-select-label>span i {background-color: #FF0000;color: #FFF}
div[xm-select-skin=zhongguohong] dl dd:not(.xm-dis-disabled) i {border-color: #FF0000}
div[xm-select-skin=zhongguohong] dl dd.xm-select-this:not(.xm-dis-disabled) i {color: #FF0000}
div[xm-select-skin=zhongguohong].xm-form-selected .xm-select,div[xm-select-skin=danger].xm-form-selected .xm-select:hover {border-color: #FF0000!important}
</style>

<select name="city" xm-select="skin-red" xm-select-skin="zhongguohong">
    <option value="">中国红</option>
    <option value="1" disabled="disabled">北京</option>
    <option value="2" selected="selected">上海</option>
    <option value="3">广州</option>
    <option value="4" selected="selected">深圳</option>
    <option value="5">天津</option>
</select>
```

<button class="layui-btn runcode">在线运行</button>


## xm-select-search

!> 搜索功能

xm-select-search, 指定url后将开启远程搜搜, 不指定则为已有选项搜索

> 本地搜索

``` html
<select name="city" xm-select="search-local" xm-select-search>
    <option value=""></option>
    <option value="1">北京</option>
    <option value="2">上海</option>
    <option value="3">广州</option>
    <option value="4">深圳</option>
    <option value="5">天津</option>
</select>
```

<button class="layui-btn runcode">在线运行</button>


> 远程搜索

``` html
<select name="city" xm-select="search-server" xm-select-search="https://easy-mock.com/mock/5b441b7c364aa54a929cb4a7/formSelects/server-search">
    <option value=""></option>
</select>
```

<button class="layui-btn runcode">在线运行</button>


## xm-select-create

!> 创建条目

当输入的搜索内容不存在时, 动态创建输入内容的选项作为待选

!> 创建条目时, 必须打开本地搜索模式

``` html
<select name="city" xm-select="search-create" xm-select-search xm-select-create>
    <option value=""></option>
    <option value="1">北京</option>
    <option value="2">上海</option>
    <option value="3">广州</option>
    <option value="4">深圳</option>
    <option value="5">天津</option>
</select>
```

<button class="layui-btn runcode">在线运行</button>


## xm-select-direction

!> 多选下拉方向

默认是自动判断的, 当处理页面底部时, 会向上显示, 暂不支持向左或向右

> xm-select-direction="auto", 自动, 向上或向下

``` html
<div style="margin-top: 700px;">
	<select name="city" xm-select="direction-auto" xm-select-direction="auto">
	    <option value=""></option>
	    <option value="1" selected="selected">北京</option>
	    <option value="2">上海</option>
	    <option value="3">广州</option>
	    <option value="4">深圳</option>
	    <option value="5">天津</option>
	</select>
</div>
```

<button class="layui-btn runcode">在线运行</button>

> xm-select-direction="up", 始终向上

``` html
<div style="margin-top: 700px;">
	<select name="city" xm-select="direction-up" xm-select-direction="up">
		<option value=""></option>
		<option value="1" selected="selected">北京</option>
		<option value="2">上海</option>
		<option value="3">广州</option>
		<option value="4">深圳</option>
		<option value="5">天津</option>
	</select>
</div>
```

<button class="layui-btn runcode">在线运行</button>

> xm-select-direction="down", 始终向下

``` html
<select name="city" xm-select="direction-down" xm-select-direction="down">
    <option value=""></option>
    <option value="1" selected="selected">北京</option>
    <option value="2">上海</option>
    <option value="3">广州</option>
    <option value="4">深圳</option>
    <option value="5">天津</option>
</select>
```

<button class="layui-btn runcode">在线运行</button>


## xm-select-height

!> 多选固定高度

xm-select-height="任意值", 指定后高度将固定为34px, 不在发生变化

> xm-select-height="34px"

``` html
<select name="city" xm-select="height-34" xm-select-height="34px">
    <option value=""></option>
    <option value="1" selected="selected">北京</option>
    <option value="2">上海</option>
    <option value="3">广州</option>
    <option value="4">深圳</option>
    <option value="5">天津</option>
</select>
```

<button class="layui-btn runcode">在线运行</button>


## xm-select-radio

!> 单选模式

仍然使用的label模式显示, 不过选择任意一项后将收起下拉

``` html
<select name="city" xm-select="radio" xm-select-radio>
    <option value=""></option>
    <option value="1" selected="selected">北京</option>
    <option value="2">上海</option>
    <option value="3">广州</option>
    <option value="4">深圳</option>
    <option value="5">天津</option>
</select>
```

<button class="layui-btn runcode">在线运行</button>


## xm-select-search-type

!> 搜索框显示位置

默认是显示在title上的, 随着选项的增多保持在选项最后

> xm-select-search-type="title"

``` html
<select name="city" xm-select="search-type-title" xm-select-search xm-select-search-type="title">
    <option value=""></option>
    <option value="1" selected="selected">北京</option>
    <option value="2">上海</option>
    <option value="3">广州</option>
    <option value="4">深圳</option>
    <option value="5">天津</option>
</select>
```

<button class="layui-btn runcode">在线运行</button>

> xm-select-search-type="dl"

此时显示在下拉框中

``` html
<select name="city" xm-select="search-type-dl" xm-select-search xm-select-search-type="dl">
    <option value=""></option>
    <option value="1" selected="selected">北京</option>
    <option value="2">上海</option>
    <option value="3">广州</option>
    <option value="4">深圳</option>
    <option value="5">天津</option>
</select>
```

<button class="layui-btn runcode">在线运行</button>

**注:** 设置搜索框的位置必须要开启 `xm-select-search`


## xm-select-show-count

!> 多选label合并

当设置了 `xm-select-show-count="2"` 后, 超过2个选项将以 +xxx 的形式显示

``` html
<select name="city" xm-select="show-count" xm-select-show-count="2">
    <option value=""></option>
    <option value="1" selected="selected">北京</option>
    <option value="2" selected="selected">上海</option>
    <option value="3" selected="selected">广州</option>
    <option value="4" selected="selected">深圳</option>
    <option value="5" selected="selected">天津</option>
</select>
```

<button class="layui-btn runcode">在线运行</button>