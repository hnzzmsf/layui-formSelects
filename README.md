<p align=center>
  <a href="javascript:;">
    <img src="docs/public/logo.png" alt="formSelects" width="520">
  </a>
</p>

---

[文档地址](https://hnzzmsf.github.io/layui-formSelects/docs/index.html)

> 基于Layui的select多选解决方案

formSelects有哪些功能
- [x] 基础功能
  - [x] 多选
  - [x] 分组
  - [x] 取值&赋值
  - [x] 选择监听
  - [x] 搜索
  - [x] 启用&禁用
  - [x] 多选皮肤
  - [ ] 重复选
- [x] 高级功能
  - [x] 下拉方向
  - [x] 显示数量
  - [x] 选择数量
  - [x] 远程搜索
  - [x] 动态数据
  - [x] 动态创建
  - [x] 搜索过滤
  - [x] 快捷操作
  - [x] 选项模板
- [x] 多级联动

## 安装

推荐从
[Github](https://github.com/hnzzmsf/layui-formSelects)
clone最新版本

```html
<!-- 引入样式 -->
<link rel="stylesheet" type="text/css" href="//raw.githack.com/hnzzmsf/layui-formSelects/master/dist/formSelects-v4.css"/>

<!-- 引入jquery依赖 -->
<script src="//unpkg.com/jquery@3.3.1/dist/jquery.min.js" type="text/javascript" charset="utf-8"></script>
<!-- 引入组件 -->
<script src="//raw.githack.com/hnzzmsf/layui-formSelects/master/dist/formSelects-v4.js" type="text/javascript" charset="utf-8"></script>

```

 
## 快速上手

```
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
		<title></title>
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<link rel="stylesheet" type="text/css" href="../src/formSelects-v4.css"/>
	</head>
	<body>
		<div>
			<select name="city" xm-select="selectId">
			    <option value="1" disabled="disabled">北京</option>
			    <option value="2" selected="selected">上海</option>
			    <option value="3">广州</option>
			    <option value="4" selected="selected">深圳</option>
			    <option value="5">天津</option>
			</select>
		</div>
		
		<script src="jquery.js" type="text/javascript" charset="utf-8"></script>
		<script src="formSelects-v4.js" type="text/javascript" charset="utf-8"></script>
		<script type="text/javascript">
			formSelects.render('selectId');
		</script>
	</body>
</html>
```

## 学习交流

QQ 群: 769620939

QQ 号: 707200833

微信群: 
![wx](docs/public/wx.png)
