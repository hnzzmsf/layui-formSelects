###Welcome to use MarkDown




> 版本记录

 - 3.0.6
 
  2018年5月9日
  
  1. 添加xm-select-icon参数, 可以在icon模式下自定义选中icon
  2. 添加xm-select-placeholder参数, 可以自定义选项为空时候的提示, 优先级高于空option的配置
  3. 新增render.on的参数, 可以获取当前选中/取消的状态和值
  4. 修改调用table.render会对多选造成的bug
  5. 修改点击x号后placeholder重复显示的bug
  6. 修改layui-v2.3.0下的一些bug
  7. 使用babel转换为es5代码

 - 3.0.5
 
  2018年5月8日
  
  1. 新增对placeholder的支持, 只需要如layui一样, 在第一个option中不加value值即可
  2. 新增form提交写入数据的示例
  3. 修改value函数其中一个小bug
  4. 修改form.render后的不正常
  5. 简单对IE测试, 低版本可能还是不支持

 - 3.0.3
 
  2018年5月7日
  
  1. 新增render方法, 可以动态渲染数据, 重新选择让样式, 自动以错误提示等等, 具体请看文档
  2. 新增delete函数, 取消渲染
  3. 修改value函数, 使用方式添加
  4. 修复因为高度不够, 不显示下拉框的问题

 - 3.0.2
 
  2018年5月6日
  
  1. 实现自动装配模式, 自动渲染多选select
  2. 多选样式多元化, 支持checkbox和icon模式
  3. 增加value函数, 动态赋值和动态获取数值
 
 - 3.0.1
 
  2018年5月5日
  
     借鉴了其他多选模式, 更新UI样式
     
  1. 使用label模式显示已选择数据

 - 3.0
 
  2018年5月4日, 重构的想法诞生了...