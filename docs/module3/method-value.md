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

