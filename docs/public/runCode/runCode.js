/********
 *
 * jquery.runCode.js
 * 在线编辑预览js/html/css代码插件
 * @DH (http://denghao.me)
 * @2017-8-29
 *
 *********/
;
(function ($, window, document, undefined) {
	var runCode = function (ele, opt, closeFun) {
		this.$body = $("body");
		this.$ele = ele;
		this.$previewWrap = null;
		this.$btnPreview = null;
		this.$btnCloseView = null;
		this.$codeContent = null;
		this.$iframeDoc = null;
		this.defaults = {
			watch: false,
			width: '96%',
			height: '90%'
		};
		this.options = $.extend({}, this.defaults, opt);
		this.closeFun = closeFun;
	}
	runCode.prototype = {
		init: function (htmlCode) {
			var dialog = [
				'<div class="preview-wrap">',
					'<div class="inner">',
						'<div class="bar">',
							'<span>FormSelects在线编辑</span><span>Result</span>',
							'<button class="btn-preview">►</button>',
							// '<label class="label"><input class="watch-code" type="checkbox">自动运行</label>',
							'<i class="btn-close-view">X</i>',
						'</div>',
						'<div class="con">',
							// '<pre><code id="codeContent" contenteditable name="editcode" class="js"></code></pre>',
							'<span class="pre-span" id="codeContent" name="editcode"><pre class="brush: all"></pre></span>',
							'<iframe id="preview" frameborder="0"></iframe>',
						'</div>',
					'</div>',
				'</div>'
			].join('');
			this.$body.append(dialog), c = null;

			this.$previewWrap = $(".preview-wrap");
			this.$btnPreview = $(".btn-preview");
			this.$btnCloseView = $(".btn-close-view");
			this.$codeContent = $("#codeContent");
			this.$watchCode = $(".watch-code");
			this.$iframeDoc = $("#preview")[0].contentWindow.document;

			// style
			this.$previewWrap.find('.inner').css({
				width: this.options.width,
				height: this.options.height
			});

			// watch code
			if (!!this.options.watch) {
				this.$watchCode.attr('checked', true);
			}

			// get and run original code
			c = htmlCode || this.$ele.val() || this.$ele.html();
			this.$codeContent.find('pre').text(c);
			this.run(c);

			// highlight
			if (typeof DlHighlight !== 'undefined') {
				DlHighlight.HELPERS.highlightByName("editcode", "code");
			}
			
			if(typeof SyntaxHighlighter !== 'undefined'){
				SyntaxHighlighter.highlight();
				$('.syntaxhighlighter .toolbar').remove();
				$('#codeContent .container').attr('contenteditable', true);
			}

			// bind events
			this.events();
		},

		run: function (c) {
			var c = this.escape2Html(c);
			this.$iframeDoc.write(c);
			this.$iframeDoc.close();
		},

		events: function () {
			var self = this;
			this.$btnPreview.on('click', function (e) {
				var $container = self.$codeContent.find('.container');
				if(typeof SyntaxHighlighter !== 'undefined'){
					var text = $container.find('.line').map(function(index, item){
						return item.innerText;
					}).get().join('\n');
					self.$codeContent.html('<script type="syntaxhighlighter" class="brush: all"></script>');
					self.$codeContent.find('script').text('<![CDATA['+self.escape2Html(text, true)+']]>');
					SyntaxHighlighter.highlight();
					$('.syntaxhighlighter .toolbar').remove();
					$('#codeContent .container').attr('contenteditable', true);
				}
				var c = self.escape2Html($container.text());
				self.$iframeDoc.write(c);
				self.$iframeDoc.close();
			});

			this.$codeContent.on('keydown', function (e) {
				var isChecked = self.$watchCode.is(':checked');
				if (isChecked) {
					watchTimer && clearTimeout(watchTimer);
					var watchTimer = setTimeout(function () {
						self.run(self.$codeContent.text())
					}, 600)
				}
				var keyCode = e.keyCode, insertText;
				console.log(keyCode)
				if(keyCode){
					switch(keyCode){
						case 9:
							self.changeRange(e, 4, true);
							break;
					}
				}
				
			});

			this.$btnCloseView.on('click', function (e) {
				self.$previewWrap.remove();
				self.closeFun();
			});
		},
		changeRange: function(event, nums, isCreate){
			//取消默认事件的冒泡
			if (event && event.preventDefault) {
				event.preventDefault()
			} else {
				window.event.returnValue = false
			}
			
			var range = event.view.getSelection().getRangeAt(0);
			// 光标的偏移位置
			var offset = range.startOffset;
			
			if(isCreate){
				// 新建一个span元素
				var span = document.createElement('span');
				// 四个 表示四个空格
				var arr = [];
				while(arr.length < nums){
					arr.push(' ');
				}
				span.innerHTML = arr.join('');
				// 创建一个新的range对象
				var newrange = document.createRange();
				// 设置新的range的位置，也是插入元素的位置
				newrange.setStart(range.startContainer, offset);
				newrange.setEnd(range.startContainer, offset);
				newrange.collapse(true);
				newrange.insertNode(span);
				// 去掉旧的range对象，用新的range对象替换
				event.view.getSelection().removeAllRanges();
				event.view.getSelection().addRange(range);
				// 将光标的位置向后移动一个偏移量，放到加入的四个空格后面
				range.setStart(span, 1);
			}else{
				
			}
		},
		escape2Html: function (str, space) {
			var arrEntities = {
				'lt': '<',
				'gt': '>',
				'nbsp': ' ',
				'amp': '&',
				'quot': '"'
			};
			return str.replace(/&(lt|gt|nbsp|amp|quot);/ig, function (all, t) {
				return arrEntities[t];
			}).replace(/ /g, space ? ' ' : '');
		}

	}
	window.runCode = function (options, htmlCode, closeFun) {
		var r = new runCode(this, options, closeFun);
		return r.init(htmlCode);
	}
})(jQuery, window, document);
