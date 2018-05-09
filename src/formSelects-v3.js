/**
 * name: formSelects
 * 基于Layui Select多选
 * version: 3.0.6
 * https://faysunshine.com/layui/template/formSelects-v3/formSelects-v3.js
 */
(function(layui, window, factory) {
	if(typeof exports === 'object') { // 支持 CommonJS
		module.exports = factory();
	} else if(typeof define === 'function' && define.amd) { // 支持 AMD
		define(factory);
	} else if(window.layui && layui.define) { //layui加载
		if(layui.form && layui.jquery) {
			window.formSelects = factory();
		}
		layui.define(function(exports) {
			exports('formSelects', window.formSelects ? window.formSelects : factory());
		});
	} else {
		window.formSelects = factory();
	}
})(layui, window, function() {
	const $ = layui.jquery || $,
		form = layui.form,
		select3 = {
			value: (name, type = 'all', vals) => {
				if(type instanceof Array) {
					vals = type;
					type = 1;
				}
				if(name && vals && vals instanceof Array) {
					let options = commons.data.confs.get(name);
					if(options) {
						options.init = vals;
						commons.methods.init(options);
					}
					return;
				}
				let arr = commons.data.values.get(name);
				if(!arr) {
					return vals;
				}
				if(type == 'val') {
					return arr.map((val) => {
						return val.val;
					});
				}
				if(type == 'valStr') {
					return arr.map((val) => {
						return val.val;
					}).join(',');
				}
				if(type == 'name') {
					return arr.map((val) => {
						return val.name;
					});
				}
				if(type == 'nameStr') {
					return arr.map((val) => {
						return val.name;
					}).join(',');
				}
				return arr;
			},
			render: (options) => {
				if(options) {
					if(commons.data.confs.get(options.name)){
						options = commons.methods.cloneOptions(options, commons.data.confs.get(options.name));
						commons.methods.init(options);
					}
				} else {
					commons.methods.autoInit();
				}
			},
			delete: (name, abs) => {
				if(name && commons.data.confs.get(name)){
					let dom = commons.methods.getDom({name: name});
					if(dom.parent().hasClass(commons.data.pclass)){
						if(abs){
							dom.removeAttr(commons.data.name);
						}
						dom.css('display', 'initial');
						dom.parent()[0].outerHTML = dom[0].outerHTML;
					}
					commons.data.confs.delete(name);
					for(let item in commons.data.temps) {
						commons.data.temps[item].delete(name);
					}
					commons.data.values.delete(name);
				}
			}
		},
		commons = {
			data: {
				name: 'xm-select',
				pclass: 'xm-select-parent',
				vclass: 'xm-select-validate',
				DEFAULT_OPTIONS: {
					name: null, //xm-select="xxx"
					type: 1, //显示模式, 1:layui-this, 2:checkbox, 3:icon
					icon: {
						class: 'layui-icon-ok',
						text: '&#xe605;',
					},
					max: null,
					maxTips: null,
					init: null, //初始化的选择值,
					on: null, //select值发生变化
					data: null,
				},
				DEFAULT_RENDER: {
					arr: null,
					name: 'name',
					val: 'val',
					selected: 'selected',
					disabled: 'disabled',
				},
				confs: new Map(),
				times: new Map(),
				temps: {
					dom: new Map(),
					div: new Map(),
				},
				values: new Map(),
			},
			methods: {
				init: (options) => {
					commons.data.times.set(options.name, Date.now());
					options = commons.methods.cloneOptions(options);
					//原始dom添加一个filter
					let [filter, dom] = [`xm-${options.name}`, commons.methods.getDom(options)];
					if(dom.next().hasClass('layui-form-select')) {
						dom.next().remove();
					}
					if(options.data && options.data.arr){
						let os = $.extend({}, commons.data.DEFAULT_RENDER, options.data);
						let html = `<option value=""></option>`;
						for(let i in os.arr){
							let db = os.arr[i];
							if(db.arr && db.arr instanceof Array){
								html += `<optgroup label="${db.name}">`;
								for(let j in db.arr){
									let gdb = db.arr[j];
									html += `<option value="${gdb[os.val]}" ${gdb[os.selected] ? 'selected="selected"':''} ${gdb[os.disabled] ? 'disabled="disabled"':''}>${gdb[os.name]}</option>`;
								}
								html += `</optgroup>`;							
							}else{
								html += `<option value="${db[os.val]}" ${db[os.selected] ? 'selected="selected"':''} ${db[os.disabled] ? 'disabled="disabled"':''}>${db[os.name]}</option>`;
							}
						}
						dom.html(html);
					}
					//判断dom中是否包含了空的option, 如果不包含, 添加
					if(!dom.find('option[value=""]').length){
						$(`<option value=""></option>`).insertBefore(dom.find('option:first'));
					}
					if(dom.parent().hasClass(commons.data.pclass)) {
						dom.parent().attr('lay-filter', filter).addClass('layui-form');
					} else {
						dom.wrap(`<div class="layui-form ${commons.data.pclass}" lay-filter="${filter}"></div>`);
					}
					dom.attr('lay-filter', filter);
					commons.methods.formRender('select', filter, true);
					//1.去掉layui的原始渲染
					commons.methods.getDom(options).next().addClass(commons.data.vclass)
					//2.
					commons.data.confs.set(options.name, options);
					for(let item in commons.data.temps) {
						commons.data.temps[item].delete(options.name);
					}
					commons.data.values.delete(options.name);
					//3.渲染input
					commons.methods.overrideInput(options);
					commons.methods.typeInit(options, filter);
					//4.初始化init
					let vals = commons.methods.getInitVal(options);
					vals.forEach((val) => {
						commons.methods.valHandler(options, val, true);
					});
					commons.methods.showPlaceholder(options);
					commons.methods.retop(options);
					commons.methods.removeDefaultClass(options);
					commons.methods.on(options, filter);
				},
				addLabel: (options, vals) => {
					let ipt = commons.methods.getIpt(options);
					ipt.find('.xm-select-empty').remove();
					vals.forEach((val) => {
						let tips = `fsw="${options.name}"`;
						let [$label, $close] = [$(`<span ${tips} value='${val.val}'><font ${tips}>${val.name}</font></span>`), $(`<i ${tips} class="layui-icon">&#x1006;</i>`)];
						$label.css(styles.inputLabel);
						$close.css(styles.inputLabelClose);
						$close.hover(() => void $close.css(styles.inputLabelCloseHover), () => void $close.css(styles.inputLabelCloseUnHover));
						$label.append($close);
						ipt.append($label);
					});
				},
				delLabel: (options, vals) => {
					let ipt = commons.methods.getIpt(options);
					vals.forEach((val) => {
						ipt.find(`span[value='${val.val}']`).remove();
					});
				},
				showPlaceholder: (options) => {
					let vals = commons.methods.getValues(options);
					if(!vals.length) {
						let [tips, ipt] = [`fsw="${options.name}"`, commons.methods.getIpt(options)];
						if(!ipt.find('.xm-select-empty').length) {
							let tips = options.tips ? options.tips : ipt.prev().attr('placeholder');
							let span = $(`<span ${tips} class="xm-select-empty">${tips}</span>`);
							span.css(styles.inputEmpty);
							ipt.append(span);
						}
					}
				},
				valHandler: (options, val, isAdd, isShow) => {
					let vals = commons.methods.getValues(options);
					let dd = commons.methods.getDiv(options).find(`dl dd[lay-value='${val.val}']`);
					if(isAdd) {
						if(!options.max || (options.max && vals.length < options.max)) {
							vals.push(val);
							commons.methods.addLabel(options, [val]);
							commons.methods.typeHandler(options, dd, isAdd);
						} else {
							commons.methods.maxTips(options, val);
							commons.methods.typeHandler(options, dd, false);
						}
					} else {
						commons.methods.remove(vals, val);
						commons.methods.delLabel(options, [val]);
						commons.methods.typeHandler(options, dd, isAdd);

					}
					commons.methods.retop(options);
				},
				typeInit: (options, filter) => {
					let div = commons.methods.getDiv(options);
					if(options.type == 2) { //checkbox
						div.find('dl dd:not(.layui-select-tips)').each((index, target) => {
							let $target = $(target);
							let text = $target.text();
							let dis = $target.hasClass('layui-disabled') ? 'disabled' : '';
							$target.text('');
							$target.append(`
								<span lay-filter="${filter}">
									<input type="checkbox" name="" title="${text}" lay-skin="primary" ${dis}> 	
								</span>
							`);
						});
						form.render('checkbox', filter);
						div.find(`dl dd .layui-form-checkbox`).css('margin-top', '1px');
					} else {
						div.find('dl dd:not(.layui-select-tips)').each((index, target) => {
							$(target).css({
								margin: '1px 0',
							});
						});
					}
				},
				typeHandler: (options, dd, isAdd) => {
					if(options.type == 3) { //对勾
						if(isAdd) {
							let span = $(`
								<span><i class="layui-icon ${options.icon.class}">${options.icon.text}</i></span>	
							`);
							span.css(styles.typeYes);
							dd.css(styles.typeSelectedColor);
							dd.append(span);
						} else {
							dd.css(styles.typeUnSelectedColor);
							dd.find('span').remove();
						}
					} else if(options.type == 2) { //checkbox
						if(isAdd) {
							dd.find('.layui-form-checkbox').addClass('layui-form-checked');
						} else {
							dd.find('.layui-form-checkbox').removeClass('layui-form-checked');
						}
					} else {
						if(isAdd) {
							dd.css({
								backgroundColor: '#5FB878',
								color: '#FFF',
							})
						} else {
							dd.css({
								backgroundColor: 'inherit',
								color: 'inherit',
							})
						}
					}
					commons.methods.showPlaceholder(options);
				},
				on: (options, filter) => {
					form.on(`select(${filter})`, (data) => {
						if(data.value) {
							let val = {
								name: commons.methods.getDom(options).find(`option[value='${data.value}']`).text(),
								val: data.value
							};
							commons.methods.removeDefaultClass(options);
							let selected = commons.methods.indexOf(commons.methods.getValues(options), val) == -1;
							commons.methods.valHandler(options, val, selected, true);
							
							if(options.on && options.on instanceof Function){
								options.on(data, select3.value(options.name), val, selected);
							}
						} else {
							let vals = commons.methods.getValues(options);
							while(vals.length) {
								commons.methods.valHandler(options, vals[0], false, true);
							}
						}
						let up = div.hasClass('layui-form-selectup');
						setTimeout(() => {
							let div = commons.methods.getDiv(options);
							div.find('dl').css('display', 'block');
							div.addClass('layui-form-selected');
							if(up){
								div.addClass('layui-form-selectup');
							}
						}, 10);
					});
					let div = commons.methods.getDiv(options);
					let inputSelector = `body:not(select[${commons.data.name}=${options.name}] + div)`
					$(document).off('click', inputSelector).on('click', inputSelector, (e) => {
						setTimeout(() => {
							if(e.target.getAttribute('fsw') == options.name) {
								if($(e.target).hasClass('xm-select-empty')) {
									if(div.find('dl').css('display') != 'block') {
										div.addClass('layui-form-selected');
									} else {
										div.removeClass('layui-form-selected');
									}
								} else if(e.target.hasAttribute('fsw') && !$(e.target).is('i')) {
									div.addClass('layui-form-selected');
								}
							}
							let show = div.hasClass('layui-form-selected') ? 'block' : 'none';
							if(show == 'block'){
								commons.methods.retop(options);
							}
							div.find('dl').css('display', show);
							div.find('dl dd.layui-this').removeClass('layui-this');
						}, 10);
					});
				},
				maxTips: (options, val) => {
					if(options.maxTips && options.maxTips instanceof Function){
						options.maxTips(select3.value(options.name), val, options.max);
						return;
					}
					let ipt = commons.methods.getIpt(options);
					if(ipt.parents('.layui-form-item[pane]').length) {
						ipt = ipt.parents('.layui-form-item[pane]');
					}
					ipt.css('border-color', 'red');
					setTimeout(() => {
						ipt.css('border-color', '#e6e6e6');
					}, 300);
				},
				indexOf: (arr, val) => {
					for(let i = 0; i < arr.length; i++) {
						if(arr[i].val == val || arr[i] == val || JSON.stringify(arr[i]) == JSON.stringify(val)) {
							return i;
						}
					}
					return -1;
				},
				remove: (arr, val) => {
					let index = commons.methods.indexOf(arr, val);
					if(index > -1) {
						arr.splice(index, 1);
						return true;
					}
					return false;
				},
				removeDefaultClass: (options) => {
					let div = commons.methods.getDiv(options);
					div.find('dl dd.layui-this').removeClass('layui-this');
					let text = '清空已选择' + (options.max ? `. 当前配置: 最多选择 ${options.max} 个` : '');
					if(div.find('dl dd.layui-select-tips').length) {
						div.find('dl dd.layui-select-tips').text(text);
					} else {
						$(`<dd lay-value="" class="layui-select-tips">${text}</dd>`).insertBefore(div.find('dl dd:first'));
					}
				},
				overrideInput: (options) => {
					let _div = commons.methods.getDiv(options)
					let [$input, $orinput] = [_div.find('.layui-select-title input:first'), $(`<div class="layui-input ${commons.data.name}"></div>`)];
					$input.css(styles.hiddenInput);
					$orinput.css(styles.input);
					$orinput.insertAfter($input);
					if($input.parents(`.layui-form-pane`).length) {
						$orinput.css('border', 'none');
					}
				},
				retop: (options) => {
					let div = commons.methods.getIpt(options);
					let dl = div.parent('.layui-select-title').next();
					if(dl.parent().hasClass('layui-form-selectup')) {
						div.parent('.layui-select-title').next().css({
							top: 'auto',
							bottom: div[0].offsetTop + div.height() + 14 + 'px'
						});
					} else {
						div.parent('.layui-select-title').next().css({
							top: div[0].offsetTop + div.height() + 14 + 'px',
							bottom: 'auto'
						});
					}
				},
				getElementTop: (element) => {
					let actualTop = element.offsetTop;　　　　
					let current = element.offsetParent;　　　　
					while(current !== null) {　　　　　　
						actualTop += current.offsetTop;　　　　　　
						current = current.offsetParent;　　　　
					}　　　　
					return actualTop;
				},
				getDom: (options) => {
					let [_dom, _name] = [commons.data.temps.dom, options.name];
					if(!_dom.has(_name)) {
						_dom.set(_name, $(`select[${commons.data.name}='${_name}']`));
					}
					return _dom.get(_name);
				},
				getDiv: (options) => {
					let [_div, _name] = [commons.data.temps.div, options.name];
					if(!_div.has(_name)) {
						_div.set(_name, $(`select[${commons.data.name}='${_name}']`).next());
					}
					return _div.get(_name);
				},
				getIpt: (options) => {
					return commons.methods.getDiv(options).find(`div .${commons.data.name}`);
				},
				getInitVal: (options) => {
					let _dom = commons.methods.getDom(options);
					let vals = options.init ? options.init : (
						_dom.find(`option[selected]`).map((index, target) => {
							return $(target).attr(`value`);
						}).toArray()
					);
					return vals.map((val) => {
						return {
							name: _dom.find(`option[value='${val}']`).text(),
							val: val + "",
						}
					}).filter((val) => {
						return val.name && val.val;
					});
				},
				getValues: (options) => {
					let [_arr, _name] = [commons.data.values, options.name];
					if(!_arr.has(_name)) {
						_arr.set(_name, []);
					}
					return _arr.get(_name);
				},
				setValues: (options, vals) => {
					let [_arr, _name] = [commons.data.values, options.name];
					_arr.set(_name, vals);
				},
				getOptions: (sel) => {
					return {
						name: sel.attr(`${commons.data.name}`),
						type: sel.attr(`${commons.data.name}-type`),
						max: sel.attr(`${commons.data.name}-max`),
						icon: sel.attr(`${commons.data.name}-icon`),
						tips: sel.attr(`${commons.data.name}-placeholder`),
					}
				},
				cloneOptions: (options, hisOptions) => {
					if(!hisOptions){
						hisOptions = commons.data.DEFAULT_OPTIONS;
					}
					if(options.icon && typeof options.icon == 'string'){
						let icon = options.icon;
						if(icon.startsWith('layui')){
							options.icon = {
								class: icon,
								text: '',
							};
						}else{
							options.icon = {
								class: '',
								text: icon,
							};
						}
					}
					return $.extend(true, {}, hisOptions, options);
				},
				autoInit: () => {
					$(`select[${commons.data.name}]`).each((index, target) => {
						let sel = $(target);
						sel.css('display', 'none');
						commons.methods.init(commons.methods.getOptions(sel));
					})
				},
				listenClose: () => {
					$(document).on('click', 'i[fsw]', (e) => {
						let [sel, span]= [$(e.target).parents('.layui-form-select').prev(), $(e.target).parent()];
						let val = {
							name: span.find('font').text(),
							val: span.attr('value'),
						};
						let options = commons.methods.getOptions(sel);
						commons.methods.getDiv(options).find(`dl dd[lay-value='${val.val}']`).click();
						commons.methods.valHandler(commons.methods.getOptions(sel), val, false);
					});
				},
				formRender: null,
				rewriteRender: () => {
					commons.methods.formRender = form.render;
					form.render = (type, filter, repeat) => {
						commons.methods.formRender(type, filter);
						if(filter) {
							let sel = $(`[lay-filter=${filter}]`).find(`select[${commons.data.name}]`);
							if(sel.length) {
								if(repeat){
									commons.methods.init(commons.methods.getOptions(sel));
								}
							}
						} else {
							if(type == 'select') {
								commons.methods.autoInit();
							}
						}
					}
				},
				run: () => {
					commons.methods.rewriteRender();
					commons.methods.listenClose();
					commons.methods.autoInit();
				}
			}
		},
		styles = {
			hiddenInput: {
				display: 'none',
			},
			input: {
				lineHeight: "normal",
				height: "auto",
				padding: "4px 10px",
				overflow: "hidden",
				minHeight: "38px",
				left: 0,
				zIndex: 99,
				position: "relative",
				background: "none",
			},
			inputLabel: {
				padding: "2px 5px",
				background: "#f0f2f5",
				borderRadius: "2px",
				color: "#909399",
				display: "block",
				lineHeight: "20px",
				height: "20px",
				margin: "2px 5px 2px 0",
				float: "left",
				cursor: "initial",
				userSelect: "none",
			},
			inputLabelClose: {
				backgroundColor: "#c0c4cc",
				color: "#fff",
				marginLeft: "8px",
				borderRadius: "20px",
				fontSize: "12px",
			},
			inputLabelCloseHover: {
				backgroundColor: "#909399",
				cursor: "pointer",
			},
			inputLabelCloseUnHover: {
				backgroundColor: "#c0c4cc",
				cursor: "initial",
			},
			inputEmpty: {
				display: "inline-block",
				height: "28px",
				lineHeight: "28px",
				color: "#999",
			},
			typeYes: {
				position: "absolute",
				right: "10px",
			},
			typeSelectedColor: {
				color: "#5FB878",
			},
			typeUnSelectedColor: {
				color: "inherit",
			}
		}
	commons.methods.run();
	return select3;
});