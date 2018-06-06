'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * name: formSelects
 * 基于Layui Select多选
 * version: 4.0.0.0606
 * http://sun.faysunshine.com/layui/formSelects-v4/dist/formSelects-v4.js
 */
(function (layui, window, factory) {
	if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object') {
		// 支持 CommonJS
		module.exports = factory();
	} else if (typeof define === 'function' && define.amd) {
		// 支持 AMD
		define(factory);
	} else if (window.layui && layui.define) {
		//layui加载
		layui.define(function (exports) {
			exports('formSelects', factory());
		});
	} else {
		window.formSelects = factory();
	}
})(typeof layui == 'undefined' ? null : layui, window, function () {
	var v = '4.0.0',
	    NAME = 'xm-select',
	    PNAME = 'xm-select-parent',
	    INPUT = 'xm-select-input',
	    TDIV = 'xm-select--suffix',
	    THIS = 'xm-select-this',
	    LABEL = 'xm-select-label',
	    SEARCH = 'xm-select-search',
	    CREATE = 'xm-select-create',
	    CREATE_LONG = 'xm-select-create-long',
	    MAX = 'xm-select-max',
	    SKIN = 'xm-select-skin',
	    DIRECTION = "xm-select-direction",
	    HEIGHT = 'xm-select-height',
	    DISABLED = 'xm-dis-disabled',
	    DIS = 'xm-select-dis',
	    TEMP = 'xm-select-temp',
	    RADIO = 'xm-select-radio',
	    LINKAGE = 'xm-select-linkage',
	    DL = 'xm-select-dl',
	    HIDE_INPUT = 'xm-hide-input',
	    SANJIAO = 'xm-select-sj',
	    ICON_CLOSE = 'xm-icon-close',
	    FORM_TITLE = 'xm-select-title',
	    FORM_SELECT = 'xm-form-select',
	    FORM_SELECTED = 'xm-form-selected',
	    FORM_NONE = 'xm-select-none',
	    FORM_EMPTY = 'xm-select-empty',
	    FORM_INPUT = 'xm-input',
	    FORM_SELECT_TIPS = 'xm-select-tips',
	    CHECKBOX_YES = 'xm-icon-yes',
	    TIPS = '请选择',
	    data = {},
	    events = {
		on: {},
		filter: {},
		maxTips: {}
	},
	    ajax = {
		type: 'get',
		header: {},
		data: {},
		searchUrl: '',
		searchName: 'keyword',
		keyName: 'name',
		keyVal: 'value',
		keySel: 'selected',
		keyDis: 'disabled',
		dataType: '',
		delay: 500,
		success: null,
		error: null
	},
	    $ = window.$ || window.layui && window.layui.jquery,
	    $win = $(window),
	    ajaxs = {},
	    FormSelects = function FormSelects(options) {
		var _this = this;

		this.config = {
			name: null, //xm-select="xxx"
			max: null,
			maxTips: function maxTips(vals, val, max) {
				var ipt = $('[xid=' + _this.config.name + ']').prev().find('.' + NAME);
				if (ipt.parents('.layui-form-item[pane]').length) {
					ipt = ipt.parents('.layui-form-item[pane]');
				}
				ipt.attr('style', 'border-color: red !important');
				setTimeout(function () {
					ipt.removeAttr('style');
				}, 300);
			},
			init: null, //初始化的选择值,
			on: null, //select值发生变化
			filter: function filter(id, inputVal, val, isDisabled) {
				return val.name.indexOf(inputVal) == -1;
			},
			clearid: -1,
			direction: 'auto',
			height: null
		};
		this.select = null;
		this.values = [];
		$.extend(true, this.config, options);
	};

	//一些简单的处理方法
	var Common = function Common() {
		this.loadingCss();
		this.appender();
		this.init();
		this.on();
		this.initVal();
		this.onreset();
	};

	Common.prototype.appender = function () {
		//针对IE做的一些拓展
		if (!Array.prototype.map) {
			Array.prototype.map = function (callback, thisArg) {
				var T,
				    A,
				    k,
				    O = Object(this),
				    len = O.length >>> 0;
				if (thisArg) {
					T = thisArg;
				}
				A = new Array(len);
				k = 0;
				while (k < len) {
					var kValue, mappedValue;
					if (k in O) {
						kValue = O[k];
						mappedValue = callback.call(T, kValue, k, O);
						A[k] = mappedValue;
					}
					k++;
				}
				return A;
			};
		}
		if (!Array.prototype.forEach) {
			Array.prototype.forEach = function forEach(callback, thisArg) {
				var T, k;
				if (this == null) {
					throw new TypeError("this is null or not defined");
				}
				var O = Object(this);
				var len = O.length >>> 0;
				if (typeof callback !== "function") {
					throw new TypeError(callback + " is not a function");
				}
				if (arguments.length > 1) {
					T = thisArg;
				}
				k = 0;
				while (k < len) {
					var kValue;
					if (k in O) {

						kValue = O[k];
						callback.call(T, kValue, k, O);
					}
					k++;
				}
			};
		}
	};

	Common.prototype.init = function (target) {
		var _this2 = this;

		//初始化页面上已有的select
		$(target ? target : 'select[' + NAME + ']').each(function (index, select) {
			var othis = $(select),
			    id = othis.attr(NAME),
			    hasRender = othis.next('.layui-form-select'),
			    disabled = select.disabled,
			    max = othis.attr(MAX) - 0,
			    isSearch = othis.attr(SEARCH) != undefined,
			    searchUrl = isSearch ? othis.attr(SEARCH) : null,
			    isCreate = othis.attr(CREATE) != undefined,
			    isRadio = othis.attr(RADIO) != undefined,
			    skin = othis.attr(SKIN),
			    direction = othis.attr(DIRECTION),
			    optionsFirst = select.options[0],
			    height = othis.attr(HEIGHT),
			    formname = othis.attr('name'),
			    layverify = othis.attr('lay-verify'),
			    placeholder = optionsFirst ? optionsFirst.value ? TIPS : optionsFirst.innerHTML || TIPS : TIPS,
			    value = othis.find('option[selected]').toArray().map(function (option) {
				//获取已选中的数据
				return {
					name: option.innerHTML,
					val: option.value
				};
			}),
			    fs = new FormSelects();
			//先取消layui对select的渲染
			hasRender[0] && hasRender.remove();

			//包裹一个div
			othis.wrap('<div class="' + PNAME + '"></div>');

			//构造渲染div
			var dinfo = _this2.renderSelect(placeholder, select);
			var heightStyle = height ? 'style="height: ' + height + ';"' : '';
			var inputHtml = height ? '\n\t\t\t\t<div class="' + LABEL + '" style="margin-right: 50px;">\n\t\t\t\t</div>\n\t\t\t\t<input type="text" fsw class="' + FORM_INPUT + ' ' + INPUT + '" ' + (isSearch ? '' : 'style="display: none;"') + ' autocomplete="off" debounce="0" style="position: absolute;right: 10px;top: 3px;"/>\n\t\t\t' : '\n\t\t\t\t<div class="' + LABEL + '">\n\t\t\t\t\t<input type="text" fsw class="' + FORM_INPUT + ' ' + INPUT + '" ' + (isSearch ? '' : 'style="display: none;"') + ' autocomplete="off" debounce="0" />\n\t\t\t\t</div>\n\t\t\t';
			var reElem = $('\n\t\t\t\t<div class="' + FORM_SELECT + '" ' + SKIN + '="' + skin + '">\n\t\t\t\t\t<input type="hidden" class="' + HIDE_INPUT + '" value="" name="' + formname + '" lay-verify="' + layverify + '"/>\n\t\t\t\t\t<div class="' + FORM_TITLE + ' ' + (disabled ? DIS : '') + '">\n\t\t\t\t\t\t<div class="' + FORM_INPUT + ' ' + NAME + '" ' + heightStyle + '>\n\t\t\t\t\t\t\t' + inputHtml + '\n\t\t\t\t\t\t\t<i class="' + SANJIAO + '"></i>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class="' + TDIV + '">\n\t\t\t\t\t\t\t<input type="text" autocomplete="off" placeholder="' + placeholder + '" readonly="readonly" unselectable="on" class="' + FORM_INPUT + '">\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div></div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<dl xid="' + id + '" class="' + DL + ' ' + (isRadio ? RADIO : '') + '">' + dinfo + '</dl>\n\t\t\t\t</div>\n\t\t\t');
			othis.after(reElem);
			fs.select = othis.remove(); //去掉layui.form.render
			fs.values = value;
			fs.config.name = id;
			fs.config.init = value.concat([]);
			fs.config.direction = direction;
			fs.config.height = height;
			fs.config.radio = isRadio;
			data[id] = fs;

			if (max) {
				//有最大值
				fs.config.max = max;
			}

			//如果可搜索, 加上事件
			if (isSearch) {
				reElem.find('.' + INPUT).on('input propertychange', function (e) {
					var input = e.target,
					    inputValue = $.trim(input.value),
					    keyCode = e.keyCode;
					if (keyCode === 9 || keyCode === 13 || keyCode === 37 || keyCode === 38 || keyCode === 39 || keyCode === 40) {
						return false;
					}

					//过滤一下tips
					_this2.changePlaceHolder($(input));

					//如果开启了远程搜索
					if (searchUrl) {
						var ajaxConfig = ajaxs[id] ? ajaxs[id] : ajax;
						clearTimeout(fs.clearid);
						fs.clearid = setTimeout(function () {
							reElem.find('dl > *:not(.' + FORM_SELECT_TIPS + ')').remove();
							reElem.find('dd.' + FORM_NONE).addClass(FORM_EMPTY).text('请求中');
							_this2.ajax(id, ajaxConfig.searchUrl || searchUrl, inputValue);
						}, ajaxConfig.delay);
					} else {
						reElem.find('dl .layui-hide').removeClass('layui-hide');
						//遍历选项, 选择可以显示的值
						reElem.find('dl dd:not(.' + FORM_SELECT_TIPS + ')').each(function (idx, item) {
							var _item = $(item);
							var searchFun = data[id].config.filter || events.filter[id];
							if (searchFun && searchFun(id, inputValue, {
								name: _item.find('span').text(),
								val: _item.attr('lay-value')
							}, _item.hasClass(DISABLED)) == true) {
								_item.addClass('layui-hide');
							}
						});
						//控制分组名称
						reElem.find('dl dt').each(function (index, item) {
							if (!$(item).nextUntil('dt', ':not(.layui-hide)').length) {
								$(item).addClass('layui-hide');
							}
						});
						//动态创建
						_this2.create(id, isCreate, inputValue);
						var shows = reElem.find('dl dd:not(.' + FORM_SELECT_TIPS + '):not(.layui-hide)');
						if (!shows.length) {
							reElem.find('dd.' + FORM_NONE).addClass(FORM_EMPTY).text('无匹配项');
						} else {
							reElem.find('dd.' + FORM_NONE).removeClass(FORM_EMPTY);
						}
					}
				});
				if (searchUrl) {
					//触发第一次请求事件
					var obj_caller = reElem.find('.' + INPUT)[0];
					if (document.createEventObject) {
						obj_caller.fireEvent("onchange");
					} else {
						var evt = document.createEvent("HTMLEvents");
						evt.initEvent("input", false, true);
						obj_caller.dispatchEvent(evt);
					}
				}
			}
		});
	};

	Common.prototype.ajax = function (id, searchUrl, inputValue, isLinkage, linkageWidth) {
		var _this3 = this;

		var reElem = $('.' + PNAME + ' dl[xid=' + id + ']').parents('.' + FORM_SELECT);
		if (!reElem[0] || !searchUrl) {
			return;
		}

		var ajaxConfig = ajaxs[id] ? ajaxs[id] : ajax;
		var ajaxData = $.extend(true, {}, ajaxConfig.data);
		ajaxData[ajaxConfig.searchName] = inputValue;
		$.ajax({
			type: ajaxConfig.type,
			headers: ajaxConfig.header,
			url: searchUrl,
			data: ajaxConfig.dataType == 'json' ? JSON.stringify(ajaxData) : ajaxData,
			success: function success(res) {
				if (typeof res == 'string') {
					res = JSON.parse(res);
				}
				if (res.code != 0) {
					reElem.find('dd.' + FORM_NONE).addClass(FORM_EMPTY).text(res.msg);
				} else {
					reElem.find('dd.' + FORM_NONE).removeClass(FORM_EMPTY);
					//获得已选择的values
					var spans = reElem.find('.' + LABEL + ' span').toArray().map(function (item) {
						return {
							name: $(item).find('font').text(),
							val: $(item).attr('value')
						};
					});
					_this3.renderData(id, res.data, isLinkage, linkageWidth);
					data[id].values.forEach(function (item, index) {
						reElem.find('dl dd[lay-value=' + item.val + ']').addClass(THIS);
					});
					spans.forEach(function (item, idx) {
						data[id].values.push(item);
					});
				}
				ajaxConfig.success && ajaxConfig.success instanceof Function && ajaxConfig.success(id, searchUrl, inputValue, res);
			},
			error: function error(err) {
				reElem.find('dd[lay-value]:not(.' + FORM_SELECT_TIPS + ')').remove();
				reElem.find('dd.' + FORM_NONE).addClass(FORM_EMPTY).text('服务异常');
				ajaxConfig.error && ajaxConfig.error instanceof Function && ajaxConfig.error(id, searchUrl, inputValue, err);
			}
		});
	};

	Common.prototype.renderData = function (id, dataArr, linkage, linkageWidth) {
		var _this4 = this;

		if (linkage) {
			var _ret = function () {
				//TODO 渲染多级联动
				var result = [],
				    index = 0,
				    temp = { "0": dataArr },
				    ajaxConfig = ajaxs[id] ? ajaxs[id] : ajax;

				var _loop = function _loop() {
					var group = result[index++] = [],
					    _temp = temp;
					temp = {};
					$.each(_temp, function (pid, arr) {
						$.each(arr, function (idx, item) {
							var val = {
								pid: pid,
								name: item[ajaxConfig.keyName],
								val: item[ajaxConfig.keyVal]
							};
							group.push(val);
							if (item.children && item.children.length) {
								temp[val.val] = item.children;
							}
						});
					});
				};

				do {
					_loop();
				} while (Object.getOwnPropertyNames(temp).length);

				var reElem = $('.' + PNAME + ' dl[xid=' + id + ']').parents('.' + FORM_SELECT);
				var html = ['<div class="xm-select-linkage">'];

				$.each(result, function (idx, arr) {
					var groupDiv = ['<div style="left: ' + (linkageWidth - 0) * idx + 'px;" class="xm-select-linkage-group xm-select-linkage-group' + (idx + 1) + ' ' + (idx != 0 ? 'xm-select-linkage-hide' : '') + '">'];
					$.each(arr, function (idx2, item) {
						var span = '<li title="' + item.name + '" pid="' + item.pid + '" value="' + item.val + '"><span>' + item.name + '</span></li>';
						groupDiv.push(span);
					});
					groupDiv.push('</div>');
					html = html.concat(groupDiv);
				});
				//			<li class="xm-select-this xm-select-active"><span>123</span></li>
				html.push('<div style="clear: both; height: 288px;"></div>');
				html.push('</div>');
				reElem.find('dl').html(html.join(''));
				reElem.find('.' + INPUT).css('display', 'none'); //TODO 联动暂时不支持搜索
				return {
					v: void 0
				};
			}();

			if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
		}
		var reElem = $('.' + PNAME + ' dl[xid=' + id + ']').parents('.' + FORM_SELECT);
		var ajaxConfig = ajaxs[id] ? ajaxs[id] : ajax;
		var pcInput = reElem.find('.' + TDIV + ' input');

		var values = [];
		reElem.find('dl').html(this.renderSelect(pcInput.attr('placeholder') || pcInput.attr('back'), dataArr.map(function (item) {
			if (item[ajaxConfig.keySel]) {
				values.push({
					name: item[ajaxConfig.keyName],
					val: item[ajaxConfig.keyVal]
				});
			}
			return {
				innerHTML: item[ajaxConfig.keyName],
				value: item[ajaxConfig.keyVal],
				sel: item[ajaxConfig.keySel],
				disabled: item[ajaxConfig.keyDis],
				type: item.type,
				name: item.name
			};
		})));

		var label = reElem.find('.' + LABEL);
		var dl = reElem.find('dl[xid]');
		values.forEach(function (item, index) {
			_this4.addLabel(id, label, item);
			dl.find('dd[lay-value=' + item.val + ']').addClass(THIS);
		});
		data[id].values = values;
		this.commonHanler(id, label);
	};

	Common.prototype.create = function (id, isCreate, inputValue) {
		if (isCreate && inputValue) {
			var fs = data[id],
			    dl = $('[xid=' + id + ']'),
			    tips = dl.find('dd.' + FORM_SELECT_TIPS + ':first'),
			    tdd = null,
			    temp = dl.find('dd.' + TEMP);
			dl.find('dd:not(.' + FORM_SELECT_TIPS + '):not(.' + TEMP + ')').each(function (index, item) {
				if (inputValue == $(item).find('span').text()) {
					tdd = item;
				}
			});
			if (!tdd) {
				//如果不存在, 则创建
				if (temp[0]) {
					temp.attr('lay-value', inputValue);
					temp.find('span').text(inputValue);
					temp.removeClass('layui-hide');
				} else {
					tips.after($(this.createDD({
						innerHTML: inputValue,
						value: Date.now()
					}, TEMP + ' ' + CREATE_LONG)));
				}
			}
		} else {
			$('[xid=' + id + '] dd.' + TEMP).remove();
		}
	};

	Common.prototype.createDD = function (item, clz) {
		return '<dd lay-value="' + item.value + '" class="' + (item.disabled ? DISABLED : '') + ' ' + (clz ? clz : '') + '">\n\t\t\t\t\t<div class="xm-unselect xm-form-checkbox ' + (item.disabled ? 'layui-checkbox-disbaled ' + DISABLED : '') + '" lay-skin="primary">\n\t\t\t\t\t\t<span>' + $.trim(item.innerHTML) + '</span>\n\t\t\t\t\t\t<i class="' + CHECKBOX_YES + '"></i>\n\t\t\t\t\t</div>\n\t\t\t\t</dd>';
	};

	Common.prototype.renderSelect = function (tips, select) {
		var _this5 = this;

		var arr = [];
		//		arr.push(`<dd lay-value="" class="layui-select-tips">各种复杂的地方操作</dd>`);
		arr.push('<dd lay-value="" class="' + FORM_SELECT_TIPS + '">' + tips + '</dd>');
		if (Array.isArray(select)) {
			$(select).each(function (index, item) {
				if (item.type === 'optgroup') {
					arr.push('<dt>' + item.name + '</dt>');
				} else {
					arr.push(_this5.createDD(item));
				}
			});
		} else {
			$(select).find('*').each(function (index, item) {
				if (item.tagName.toLowerCase() == 'option' && index == 0 && !item.value) {
					return;
				}
				if (item.tagName.toLowerCase() === 'optgroup') {
					arr.push('<dt>' + item.label + '</dt>');
				} else {
					arr.push(_this5.createDD(item));
				}
			});
		}
		arr.push('<dt style="display:none;"> </dt>');
		arr.push('<dd class="' + FORM_SELECT_TIPS + ' ' + FORM_NONE + ' ' + (arr.length === 1 ? FORM_EMPTY : '') + '">\u6CA1\u6709\u9009\u9879</dd>');
		return arr.join('');
	};

	Common.prototype.on = function () {
		//事件绑定
		this.one();

		$(document).on('click', function (e) {
			if (!$(e.target).parents('.' + FORM_TITLE)[0]) {
				//清空input中的值
				$('.' + INPUT).val('');
				$('.' + PNAME + ' dl .layui-hide').removeClass('layui-hide');
				$('.' + PNAME + ' dl dd.' + TEMP).remove();
			}
			$('.' + PNAME + ' .' + FORM_SELECTED).removeClass(FORM_SELECTED);
		});
	};

	Common.prototype.one = function (target) {
		var _this6 = this;

		//一次性事件绑定
		$(target ? target : document).find('.' + FORM_TITLE).off('click').on('click', function (e) {
			var othis = $(e.target),
			    title = othis.is(FORM_TITLE) ? othis : othis.parents('.' + FORM_TITLE),
			    dl = title.next(),
			    id = dl.attr('xid');

			//清空非本select的input val
			$('dl[xid]').not(dl).prev().find('.' + INPUT).val('');
			$('dl[xid]').not(dl).find('dd.layui-hide').removeClass('layui-hide');

			//如果是disabled select
			if (title.hasClass(DIS)) {
				return false;
			}
			//如果点击的是右边的三角或者只读的input
			if (othis.is('.' + SANJIAO) || othis.is('.' + INPUT + '[readonly]')) {
				_this6.changeShow(title, !title.parents('.' + FORM_SELECT).hasClass(FORM_SELECTED));
				return false;
			}
			//如果点击的是input的右边, focus一下
			if (title.find('.' + INPUT + ':not(readonly)')[0]) {
				var input = title.find('.' + INPUT),
				    epos = { x: e.pageX, y: e.pageY },
				    pos = _this6.getPosition(title[0]),
				    width = title.width();
				while (epos.x > pos.x) {
					if ($(document.elementFromPoint(epos.x, epos.y)).is(input)) {
						input.focus();
						_this6.changeShow(title, true);
						return false;
					}
					epos.x -= 50;
				}
			}

			//如果点击的是可搜索的input
			if (othis.is('.' + INPUT)) {
				_this6.changeShow(title, true);
				return false;
			}
			//如果点击的是x按钮
			if (othis.is('i[fsw=' + NAME + ']')) {
				var val = {
					name: othis.prev().text(),
					val: othis.parent().attr("value")
				},
				    dd = dl.find('dd[lay-value=\'' + val.val + '\']');
				if (dd.hasClass(DISABLED)) {
					//如果是disabled状态, 不可选, 不可删
					return false;
				}
				_this6.handlerLabel(id, dd, false, val);
				return false;
			}

			_this6.changeShow(title, !title.parents('.' + FORM_SELECT).hasClass(FORM_SELECTED));
			return false;
		});
		$(target ? target : document).find('dl.' + DL).off('click').on('click', function (e) {
			var othis = $(e.target);
			if (othis.is('.' + LINKAGE) || othis.parents('.' + LINKAGE)[0]) {
				//TODO linkage的处理
				othis = othis.is('li') ? othis : othis.parents('li');
				var _group = othis.parents('.xm-select-linkage-group'),
				    _id = othis.parents('dl').attr('xid');
				//激活li
				_group.find('.xm-select-active').removeClass('xm-select-active');
				othis.addClass('xm-select-active');
				//激活下一个group, 激活前显示对应数据
				_group.nextAll('.xm-select-linkage-group').addClass('xm-select-linkage-hide');
				var nextGroup = _group.next('.xm-select-linkage-group');
				nextGroup.find('li').addClass('xm-select-linkage-hide');
				nextGroup.find('li[pid=' + othis.attr('value') + ']').removeClass('xm-select-linkage-hide');
				//如果没有下一个group, 或没有对应的值
				if (!nextGroup[0] || nextGroup.find('li:not(.xm-select-linkage-hide)').length == 0) {
					var vals = [],
					    index = 0,
					    _isAdd = !othis.hasClass('xm-select-this');
					if (data[_id].config.radio) {
						othis.parents('.xm-select-linkage').find('.xm-select-this').removeClass('xm-select-this');
					}
					do {
						vals[index++] = {
							name: othis.find('span').text(),
							val: othis.attr('value')
							/*isAdd ? (
       	othis.addClass('xm-select-this')
       ) : (
       	!othis.parent('.xm-select-linkage-group').next().find(`li[pid="${othis.attr('value')}"].xm-select-this`).length && othis.removeClass('xm-select-this')
       );*/
						};othis = othis.parents('.xm-select-linkage-group').prev().find('li[value=' + othis.attr('pid') + ']');
					} while (othis.length);
					vals.reverse();
					var val = {
						name: vals.map(function (item) {
							return item.name;
						}).join('/'),
						val: vals.map(function (item) {
							return item.val;
						}).join('/')
					};
					_this6.handlerLabel(_id, null, _isAdd, val);
				} else {
					nextGroup.removeClass('xm-select-linkage-hide');
				}
				return false;
			} //xm-select-this xm-select-active

			if (othis.is('dt') || othis.is('dl')) {
				return false;
			}
			var dd = othis.is('dd') ? othis : othis.parents('dd');
			var id = dd.parent('dl').attr('xid');
			if (dd.hasClass(DISABLED)) {
				//被禁用选项的处理
				return false;
			}
			if (dd.hasClass(FORM_SELECT_TIPS)) {
				//tips的处理

				return false;
			}
			var isAdd = !dd.hasClass(THIS);
			_this6.handlerLabel(id, dd, isAdd);
			return false;
		});
	};

	Common.prototype.linkageAdd = function (id, val) {
		var dl = $('dl[xid="' + id + '"]');
		dl.find('.xm-select-active').removeClass('xm-select-active');
		var vs = val.val.split('/');
		var pid = void 0,
		    li = void 0,
		    index = 0;
		var lis = [];
		do {
			pid = vs[index];
			li = dl.find('.xm-select-linkage-group' + (index + 1) + ' li[value="' + pid + '"]');
			li[0] && lis.push(li);
			index++;
		} while (li.length && pid != undefined);
		if (lis.length == vs.length) {
			$.each(lis, function (idx, item) {
				item.addClass('xm-select-this');
			});
		}
	};

	Common.prototype.linkageDel = function (id, val) {
		var dl = $('dl[xid="' + id + '"]');
		var vs = val.val.split('/');
		var pid = void 0,
		    li = void 0,
		    index = vs.length - 1;
		do {
			pid = vs[index];
			li = dl.find('.xm-select-linkage-group' + (index + 1) + ' li[value="' + pid + '"]');
			if (!li.parent().next().find('li[pid=' + pid + '].xm-select-this').length) {
				li.removeClass('xm-select-this');
			}
			index--;
		} while (li.length && pid != undefined);
	};

	Common.prototype.valToName = function (id, val) {
		var dl = $('dl[xid="' + id + '"]');
		var vs = val.split('/');
		var names = [];
		$.each(vs, function (idx, item) {
			var name = dl.find('.xm-select-linkage-group' + (idx + 1) + ' li[value="' + item + '"] span').text();
			names.push(name);
		});
		return names.length == vs.length ? names.join('/') : null;
	};

	Common.prototype.commonHanler = function (key, label) {
		//计算input的提示语
		this.changePlaceHolder(label);
		//计算高度
		this.retop(label.parents('.' + FORM_SELECT));
		this.checkHideSpan(label);
		this.calcLeft(key, label);
		//表单默认值
		label.parents('.' + PNAME).find('.' + HIDE_INPUT).val(data[key].values.map(function (val) {
			return val.val;
		}).join(','));
		//title值
		label.parents('.' + FORM_TITLE + ' .' + NAME).attr('title', data[key].values.map(function (val) {
			return val.name;
		}).join(','));
	};

	Common.prototype.initVal = function (id) {
		var _this7 = this;

		var target = {};
		if (id) {
			target[id] = data[id];
		} else {
			target = data;
		}
		$.each(target, function (key, val) {
			var values = val.values,
			    div = $('dl[xid=' + key + ']').parent(),
			    label = div.find('.' + LABEL),
			    dl = div.find('dl');
			dl.find('dd.' + THIS).removeClass(THIS);

			var _vals = values.concat([]);
			_vals.concat([]).forEach(function (item, index) {
				_this7.addLabel(key, label, item);
				dl.find('dd[lay-value=' + item.val + ']').addClass(THIS);
			});
			if (val.config.radio) {
				_vals.length && values.push(_vals[_vals.length - 1]);
			}
			_this7.commonHanler(key, label);
		});
	};

	Common.prototype.handlerLabel = function (id, dd, isAdd, oval, notOn) {
		var div = $('[xid=' + id + ']').prev().find('.' + LABEL),
		    val = dd && {
			name: dd.find('span').text(),
			val: dd.attr('lay-value')
		},
		    vals = data[id].values,
		    on = data[id].config.on || events.on[id];
		if (oval) {
			val = oval;
		}
		var fs = data[id];
		if (isAdd && fs.config.max && fs.values.length >= fs.config.max) {
			var maxTipsFun = data[id].config.maxTips || events.maxTips[id];
			maxTipsFun && maxTipsFun(id, vals.concat([]), val, fs.max);
			return;
		}
		if (!notOn) {
			if (on && on instanceof Function && on(id, vals.concat([]), val, isAdd, dd.hasClass(DISABLED)) == false) {
				return;
			}
		}
		var dl = $('dl[xid="' + id + '"]');
		isAdd ? (dd && dd[0] ? (dd.addClass(THIS), dd.removeClass(TEMP)) : dl.find('.xm-select-linkage')[0] && this.linkageAdd(id, val), this.addLabel(id, div, val), vals.push(val)) : (dd && dd[0] ? dd.removeClass(THIS) : dl.find('.xm-select-linkage')[0] && this.linkageDel(id, val), this.delLabel(id, div, val), this.remove(vals, val));
		if (!div[0]) return;
		//单选选完后直接关闭选择域
		if (fs.config.radio) {
			this.changeShow(div, false);
		}
		//移除表单验证的红色边框
		div.parents('.' + FORM_TITLE).prev().removeClass('layui-form-danger');

		this.commonHanler(id, div);
	};

	Common.prototype.addLabel = function (id, div, val) {
		if (!val) return;
		var tips = 'fsw="' + NAME + '"';
		var _ref = [$('<span ' + tips + ' value="' + val.val + '"><font ' + tips + '>' + val.name + '</font></span>'), $('<i ' + tips + ' class="xm-icon-close">\xD7</i>')],
		    $label = _ref[0],
		    $close = _ref[1];

		$label.append($close);
		//如果是radio模式
		var fs = data[id];
		if (fs.config.radio) {
			fs.values.length = 0;
			$('dl[xid=' + id + ']').find('dd.' + THIS + ':not([lay-value="' + val.val + '"])').removeClass(THIS);
			div.find('span').remove();
		}
		//如果是固定高度
		if (fs.config.height) {
			div.append($label);
		} else {
			div.find('input').css('width', '50px');
			div.find('input').before($label);
		}
	};

	Common.prototype.delLabel = function (id, div, val) {
		if (!val) return;
		div.find('span[value="' + val.val + '"]:first').remove();
	};

	Common.prototype.calcLeft = function (id, div) {
		if (data[id].config.height) {
			var showLastSpan = div.find('span:not(.xm-span-hide):last')[0];
			div.next().css('left', (showLastSpan ? this.getPosition(showLastSpan).x - this.getPosition(div[0]).x + showLastSpan.offsetWidth + 20 : 10) + 'px');
		}
	};

	Common.prototype.checkHideSpan = function (div) {
		var _this8 = this;

		var parentHeight = div.parents('.' + NAME)[0].offsetHeight + 5;
		div.find('span.xm-span-hide').removeClass('xm-span-hide');
		div.find('span').each(function (index, item) {
			if (item.offsetHeight + item.offsetTop > parentHeight || _this8.getPosition(item).y + item.offsetHeight > _this8.getPosition(div[0]).y + div[0].offsetHeight + 5) {
				$(item).addClass('xm-span-hide');
			}
		});
	};

	Common.prototype.retop = function (div) {
		//计算dl显示的位置
		var dl = div.find('dl'),
		    top = div.offset().top + div.outerHeight() + 5 - $win.scrollTop(),
		    dlHeight = dl.outerHeight();
		var up = div.hasClass('layui-form-selectup') || dl.css('top').indexOf('-') != -1 || top + dlHeight > $win.height() && top >= dlHeight;
		div = div.find('.' + NAME);

		var fs = data[dl.attr('xid')];
		if (fs) {
			if (fs.config.direction == 'up') {
				dl.css({
					top: 'auto',
					bottom: '42px'
				});
				return;
			}
			if (fs.direction == 'down') {
				dl.css({
					top: div[0].offsetTop + div.height() + 10 + 'px',
					bottom: 'auto'
				});
				return;
			}
		}

		if (up) {
			dl.css({
				top: 'auto',
				bottom: '42px'
			});
		} else {
			dl.css({
				top: div[0].offsetTop + div.height() + 10 + 'px',
				bottom: 'auto'
			});
		}
	};

	Common.prototype.changeShow = function (children, isShow) {
		//显示于隐藏
		var top = children.parents('.' + FORM_SELECT);
		$('.' + PNAME + ' .' + FORM_SELECT).not(top).removeClass(FORM_SELECTED);
		if (isShow) {
			this.retop(top);
			top.addClass(FORM_SELECTED);
			top.find('.' + INPUT).focus();
		} else {
			top.removeClass(FORM_SELECTED);
			top.find('.' + INPUT).val('');
			top.find('dl .layui-hide').removeClass('layui-hide');
			top.find('dl dd.' + TEMP).remove();
		}
	};

	Common.prototype.changePlaceHolder = function (div) {
		//显示于隐藏提示语
		//调整pane模式下的高度
		var title = div.parents('.' + FORM_TITLE);

		var id = div.parents('.' + PNAME).find('dl[xid]').attr('xid');
		if (data[id] && data[id].config.height) {//既然固定高度了, 那就看着办吧

		} else {
			title.css('height', title.find('.' + NAME)[0].clientHeight + 2 + 'px');
		}

		var input = title.find('.' + TDIV + ' input'),
		    isShow = !div.find('span:last')[0] && !title.find('.' + INPUT).val();
		if (isShow) {
			var ph = input.attr('back');
			input.removeAttr('back');
			input.attr('placeholder', ph);
		} else {
			var _ph = input.attr('placeholder');
			input.removeAttr('placeholder');
			input.attr('back', _ph);
		}
	};

	Common.prototype.indexOf = function (arr, val) {
		for (var i = 0; i < arr.length; i++) {
			if (arr[i].val == val || arr[i].val == (val ? val.val : val) || arr[i] == val || JSON.stringify(arr[i]) == JSON.stringify(val)) {
				return i;
			}
		}
		return -1;
	};

	Common.prototype.remove = function (arr, val) {
		var idx = this.indexOf(arr, val ? val.val : val);
		if (idx > -1) {
			arr.splice(idx, 1);
			return true;
		}
		return false;
	};

	Common.prototype.removeAll = function (id) {
		var _this9 = this;

		var dl = $('[xid=' + id + ']');
		if (dl.find('.xm-select-linkage')[0]) {
			//针对多级联动的处理
			data[id].values.concat([]).forEach(function (item, idx) {
				var vs = item.val.split('/');
				var pid = void 0,
				    li = void 0,
				    index = 0;
				do {
					pid = vs[index++];
					li = dl.find('.xm-select-linkage-group' + index + ':not(.xm-select-linkage-hide) li[value="' + pid + '"]');
					li.click();
				} while (li.length && pid != undefined);
			});
			return;
		}
		data[id].values.concat([]).forEach(function (item, index) {
			_this9.handlerLabel(id, dl.find('dd[lay-value="' + item.val + '"]'), false, item, true);
		});
	};

	Common.prototype.getPosition = function (e) {
		var x = 0,
		    y = 0;
		while (e != null) {
			x += e.offsetLeft;
			y += e.offsetTop;
			e = e.offsetParent;
		}
		return { x: x, y: y };
	};

	Common.prototype.onreset = function () {
		//监听reset按钮, 然后重置多选
		$(document).on('click', '[type=reset]', function (e) {
			$(e.target).parents('form').find('.' + PNAME + ' dl[xid]').each(function (index, item) {
				var id = item.getAttribute('xid'),
				    dl = $(item),
				    dd = void 0,
				    temp = {};
				common.removeAll(id);
				data[id].config.init.forEach(function (val, idx) {
					if (val && (!temp[val] || data[id].config.repeat) && (dd = dl.find('dd[lay-value=' + val.val + ']'))[0]) {
						common.handlerLabel(id, dd, true);
						temp[val] = 1;
					}
				});
			});
		});
	};

	Common.prototype.loadingCss = function () {
		var cssStyle = $('<style type="text/css">' + '.xm-select-parent *{;margin:0;padding:0;font-family:"Helvetica Neue",Helvetica,"PingFang SC",\u5FAE\u8F6F\u96C5\u9ED1,Tahoma,Arial,sans-serif}.xm-select-parent .xm-select-title{position:relative;min-height: 38px;}.xm-select-parent .xm-input{cursor:pointer;border-radius:2px;border-width:1px;border-style:solid;border-color:#E6E6E6;display:block;width:100%;box-sizing:border-box;background-color:#FFF;height:38px;line-height:1.3;padding-left:10px;outline:0}.xm-select-parent .xm-select-sj{display:inline-block;width:0;height:0;border-style:dashed;border-color:transparent;overflow:hidden;position:absolute;right:10px;top:50%;margin-top:-3px;cursor:pointer;border-width:6px;border-top-color:#C2C2C2;border-top-style:solid;transition:all .3s;-webkit-transition:all .3s}.xm-select-parent .xm-form-selected .xm-select-sj{margin-top:-9px;transform:rotate(180deg)}.xm-select-parent .xm-form-select dl{display:none;position:absolute;left:0;top:42px;padding:5px 0;z-index:999;min-width:100%;border:1px solid #d2d2d2;max-height:300px;overflow-y:auto;background-color:#fff;border-radius:2px;box-shadow:0 2px 4px rgba(0,0,0,.12);box-sizing:border-box;animation-fill-mode:both;-webkit-animation-name:layui-upbit;animation-name:layui-upbit;-webkit-animation-duration:.3s;animation-duration:.3s;-webkit-animation-fill-mode:both;animation-fill-mode:both}@-webkit-keyframes layui-upbit{from{-webkit-transform:translate3d(0,30px,0);opacity:.3}to{-webkit-transform:translate3d(0,0,0);opacity:1}}@keyframes layui-upbit{from{transform:translate3d(0,30px,0);opacity:.3}to{transform:translate3d(0,0,0);opacity:1}}.xm-select-parent .xm-form-selected dl{display:block}.xm-select-parent .xm-form-select dl dd,.xm-select-parent .xm-form-select dl dt{padding:0 10px;line-height:36px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.xm-select-parent .xm-form-select dl dd{cursor:pointer}.xm-select-parent .xm-form-select dl dd:hover{background-color:#f2f2f2}.xm-select-parent .xm-form-select dl dt{font-size:12px;color:#999}.layui-select-disabled .xm-dis-disabled{border-color:#eee!important}.xm-select-parent .xm-form-select dl .xm-select-tips{padding-left:10px!important;color:#999;font-size:14px}.xm-unselect{-moz-user-select:none;-webkit-user-select:none;-ms-user-select:none}.xm-form-checkbox{position:relative;display:inline-block;vertical-align:middle;height:30px;line-height:30px;margin-right:10px;padding-right:30px;background-color:#fff;cursor:pointer;font-size:0;-webkit-transition:.1s linear;transition:.1s linear;box-sizing:border-box}.xm-form-checkbox *{display:inline-block;vertical-align:middle}.xm-form-checkbox span{padding:0 10px;height:100%;font-size:14px;border-radius:2px 0 0 2px;background-color:#d2d2d2;color:#fff;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.xm-form-checkbox:hover span{background-color:#c2c2c2}.xm-form-checkbox i{position:absolute;right:0;top:0;width:30px;height:28px;border:1px solid #d2d2d2;border-left:none;border-radius:0 2px 2px 0;color:#fff;font-size:20px;text-align:center}.xm-form-checkbox:hover i{border-color:#c2c2c2;color:#c2c2c2}.xm-form-checkbox[lay-skin=primary]{height:auto!important;line-height:normal!important;border:none!important;margin-right:0;padding-right:0;background:0 0}.xm-form-checkbox[lay-skin=primary] span{float:right;padding-right:15px;line-height:18px;background:0 0;color:#666}.xm-form-checkbox[lay-skin=primary] i{position:relative;top:0;width:16px;height:16px;line-height:16px;border:1px solid #d2d2d2;font-size:12px;border-radius:2px;background-color:#fff;-webkit-transition:.1s linear;transition:.1s linear}.xm-form-checkbox[lay-skin=primary]:hover i{border-color:#5FB878;color:#fff}.xm-icon-yes{width:30px;height:30px;border-radius:4px;background-color:#009688;position:relative}.xm-icon-yes:after{content:\'\';display:inline-block;border:2px solid #fff;border-top-width:0;border-right-width:0;width:9px;height:5px;-webkit-transform:rotate(-50deg);transform: rotate(-50deg);position:absolute;top:2px;left:3px}.xm-dis-disabled,.xm-dis-disabled:hover{color:#d2d2d2!important;cursor:not-allowed!important}.xm-form-select dl dd.xm-dis-disabled{background-color:#fff!important}.xm-form-select dl dd.xm-dis-disabled span{color:#C2C2C2}.xm-form-select dl dd.xm-dis-disabled .xm-icon-yes{border-color:#C2C2C2}.xm-select-parent{position: relative;-moz-user-select:none;-ms-user-select:none;-webkit-user-select:none}.xm-select-parent .xm-select{line-height:normal;height:auto;padding:4px 10px 1px 10px;overflow:hidden;min-height:36px;left:0;z-index:99;position:absolute;background:0 0;padding-right:20px}.xm-select-parent .xm-select:hover{border-color:#C0C4CC}.xm-select-parent .xm-select .xm-select-label{display:inline-block;margin:0;vertical-align:middle}.xm-select-parent .xm-select-title div.xm-select-label>span{position: relative;padding:2px 5px;background-color:#009688;border-radius:2px;color:#FFF;display:inline-block;line-height:18px;height:18px;margin:2px 5px 2px 0;cursor:initial;user-select:none;font-size:14px;padding-right: 25px;}.xm-select-parent .xm-select-title div.xm-select-label>span i{position: absolute; right: 5px; top: 2px;margin-left:8px;border-radius:20px;font-size:18px;cursor:pointer;display: inline-block;\theight: 14px;line-height: 15px;width: 12px;vertical-align: top;margin-top: 2px;}.xm-select-parent .xm-select .xm-select-input{border:none;height:28px;background-color:transparent;padding:0;vertical-align:middle;display:inline-block;width:50px}.xm-select-parent .xm-select--suffix input{border:none}.xm-select-parent dl dd.xm-dis-disabled.xm-select-this i{border-color:#C2C2C2;background-color:#C2C2C2;color:#FFF}.xm-select-parent dl dd.xm-select-this i{background-color:#009688;border-color:#009688}.xm-form-selected .xm-select,.xm-form-selected .xm-select:hover{border-color:#009688!important}.layui-form-pane .xm-select,.layui-form-pane .xm-select:hover{border:none!important;top:2px}.layui-form-pane .xm-select-title{border-left:1px solid #e6e6e6!important}.xm-select--suffix+div{position:absolute;top:0;left:0;bottom:0;right:0}.xm-select-dis .xm-select--suffix+div{z-index:100;cursor:no-drop!important;opacity: .2;background-color: #FFF;}.xm-select-disabled,.xm-select-disabled:hover{color:#d2d2d2!important;cursor:not-allowed!important;background-color:#fff}.xm-select-none{display:none;margin: 5px 0; text-align: center;}.xm-select-none:hover{background-color:#FFF!important}.xm-select-empty{display:block}div[xm-select-skin] .xm-select-title div.xm-select-label>span i:hover{opacity:.8;filter:alpha(opacity=80);cursor:pointer}div[xm-select-skin=default] .xm-select-title div.xm-select-label>span{background-color:#F0F2F5;color:#909399;border:1px solid #F0F2F5}div[xm-select-skin=default] .xm-select-title div.xm-select-label>span i{background-color:#C0C4CC;color:#FFF}div[xm-select-skin=default] dl dd.xm-select-this:not(.xm-dis-disabled) i{background-color:#5FB878;border-color:#5FB878;color:#FFF}div[xm-select-skin=default].xm-form-selected .xm-select,div[xm-select-skin=default].xm-form-selected .xm-select:hover{border-color:#C0C4CC!important}div[xm-select-skin=primary] .xm-select-title div.xm-select-label>span{background-color:#009688;color:#FFF;border:1px solid #009688}div[xm-select-skin=primary] .xm-select-title div.xm-select-label>span i{background-color:#009688;color:#FFF}div[xm-select-skin=primary] dl dd.xm-select-this:not(.xm-dis-disabled) i{background-color:#009688;border-color:#009688;color:#FFF}div[xm-select-skin=primary].xm-form-selected .xm-select,div[xm-select-skin=primary].xm-form-selected .xm-select:hover{border-color:#1E9FFF!important}div[xm-select-skin=normal] .xm-select-title div.xm-select-label>span{background-color:#1E9FFF;color:#FFF;border:1px solid #1E9FFF}div[xm-select-skin=normal] .xm-select-title div.xm-select-label>span i{background-color:#1E9FFF;color:#FFF}div[xm-select-skin=normal] dl dd.xm-select-this:not(.xm-dis-disabled) i{background-color:#1E9FFF;border-color:#1E9FFF;color:#FFF}div[xm-select-skin=normal].xm-form-selected .xm-select,div[xm-select-skin=normal].xm-form-selected .xm-select:hover{border-color:#1E9FFF!important}div[xm-select-skin=warm] .xm-select-title div.xm-select-label>span{background-color:#FFB800;color:#FFF;border:1px solid #FFB800}div[xm-select-skin=warm] .xm-select-title div.xm-select-label>span i{background-color:#FFB800;color:#FFF}div[xm-select-skin=warm] dl dd.xm-select-this:not(.xm-dis-disabled) i{background-color:#FFB800;border-color:#FFB800;color:#FFF}div[xm-select-skin=warm].xm-form-selected .xm-select,div[xm-select-skin=warm].xm-form-selected .xm-select:hover{border-color:#FFB800!important}div[xm-select-skin=danger] .xm-select-title div.xm-select-label>span{background-color:#FF5722;color:#FFF;border:1px solid #FF5722}div[xm-select-skin=danger] .xm-select-title div.xm-select-label>span i{background-color:#FF5722;color:#FFF}div[xm-select-skin=danger] dl dd.xm-select-this:not(.xm-dis-disabled) i{background-color:#FF5722;border-color:#FF5722;color:#FFF}div[xm-select-skin=danger].xm-form-selected .xm-select,div[xm-select-skin=danger].xm-form-selected .xm-select:hover{border-color:#FFB800!important}.css3{box-shadow:0 0;width:calc(100% + 2em);font-size:24px}blockquote,body,button,code,dd,div,dl,dt,fieldset,form,h1,h2,h3,h4,h5,h6,input,legend,li,ol,p,pre,td,textarea,th,ul{margin:0;padding:0}fieldset,img{border:0}:focus{outline:0}address,cite,code,ctoolion,dfn,em,optgroup,strong,th,var{font-style:normal;font-weight:400}h1,h2,h3,h4,h5,h6{font-size:100%;font-weight:400}abbr,acronym{border:0;font-variant:normal}button,input,optgroup,option,select,textarea{font-family:inherit;font-size:inherit;font-style:inherit;font-weight:inherit}code,kbd,samp,tt{font-size:100%}body{line-height:1.5}ol,ul{list-style:none}table{border-collapse:collapse;border-spacing:0}ctoolion,th{text-align:left}sub,sup{font-size:100%;vertical-align:baseline}:link,:visited,ins{text-decoration:none}blockquote,q{quotes:none}blockquote:after,blockquote:before,q:after,q:before{content:\'\';content:none}' + '.xm-span-hide{display: none!important;}.xm-select-radio .xm-icon-yes{border-radius: 20px!important;}.xm-select-radio .xm-icon-yes:after{border-radius: 20px;background-color: #fff;width: 6px;height:6px;border: none;top: 5px;left: 5px;}' + '.xm-select-parent .layui-form-danger+.xm-select-title .xm-select{border-color: #FF5722 !important;}' + '.xm-select-linkage li{padding: 10px 0px; cursor: pointer;}.xm-select-linkage li span{padding-left: 20px; padding-right: 30px; display: inline-block; height: 20px; overflow: hidden; text-overflow: ellipsis;}.xm-select-linkage li.xm-select-this span{border-left: 5px solid #009688; color: #009688; padding-left: 15px;}.xm-select-linkage-group{position: absolute; left: 0; top: 0; right: 0; bottom: 0; overflow-x: hidden; overflow-y: auto;}.xm-select-linkage-group li:hover{border-left: 1px solid #009688;}.xm-select-linkage-group li:hover span{padding-left: 19px;}.xm-select-linkage-group li.xm-select-this:hover span{padding-left: 15px;border-left-width: 4px;}.xm-select-linkage-group1{background-color: #EFEFEF; left: 0;}.xm-select-linkage-group1 li.xm-select-active{background-color: #F5F5F5;}.xm-select-linkage-group2{background-color: #F5F5F5; left: 100px;}.xm-select-linkage-group2 li.xm-select-active{background-color: #FAFAFA;}.xm-select-linkage-group3{background-color: #FAFAFA; left: 200px;}.xm-select-linkage-group3 li.xm-select-active{background-color: #FFFFFF;}.xm-select-linkage-group4{background-color: #FFFFFF; left: 300px;}.xm-select-linkage-hide{display: none;}.xm-select-linkage-show{display: block;}div[xm-select-skin=\'default\'] .xm-select-linkage li.xm-select-this span{border-left-color: #5FB878; color: #5FB878;}div[xm-select-skin=\'default\'] .xm-select-linkage-group li:hover{border-left-color: #5FB878;}div[xm-select-skin=\'primary\'] .xm-select-linkage li.xm-select-this span{border-left-color: #1E9FFF; color: #1E9FFF;}div[xm-select-skin=\'primary\'] .xm-select-linkage-group li:hover{border-left-color: #1E9FFF;}div[xm-select-skin=\'normal\'] .xm-select-linkage li.xm-select-this span{border-left-color: #1E9FFF; color: #1E9FFF;}div[xm-select-skin=\'normal\'] .xm-select-linkage-group li:hover{border-left-color: #1E9FFF;}div[xm-select-skin=\'warm\'] .xm-select-linkage li.xm-select-this span{border-left-color: #FFB800; color: #FFB800;}div[xm-select-skin=\'warm\'] .xm-select-linkage-group li:hover{border-left-color: #FFB800;}div[xm-select-skin=\'danger\'] .xm-select-linkage li.xm-select-this span{border-left-color: #FF5722; color: #FF5722;}div[xm-select-skin=\'danger\'] .xm-select-linkage-group li:hover{border-left-color: #FF5722;}' + '</style>');
		$('head link:last')[0] && $('head link:last').after(cssStyle) || $('head').append(cssStyle);
	};

	var Select4 = function Select4() {
		this.v = v;
	};
	var common = new Common();

	Select4.prototype.value = function (id, type, isAppend) {
		if (typeof id != 'string') {
			return [];
		}
		var fs = data[id];
		if (!fs) {
			return [];
		}
		if (typeof type == 'string' || type == undefined) {
			var arr = fs.values.concat([]) || [];
			if (type == 'val') {
				return arr.map(function (val) {
					return val.val;
				});
			}
			if (type == 'valStr') {
				return arr.map(function (val) {
					return val.val;
				}).join(',');
			}
			if (type == 'name') {
				return arr.map(function (val) {
					return val.name;
				});
			}
			if (type == 'nameStr') {
				return arr.map(function (val) {
					return val.name;
				}).join(',');
			}
			return arr;
		}
		if (Array.isArray(type)) {
			var dl = $('[xid=' + id + ']'),
			    temp = {},
			    dd = void 0,
			    isAdd = true;
			if (isAppend == false) {
				//删除传入的数组
				isAdd = false;
			} else if (isAppend == true) {
				//追加模式
				isAdd = true;
			} else {
				//删除原有的数据
				common.removeAll(id);
			}
			if (isAdd) {
				fs.values.forEach(function (val, index) {
					temp[val.val] = 1;
				});
			}
			type.forEach(function (val, index) {
				if (val && (!temp[val] || fs.config.repeat)) {
					if ((dd = dl.find('dd[lay-value="' + val + '"]'))[0]) {
						common.handlerLabel(id, dd, isAdd, null, true);
						temp[val] = 1;
					} else {
						var name = common.valToName(id, val);
						if (name) {
							common.handlerLabel(id, dd, isAdd, {
								name: name,
								val: val
							}, true);
							temp[val] = 1;
						}
					}
				}
			});
		}
	};

	Common.prototype.bindEvent = function (name, id, fun) {
		if (id && id instanceof Function) {
			fun = id;
			id = null;
		}
		if (fun && fun instanceof Function) {
			if (!id) {
				$.each(data, function (id, val) {
					data[id] ? data[id].config[name] = fun : events[name][id] = fun;
				});
			} else {
				data[id] ? data[id].config[name] = fun : events[name][id] = fun;
			}
		}
	};

	Select4.prototype.on = function (id, fun) {
		common.bindEvent('on', id, fun);
	};

	Select4.prototype.filter = function (id, fun) {
		common.bindEvent('filter', id, fun);
	};

	Select4.prototype.maxTips = function (id, fun) {
		common.bindEvent('maxTips', id, fun);
	};

	Select4.prototype.config = function (id, config, isJson) {
		if (id && (typeof id === 'undefined' ? 'undefined' : _typeof(id)) == 'object') {
			isJson = config == true;
			config = id;
			id = null;
		}
		if (config && (typeof config === 'undefined' ? 'undefined' : _typeof(config)) == 'object') {
			if (isJson) {
				config.header || (config.header = {});
				config.header['Content-Type'] = 'application/json; charset=UTF-8';
				config.dataType = 'json';
			}
			id ? (ajaxs[id] = $.extend(true, {}, ajax, config), data[id] && (data[id].config.direction = config.direction)) : $.extend(true, ajax, config);
		}
	};

	Select4.prototype.render = function (id) {
		var _this10 = this;

		var target = {};
		id ? data[id] && (target[id] = data[id]) : data;

		if (Object.getOwnPropertyNames(target).length) {
			$.each(target, function (key, val) {
				//恢复初始值
				var dl = $('dl[xid=' + key + ']'),
				    vals = [];
				val.select.find('option[selected]').each(function (index, item) {
					vals.push(item.value);
				});
				//移除创建元素
				dl.find('.' + CREATE_LONG).remove();
				//清空INPUT
				dl.prev().find('.' + INPUT).val('');
				//移除hidn
				dl.find('.layui-hide').removeClass('layui-hide');
				//重新赋值
				_this10.value(key, vals);
			});
		}
		($('select[' + NAME + '="' + id + '"]')[0] ? $('select[' + NAME + '="' + id + '"]') : $('select[' + NAME + ']')).each(function (index, select) {
			var sid = select.getAttribute(NAME);
			common.init(select);
			common.one($('dl[xid=' + sid + ']').parents('.' + PNAME));
			common.initVal(sid);
		});
	};

	Select4.prototype.disabled = function (id) {
		var target = {};
		id ? data[id] && (target[id] = data[id]) : target = data;

		$.each(target, function (key, val) {
			$('dl[xid=' + key + ']').prev().addClass(DIS);
		});
	};

	Select4.prototype.undisabled = function (id) {
		var target = {};
		id ? data[id] && (target[id] = data[id]) : target = data;

		$.each(target, function (key, val) {
			$('dl[xid=' + key + ']').prev().removeClass(DIS);
		});
	};

	Select4.prototype.data = function (id, type, config) {
		if (!id || !type || !config) {
			return;
		}
		this.value(id, []);
		if (type == 'local') {
			common.renderData(id, config.arr, config.linkage == true, config.linkageWidth ? config.linkageWidth : '100');
			return;
		}
		if (type == 'server') {
			common.ajax(id, config.url, config.keyword, config.linkage == true, config.linkageWidth ? config.linkageWidth : '100');
			return;
		}
	};

	return new Select4();
});