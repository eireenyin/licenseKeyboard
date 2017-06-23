/**
 * Created by hugohua on 14-4-1.
 * zepto keyboard template
 */

/**
 * 将插件封装在一个闭包里面，防止外部代码污染  冲突
 */
(function ($) {
    /**
     * 定义一个插件 keyboard
     */
    var keyboard,
        keyboardPrivateMethod;  //插件的私有方法，也可以看做是插件的工具方法集

    /**
     * 这里是插件的主体部分
     * 这里是一个自运行的单例模式。
     * 这里之所以用一个 keyboard 的单例模式 包含一个 keyboard的类，主要是为了封装性，更好的划分代码块
     * 同时 也 方便区分私有方法及公共方法
     * PS：但有时私有方法为了方便还是写在了keyboard类里，这时建议私有方法前加上"_"
     */
    keyboard = (function () {

        function keyboard(element, options) {
            //将插件的默认参数及用户定义的参数合并到一个新的obj里
            this.settings = $.extend({}, $.fn.keyboard.defaults, options);
            //将dom jquery对象赋值给插件，方便后续调用
            this.$element = $(element);
            //初始化调用一下
            this.init();
        }


        keyboard.prototype = {

            init:function(){
              var $this = this;
              this.$element.on('click',function(){
                $(this).blur();
                var test_html = ['<div id="keyboard_dialog">',
'          <div class="plateNum_dialog">',
'              <div class="dialog_hd"><strong class="dialog_title">增加车牌</strong></div>',
'              <div class="dialog_bd">',
'                <div class="plateNum">',
'                    <span class="plateNum_item"></span>',
'                    <span class="plateNum_item"></span>',
'                    <span class="plateNum_item"></span>',
'                    <span class="plateNum_item"></span>',
'                    <span class="plateNum_item"></span>',
'                    <span class="plateNum_item"></span>',
'                    <span class="plateNum_item"></span>',
'                </div>',
'                <a href="javascript:" class="text_btn" id="removePlateNum">清空</a>',
'              </div>',
'              <div class="dialog_ft">',
'                  <a href="javascript:;" class="btn btn_default" id="close_keyboard">取消</a>',
'                  <a href="javascript:;" class="btn btn_primary" id="saveAndCloseKeyboard">确定</a>',
'              </div>',
'          </div>',
'          <div class="ake_mask"></div>',
'          <div class="keyboard_container">',
'              <ul class="keyboard">',
'                  <li class="keyboard_item">',
'                    <div class="key_container">',
'                      <a href="javascript:;">京</a>',
'                      <a href="javascript:;">沪</a>',
'                      <a href="javascript:;">粤</a>',
'                      <a href="javascript:;">津</a>',
'                      <a href="javascript:;">浙</a>',
'                      <a href="javascript:;">苏</a>',
'                      <a href="javascript:;">湘</a>',
'                      <a href="javascript:;">渝</a>',
'                      <a href="javascript:;">云</a>',
'                      <a href="javascript:;">豫</a>',
'                      <a href="javascript:;">皖</a>',
'                      <a href="javascript:;">桂</a>',
'                      <a href="javascript:;">新</a>',
'                      <a href="javascript:;">青</a>',
'                      <a href="javascript:;">琼</a>',
'                      <a href="javascript:;">闽</a>',
'                      <a href="javascript:;">蒙</a>',
'                      <a href="javascript:;">辽</a>',
'                      <a href="javascript:;">宁</a>',
'                      <a href="javascript:;">鲁</a>',
'                      <a href="javascript:;">陕</a>',
'                      <a href="javascript:;">晋</a>',
'                      <a href="javascript:;">吉</a>',
'                      <a href="javascript:;">冀</a>',
'                      <a href="javascript:;">黑</a>',
'                      <a href="javascript:;">甘</a>',
'                      <a href="javascript:;">鄂</a>',
'                      <a href="javascript:;">赣</a>',
'                      <a href="javascript:;">贵</a>',
'                      <a href="javascript:;">川</a>',
'                      <a href="javascript:;">藏</a>',
'                    </div>',
'                  </li>',
'                  <li class="keyboard_item">',
'                    <div class="key_container">',
'                      <a href="javascript:;">A</a>',
'                      <a href="javascript:;">B</a>',
'                      <a href="javascript:;">C</a>',
'                      <a href="javascript:;">D</a>',
'                      <a href="javascript:;">E</a>',
'                      <a href="javascript:;">F</a>',
'                      <a href="javascript:;">G</a>',
'                      <a href="javascript:;">H</a>',
'                      <a href="javascript:;">J</a>',
'                      <a href="javascript:;">K</a>',
'                      <a href="javascript:;">L</a>',
'                      <a href="javascript:;">M</a>',
'                      <a href="javascript:;">N</a>',
'                      <a href="javascript:;">O</a>',
'                      <a href="javascript:;">P</a>',
'                      <a href="javascript:;">Q</a>',
'                      <a href="javascript:;">R</a>',
'                      <a href="javascript:;">S</a>',
'                      <a href="javascript:;">T</a>',
'                      <a href="javascript:;">U</a>',
'                      <a href="javascript:;">V</a>',
'                      <a href="javascript:;">W</a>',
'                      <a href="javascript:;">X</a>',
'                      <a href="javascript:;">Y</a>',
'                      <a href="javascript:;">Z</a>',
'                    </div>',
'                  <li class="keyboard_item">',
'                    <div class="key_container">',
'                      <a href="javascript:;">1</a>',
'                      <a href="javascript:;">2</a>',
'                      <a href="javascript:;">3</a>',
'                      <a href="javascript:;">4</a>',
'                      <a href="javascript:;">5</a>',
'                      <a href="javascript:;">6</a>',
'                      <a href="javascript:;">7</a>',
'                      <a href="javascript:;">8</a>',
'                      <a href="javascript:;">9</a>',
'                      <a href="javascript:;">0</a>',
'                      <a href="javascript:;">A</a>',
'                      <a href="javascript:;">B</a>',
'                      <a href="javascript:;">C</a>',
'                      <a href="javascript:;">D</a>',
'                      <a href="javascript:;">E</a>',
'                      <a href="javascript:;">F</a>',
'                      <a href="javascript:;">G</a>',
'                      <a href="javascript:;">H</a>',
'                      <a href="javascript:;">I</a>',
'                      <a href="javascript:;">J</a>',
'                      <a href="javascript:;">K</a>',
'                      <a href="javascript:;">L</a>',
'                      <a href="javascript:;">M</a>',
'                      <a href="javascript:;">N</a>',
'                      <a href="javascript:;">O</a>',
'                      <a href="javascript:;">P</a>',
'                      <a href="javascript:;">Q</a>',
'                      <a href="javascript:;">R</a>',
'                      <a href="javascript:;">S</a>',
'                      <a href="javascript:;">T</a>',
'                      <a href="javascript:;">U</a>',
'                      <a href="javascript:;">V</a>',
'                      <a href="javascript:;">W</a>',
'                      <a href="javascript:;">X</a>',
'                      <a href="javascript:;">Y</a>',
'                      <a href="javascript:;">Z</a>',
'                      <a href="javascript:;" class="lastPlateNum">学</a>',
'                      <a href="javascript:;" class="lastPlateNum">警</a>',
'                      <a href="javascript:;" class="gh_item lastPlateNum">港</a>',
'                      <a href="javascript:;" class="gh_item lastPlateNum">澳</a>',
'                    </div>',
'                  </li>',
'              </ul>',
'          </div>',
'      </div>'].join("");
                if ( !$('#keyboard_dialog').length) {
                  $('body').append(test_html);
                  $('#keyboard_dialog').show();
                  $this.setMargin();
                  $this.fillPlate();
                  $this.closeKeyBoard();
                  $this.enterPlateNum();
                  $this.removePlateNum();
                  $this.changePlateNum();
                  $this.getPlate();
                  $this.addActive();
                }
                $('#keyboard_dialog').show();
              });
            },

            fillPlate:function(){
              var plateNum = this.$element.val();
              if (plateNum) {
                $('.plateNum_item').text('');
                var plateArr = plateNum.split('');
                $.each(plateArr,function(index,item){
                  $('.plateNum_item').eq(index).text(item);
                })
              }
            },

            setMargin:function(){
              var $key_container = $('.key_container');
              //计算键盘盒子的宽度
              var $key_container_width = $(window).width() - parseInt($('.keyboard').css('padding').replace(/px/,''))*2;
              //计算一项键盘按键的最小宽度
              var key_width = $key_container.find('a').width();
              var _key_width = key_width + (parseInt($key_container.find('a').css('margin').replace(/px/,'').trim())*2);
              //计算一行放几个键盘按键
              var row_keyNum = Math.floor($key_container_width/_key_width);
              //计算margin
              var margin = ($key_container_width/row_keyNum -  key_width)/2;
              //设置key margin
              $key_container.find('a').css({marginLeft:margin,marginRight:margin});
            },

            closeKeyBoard:function(){
              $(document).on('click','#close_keyboard',function(){
                $('.plateNum_item').removeClass('selected');
                $('#keyboard_dialog').hide();
              })
              $(document).on('click','#keyboard_dialog .ake_mask',function(){
                $('.plateNum_item').removeClass('selected');
                $('#keyboard_dialog').hide();
              })
            },

            enterPlateNum:function(){
              $(document).on('click','.keyboard_item a',function(){
                if (!$(this).text()) return;
                var $keyboardItemLength = keyboardPrivateMethod._getPlateNumLength();
                var $keyboardItemBoxIndex = $(this).closest('.keyboard_item').index();
                var key = $(this).text();
                var prefixPlate;
                //如果要更改已经填好的车牌
                if (keyboardPrivateMethod._isPlateNumItemSelected()) {
                  if ($keyboardItemBoxIndex === 2) {
                    if (key === 'O') {
                      key = 0;
                    }
                    if (key === 'I') {
                      key = 1;
                    }
                  }
                  $('.plateNum_item.selected').text(key).removeClass('selected');
                  switch ($keyboardItemLength) {
                    case 1 :
                      $('.keyboard_item').hide().eq(1).show();
                    break;
                    default :
                    var prefixPlate = keyboardPrivateMethod._getPrefixPlate();
                    $('.keyboard_item').hide().eq(2).show();
                    if ($keyboardItemLength === 6) {
                      $('.lastPlateNum').show();
                      if (prefixPlate !== '粤Z') {
                        $('.gh_item').hide();
                      }
                    }else {
                      $('.lastPlateNum').hide();
                    }
                    break;
                  }
                } else {
                  //填车牌，跳转键盘
                  switch ($keyboardItemBoxIndex) {
                    case 0 :
                    $('.plateNum_item').eq($keyboardItemLength).text(key);
                    $('.keyboard_item').hide().eq(1).show();
                    break;
                    case 1:
                    $('.plateNum_item').eq($keyboardItemLength).text(key);
                    $('.keyboard_item').hide().eq(2).show();
                    break;
                    case 2 :
                    var prefixPlate = keyboardPrivateMethod._getPrefixPlate();
                    if (key === 'O') {
                      key = 0;
                    }
                    if (key === 'I') {
                      key = 1;
                    }
                    if ($keyboardItemLength < 7){
                      $('.plateNum_item').eq($keyboardItemLength).text(key);
                      var _$keyboardItemLength = keyboardPrivateMethod._getPlateNumLength();
                      if (_$keyboardItemLength === 6) {
                        $('.lastPlateNum').show();
                        if (prefixPlate !== '粤Z') {
                          $('.gh_item').hide();
                        }
                      }
                    }
                    break;
                  }
                }
              })
            },

            removePlateNum:function(){
              $(document).on('click','#removePlateNum',function(){
                var $plateNumItem =  $('.plateNum_item');
                $('.lastPlateNum').hide();
                $plateNumItem.removeClass('selected');
                $('.keyboard_item').hide().eq(0).show();
                $plateNumItem.text('');
              })
            },

            changePlateNum:function(){
              $(document).on('click','.plateNum_item',function(){
                var $this = $(this);
                if($this.text()){
                  $('.plateNum_item').removeClass('selected');
                  $this.addClass('selected');
                  var plateItemIndex = $(this).index();
                  console.log(plateItemIndex)
                  switch (plateItemIndex) {
                    case 0 :
                    $('.keyboard_item').hide().eq(0).show();
                    break;
                    case 1 :
                    $('.keyboard_item').hide().eq(1).show();
                    break;
                    case 6 :
                    var prefixPlate = keyboardPrivateMethod._getPrefixPlate();
                    $('.keyboard_item').hide().eq(2).show();
                    $('.lastPlateNum').show();
                    if (prefixPlate !== '粤Z') {
                      $('.gh_item').hide();
                    }
                    break;
                    default :
                    $('.keyboard_item').hide().eq(2).show();
                    $('.gh_item').hide();
                    $('.lastPlateNum').hide();
                    break;
                  }
                }
              })
            },

            getPlate:function() {
              var $this = this;
              $(document).on('click','#saveAndCloseKeyboard',function(){
                var plateNum = '';
                $('.plateNum_item').each(function(index,item){
                  plateNum = plateNum + $(this).text();
                });
                $this.$element.val(plateNum);
                $('#keyboard_dialog').hide();
              })
            },

            addActive:function() {

              $(document).on('touchstart','.key_container a',function(){
                $(this).addClass('active');
              });
              $(document).on('touchend','.key_container a',function(){
                $(this).removeClass('active');
              });
              //由于在手势触控拖拽离开焦点后元素仍停留在active状态，需要做如下处理
              $(document).on("touchcancel", ".key_container a", function(event) {
                $(this).removeClass("active");
              });
              $(document).on("touchmove", ".key_container a", function(event) {
                $(this).removeClass("active");
              });
            }
        };

        return keyboard;

    })();

    /**
     * 插件的私有方法
     */
    keyboardPrivateMethod = (function () {

        function _getPlateNumLength() {
          var plateNumLength = 0;
          $('.plateNum_item').each(function(index,item){
            if ($(this).text()) {
              plateNumLength++;
            }
          });
          return plateNumLength;
        }

        function _isPlateNumItemSelected(){
          var isSelected;
          $('.plateNum_item').each(function(index,item){
            if($(this).hasClass('selected')){
              isSelected = true;
            }
          });
          return isSelected;
        }

        function _getPrefixPlate(){
          return $('.plateNum_item').eq(0).text() + $('.plateNum_item').eq(1).text();
        }

        return {
          _getPlateNumLength:_getPlateNumLength,
          _isPlateNumItemSelected:_isPlateNumItemSelected,
          _getPrefixPlate:_getPrefixPlate
        }
    })();

    /**
     * 这里是将keyboard对象 转为jq插件的形式进行调用
     * 定义一个插件 keyboard
     * zepto的data方法与jq的data方法不同
     * 这里的实现方式可参考文章：http://trentrichardson.com/2013/08/20/creating-zepto-keyboards-from-jquery-keyboards/
     */
    $.fn.keyboard = function(options){
        return this.each(function () {
            var $this = $(this),
                instance = $.fn.keyboard.lookup[$this.data('keyboard')];
            if (!instance) {
                //zepto的data方法只能保存字符串，所以用此方法解决一下
                $.fn.keyboard.lookup[++$.fn.keyboard.lookup.i] = new keyboard(this,options);
                $this.data('keyboard', $.fn.keyboard.lookup.i);
                instance = $.fn.keyboard.lookup[$this.data('keyboard')];
            }

            if (typeof options === 'string') instance[options]();
        })
    };

    $.fn.keyboard.lookup = {i: 0};

    /**
     * 插件的默认值
     */
    $.fn.keyboard.defaults = {
        property1: 'value',
        property2: 'value'
    };

     /**
     * 优雅处： 通过data-xxx 的方式 实例化插件。
     * 这样的话 在页面上就不需要显示调用了。
     * 可以查看bootstrap 里面的JS插件写法
     */
      // $(function () {
      //     return new keyboard($('[data-keyboard]'));
      // });
})(Zepto);
