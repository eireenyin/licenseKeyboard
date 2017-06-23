/*!
 * Zepto 插件模板  @author jnoodle
 * Keyboard plugin Created by eireenyin on 17-03-01 *
 */

/**
 * 让插件支持 AMD 标准的模块加载模式
 *
 * 如果不需要支持 AMD，也可以直接使用：
 * (function($){ ... })(Zepto);
 *
 * 将插件封装在闭包里面，防止外部污染
 */
/**
 * 
        自定义键盘
          -属性，若不是需要车牌为空时显示占位符，则给添加 属性 placeholder
        参数：
          length （Number): 车牌的长度，默认为7，只有 7 或 8 两个取值
        调用方式：(建议用第二种方式)
          1： $('#id').keyboard();
              可传参数： 如果要默认输入新能源车牌，则 $('#id').keyboard({length:8})
          2: 直接在给元素赋属性   data-role="keyboard"
             如果想要打开即是输入新能源车牌， 则  data-length="8" ,如果默认为7则可不传
         
        获取车牌颜色： （默认为蓝牌）会自动给元素加上一个 data-color="blue/yellow/black/white"的属性
         获取颜色-》 $('#id').data('color');
 */
;
(function (factory) {

    // 如果要兼容 CMD 等其他标准，可以在下面添加条件，比如：
    // CMD: typeof define === 'function' && define.cmd
    // UMD: typeof exports === 'object'
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['zepto'], factory);
    } else {
        factory(Zepto);
        // 如果要兼容 Zepto，可以改写，比如使用：factory(Zepto||jQuery)
    }
}(function ($) {
    'use strict';

    /**
     * 定义插件的构造方法
     * @param element 选择器对象
     * @param options 配置项
     * @constructor
     */
    var Keyboard = function (element, options) {

        //合并参数设置
        this.options = $.extend({}, Keyboard.defaults, options);

        //将选择器对象赋值给插件，方便后续调用
        this.$element = $(element);

        //进行一些初始化工作
        this.init();
    };
    var kbPrivateMethod;

    /**
     * 插件名称，即调用时的名称（$.fn.pluginName）
     * @type {string}
     */
    Keyboard.pluginName = "keyboard";

    /**
     * 插件缓存名称，插件通过 data 方法缓存在 dom 结构里，存储数据的名称
     * @type {string}
     */
    Keyboard.dataName = "keyboard";

    /**
     * 插件版本
     * @type {string}
     */
    Keyboard.version = "2.0.0";

    /**
     * 插件默认配置项
     * @type {{}}
     */
    Keyboard.defaults = {
      length: 7,
      text: {
        normal: '普通车牌录入',
        energy: '新能源车牌录入'
      },
      title: '添加车牌',
      buttonText: '添加',
      isAddColor: false,
      isAutoFill: true,
      beforeOpenFn: null,
      confirmCallback: null,
      hiddenCallback: null
    };

    /**
     * 定义插件的方法
     * @type {{}}
     */
    Keyboard.prototype = {
      init: function () {
        var _this = this;
        if($('#keyboard_wrapper').length === 0 ) {
            kbPrivateMethod._initKbHtml();
        }
        
        this.$element.off('click').on('click',function(){
          var isOpen = true;
          $(this).blur();
          if(_this.options.beforeOpenFn) {
            isOpen = _this.options.beforeOpenFn();
          }
          if(isOpen) {
            _this.initShowEvt();
          }
        })
      },

      initShowEvt: function(curVal, _len) {
        var options = this.options;
        var license = options.license;
        curVal = kbPrivateMethod._getVal(this.$element, license);
        _len = options.length;
        var headerTxt = options.title;
        var buttonTxt = options.buttonText;
        $('#header_title').text(headerTxt);
        $('#kb_confirm').text(buttonTxt);
        this.changePlate(_len);
        this.fillPlate(curVal,_len);
        this.setConfirmBtn();
        this.showKeyboard();
        this.setMargin();
        this.bindClickPanelEvts();
      },

      showKeyboard: function() {
        var $Keyboard = $('#keyboard_wrapper');
        if(!$Keyboard.hasClass('toggle')) {
            $Keyboard.addClass('toggle');
        }
      },

      hideKeyboard: function() {
        var $Keyboard = $('#keyboard_wrapper'),
            plateColor = $('input[name="plate-color"]:checked').val();
        if($Keyboard.hasClass('toggle')) {
            $Keyboard.removeClass('toggle');
        }
        if ($('#plate_type_title').data('turn-type') === 7) {
           this.$element.data('color','');
        } else {
          this.$element.data('color',plateColor);
        }
        $Keyboard.find('.kb-item').removeAttr('style');
        if(this.options.hiddenCallback) {
            this.options.hiddenCallback(this.getLicense());
        }
      },

      //获取当前已经选择的车牌， 
      getLicense: function(isLen) {
        var $PlateItem = $('#plate_box').find('.plate-item:not(.ake-hide)'),
            Val = '',
            color = $('input[name="plate-color"]:checked').val();
        $PlateItem.each(function() {
          var _val = $(this).text();
          if(!_val) {return false;}
          Val += _val;
        })
        return isLen ? Val.length : (this.options.isAddColor ? Val + color : Val);
      },

      changePlate: function (total_len) {
        var $PlateBox = $('#keyboard_wrapper #plate_box'),
            // $HeaderTitle = $('#header_title'),
            $PlateTypeTitle = $('#plate_type_title'),
            normal_text = this.options.text.normal,
            energy_text = this.options.text.energy;
        if(total_len == 7) {
            $PlateBox.removeClass('has-eight-item');
            $PlateBox.find('.eighth-item').text('').addClass('ake-hide');
            // $HeaderTitle.text(normal_text);
            $PlateTypeTitle.text(energy_text+'>>').data('turn-type',8);
            $('.blue-plate-box').show();
        } else if(total_len == 8) {
            $PlateBox.addClass('has-eight-item');
            $PlateBox.find('.eighth-item').text('').removeClass('ake-hide');
            // $HeaderTitle.text(energy_text);
            $PlateTypeTitle.text(normal_text+'>>').data('turn-type',7);
            $('.blue-plate-box').hide();
        }
      },

      //填充已輸入的車牌
      fillPlate: function (_license,total_len) {
        var $PlateItem = $('#keyboard_wrapper #plate_box').find('.plate-item'),_idx = 0;
        $PlateItem.text('');
        if(_license) {
            var licenseArr = _license.split('');
            $.each(licenseArr, function(index, item) {
              $PlateItem.eq(index).text(item);
              _idx = index;
            })
            _idx = _idx + 1 < total_len ? _idx + 1 : total_len - 1;
        }
        $PlateItem.eq(_idx).addClass('active').siblings().removeClass('active');
        this.togglePanel(_idx);
      },

      setMargin: function() {
        var $KeyboardBox = $('#keyboard_box'),
            $SingleKb = $KeyboardBox.find('.operate-list').find('.kb-item').eq(0),
            box_width = $(window).width() - Number($KeyboardBox.css('padding-left').replace(/px/,'')) * 2, //键盘盒子宽度
            single_width = $SingleKb.width(), //单个按键宽度
            _single_width = single_width + Number($SingleKb.css('margin-left').replace(/px/,'')) * 2, //单个按键宽度
            row_num = 0,margin = 0;
        
        row_num = Math.floor(box_width / _single_width); //计算一行放几个按键
        margin = (box_width / row_num - single_width) / 2; // 计算每一个按键的左右margin

        $KeyboardBox.find('.kb-item').css({'margin-left':margin,'margin-right': margin});
      },
      //切换
      togglePanel: function (index) {
        var $KeyboardItem = $('#keyboard_box').find('li:not(.operate-list)');
        var _len = this.options.length;
        var _license = this.getLicense();
        function IsHkMacao() {
            if(_license.indexOf('粤Z') > -1) {
                $KeyboardItem.eq(1).find('.last-item').hide();
                $KeyboardItem.eq(1).find('.hk-macao-item').show();
            } else {
                $KeyboardItem.eq(1).find('.last-item').show();
                $KeyboardItem.eq(1).find('.hk-macao-item').hide();
            }
        }
        $KeyboardItem.eq(2).find('.not-pos-two').removeClass('ake-hide');
        switch (index) {
          case 0: 
            $KeyboardItem.addClass('ake-hide');
            $KeyboardItem.eq(0).removeClass('ake-hide');
            break;
          case 1:
            $KeyboardItem.addClass('ake-hide');
            $KeyboardItem.eq(2).removeClass('ake-hide');
            $KeyboardItem.eq(1).find('.last-item,.not-pos-two').addClass('ake-hide');
            break;
          case 2:case 3:case 4: case 5:
            $KeyboardItem.addClass('ake-hide');
            $KeyboardItem.eq(1).removeClass('ake-hide');
            $KeyboardItem.eq(2).removeClass('ake-hide');
            $KeyboardItem.eq(1).find('.last-item').addClass('ake-hide');
            break;
          case 6:
            $KeyboardItem.addClass('ake-hide');
            $KeyboardItem.eq(1).removeClass('ake-hide');
            $KeyboardItem.eq(2).removeClass('ake-hide');
            if(_len == 7) {
              $KeyboardItem.eq(1).find('.last-item').removeClass('ake-hide');
              IsHkMacao();
            } else {
              $KeyboardItem.eq(1).find('.last-item').addClass('ake-hide');
            }
            
            break;
          case 7:
            if(_len == 7) {break;}
            $KeyboardItem.addClass('ake-hide');
            $KeyboardItem.eq(1).removeClass('ake-hide');
            $KeyboardItem.eq(2).removeClass('ake-hide');
            $KeyboardItem.eq(1).find('.last-item').removeClass('ake-hide');
            IsHkMacao();
            break;
          default: 
            $KeyboardItem.addClass('ake-hide');
            $KeyboardItem.eq(0).removeClass('ake-hide');
            break;
        }
      },

      deleteOneEvts: function(isDelAll) {
        var $PlateItem = $('#plate_box').find('.plate-item'),
            _licenseLen = this.getLicense(1),
            _index = _licenseLen;
        if(isDelAll) {
            $PlateItem.each(function(){
                $(this).text('');
            })
            $PlateItem.eq(0).addClass('active').siblings().removeClass('active');
            _index = 0;
        } else {
            if(_licenseLen > 0) {
              $PlateItem.eq(_licenseLen - 1).text('').addClass('active').siblings().removeClass('active');
              _index --;
            } else {
              $PlateItem.eq(0).addClass('active').siblings().removeClass('active');
              _index = 0;
            }
        }
        this.togglePanel(_index);
      },

      setConfirmBtn: function() {
        var _length = this.options.length,
            _licenseLen = this.getLicense(1);
        if(_licenseLen == _length) {
            $('#kb_confirm').removeClass('hide');
        } else {
            $('#kb_confirm').addClass('hide');
        }
      },

      bindClickPanelEvts: function() {
        var _this = this;
        //点击关闭
        $('#keyboard_wrapper #close_keyboard').off().on('click',function(e) {
          _this.hideKeyboard();
        })
        
        //点击选择某一个车牌
        $('#plate_box .plate-item').off().on('click',function(e) {
          e.stopPropagation();
          var $This = $(this),
              _txt = $This.text(),
              _index = $This.index(),
              _active = $('#plate_box').find('.active');
          if (_txt) {
            if(_index != _active) {
              $This.addClass('active').siblings().removeClass('active');
              _this.togglePanel(_index);
            }
          } else {
            var _licenseLen = _this.getLicense(1);
            $('#plate_box .plate-item').eq(_licenseLen).addClass('active').siblings().removeClass('active');
            _this.togglePanel(_licenseLen);
          }
        })

        // 点击每一个车牌键盘值
        $('#keyboard_box .kb-item').off().on('click',function(e) {
            e.stopPropagation();
            if($(this).hasClass('placehold-item')){return;}
            $('#keyboard_box .kb-item').removeClass('active');
            var $This = $(this),
                $PlateItem = $('#plate_box').find('.plate-item'),
                _licenseLen = _this.getLicense(1),
                _length = _this.options.length;
            if($This.hasClass('clear-all')) {
                _this.deleteOneEvts(1);
                _this.setConfirmBtn();
            } else if($This.hasClass('delete-one')) {
                _this.deleteOneEvts();
                _this.setConfirmBtn();
            } else {
              $This.addClass('active');
              var _txt = $This.text(),
                  _active = $('#plate_box').find('.active').index(),
                  _index = _active;
              if($This.hasClass('change-to-num') && _active > 1) {
                _txt = _txt === 'O' ? '0' : '1';
              }
              
              $PlateItem.eq(_active).text(_txt);
              if(_active + 1 < _length) {
                $PlateItem.eq(_active + 1).addClass('active').siblings().removeClass('active');
                _active ++;
              }
              if(_active != _index) {
                _this.togglePanel(_active);
              }

              _this.setConfirmBtn();
              
              setTimeout(function(){
                $This.removeClass('active');
              },100);
            }
        })

        //点击切换新能源车牌和普通车牌录入
        $('#plate_type_title').off().on('click',function(e){
            e.stopPropagation();
            var _type = Number($(this).data('turn-type')),
                _licenseLen = -1,
                _active = 0;
            _this.options.length = _type;
            _this.changePlate(_type);
            _this.fillPlate('');

            // _licenseLen = _this.getLicense(1);
            // _active = _licenseLen < _type ? _licenseLen : _type - 1;
            _this.togglePanel(_active);
            _this.setConfirmBtn();
            $('#plate_box .plate-item').eq(_active).addClass('active').siblings().removeClass('active');
        })

        //点击确定
        $('#kb_confirm').off().on('click',function(e) {
            e.stopPropagation();
            if(_this.options.isAutoFill) {
                kbPrivateMethod._setVal(_this.$element, _this.getLicense());
            }
            if(_this.options.confirmCallback) {
                _this.options.confirmCallback(_this.getLicense());
            }
            _this.hideKeyboard();
        })
      }
    };

    //私有方法
    kbPrivateMethod = (function () {
      //獲取自定義鍵盤的html模板和css文件
      function _getTemplate () {
        var cssFile = '<link rel="stylesheet" href="dist/css/keyboard.min.css">';
        var _template = '<div id="keyboard_wrapper" class="keyboard-wrapper">'+
            '        <div class="keyboard-header">'+
            '          <h3 id="header_title" class="header-title">添加车牌</h3>'+
            '          <a id="close_keyboard" class="close">&times;</a>'+
            '          <a id="kb_confirm" class="add-btn">添加</a>'+
            '        </div>'+
            '        <div class="plate-wrapper">'+
            '          <div id="plate_box" class="plate-box">'+
            '            <span class="plate-item"></span>'+
            '            <span class="plate-item"></span>'+
            '            <span class="plate-item"></span>'+
            '            <span class="plate-item"></span>'+
            '            <span class="plate-item"></span>'+
            '            <span class="plate-item"></span>'+
            '            <span class="plate-item"></span>'+
            '            <span class="plate-item eighth-item">测</span>'+
            '          </div>'+
            '          <div class="plate-setting">'+
            '            <div class="blue-plate-box clearfix">'+
            '<div class="iradio-box">'+
            '                <input type="radio" name="plate-color" id="blue" class="iradio blue" value="蓝" checked><i class="icon"></i>'+
            '                <label class="iradio-text" for="blue">蓝牌</label>'+
            '              </div>'+
            '              <div class="iradio-box">'+
            '                <input type="radio" name="plate-color" id="yellow" class="iradio yellow" value="黄"><i class="icon"></i>'+
            '                <label class="iradio-text" for="yellow">黄牌</label>'+
            '              </div>'+
            '              <div class="iradio-box">'+
            '                <input type="radio" name="plate-color" id="white" class="iradio white" value="白"><i class="icon"></i>'+
            '                <label class="iradio-text" for="white">白牌</label>'+
            '              </div>'+
            '              <div class="iradio-box">'+
            '                <input type="radio" name="plate-color" id="black" class="iradio black" value="黑"><i class="icon"></i>'+
            '                <label class="iradio-text" for="black">黑牌</label>'+
            '              </div>' +
            '            </div>'+
            '            <div class="plate-type-box">'+
            '              <span id="plate_type_title" class="plate-type">新能源车牌录入&gt;&gt;</span>'+
            '            </div>'+
            '          </div>'+
            // '          <a id="kb_confirm" class="ake-btn confirm-btn hide"><span class="lt20">确</span>定</a>'+
            '        </div>'+
            '        <div class="keyboard-container">'+
            '          <ul id="keyboard_box" class="keyboard-box">'+
            '            <li class="keyboard-list">'+
            '              <a href="javascript:void(0)" class="kb-item">京</a>'+
            '              <a href="javascript:void(0)" class="kb-item">沪</a>'+
            '              <a href="javascript:void(0)" class="kb-item">粤</a>'+
            '              <a href="javascript:void(0)" class="kb-item">津</a>'+
            '              <a href="javascript:void(0)" class="kb-item">浙</a>'+
            '              <a href="javascript:void(0)" class="kb-item">苏</a>'+
            '              <a href="javascript:void(0)" class="kb-item">湘</a>'+
            '              <a href="javascript:void(0)" class="kb-item">渝</a>'+
            '              <a href="javascript:void(0)" class="kb-item">云</a>'+
            '              <a href="javascript:void(0)" class="kb-item">豫</a>'+
            '              <a href="javascript:void(0)" class="kb-item">皖</a>'+
            '              <a href="javascript:void(0)" class="kb-item">陕</a>'+
            '              <a href="javascript:void(0)" class="kb-item">桂</a>'+
            '              <a href="javascript:void(0)" class="kb-item">新</a>'+
            '              <a href="javascript:void(0)" class="kb-item">青</a>'+
            '              <a href="javascript:void(0)" class="kb-item">琼</a>'+
            '              <a href="javascript:void(0)" class="kb-item">闽</a>'+
            '              <a href="javascript:void(0)" class="kb-item">蒙</a>'+
            '              <a href="javascript:void(0)" class="kb-item">辽</a>'+
            '              <a href="javascript:void(0)" class="kb-item">宁</a>'+
            '              <a href="javascript:void(0)" class="kb-item">鲁</a>'+
            '              <a href="javascript:void(0)" class="kb-item">晋</a>'+
            '              <a href="javascript:void(0)" class="kb-item">吉</a>'+
            '              <a href="javascript:void(0)" class="kb-item">冀</a>'+
            '              <a href="javascript:void(0)" class="kb-item">黑</a>'+
            '              <a href="javascript:void(0)" class="kb-item">台</a>'+
            '              <a href="javascript:void(0)" class="kb-item">甘</a>'+
            '              <a href="javascript:void(0)" class="kb-item">鄂</a>'+
            '              <a href="javascript:void(0)" class="kb-item">赣</a>'+
            '              <a href="javascript:void(0)" class="kb-item">贵</a>'+
            '              <a href="javascript:void(0)" class="kb-item">川</a>'+
            '              <a href="javascript:void(0)" class="kb-item">藏</a>'+
            '              <a href="javascript:void(0)" class="kb-item placehold-item"></a>'+
            '              <a href="javascript:void(0)" class="kb-item placehold-item"></a>'+
            '            </li>'+
            '            <li class="keyboard-list ake-hide">'+
            '              <a href="javascript:void(0)" class="kb-item">1</a>'+
            '              <a href="javascript:void(0)" class="kb-item">2</a>'+
            '              <a href="javascript:void(0)" class="kb-item">3</a>'+
            '              <a href="javascript:void(0)" class="kb-item">4</a>'+
            '              <a href="javascript:void(0)" class="kb-item">5</a>'+
            '              <a href="javascript:void(0)" class="kb-item">6</a>'+
            '              <a href="javascript:void(0)" class="kb-item">7</a>'+
            '              <a href="javascript:void(0)" class="kb-item">8</a>'+
            '              <a href="javascript:void(0)" class="kb-item">9</a>'+
            '              <a href="javascript:void(0)" class="kb-item">0</a>'+
            '              <a href="javascript:void(0)" class="kb-item last-item ake-hide">学</a>'+
            '              <a href="javascript:void(0)" class="kb-item last-item ake-hide">警</a>'+
            '              <a href="javascript:void(0)" class="kb-item last-item hk-macao-item ake-hide">港</a>'+
            '              <a href="javascript:void(0)" class="kb-item last-item hk-macao-item ake-hide">澳</a>'+
            '            </li>'+
            '            <li class="keyboard-list ake-hide">'+
            '              <a href="javascript:void(0)" class="kb-item">A</a>'+
            '              <a href="javascript:void(0)" class="kb-item">B</a>'+
            '              <a href="javascript:void(0)" class="kb-item">C</a>'+
            '              <a href="javascript:void(0)" class="kb-item">D</a>'+
            '              <a href="javascript:void(0)" class="kb-item">E</a>'+
            '              <a href="javascript:void(0)" class="kb-item">F</a>'+
            '              <a href="javascript:void(0)" class="kb-item">G</a>'+
            '              <a href="javascript:void(0)" class="kb-item">H</a>'+
            '              <a href="javascript:void(0)" class="kb-item not-pos-two change-to-num">I</a>'+
            '              <a href="javascript:void(0)" class="kb-item">J</a>'+
            '              <a href="javascript:void(0)" class="kb-item">K</a>'+
            '              <a href="javascript:void(0)" class="kb-item">L</a>'+
            '              <a href="javascript:void(0)" class="kb-item">M</a>'+
            '              <a href="javascript:void(0)" class="kb-item">N</a>'+
            '              <a href="javascript:void(0)" class="kb-item change-to-num">O</a>'+
            '              <a href="javascript:void(0)" class="kb-item">P</a>'+
            '              <a href="javascript:void(0)" class="kb-item">Q</a>'+
            '              <a href="javascript:void(0)" class="kb-item">R</a>'+
            '              <a href="javascript:void(0)" class="kb-item">S</a>'+
            '              <a href="javascript:void(0)" class="kb-item">T</a>'+
            '              <a href="javascript:void(0)" class="kb-item">U</a>'+
            '              <a href="javascript:void(0)" class="kb-item">V</a>'+
            '              <a href="javascript:void(0)" class="kb-item">W</a>'+
            '              <a href="javascript:void(0)" class="kb-item">X</a>'+
            '              <a href="javascript:void(0)" class="kb-item">Y</a>'+
            '              <a href="javascript:void(0)" class="kb-item">Z</a>'+
            '              <a href="javascript:void(0)" class="kb-item placehold-item"></a>'+
            '              <a href="javascript:void(0)" class="kb-item placehold-item"></a>'+
            '            </li>'+
            '            <li class="keyboard-list operate-list">'+
            '              <a href="javascript:void(0)" class="kb-item clear-all">重输</a>'+
            '              <a href="javascript:void(0)" class="kb-item delete-one"><span class="delete-icon">&times;</span></a>'+
            '            </li>'+
            '          </ul>'+
            '        </div>'+
            '      </div>';
        return {
            css: cssFile,
            html: _template
        }
      }
      //初始
      function _initKbHtml () {
        var _template = _getTemplate();
        $('html').find('head').eq(0).append(_template.css);
        $('body').append(_template.html);
      }

      //判断绑定插件的元素时输入型的还是显示型的
      function _judgeEleType ($ele) {
        var _nodeName = $ele.get(0).nodeName,
            isInput = false;
        if(_nodeName == 'INPUT' || _nodeName == 'TEXTAREA') {
          isInput = true;
        }
        return isInput;
      }

      //根据绑定插件元素的不同类型，取值和设置值的方式相应变化
      function _getVal($ele, value) {
        var Val = '';
        var placeholder = '';
        if(value == undefined) {
          var isInput = _judgeEleType($ele);
          Val = isInput ? $ele.val() : $ele.text();
          placeholder = $ele.attr('placeholder');
        } else {
          Val = value;
        }
        return Val == placeholder ? '' : Val; //当元素类型为显示型的，则当其text的值与placeholder的值相等时，认为其值为空
      }

      function _setVal($ele, Val) {
        var isInput = _judgeEleType($ele);
        if(isInput) {
          $ele.val(Val);
        } else {
          //如果值为空的时候，显示
          $ele.text(Val ? Val : $ele.attr('placeholder'));
        }
      }

      return {
        _getTemplate: _getTemplate,
        _initKbHtml: _initKbHtml,
        _judgeEleType: _judgeEleType,
        _getVal: _getVal,
        _setVal: _setVal
      }
    })();

    /**
     * 缓存同名插件
     */
    var old = $.fn[Keyboard.pluginName];

    /**
     * 定义插件，扩展$.fn，为Zepto对象提供新的插件方法
     * 调用方式：$.fn.pluginName()
     * @param option {string/object}
     */
    $.fn[Keyboard.pluginName] = function (option) {
        return this.each(function () {
            var $this = $(this);

            var data = $.fn[Keyboard.pluginName].kbData[$this.data(Keyboard.dataName)];
            var options = typeof option == 'object' && option;

            //只实例化一次，后续如果再次调用了该插件时，则直接获取缓存的对象
            if (!data) {
                //zepto的data方法只能保存字符串，所以用此方法解决一下
                $.fn[Keyboard.pluginName].kbData[++$.fn[Keyboard.pluginName].kbData.index] = new Keyboard(this, options);
                $this.data(Keyboard.dataName, $.fn[Keyboard.pluginName].kbData.index);
                data = $.fn[Keyboard.pluginName].kbData[$this.data(Keyboard.dataName)];
            }

            //如果插件的参数是一个字符串，则直接调用插件的名称为此字符串方法
            if (typeof option == 'string') data[option]();
        });
    };

    /**
     * zepto的data方法只能保存字符串，所以用一个对象来存储data
     * @type {{index: number}}
     */
    $.fn[Keyboard.pluginName].kbData = {index: 0};

    $.fn[Keyboard.pluginName].Constructor = Keyboard;

    /**
     * 为插件增加 noConflict 方法，在插件重名时可以释放控制权
     * @returns {*}
     */
    $.fn[Keyboard.pluginName].noConflict = function () {
        $.fn[Keyboard.pluginName] = old;
        return this
    };

    /**
     * 可选：
     * 通过在 dom 上定义 data-role='pluginName' 的方式，自动实例化插件，省去页面编写代码
     * 在这里还可以扩展更多配置，仅仅通过 data 属性 API 就能使用插件
     */
    $(document).ready(function () {
        $('[data-role="' + Keyboard.pluginName + '"]').each(function () {
            var $this = $(this);
            var opts = {};
            var data = $.fn[Keyboard.pluginName].kbData[$this.data(Keyboard.dataName)];

            opts['length'] = $this.data('length');
            opts['hiddenCallback'] = $this.data('hiddenCallback');

            $(this).data('color','blue');//默认为蓝牌

            $.fn[Keyboard.pluginName].call($this, opts);
        });
    });
}));

