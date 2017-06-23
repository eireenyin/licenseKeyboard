(function($) {
    var defaults = {
        btnFlag: true, //自定义键盘 是否需要校验车牌，控制按钮的样式
        btnId: 'grantBtn' //如果btnFlag=true,则必须制定按钮的ID
    };

    var methods = {
        init: function(options) {
            var keyboardStr = '<header class="search-box hide">' + '<div class="search-input">' + '<div class="search-fixer">' + '<span class="search-province-item searchVal-item"></span>' + '<span class="search-fixer-item searchVal-item"></span>' + '</div>' + '<div class="search-con">' + '<div class="car-val">' + '<span class="search-con-item searchVal-item"></span>' + '<span class="search-con-item searchVal-item"></span>' + '<span class="search-con-item searchVal-item"></span>' + '<span class="search-con-item searchVal-item"></span>' + '<span class="search-con-item searchVal-item"></span>' + '</div>' + '<div class="car-val-delete"></div>' + '</div>' + '</div>' + '</header>' + '<div class="keyboard-modal hide">' + '<input type="hidden" id="hiddenInput" />' + '<div class="province">' + '<ul>' + '<li class="list justify">' + '<a href="javascript:void(0)" class="list-item">粤</a>' + '<a href="javascript:void(0)" class="list-item">京</a>' + '<a href="javascript:void(0)" class="list-item">津</a>' + '<a href="javascript:void(0)" class="list-item">沪</a>' + '<a href="javascript:void(0)" class="list-item">浙</a>' + '<a href="javascript:void(0)" class="list-item">苏</a>' + '</li>' + '<li class="list justify">' + '<a href="javascript:void(0)" class="list-item">湘</a>' + '<a href="javascript:void(0)" class="list-item">贵</a>' + '<a href="javascript:void(0)" class="list-item">川</a>' + '<a href="javascript:void(0)" class="list-item">渝</a>' + '<a href="javascript:void(0)" class="list-item">云</a>' + '<a href="javascript:void(0)" class="list-item">豫</a>' + '</li>' + '<li class="list justify">' + '<a href="javascript:void(0)" class="list-item">皖</a>' + '<a href="javascript:void(0)" class="list-item">陕</a>' + '<a href="javascript:void(0)" class="list-item">桂</a>' + '<a href="javascript:void(0)" class="list-item">新</a>' + '<a href="javascript:void(0)" class="list-item">青</a>' + '<a href="javascript:void(0)" class="list-item">琼</a>' + '</li>' + '<li class="list justify">' + '<a href="javascript:void(0)" class="list-item">闽</a>' + '<a href="javascript:void(0)" class="list-item">蒙</a>' + '<a href="javascript:void(0)" class="list-item">辽</a>' + '<a href="javascript:void(0)" class="list-item">宁</a>' + '<a href="javascript:void(0)" class="list-item">鲁</a>' + '<a href="javascript:void(0)" class="list-item">晋</a>' + '</li>' + '<li class="list justify">' + '<a href="javascript:void(0)" class="list-item">吉</a>' + '<a href="javascript:void(0)" class="list-item">冀</a>' + '<a href="javascript:void(0)" class="list-item">黑</a>' + '<a href="javascript:void(0)" class="list-item">台</a>' + '<a href="javascript:void(0)" class="list-item">甘</a>' + '<a href="javascript:void(0)" class="list-item">鄂</a>' + '</li>' + '<li class="list justify">' + '<a href="javascript:void(0)" class="list-item">赣</a>' + '<a href="javascript:void(0)" class="list-item">藏</a>' + '<a href="javascript:void(0)" class="list-item list-item-hidden"></a>' + '<a href="javascript:void(0)" class="list-item list-item-hidden"></a>' + '<a href="javascript:void(0)" class="list-item list-item-hidden"></a>' + '<a href="javascript:void(0)" class="list-item list-item-hidden"></a>' + '</li>' + '</ul>' + '</div>' + '<div class="keyboard hide">' + '<ul>' + '<li class="list justify hidden number-list">' + '<a href="javascript:void(0)" class="list-item">1</a>' + '<a href="javascript:void(0)" class="list-item">2</a>' + '<a href="javascript:void(0)" class="list-item">3</a>' + '<a href="javascript:void(0)" class="list-item">4</a>' + '<a href="javascript:void(0)" class="list-item">5</a>' + '<a href="javascript:void(0)" class="list-item">6</a>' + '</li>' + '<li class="list justify hidden number-list">' + '<a href="javascript:void(0)" class="list-item">7</a>' + '<a href="javascript:void(0)" class="list-item">8</a>' + '<a href="javascript:void(0)" class="list-item">9</a>' + '<a href="javascript:void(0)" class="list-item">0</a>' + '<a href="javascript:void(0)" class="list-item list-item-hidden"></a>' + '<a href="javascript:void(0)" class="list-item list-item-hidden"></a>' + '</li>' + '<li class="list justify">' + '<a href="javascript:void(0)" class="list-item">A</a>' + '<a href="javascript:void(0)" class="list-item">B</a>' + '<a href="javascript:void(0)" class="list-item">C</a>' + '<a href="javascript:void(0)" class="list-item">D</a>' + '<a href="javascript:void(0)" class="list-item">E</a>' + '<a href="javascript:void(0)" class="list-item">F</a>' + '</li>' + '<li class="list justify">' + '<a href="javascript:void(0)" class="list-item">G</a>' + '<a href="javascript:void(0)" class="list-item">H</a>' + '<a href="javascript:void(0)" class="list-item not-pos-two change-to-num">I</a>' + '<a href="javascript:void(0)" class="list-item">J</a>' + '<a href="javascript:void(0)" class="list-item">K</a>' + '<a href="javascript:void(0)" class="list-item">L</a>' + '</li>' + '<li class="list justify">' + '<a href="javascript:void(0)" class="list-item">M</a>' + '<a href="javascript:void(0)" class="list-item">N</a>' + '<a href="javascript:void(0)" class="list-item change-to-num">O</a>' + '<a href="javascript:void(0)" class="list-item">P</a>' + '<a href="javascript:void(0)" class="list-item">Q</a>' + '<a href="javascript:void(0)" class="list-item">R</a>' + '</li>' + '<li class="list justify">' + '<a href="javascript:void(0)" class="list-item">S</a>' + '<a href="javascript:void(0)" class="list-item">T</a>' + '<a href="javascript:void(0)" class="list-item">U</a>' + '<a href="javascript:void(0)" class="list-item">V</a>' + '<a href="javascript:void(0)" class="list-item">W</a>' + '<a href="javascript:void(0)" class="list-item">X</a>' + '</li>' + '<li class="list justify">' + '<a href="javascript:void(0)" class="list-item">Y</a>' + '<a href="javascript:void(0)" class="list-item">Z</a>' + '<a href="javascript:void(0)" class="list-item last-item hk-and-macao hidden">港</a>' + '<a href="javascript:void(0)" class="list-item last-item hk-and-macao hidden">澳</a>' + '<a href="javascript:void(0)" class="list-item last-item only-last-item hidden">学</a>' + '<a href="javascript:void(0)" class="list-item last-item only-last-item hidden">警</a>' + '<a href="javascript:void(0)" class="list-item last-item only-last-item hidden">试</a>' + '<a href="javascript:void(0)" class="list-item last-item only-last-item hidden">挂</a>' + '<a href="javascript:void(0)" class="list-item list-item-hidden"></a>' + '<a href="javascript:void(0)" class="list-item list-item-hidden"></a>' + '<a href="javascript:void(0)" class="list-item list-item-hidden"></a>' + '<a href="javascript:void(0)" class="list-item list-item-hidden"></a>' + '</li>' + '</ul>' + '</div>' + '</div>';

            if ($('.keyboard-modal').length == 0) {
                $('body').append(keyboardStr);
            }

            //获取当前键盘上车牌的长度
            var getHeaderLicense = function(e, flag) {
                var value = '';
                e.each(function() {
                    value += $(this).text();
                })
                //如果flag== true，则返回字串，否则返回字串长度
                if (flag) {
                    return value;
                } else {
                    return value.length;
                }
            };

            var switchKbStatus = {
                province: function() {
                    $('.province').show();
                    $('.keyboard').hide();
                    $('.number-list').addClass('hidden');
                    $(".last-item").addClass("hidden");
                    $(".keyboard ul li:last-child").find(".list-item-hidden").removeClass('hidden');
                },
                onlyChar: function() {
                    $('.province').hide();
                    $('.keyboard').show();
                    $('.number-list').addClass('hidden');
                    $('.not-pos-two').addClass('addOpacity');
                    $(".last-item").addClass("hidden");
                    $(".keyboard ul li:last-child").find(".list-item-hidden").removeClass('hidden');
                },
                charAndNum: function() {
                    $('.province').hide();
                    $('.keyboard').show();
                    $('.number-list').removeClass('hidden');
                    $('.not-pos-two').removeClass('addOpacity');
                    $(".last-item").addClass("hidden");
                    $(".keyboard ul li:last-child").find(".list-item-hidden").removeClass('hidden');
                },
                lastSpcialOne: function() {
                    var value = getHeaderLicense($('.searchVal-item'), true); 
                    $('.province').hide();
                    $('.keyboard').show();
                    $('.number-list').removeClass('hidden');
                    $('.not-pos-two').removeClass('addOpacity');
                    $(".last-item").addClass("hidden");
                    if(/^粤Z/g.test(value)){
                        $(".hk-and-macao").removeClass('hidden');
                        $(".keyboard ul li:last-child").find(".list-item-hidden").eq(2).addClass('hidden');
                        $(".keyboard ul li:last-child").find(".list-item-hidden").eq(3).addClass('hidden');
                    }else{
                        $('.only-last-item').removeClass('hidden');
                        $(".keyboard ul li:last-child").find(".list-item-hidden").addClass('hidden');
                    }
                    
                }
            };

            var postKBHeaderVal = function(Val) {
                $('.searchVal-item').text("");
                for (var i = 0; i < $('.searchVal-item').length; i++) {
                    $('.searchVal-item').eq(i).text(Val.substr(i, 1));
                }
            };

            var keyBoardBtnStatus = function() {
                var len = getHeaderLicense($('.searchVal-item'));
                if (len === 0) {
                    switchKbStatus.province();
                } else if (len === 1) {
                    switchKbStatus.onlyChar();
                } else if (len < 6) {
                    switchKbStatus.charAndNum();
                } else {
                    switchKbStatus.lastSpcialOne();
                }
            };

            return this.each(function() {
                var Input = $(this);

                // 尝试去获取settings，如果不存在，则返回“undefined”
                var settings = Input.data("selfKeyboard");

                // 如果获取settings失败，则根据options和default创建它
                if (typeof settings === "undefined") {
                    settings = $.extend({}, defaults, options);
                    // 保存我们新创建的settings
                    Input.data("selfKeyboard", settings);
                } else {
                    //如果我们获取了settings，则将它和options进行合并
                    settings = $.extend({}, settings, options);

                    // 保存options
                    Input.data("selfKeyboard", settings);
                }

                Input.on('click', function() {
                    keyboardShow();
                })

                var keyboardShow = function() {
                    if ($('.keyboard-modal').hasClass('hide')) {
                        $("#hiddenInput").val(Input.attr("id"));
                        $(".modal-overlay").addClass("modal-overlay-visible");
                        $('.search-box').removeClass('hide').addClass('search-box-fixed-top');
                        var $keyModal = $('.keyboard-modal');
                        var value = Input.text();
                        if (!(/^[\u4e00-\u9fa5]{4,}/.test(value))) {
                            postKBHeaderVal(value);
                        }
                        keyBoardBtnStatus();
                        $('.searchVal-item').removeClass('active');
                        $('.searchVal-item').eq(getHeaderLicense($('.searchVal-item')) - 1).addClass('active');
                        $keyModal.show();
                        setTimeout(function() {
                            $keyModal.addClass('keyboard-modal-in');
                            $('.search-box').addClass('search-box-fixed-top');
                        }, 200)
                    }
                };

                var keyboardHide = function() {
                    var $keyModal = $('.keyboard-modal'),
                        keyboardInputId = $("#hiddenInput").val(),
                        $keyboardInput = $('#' + keyboardInputId);
                    $(".modal-overlay ").removeClass('modal-overlay-visible');
                    $('.search-box').removeClass('search-box-fixed-top').addClass('hide');

                    $keyModal.removeClass("keyboard-modal-in").addClass('hide').css("display", "none");
                    $('.searchVal-item').removeClass('active');
                    var value = getHeaderLicense($('.searchVal-item'), true);
                    if (value == "") {
                        value = "请输入发放的车牌号";
                    }
                    $keyboardInput.text(value);

                    if (settings.btnFlag) {
                        //验证车牌号是否符合规则，控制发放按钮的样式变化
                        var reg = /^([\u4e00-\u9fa5]{1}|[A-Z]{1})[A-Z]{1}[\dA-Z]{4}([\dA-Z]{1}|[\u4e00-\u9fa5]{1})$/; //车牌验证正则表达式
                        if (value.length < 7 || !reg.test(value)) {
                            $("#" + settings.btnId).attr("disabled", "disabled").addClass('addOpacity')
                        } else {
                            $("#" + settings.btnId).removeAttr("disabled").removeClass("addOpacity");
                        }
                    }

                };

                //车牌前缀
                var $province_item = $('.province').find('.list-item').not('.list-item-hidden'),
                    $keyboard_item = $('.keyboard').find('.list-item').not('.list-item-hidden'),
                    $search_con_item = $(".car-val").find('.searchVal-item'),
                    search_fixer_item = false,
                    search_con_item_index = '';

                //省点击
                $province_item.off('click').on('click', function() {
                    var l = getHeaderLicense($('.searchVal-item')),
                        this_val = $(this).text();
                    $('.search-province-item').addClass('active');
                    $('.search-province-item').text(this_val);
                    if (l === 0) {
                        switchKbStatus.onlyChar();
                    } else {
                        keyboardHide();
                    }
                })

                //数字及字母点击  
                $keyboard_item.off('click').on('click', function() {
                    if($(this).hasClass('addOpacity')){return;}
                    var $this = $(this),
                        this_val = $(this).text(),
                        total_len = getHeaderLicense($('.searchVal-item'));
                    if (total_len < 7) {
                        $('.search-province-item').removeClass('active');
                        if ($('.number-list').hasClass('hidden')) {
                            $('.search-fixer-item').addClass('active');
                            $('.search-fixer-item').text(this_val);
                            $('.number-list').removeClass('hidden');
                        } else {
                            $('.search-fixer-item').removeClass('active');
                            var len = getHeaderLicense($(".car-val").find('.searchVal-item'));
                            if(this_val == "I"){this_val = 1;}
                            if(this_val == "O"){this_val = 0;}

                            $search_con_item.each(function() {
                                var This = $(this);
                                if (This.text() == '') {
                                    This.siblings('.active').removeClass('active');
                                    This.text(this_val).addClass('active');
                                    return false;
                                }
                            });
                            if (getHeaderLicense($(".car-val").find('.searchVal-item')) == 5) {
                                keyboardHide();
                            }
                        }
                        keyBoardBtnStatus();
                    } else if (total_len == 7) {
                        $('.searchVal-item').each(function() {
                            var This = $(this);
                            if (This.hasClass('active')) {
                                if (This.hasClass('search-fixer-item')) {
                                    search_fixer_item = true;
                                } else {
                                    search_con_item_index = This.index();
                                }
                            }
                        });
                        if (search_fixer_item === true) {
                            $('.search-fixer-item').text(this_val);
                        } else {
                            search_con_item_index = (typeof search_con_item_index !== "number" ? 4 : search_con_item_index);
                            $search_con_item.eq(search_con_item_index).text(this_val);
                        }
                        search_fixer_item = false;
                        search_con_item_index = '';
                        keyboardHide();
                        return;
                    }
                })

                //点击删除
                /*$(document).on('click', '.car-val-delete', function() {
                    var $items = $('.searchVal-item'),
                        l = getHeaderLicense($items);
                    $items.removeClass('active');
                    $items.eq(l - 1).text('');
                    $items.eq(l - 2).addClass('active');
                    keyBoardBtnStatus();
                });*/

                $('.car-val-delete').off('click').on('click',function(){
                    var $items = $('.searchVal-item'),
                        l = getHeaderLicense($items);
                    $items.removeClass('active');
                    $items.eq(l - 1).text('');
                    $items.eq(l - 2).addClass('active');
                    keyBoardBtnStatus();
                });

                //车牌长度为7，点击任意以为车牌可进行修改
                $('.searchVal-item').off('click').on('click', function() {
                    var $this = $(this),
                        l = getHeaderLicense($('.searchVal-item'));
                    if (l === 7) {
                        $('.searchVal-item').removeClass('active');
                        $this.addClass('active');
                        if ($this.hasClass('search-province-item')) {
                            switchKbStatus.province();
                        } else if ($this.hasClass('search-fixer-item')) {
                            switchKbStatus.onlyChar();
                        } else {
                            if ($(".search-con-item:last-child").hasClass('active')) {
                                switchKbStatus.lastSpcialOne();
                            } else {
                                switchKbStatus.charAndNum();
                            }
                        }
                    }
                })

                //点击遮罩键盘消失
                $(document).on('click', '.modal-overlay', function() {
                    if ($('.keyboard-modal').css('display') == 'block') {
                        keyboardHide();
                    }
                })
            })
        }
    };



    $.fn.bindSelfKeyboard = function(options) {
        var method = arguments[0];

        if (methods[method]) {
            method = methods[method];
            arguments = Array.prototype.slice.call(arguments, 1);
        } else if (typeof method === "object" || !method) {
            method = methods.init;
        } else {
            $.error("Method" + method + "does not exist on jQuery.pluginName");
            return this;
        }

        return method.apply(this, arguments);
    }

    //把storage变量的作用域提升至全局，不用声明
    storage = {
        setCookie: function(name,value){//用cookie存储
            var argv = setCookie.arguments;
            var argc = setCookie.arguments.length;
            var expires = (argc > 2) ? argv[2] : null;
            var path = (argc > 3) ? argv[3] : null;
            var domain = (argc > 4) ? argv[4] : null;
            var secure = (argc > 5) ? argv[5] : false;
            document.cookie = name + "=" + escape(value) +
                ((expires == null) ? "" : ("; expires=" + expires.toGMTString())) +
                ((path == null) ? "" : ("; path=" + path)) +
                ((domain == null) ? "" : ("; domain=" + domain)) +
                ((secure == true) ? "; secure" : "");
        },
        getCookieVal:function(offset){
            var endstr = document.cookie.indexOf(";", offset);
            if (endstr == -1)
                endstr = document.cookie.length;
            return unescape(document.cookie.substring(offset, endstr));
        },
        getCookie:function(name){//获取用cookie存的值
            var arg = name + "=";
            var alen = arg.length;
            var clen = document.cookie.length;
            var i = 0;
            while (i < clen) {
                var j = i + alen;
                if (document.cookie.substring(i, j) == arg)
                    return getCookieVal(j);
                i = document.cookie.indexOf(" ", i) + 1;
                if (i == 0)
                    break;
            }
            return "";
        },
        deleteCookie: function(name){//删除存储的cookie的值
            var exp = new Date();
            exp.setTime(exp.getTime() - 1);
            var cval = getCookie(name);
            if (cval != null)
                document.cookie = name + "=" + cval + "; expires=" + exp.toGMTString();
        },
        setItem: function(name,obj){//保存值
            var val = typeof obj == 'object' ? JSON.stringify(obj) : obj;
            if (window.localStorage) {
                window.localStorage.setItem(name, val);
            } else {
                setCookie(name, val);
            }
        },
        getItem:function(name){//根据name获取存储的值
            var re = /^[{]{1}[\S]*[}]{1}$/;
            if (window.localStorage) {
                var result = window.localStorage.getItem(name);
                if (re.test(result)) {
                    return JSON.parse(result);
                } else {
                    return result;
                }
            } else {
                var result = getCookie(name);
                if (re.test(result)) {
                    return JSON.parse(result);
                } else {
                    return result;
                }
            }
        },
        removeItem: function(name){//根据名称删除存储的值
            if (window.localStorage) {
                window.localStorage.removeItem(name);
            } else {
                deleteCookie(name);
            }
        }
    };

})(Zepto)
