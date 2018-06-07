## formSelects

> 一起聊聊

没有什么能够阻挡, 我对自有的向往...

首先膜拜一下 @贤心大大, 跟随着[Layui](http://www.layui.com/)的脚步走进了前端的殿堂, 与[fly](http://fly.layui.com/)小伙伴共同成长! 

言归正传, `formSelects`做了什么??

`多选` `联动` `单选` `远程` `创建` :arrow_right: `select`

其中最终都指向了select, 没错我们只是拓展了select, :full_moon_with_face:

Fly社区交流贴: [http://fly.layui.com/jie/26337/](http://fly.layui.com/jie/26337)

欢迎点击右上角`Star`一下

[文档地址](https://hnzzmsf.github.io/layui-formSelects)

> 下载与使用


1) 单独使用

```
//引入核心依赖jQuery
<script src="//unpkg.com/jquery@3.3.1/dist/jquery.min.js" type="text/javascript" charset="utf-8"></script>
//引入formSelects组件
<script src="//sandbox.runjs.cn/uploads/rs/96/wiqefzh7/formSelects-v4.js" type="text/javascript" charset="utf-8"></script>

```

2) 与layui一起使用
```
//引入layui css文件
<link href="layui.css" rel="stylesheet">
//引入layui.js文件
<script src="layui.js" type="text/javascript" charset="utf-8"></script>
//引入formSelects组件, 使用layui的模块机制
<script type="text/javascript">
	//此处路径的写法请参考Layui官方网站
	layui.config({
		base: './'
	}).extend({
		formSelects: 'formSelects-v4'
	});
	
	layui.use(['formSelects'], function(){
		var formSelects = layui.formSelects;
		
	});
</script>

//当然你也可以使用更加粗暴的方式, 使用layui.all.js, layui.js与layui.all.js的区别请参考layui官方文档
<script src="layui.all.js" type="text/javascript" charset="utf-8"></script>
<script src="//sandbox.runjs.cn/uploads/rs/96/wiqefzh7/formSelects-v4.js" type="text/javascript" charset="utf-8"></script>
```

可以点击右上角获取源码使用

也可以直接download, [formSelects-v4.js](http://sandbox.runjs.cn/uploads/rs/96/wiqefzh7/formSelects-v4.js)

## 快速开始


> 一个简单的小例子

```
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title></title>
	</head>
	<body>
		<div style="max-width: 400px; margin: 20px;">
			<select xm-select="select-id" >
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
		<select xm-select="select-id" >
			<option value="">请选择</option>
			<option value="1">北京</option>
			<option value="2" selected="selected">上海</option>
			<option value="3">广州</option>
			<option value="4" selected="selected">深圳</option>
		</select>
	</div>
</html>

哈哈, 是不是很霸气呢, 用起来很简单, 在原有的select上加一个属性`xm-select`, "select-id" 就是这个多选的ID啦, 保证唯一, 之后你会用到它

你可以直接拷贝上面的代码, 运行查看效果

[在线运行](http://runjs.cn/code/hytdpb85)

