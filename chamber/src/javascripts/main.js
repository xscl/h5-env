'use strict';

// load dependencies
var $ = window.$ = window.jQuery = require('jquery');
var Swiper = require('swiper/dist/js/swiper.jquery.js');
var animationControl = require('./animation-control.js');
var resourceLoader = require('./resource-loader.js');
var IScroll = require('./iscroll.js');
var Shake = require('./shake.js');
var Screen = require('./screen.js');
var TapHold = require('./taphold.js');
//Screen.setMock(true);
var resouces = [
    'images/clue/lamp/password.png',
    'images/clue/mobile/mobileWord.png',
    'images/clue/mobile/buttonWord.png',
    'images/clue/mobile/mobile.png',
    'images/clue/mobile/password.png',
    'images/clue/poster/ice.png',
    'images/clue/poster/buttonWord.png',
    'images/clue/poster/iceWord.png',
    'images/clue/poster/password.png',
    'images/clue/tel/telWord.png',
    'images/clue/tel/tel.png',
    'images/clue/tel/tel1.png',
    'images/clue/tel/tel3.png',
    'images/clue/tel/buttonWord.png',
    'images/clue/tel/password.png',
    'images/float/float.png',
    'images/float/floatbj.jpg',
    'images/tool/cartoon/cartoon.png',
    'images/tool/cartoon/word.png',
    'images/tool/homework/homework.png',
    'images/tool/homework/word.png',
    'images/tool/slingshot/slingshot.png',
    'images/tool/slingshot/word.png',
    'images/tool/waterPistol/waterPistol.png',
    'images/tool/waterPistol/word.png',
    'images/exist.png',
    'images/gesture.png',
    'images/des.png',
    'images/sound_off.png'
];
var state = {
    poster: {
        clue: 'images/clue/poster/ice.png',
        word: 'images/clue/poster/buttonWord.png',
        tool: 'images/clue/poster/iceWord.png',
        password: 'images/clue/poster/password.png',
        adjust: 'ice-word',
        wordSlot: '',
        clueSlot: '',
        switch: 'state-two'
    },
    mobile: {
        clue: 'images/clue/mobile/mobile.png',
        word: 'images/clue/mobile/buttonWord.png',
        tool: 'images/clue/mobile/mobileWord.png',
        password: 'images/clue/mobile/password.png',
        adjust: 'mobile-word',
        wordSlot: 'word-adjust',
        clueSlot: 'clue-adjust',
        switch: 'state-two-mobile'
    },
    lamp: {
        password: 'images/clue/lamp/password.png',
        adjust: '',
        clueSlot: '',
        wordSlot: '',
        switch: 'state-two'
    },
    tel: {
        clue: 'images/clue/tel/tel.png',
        word: 'images/clue/tel/buttonWord.png',
        tool: 'images/clue/tel/telWord.png',
        password: 'images/clue/tel/password.png',
        switch: 'state-two',
        wordSlot: '',
        clueSlot: '',
        adjust: 'tel-word'
    },
    homework: {
        tool: 'images/tool/homework/homework.png',
        word: 'images/tool/homework/word.png'
    },
    slingshot: {
        tool: 'images/tool/slingshot/slingshot.png',
        word: 'images/tool/slingshot/word.png'
    },
    cartoon: {
        tool: 'images/tool/cartoon/cartoon.png',
        word: 'images/tool/cartoon/word.png'
    },
    pistol: {
        tool: 'images/tool/waterPistol/waterPistol.png',
        word: 'images/tool/waterPistol/word.png'
    }
};
$(document).ready(function () {
    var loadingProgress = $('.projector .progress');
    var mask = $('.mask');
    var wrongCard = $('.wrong-card');
    var bgMusic = $('audio').get(0);
    var telMusic = $('audio').get(1);
    var rightCard = $('.right-card');
    var close = false;
    var $btnMusic = $('.btn-music');
    $btnMusic.on('touchstart', function () {
        if (bgMusic.paused) {
            bgMusic.play();
            close = false;
            $btnMusic.css('backgroundImage', 'url(images/sound_on.png)');
            $(this).removeClass('paused');
        } else {
            bgMusic.pause();
            close = true;
            $btnMusic.css('backgroundImage', 'url(images/sound_off.png)');
            $(this).addClass('paused');
        }
    });
    var shakeCount = 0;
    var key = '1234';
    var password = 'byh'.toUpperCase();
    var store = {
        right: {},
        rightCount: 0,
        wrong: {},
        add: function () {
            this.rightCount++;
            if (this.rightCount > 3) {
                $('.exist').css('display', 'block').on('tap', function () {
                    $(this).css('display', 'none');
                    nextScene();
                });
            }
        }
    };
    var shake = new Shake(function() {
        shakeCount++;
        if (shakeCount > 2) {
            shakeCount = 0;
            if (store.right['tel'].state2) {

            }
            else {
                store.right['tel'].state2 = true;
                store.add();
            }
            rightCard.find('.tip-slot span').html(store.rightCount + "/4");
            telMusic.pause();
            if (!close) {
                bgMusic.play();
            }
            rightCard.addClass('state-animated ' + state['tel'].switch);
        }
    });
    var rock, iscroll;
    function rockTel() {
        var rockCount = 0;
        clearInterval(rock);
        rock = setInterval(function () {
            rockCount++;
            var which = '';
            if (rockCount > 3) {
                rockCount = 0;
            }
            if (rockCount === 0 || rockCount === 2) {
            }
            else {
                which = rockCount;
            }
            rightCard.find('.clue-slot img').attr('src', 'images/clue/tel/tel' + which + '.png');
        }, 180);
    }

    // init Swiper
    var swiper = new Swiper('.swiper-container', {
        effect: 'coverflow',    // slide, fade, coverflow or flip
        speed: 400,
        direction: 'vertical',
        mousewheelControl: false,
        //initialSlide :2,
        followFinger: false,
        fade: {
            crossFade: false
        },
        coverflow: {
            rotate: 100,
            stretch: 0,
            depth: 300,
            modifier: 1,
            slideShadows: false     // do disable shadows for better performance
        },
        flip: {
            limitRotation: true,
            slideShadows: false     // do disable shadows for better performance
        },
        onInit: function (swiper) {
            animationControl.initAnimationItems();  // get items ready for animations
            animationControl.playAnimation(swiper); // play animations of the first slide
        },
        onTransitionStart: function (swiper) {     // on the last slide, hide .btn-swipe
            if (swiper.activeIndex === swiper.slides.length - 1) {
                $('.key').val(key);
            } else {
            }
        },
        onTransitionEnd: function (swiper) {       // play animations of the current slide
            if (swiper.activeIndex === 1) {
                $('.password').focus();
            }
            animationControl.playAnimation(swiper);
        },
        onTouchStart: function (swiper, event) {    // mobile devices don't allow audios to play automatically, it has to be triggered by a user event(click / touch).

        }
    });

    // hide loading animation since everything is ready
    function resizeScr(portrait, width, height) {
        var sWidth;
        if (portrait) {
            $('.landscape-mask').hide();
            sWidth = Math.floor(height /1108 * 2265);
        }
        else {
            $('.landscape-mask').show();
            sWidth = Math.floor(width/1108 * 2265);
        }
        $('#scroller').width(sWidth);
        return sWidth;
    }
    function nextScene() {
        swiper.slideTo(1);
        $('.header').fadeOut();
        $btnMusic.fadeOut();
        bgMusic.pause();
    }
    function firstScene() {
        swiper.slideTo(0);
        $('.header').fadeIn();
        $btnMusic.fadeIn();
        if (!close) {
            bgMusic.play();
        }
        Screen.sync(function (portrait, width, height) {
            if (!portrait) {
                $('.landscape-mask').show();
            }
            else {
                $('.landscape-mask').hide();
            }
            var sWidth = resizeScr(portrait, width, height);
            iscroll.scrollTo($(window).width() - sWidth, 0);
        });
        $('.lamp').addClass('flash');
        $('.password').val('');
        store.right = {};
        store.rightCount = 0;
        store.wrong = {};
    }
    var timeoutKey;
    $('.password').keydown(function(event){
        var keyCode = event.which;
        if (keyCode >= 65 && keyCode <= 90)
        {
            return true;
        }
        /*else if (keyCode >= 97 && keyCode <= 122) {
            event.which = keyCode - 32;
            console.log(event, keyCode);
            return true;
        }*/
        else if (keyCode == 8 || keyCode == 46 || keyCode == 37 || keyCode == 39) {
            return true;
        }
        else {
            return false;
        }
    })/*.keyup(function () {
        var pwd = $(this).val().toUpperCase();
        if (pwd.length === password.length) {
            if (pwd === password) {
                clearTimeout(timeoutKey);
                $(this).blur();
                setTimeout(function () {
                    swiper.slideNext();
                }, 500);
            }
            else {
                var me = this;
                timeoutKey = setTimeout(function () {
                    $(me).val('').blur();
                    $('.try').fadeIn(800, function () {
                        $(this).fadeOut(800);
                    });
                }, 300);
            }
        }
    })*/;
    $('.ok').on('click', function () {
        var pwd = $('.password').val().toUpperCase();
        if (pwd === password) {
            clearTimeout(timeoutKey);
            $(this).blur();
            setTimeout(function () {
                swiper.slideNext();
            }, 500);
        }
        else {
            timeoutKey = setTimeout(function () {
                $('.password').val('').blur();
                $('.try').fadeIn(800, function () {
                    $(this).fadeOut(800);
                });
            }, 300);
        }
    });
    document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
    resourceLoader.loadImages(resouces, function (over, count, length, map) {
        if (over) {
            loadingProgress.html('100%');
            setTimeout(function () {
                bgMusic.play();
                Screen.sync(function (portrait, width, height) {
                    if (!portrait) {
                        $('.landscape-mask').show();
                    }
                    else {
                        $('.landscape-mask').hide();
                    }
                    var sWidth = resizeScr(portrait, width, height);
                    iscroll = new IScroll('#wrapper', {deceleration: 0.001, scrollX: true, scrollY: false, mouseWheel: true, tap: true, startX:$(window).width() - sWidth});
                });
                Screen.start(resizeScr);
                $('.header').on('click', function () {
                    $('.mask').fadeIn();
                    $('.code-card').fadeIn();
                });
                var handler;
                $('.right-card .word-slot').on('click', function (evt) {
                    var clue = $(this).attr('data-clue');
                    if (clue === 'poster') {
                        return;
                    }
                    if (clue === 'tel') {

                    }
                    else {
                        if (store.right[clue].state2) {

                        }
                        else {
                            store.right[clue].state2 = true;
                            store.add();
                        }
                        rightCard.find('.tip-slot span').html(store.rightCount + "/4");
                        rightCard.addClass('state-animated ' + state[clue].switch);
                        evt.stopPropagation();
                    }
                });
                $('.right').on('tap', function () {
                    rightCard.removeClass('state-animated state-two state-two-mobile');
                    var clue = $(this).attr('data-right');
                    var conf = state[clue];
                    if (clue === 'lamp') {
                        $('.lamp').removeClass('flash');
                        if (store.right[clue]) {

                        }
                        else {
                            store.right[clue] = {state2: true};
                            store.add();
                        }
                        rightCard.addClass(conf.switch);
                        //rightCard.addClass(conf.switch);
                        rightCard.find('.tool-slot').html("");
                        rightCard.find('.word-slot').html("");
                    }
                    else {
                        if (store.right[clue]) {
                            rightCard.find('.clue-slot').html("<img src='" + conf.clue + "' class='" + conf.clueSlot + "'>");
                            if (store.right[clue].state2) {
                                rightCard.addClass(conf.switch);
                            }
                        }
                        else {
                            rightCard.find('.clue-slot').html("<img src='" + conf.clue + "' class='" + conf.clueSlot+ " animated bounceIn'>");
                            store.right[clue] = {state2: false};
                        }
                        if (clue === 'tel' && !store.right[clue].state2){
                            shake.start();
                            telMusic.play();
                            bgMusic.pause();
                            rockTel();
                        }
                        console.log(conf.adjust);
                        rightCard.find('.tool-slot').html("<img src='" + conf.tool + "' class='" + conf.adjust + "'>");
                        rightCard.find('.word-slot').html("<img src='" + conf.word + "' class='" + conf.wordSlot+ "'>").attr('data-clue', clue);
                        if (clue === 'poster') {
                         //   rightCard.find('.word-slot').bind('touchstart', notCopy);
                            handler = TapHold.bind('.right-card .word-slot', function () {
                                var clue = $(this).attr('data-clue');
                                if (clue === 'poster') {
                                    if (store.right[clue].state2) {

                                    }
                                    else {
                                        store.right[clue].state2 = true;
                                        store.add();
                                    }
                                    rightCard.find('.tip-slot span').html(store.rightCount + "/4");
                                    rightCard.addClass('state-animated ' + state[clue].switch);
                                }
                            });
                        }
                        //rightCard.find('.word-slot').html("<div style='background-image:url(" + conf.word + ")'></div>").attr('data-clue', clue);
                    }
                    rightCard.find('.password-slot').html("<img src='" + conf.password + "'>");
                    //rightCard.find('.password-slot').html("<div style='background-image:url(" + conf.password + ")'>");
                    rightCard.find('.tip-slot span').html(store.rightCount + "/4");
                    $('.mask').fadeIn();
                    $('.right-card').fadeIn();
                });
                $('.card').on('click', function () {
                    $('.mask').fadeOut();
                    TapHold.unbind('.right-card .word-slot', handler);
                    //rightCard.find('.word-slot').unbind('touchstart', notCopy);
                    $('.card').fadeOut(function () {
                        if (!close) {
                            bgMusic.play();
                        }
                        telMusic.pause();
                        /*clean = setTimeout(function (){
                            rightCard.removeClass('state-animated state-two state-two-mobile');
                        }, 300);*/
                    });
                    shake.stop();
                    clearInterval(rock);
                });
                $('.tip-card').on('touchstart', function () {
                    $('.mask').fadeOut();
                    $('.card').fadeOut();
                });
                $('.wrong').on('tap', function () {
                    wrongCard.removeClass('state-animated');
                    var tool = $(this).attr('data-wrong');
                    var conf = state[tool];
                    if (store.wrong[tool]) {
                        wrongCard.find('.tool-slot').html("<img src='" + conf.tool + "'>");
                    }
                    else {
                        wrongCard.find('.tool-slot').html("<img src='" + conf.tool + "' class='animated bounceIn'>");
                        store.wrong[tool] = true;
                    }
                    wrongCard.find('.word-slot').html("<img src='" + conf.word + "'>");
                    wrongCard.find('.tip-slot span').html(store.rightCount + "/4");
                    $('.mask').fadeIn();
                    $('.wrong-card').fadeIn();
                });
                $('.again').on('click', function () {
                   //window.location.reload();
                    firstScene();
                });
                mask.on('click', function () {
                    mask.fadeOut();
                    $('.share').fadeOut();
                });
                $('.together').on('click', function () {
                    mask.fadeIn();
                    $('.share').fadeIn();
                });
                $('.loading-overlay').slideUp();
            }, 1000);
        }
        else {
            loadingProgress.html(Math.floor(count / length * 100) + '%');
        }
    });

});
