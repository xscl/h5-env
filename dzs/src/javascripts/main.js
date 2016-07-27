'use strict';

//utils
var util = {
    getElPos: function(el) {
        return [parseInt(el.offsetLeft, 10), parseInt(el.offsetTop, 10)];
    },
    /*计算直角边*/
    calculPy: function(l, w) {
        return Math.sqrt(Math.pow(l, 2) + Math.pow(w, 2));
    },
    /*计算两点间距离*/
    calculDis: function(pos1x, pos1y, pos2x, pos2y) {
        return this.calculPy(pos1x - pos2x, pos1y - pos2y);
    },
    /*计算正方形内的点在对角线上垂直影射的点*/
    trianglePoint: function (type, startX, startY, stopX, stopY, pointX, pointY) {
        if (pointX == startX || pointY == startY) {
            return [startX, startY];
        }
        else if (pointX == stopX || pointY == stopY) {
            return [stopX, stopY];
        }

        var toX;
        var toY;
        // 左上角至右下角的对角线
        return util.middlePoint(
            pointX, util.diagonalPointY(startX, startY, stopX, stopY, pointX, type) || pointY,
            util.diagonalPointX(startX, startY, stopX, stopY, pointY, type) || pointX, pointY
        );
    },
    /*已知 斜线 上一点，由X坐标算出Y坐标*/
    diagonalPointY: function (startX, startY, stopX, stopY, pointX, type) {
        var pointY;
        if ('a' == type) {
            pointY = Math.abs(startX - pointX) * Math.abs(startY - stopY) / Math.abs(startX - stopX) + startY;
        }
        else if ('b' == type) {
            pointY = startY - Math.abs(startX - pointX) * Math.abs(startY - stopY) / Math.abs(startX - stopX);
        }
        return pointY;
    },
    /*已知 斜线 上一点，由Y坐标算出X坐标*/
    diagonalPointX: function (startX, startY, stopX, stopY, pointY, type) {
        var pointX = Math.abs(pointY - startY) * Math.abs(startX - stopX) / Math.abs(startY - stopY) + startX;
        return pointX;
    },
    /*计算已知坐标的两点的中点的坐标*/
    middlePoint: function (startX, startY, stopX, stopY) {
        return [startX + (stopX - startX) / 2, startY + (stopY - startY) / 2];
    },
    preloadImages: function (done, percentCb) {
        var imagesToLoad = [
            // page loading
            'http://static.leanote.top/x-resource/dzs/images/loading/1.png',
            'http://static.leanote.top/x-resource/dzs/images/loading/2.png',
            'http://static.leanote.top/x-resource/dzs/images/loading/3.png',
            'http://static.leanote.top/x-resource/dzs/images/loading/4.png',
            'http://static.leanote.top/x-resource/dzs/images/loading/5.png',

            // page 1
            'http://static.leanote.top/x-resource/dzs/images/1/1.png',
            'http://static.leanote.top/x-resource/dzs/images/1/2.png',
            'http://static.leanote.top/x-resource/dzs/images/1/3.png',
            'http://static.leanote.top/x-resource/dzs/images/1/4.png',
            'http://static.leanote.top/x-resource/dzs/images/1/5.png',
            'http://static.leanote.top/x-resource/dzs/images/1/6.png',
            'http://static.leanote.top/x-resource/dzs/images/1/7.png',
            'http://static.leanote.top/x-resource/dzs/images/1/8.png',
            'http://static.leanote.top/x-resource/dzs/images/1/9.png',
            'http://static.leanote.top/x-resource/dzs/images/1/10.png',
            'http://static.leanote.top/x-resource/dzs/images/1/11.png',
            'http://static.leanote.top/x-resource/dzs/images/1/12.png',
            'http://static.leanote.top/x-resource/dzs/images/1/13.png',
            'http://static.leanote.top/x-resource/dzs/images/1/14.png',
            'http://static.leanote.top/x-resource/dzs/images/1/15.png',

            // page 2
            'http://static.leanote.top/x-resource/dzs/images/2/1.png',
            'http://static.leanote.top/x-resource/dzs/images/2/2.png',
            'http://static.leanote.top/x-resource/dzs/images/2/3.png',
            'http://static.leanote.top/x-resource/dzs/images/2/4.png',
            'http://static.leanote.top/x-resource/dzs/images/2/5.png',
            'http://static.leanote.top/x-resource/dzs/images/2/6.png',
            'http://static.leanote.top/x-resource/dzs/images/2/7.png',
            'http://static.leanote.top/x-resource/dzs/images/2/8.png',
            'http://static.leanote.top/x-resource/dzs/images/2/9.png',
            'http://static.leanote.top/x-resource/dzs/images/2/10.png',
            'http://static.leanote.top/x-resource/dzs/images/2/11.png',

            // page 3
            'http://static.leanote.top/x-resource/dzs/images/3/1.jpg',
            'http://static.leanote.top/x-resource/dzs/images/3/2.png',
            'http://static.leanote.top/x-resource/dzs/images/3/3.png',
            'http://static.leanote.top/x-resource/dzs/images/3/4.png',
            'http://static.leanote.top/x-resource/dzs/images/3/5.png',

            // page 4
            'http://static.leanote.top/x-resource/dzs/images/4/1.png',
            'http://static.leanote.top/x-resource/dzs/images/4/2.png',
            'http://static.leanote.top/x-resource/dzs/images/4/3.png',
            'http://static.leanote.top/x-resource/dzs/images/4/4.png',
            'http://static.leanote.top/x-resource/dzs/images/4/5.png',
            'http://static.leanote.top/x-resource/dzs/images/4/6.png',
            'http://static.leanote.top/x-resource/dzs/images/4/7.png',
            'http://static.leanote.top/x-resource/dzs/images/4/8.png',
            'http://static.leanote.top/x-resource/dzs/images/4/9.png',
            'http://static.leanote.top/x-resource/dzs/images/4/10.png',
            'http://static.leanote.top/x-resource/dzs/images/4/11.png',
            'http://static.leanote.top/x-resource/dzs/images/4/12.png',
            'http://static.leanote.top/x-resource/dzs/images/4/13.jpg',
            'http://static.leanote.top/x-resource/dzs/images/4/14.png',
            'http://static.leanote.top/x-resource/dzs/images/4/15.png',
            'http://static.leanote.top/x-resource/dzs/images/4/16.png',
            'http://static.leanote.top/x-resource/dzs/images/4/17.png',

            // page 5
            'http://static.leanote.top/x-resource/dzs/images/5/1.jpg',
            'http://static.leanote.top/x-resource/dzs/images/5/2.png',
            'http://static.leanote.top/x-resource/dzs/images/5/3.png',
            'http://static.leanote.top/x-resource/dzs/images/5/4.png',
            'http://static.leanote.top/x-resource/dzs/images/5/5.png',
            'http://static.leanote.top/x-resource/dzs/images/5/6.png',
            'http://static.leanote.top/x-resource/dzs/images/5/7.png',
            'http://static.leanote.top/x-resource/dzs/images/5/8.png',
            'http://static.leanote.top/x-resource/dzs/images/5/9.png',

            // page 6
            'http://static.leanote.top/x-resource/dzs/images/6/1.png',
            'http://static.leanote.top/x-resource/dzs/images/6/2.png',
            'http://static.leanote.top/x-resource/dzs/images/6/3.png',
            'http://static.leanote.top/x-resource/dzs/images/6/4.png',
            'http://static.leanote.top/x-resource/dzs/images/6/5.png',
            'http://static.leanote.top/x-resource/dzs/images/6/6.png',
            'http://static.leanote.top/x-resource/dzs/images/6/7.png',
            'http://static.leanote.top/x-resource/dzs/images/6/8.png',
            'http://static.leanote.top/x-resource/dzs/images/6/9.png',
            'http://static.leanote.top/x-resource/dzs/images/6/10.png',

            // page 7
            'http://static.leanote.top/x-resource/dzs/images/7/1.jpg',
            'http://static.leanote.top/x-resource/dzs/images/7/2.png',
            'http://static.leanote.top/x-resource/dzs/images/7/3.png',
            'http://static.leanote.top/x-resource/dzs/images/7/4.png',

            // page 8
            'http://static.leanote.top/x-resource/dzs/images/8/1.png',
            'http://static.leanote.top/x-resource/dzs/images/8/2.png',
            'http://static.leanote.top/x-resource/dzs/images/8/3.png',
            'http://static.leanote.top/x-resource/dzs/images/8/4.png',
            'http://static.leanote.top/x-resource/dzs/images/8/5.png',
            'http://static.leanote.top/x-resource/dzs/images/8/6.png',

            // page 9
            'http://static.leanote.top/x-resource/dzs/images/9/1.jpg',
            'http://static.leanote.top/x-resource/dzs/images/9/2.png',

            // page 10
            'http://static.leanote.top/x-resource/dzs/images/10/1.jpg',
            'http://static.leanote.top/x-resource/dzs/images/10/2.png',
            'http://static.leanote.top/x-resource/dzs/images/10/3.png'
        ];

        var imagesLoaded = 0;
        function _onReady() {
            if (loadover) {
                return;
            }
            imagesLoaded++;

            console.log('loaded:' + imagesLoaded);
            console.log('totalLength:' + imagesToLoad.length);
            percentCb && percentCb(imagesLoaded / imagesToLoad.length);
            if (imagesLoaded === imagesToLoad.length) {

                loadover = true;
                clearTimeout(loadTimer);
                done();
            }
        }

        function loadImage(src, callback) {
            var image;
            function onReady (err) {
                if (callback) callback();
            }
            if (src) {
                image = new Image();
                image.onload = onReady;
                image.src = src;
            } else {
                onReady();
            }
        }

        console.log(imagesToLoad.length);
        for (var i = 0; i < imagesToLoad.length; i++) {
            loadImage(imagesToLoad[i], _onReady);
        }

        var loadover = false;
        var loadTimer = setTimeout(function () {
            if (loadover) {
                return;
            }
            loadover = true;
            done();
        }, 30000);
    }
};

// load dependencies
var $ = window.$ = window.jQuery = require('jquery');
var Swiper = require('swiper/dist/js/swiper.jquery.js');
var animationControl = require('./animation-control.js');
var Hammer = require('./hammer.js');

$(document).ready(function () {
    $('.swiper-container').css('zoom', $(document.body).width() / 320);

    var bgMusic = $('audio').get(0);
    var $btnMusic = $('.btn-music');
    var $btnSwipe = $('.btn-swipe');
    var upArrow = $('.up-arrow');

    // background music control
    $btnMusic.click(function () {
        if (bgMusic.paused) {
            bgMusic.play();
            $(this).removeClass('paused');
        } else {
            bgMusic.pause();
            $(this).addClass('paused');
        }
    });

    // preload images
    var loadingInner = $('.loading-banner-inner');
    util.preloadImages(function () {
        // hide loading animation since everything is ready
        $('.loading-overlay').slideUp(500);
        $('.slide-1').show();
        doCheckSlideIndex(0);

        // page10 replay click
        $('.slide-10 .item-block1 .item-tip3').click(function () {
            unLockSwiper();
            swiper.slideTo(2, 100);
        });

        // page10 box click
        $('.slide-10 .item-block1 .item-tip2').click(function () {
            $('.slide-10 .item-mask').fadeIn();
            $('.slide-10 .item-QR').fadeOut();
            $('.slide-10 .item-award').fadeIn();
        });

        $('.slide-10 .item-close').click(function () {
            $('.slide-10 .item-mask').fadeOut();
            $('.slide-10 .item-award').fadeOut();
            $('.slide-10 .item-QR').fadeOut();
        });

        $('.slide-10 .item-cdk-input').val('test_CDK');


        $('.slide-10 .item-banner').click(function () {
            $('.slide-10 .item-mask').fadeIn();
            $('.slide-10 .item-award').fadeOut();
            $('.slide-10 .item-QR').fadeIn();
        });
    }, function (percent) {
        console.log(percent);
        loadingInner.css({'width': (percent * 100) + '%'});
    });

    // init Swiper
    var swiper = new Swiper('.swiper-container', {
        effect: 'slide',    // slide, fade, coverflow or flip
        speed: 400,
        direction: 'vertical',
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
            console.log('animation init');
        },
        onTransitionStart: function (swiper) {     // on the last slide, hide .btn-swipe
            if (swiper.activeIndex === swiper.slides.length - 1) {
                $btnSwipe.hide();
            } else {
                $btnSwipe.show();
            }
        },
        onTransitionEnd: function (swiper) {       // play animations of the current slide
            animationControl.playAnimation(swiper);
        },
        onTouchStart: function (swiper, event) {    // mobile devices don't allow audios to play automatically, it has to be triggered by a user event(click / touch).
            if (!$btnMusic.hasClass('paused') && bgMusic.paused) {
                bgMusic.play();
            }
        },
        onSlideChangeStart: function (swiper) {
            checkSlideIndex(swiper.activeIndex);
        },
        onSlideChangeEnd: function (swiper) {
            checkSlideIndex(swiper.activeIndex);
        }
    });

    function lockSwiper() {
        swiper.lockSwipeToPrev();
        swiper.lockSwipeToNext();
        upArrow.hide();
    }

    function unLockSwiper() {
        swiper.unlockSwipeToNext();
        swiper.unlockSwipeToPrev();
        upArrow.show();
    }

    $(window).resize(function () {
        $('.swiper-container').css('zoom', $(document.body).width() / 320);
        swiper.updateSlidesSize();
    });

    // test
    // setTimeout(function() {
    //     swiper.slideTo(7, 0);
    // }, 100);

    function checkSlideIndex (idx) {
        $('.jump4-tip').removeClass('jump4-tip');
        $('.bg-change').removeClass('bg-change');
        $('.hand-change').removeClass('hand-change');
        console.log(idx);

        setTimeout(function () {
            blackboardEraser.inBlackboardPage = false;
            musicControl.inMusicPage = false;
        }, 0);

        switch (idx) {
            case 0:
                setTimeout(function (argument) {
                    if (0 == swiper.activeIndex) {
                        console.log('do jump')
                        $('.slide-1 .item-block1 .item-tip1').css('animation-delay', '0');
                        $('.slide-1 .item-block1 .item-tip1').removeClass('animated').removeClass('zoomIn').css('animation','').addClass('jump4-tip');
                    }
                }, 700);
                setTimeout(function (argument) {
                    if (0 == swiper.activeIndex) {
                        console.log('do jump3');
                        $('.slide-1 .item-block3 .item-tip1').css('animation-delay', '0');
                        $('.slide-1 .item-block3 .item-tip1').removeClass('animated').removeClass('zoomIn').css('animation','').addClass('jump4-tip');
                    }
                }, 2500);
                setTimeout(function (argument) {
                    if (0 == swiper.activeIndex) {
                        console.log('do jump5');
                        $('.slide-1 .item-block5 .item-tip1').removeClass('animated').removeClass('zoomIn').css('animation','').addClass('sword-jump');
                        setTimeout(function () {
                            $('.jump4-tip').removeClass('jump4-tip');
                            $('.slide-1 .item-block5 .item-tip1').css('animation','').addClass('sword-jump-pause');
                        }, 1000);
                    }

                }, 3000);
                break;
            case 1:
                setTimeout(function () {
                    if (1 == swiper.activeIndex) {
                        $('.slide-2 .item-block3').removeClass('animated').removeClass('zoomIn').css('animation','').addClass('bg-change');
                    }
                }, 2000);
                break;
            case 2:
                setTimeout(function () {
                    if (2 == swiper.activeIndex) {
                        lockSwiper();
                        mapControl.ballObj.start();
                    }
                }, 1000);
                break;
            case 3:
                setTimeout(function () {
                    if (3 == swiper.activeIndex) {
                        $('.slide-4 .item-block4 .item-tip1').addClass('hand-change');
                    }
                }, 2500);
                break;
            case 4:
                setTimeout(function () {
                    blackboardEraser.refresh();
                    lockSwiper();
                }, 0);
                break;
            case 5:
                setTimeout(function () {
                    swiper.lockSwipeToPrev();
                }, 0);
                break;
            case 6:
            case 7:
                lockSwiper();
                break;
            case 8:
                setTimeout(function () {
                    if (8 == swiper.activeIndex) {
                        $('.slide-10 .item-block1 .item-tip2').addClass('board-box-shake');
                    }
                }, 500);
                break;
        }
    }

    function doCheckSlideIndex (idx) {
        checkSlideIndex(idx);
    }

    var mapControl = {
        init: function () {
            if (this.inited) {
                return;
            }
	        function Ball($dom, direction) {
		        this.$dom = $dom;
		        this.direction = direction; // down up left right
		        this.position = {x:131, y: 35};
		        this.listener = [];
		        this.currentPoint = '';
		        this.prePoint;
	        }
	        var p1 = {x:131, y:35};
	        var p2 = {x:131, y:65};
	        var p3 = {x:40, y:65};
	        var p4 = {x:26, y:72};
	        var p5 = {x:19, y: 85};
	        var p6 = {x:19, y: 300};
	        var p7 ={x:26, y:315};
	        var p8 = {x:40, y:322};
	        var p9 = {x:176, y:322};
	        var p10 = {x:187, y:315};
	        var p11 = {x:194, y:303};
	        var p12 = {x:194, y:250};
	        var p13 = {x:131, y:96};
	        var p14 = {x:131, y:250};
	        var p15 = {x:106, y:271};
	        var p16 = {x:78, y:250};
	        var p17 = {x:78, y:210};
	        var p18 = {x:144, y:110};
	        var p19 = {x:160, y:118};
	        var p20 = {x:240, y:118};
	        var p21 = {x:250, y:125};
	        var p22 = {x:253, y:135};
	        var p23 = {x:253, y:400};
	        var p24 = {x:248, y:408};
	        var p25 = {x:240, y:413};
	        var p26 = {x:40, y:413};
	        var p27 = {x:26, y:410};
	        var p28 = {x:19, y:400};
	        var p29 = {x:19, y:376};
	        var p30 = {x:24, y:364};
	        var p31 = {x:40, y:361};
	        var p32 = {x:110, y:361};
	        var points = [p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12, p13, p14, p15, p16, p17, p18, p19, p20, p21, p22, p23, p24, p25, p26,
		        p27, p28, p29, p30, p31, p32];
	        function inRegion(x, y, pa, pb) {
		        var x1 = (pa.x > pb.x)?pb.x:pa.x;
		        var x2 = pa.x + pb.x - x1;
		        var y1 = (pa.y > pb.y)?pb.y:pa.y;
		        var y2 = pa.y + pb.y - y1;
		        if (x >= x1 && x <= x2 && y >= y1 && y <= y2) {
			        return true;
		        }
		        return false;

	        }
	        function getPoint(x, y) {
		        var point;
		        var find = -1;
		        for (var i = 0; i< points.length; i++) {
			        point = points[i];
			        if (x == point.x && y == point.y) {
				        find = i + 1;
				        break;
			        }
		        }
		        if (find > 0) {
			        return 'point' + find;
		        }
		        return false;
	        }
	        function getRoad(x, y) {
		        if (x == p1.x) {
			        if (y < p2.y) {
				        return 'road1_2';
			        }
			        else if (y < p13.y) {
				        return 'road2_13'
			        }
			        else if (y < p14.y) {
				        return 'road13_14';
			        }
		        }
		        if (x == p5.x) {
			        if (y < p6.y) {
				        return 'road5_6';
			        }
			        return 'road28_29';
		        }
		        if (x == p11.x &&  y > p12.y && y < p11.y) {
			        return 'road11_12';
		        }
		        if (x == p16.x && y > p17.y && y < p16.y) {
			        return 'road16_17';
		        }
		        if (x == p22.x) {
			        return 'road22_23';
		        }
		        if (y == p2.y && x > p3.x && x < p2.x) {
			        return 'road2_3';
		        }
		        if (y == p8.y && x > p8.x && x < p9.x) {
			        return 'road8_9';
		        }
		        if (y == p19.y && x > p19.x && x < p20.x) {
			        return 'road19_20';
		        }
		        if (y == p25.y && x > p26.x && x < p25.x) {
			        return 'road25_26';
		        }
		        if (y == p31.y && x > p31.x && x < p32.x) {
			        return 'road31_32';
		        }
		        return false;
	        }
	        function getWan(x, y) {
		        if (inRegion(x, y, p3, p4)) {
			        return 'wan3_4';
		        }
		        else if (inRegion(x, y, p4, p5)) {
			        return 'wan4_5';
		        }
		        else if (inRegion(x, y, p6, p7)) {
			        return 'wan6_7';
		        }
		        else if (inRegion(x, y, p7, p8)) {
			        return'wan7_8';
		        }
		        else if (inRegion(x, y, p9, p10)) {
			        return 'wan9_10';
		        }
		        else if (inRegion(x, y, p10, p11)) {
			        return 'wan10_11';
		        }
		        else if (inRegion(x, y, p13, p18)) {
			        return 'wan13_18';
		        }
		        else if(inRegion(x, y, p18, p19)) {
			        return 'wan18_19';
		        }
		        else if(inRegion(x, y, p20, p21)) {
			        return 'wan20_21';
		        }
		        else if(inRegion(x, y, p21, p22)) {
			        return 'wan21_22';
		        }
		        else if(inRegion(x, y, p14, p15)) {
			        return 'wan14_15';
		        }
		        else if(inRegion(x, y, p15, p16)) {
			        return 'wan15_16';
		        }
		        else if(inRegion(x, y, p23, p24)) {
			        return 'wan23_24';
		        }
		        else if(inRegion(x, y, p24, p25)) {
			        return 'wan24_25';
		        }
		        else if(inRegion(x, y, p26, p27)) {
			        return 'wan26_27';
		        }
		        else if(inRegion(x, y, p27, p28)) {
			        return 'wan27_28';
		        }
		        else if(inRegion(x, y, p29, p30)) {
			        return 'wan29_30';
		        }
		        else if(inRegion(x, y, p30, p31)) {
			        return 'wan30_31';
		        }
	        }
	        function xMove(direction, p, p1, p2) {
		        var x1 = (p1.x > p2.x) ? p2.x : p1.x;
		        var x2 = p1.x + p2.x - x1;
		        if (direction.indexOf('left') > -1) {
			        if (p.x > x1) {
				        p.x--;
			        }
		        }
		        else if (direction.indexOf('right') > -1) {
			        if (p.x < x2) {
				        p.x++;
			        }
		        }
	        }
	        function yMove(direction, p, p1, p2) {
		        var y1 = (p1.y > p2.y) ? p2.y : p1.y;
		        var y2 = p1.y + p2.y - y1;
		        if (direction.indexOf('up') > -1) {
			        if (p.y > y1) {
				        p.y--;
			        }
		        }
		        else if (direction.indexOf('down') > -1) {
			        if (p.y < y2) {
				        p.y++;
			        }
		        }
	        }
	        function wanWrap(paths, direction, wan) {
		        wan = wan || 'xx';
		        var max = paths.length - 1; //0-9
		        var index = 0;
		        return function () {
			        var position = paths[index];
			        this.position.x = position.x;
			        this.position.y = position.y;

			        if (direction == '+') {
				        if (index < max) {
					        index++;
				        }
				        else {
					        direction = '-';
					        //if ('3-4 6-7 9-10 13-18 14-15 20-21 23-24 26-27 29-30'.indexOf(wan) > -1) {
					        if ('3-4 6-7 9-10 14-15 20-21 23-24 26-27 29-30'.indexOf(wan) > -1) {
						        this.direction = '';
					        }
				        }
			        }
			        else {
				        if (index > 0) {
					        index--;
				        }
				        else {
					        direction = '+';
					        if ('4-5 7-8 10-11 15-16 21-22 24-25 27-28 30-31'.indexOf(wan) > -1) {
						        //if ('4-5 7-8 10-11 15-16 18-19 21-22 24-25 27-28 30-31'.indexOf(wan) > -1) {
						        this.direction = '';
					        }
				        }
			        }
		        }
	        }
	        Ball.prototype.wan3_4 = (function () {
		        var paths = [
			        {x:40, y:65},
			        {x:38, y:66},
			        {x:36, y:67},
			        {x:34, y:68},
			        {x:32, y:69},
			        {x:30, y:70},
			        {x:28, y:71},
			        {x:26, y:72}
		        ];
		        //var p3 = {x:40, y:65};
		        //var p4 = {x:26, y:72};
		        //14 7
		        return wanWrap(paths, '+', '3-4');
	        })();
	        Ball.prototype.wan4_5 = (function () {
		        var paths = [
			        {x:26, y:72},
			        {x:25, y:74},
			        {x:24, y:76},
			        {x:23, y:78},
			        {x:22, y:80},
			        {x:21, y:82},
			        {x:20, y:84},
			        {x:19, y:85}
		        ];
		        //var p4 = {x:26, y:72};
		        //var p5 = {x:19, y: 85};
		        // 7 13
		        return wanWrap(paths, '+', '4-5');
	        })();
	        Ball.prototype.wan6_7 = (function () {
		        var paths = [
			        {x:19, y:300},
			        {x:20, y:302},
			        {x:21, y:304},
			        {x:22, y:306},
			        {x:23, y:308},
			        {x:24, y:310},
			        {x:25, y:312},
			        {x:26, y:315}
		        ];
		        //var p6 = {x:19, y: 300};
		        //var p7 ={x:26, y:315};
		        // 7 15
		        return wanWrap(paths, '+', '6-7');
	        })();
	        Ball.prototype.wan7_8 = (function () {
		        var paths = [
			        {x:26, y:315},
			        {x:28, y:316},
			        {x:30, y:317},
			        {x:32, y:318},
			        {x:34, y:319},
			        {x:36, y:320},
			        {x:38, y:321},
			        {x:40, y:322}
		        ];
		        //var p7 ={x:26, y:315};
		        //var p8 = {x:40, y:322};
		        //14 7
		        return wanWrap(paths, '+', '7-8');
	        })();
	        Ball.prototype.wan9_10 = (function () {
		        var paths = [
			        {x: 176, y:322},
			        {x: 177, y:321},
			        {x: 179, y:320},
			        {x: 181, y:319},
			        {x: 182, y:318},
			        {x: 184, y:317},
			        {x: 185, y:316},
			        {x: 187, y:315}
		        ];
		        //var p9 = {x:176, y:322};
		        //var p10 = {x:187, y:315};
		        // 11 7
		        return wanWrap(paths, '+' , '9-10');
	        })();
	        Ball.prototype.wan10_11 = (function () {
		        var paths = [
			        {x: 187, y:315},
			        {x: 188, y:313},
			        {x: 189, y:311},
			        {x: 191, y:309},
			        {x: 192, y:307},
			        {x: 193, y:305},
			        {x: 194, y:303}
		        ];
		        //var p10 = {x:187, y:315};
		        //var p11 = {x:194, y:303};
		        // 7 12
		        return wanWrap(paths, '+', '10-11');
	        })();
	        Ball.prototype.wan14_15 = (function () {
		        var paths = [
			        {x: 131, y: 250},
			        {x: 129, y: 253},
			        {x: 127, y: 256},
			        {x: 125, y: 259},
			        {x: 123, y: 262},
			        {x: 121, y: 265},
			        {x: 118, y: 267.5},
			        {x: 116, y: 268.5},
			        {x: 114, y: 269},
			        {x: 112, y: 269.5},
			        {x: 110, y: 270},
			        {x: 108, y: 270.5},
			        {x: 106, y: 271}
		        ];
		        //var p14 = {x:131, y:250};
		        //var p15 = {x:106, y:271};
		        // 25 21
		        // 8
		        return wanWrap(paths, '+', '14-15');
	        })();
	        Ball.prototype.wan15_16 = (function () {
		        var paths = [
			        {x: 106, y: 271},
			        {x: 104, y: 270.5},
			        {x: 101, y: 270},
			        {x: 98, y: 269.5},
			        {x: 95, y: 269},
			        {x: 92, y: 268},
			        {x: 90, y: 267},
			        {x: 89, y: 265},
			        {x: 86, y: 262},
			        {x: 84, y: 259},
			        {x: 82, y: 256},
			        {x: 80, y: 253},
			        {x: 78, y: 250}
		        ];
		        //var p15 = {x:106, y:271};
		        //var p16 = {x:78, y:250};
		        // 28 21
		        return wanWrap(paths, '+', '15-16');
	        })();
	        Ball.prototype.wan13_18 = (function () {
		        var paths = [
			        {x:131, y: 96},
			        {x:133, y:98},
			        {x:134, y:99},
			        {x:135, y:100},
			        {x:136, y:101},
			        {x:137, y:102},
			        {x:138, y:103},
			        {x:139, y:104},
			        {x:140, y:105},
			        {x:141, y:106},
			        {x:142, y:107},
			        {x:143, y:108},
			        {x:144, y:110}
		        ];
		        //var p13 = {x:131, y:96};
		        //var p18 = {x:144, y:110};
		        return wanWrap(paths, '+' ,'13-18');
	        })();
	        Ball.prototype.wan18_19 = (function () {
		        var paths = [{x:144, y:110},
			        {x:146, y:111},
			        {x:148, y:112},
			        {x:150, y:113},
			        {x:152, y:114},
			        {x:154, y:115},
			        {x:156, y:116},
			        {x:158, y:117},
			        {x:160, y:118}
		        ];
		        return wanWrap(paths, '+', '18-19');
	        })();
	        Ball.prototype.wan20_21 = (function () {
		        var paths = [
			        {x:240, y:118},
			        {x:241, y:119},
			        {x:242, y:120},
			        {x:244, y:121},
			        {x:246, y:122},
			        {x:248, y:123},
			        {x:249, y:124},
			        {x:250, y:125}
		        ];
		        //var p20 = {x:240, y:118};
		        //var p21 = {x:250, y:125};
		        // 10 7
		        return wanWrap(paths, '+', '20-21');
	        })();
	        Ball.prototype.wan21_22 = (function () {
		        var paths = [
			        {x:250, y:125},
			        {x:250.5, y:126},
			        {x:251, y:128},
			        {x:251.5, y:130},
			        {x:252, y:132},
			        {x:252.5, y:134},
			        {x:253, y:135}];
		       // var p21 = {x:250, y:125};
		       // var p22 = {x:253, y:135};
		        // 3, 10
		        return wanWrap(paths, '+', '21-22');
	        })();
	        Ball.prototype.wan23_24 = (function () {
		        var paths = [
			        {x:253, y:400},
			        {x:252, y:401},
			        {x:251.5, y:403},
			        {x:250, y:405},
			        {x:249, y:407},
			        {x:248, y:408}
		        ];
		        //var p23 = {x:253, y:400};
		        //var p24 = {x:248, y:408};
		        // 5 8
		        return wanWrap(paths, '+', '23-24');
	        })();
	        Ball.prototype.wan24_25 = (function () {
		        var paths = [
			        {x:248, y:408},
			        {x:247, y:409},
			        {x:245, y:410},
			        {x:243, y:411},
			        {x:241, y:412},
			        {x:240, y:413}
		        ];
		        //var p24 = {x:248, y:408};
		        //var p25 = {x:240, y:413};
		        // 8 5
		        return wanWrap(paths, '+', '24-25');
	        })();
	        Ball.prototype.wan26_27 = (function () {
		        var paths = [
			        {x: 40, y: 413},
			        {x: 38, y: 412.5},
			        {x: 36, y: 412},
			        {x: 33, y: 411.5},
			        {x: 30, y: 411},
			        {x: 28, y: 410.5},
			        {x: 26, y: 410}
		        ];
		        //var p26 = {x:40, y:413};
		        //var p27 = {x:26, y:410};
		        // 14 3
		        return wanWrap(paths, '+', '26-27');
	        })();
	        Ball.prototype.wan27_28 = (function () {
		        var paths = [
			        {x:26, y:410},
			        {x:25, y:409},
			        {x:24, y:408},
			        {x:23, y:406},
			        {x:22, y:404},
			        {x:21, y:402},
			        {x:20, y:401},
			        {x:19, y:400}
		        ];
		        //var p27 = {x:26, y:410};
		        //var p28 = {x:19, y:400};
		        // 7 10
		        return wanWrap(paths, '+', '27-28');
	        })();
	        Ball.prototype.wan29_30 = (function () {
		        var paths = [
			        {x: 19, y: 376},
			        {x: 20, y: 374},
			        {x: 21, y: 372},
			        {x: 22, y: 369},
			        {x: 23, y: 366},
			        {x: 24, y: 364}
		        ];
		        //var p29 = {x:19, y:376};
		        //var p30 = {x:24, y:364};
		        // 5 12
		        return wanWrap(paths, '+', '29-30');
	        })();
	        Ball.prototype.wan30_31 = (function () {
		        var paths = [
			        {x: 24, y: 364},
			        {x: 26, y: 363.5},
			        {x: 29, y: 363},
			        {x: 32, y: 362.5},
			        {x: 35, y: 362},
			        {x: 38, y: 361.5},
			        {x: 40, y: 361}
		        ];
		        //var p30 = {x:24, y:364};
		        //var p31 = {x:40, y:361};
		        // 16 3
		        return wanWrap(paths, '+', '30-31');
	        })();

	        Ball.prototype.setDirection = function (offsetX, offsetY) {
		        this.direction = '';
		        if (offsetX < 0) {
			        this.direction = 'left';
                }
                else if (offsetX > 0) {
                    this.direction = 'right';
                }
                if (offsetY < 0) {
                    this.direction += 'up';
                }
                else if (offsetY > 0) {
                    this.direction += 'down';
                }
	        };
	        Ball.prototype.start = function () {
                if (this.run) {
                    return;
                }
		        this.run = true;
		        this.animate();
	        };
	        Ball.prototype.point1 = function () {
		        var d = this.direction;
		        if (d.indexOf('down') > -1) {
			        this.position.y++;
		        }
	        };
	        Ball.prototype.point2 = function () {
		        var d = this.direction;
		        if (d.indexOf('left') > -1) {
			        this.position.x--;
		        }
		        else if (d.indexOf('down') > -1) {
			        this.position.y++;
		        }
		        else if (d.indexOf('up') > -1) {
			        this.position.y--;
		        }
	        };
	        Ball.prototype.point3 = function () {
		        var d = this.direction;
		        if (d.indexOf('right') > -1) {
			        this.position.x++;
		        }
		        else if (d.indexOf('left') > -1 || d.indexOf('down') > -1) {
			        this.position.x--;
			        // todo wan3_4
		        }
	        };
	        Ball.prototype.point4 = function () {
		        var d = this.direction;
		        if (d.indexOf('left') > -1 || d.indexOf('down') > -1) {
			        this.position.x--;
			        // todo wan4_5
		        }
		        else if (d.indexOf('right') > -1 || d.indexOf('up') > -1) {
			        this.position.x++;
			        // todo wan3_4
		        }
	        };
	        Ball.prototype.point5 = function () {
		        var d = this.direction;
		        if (d.indexOf('down') > -1) {
			        this.position.y++;
		        }
		        else if (d.indexOf('right') > -1 || d.indexOf('up') > -1) {
			        this.position.x++;
			        // todo wan4_5
		        }
	        };
	        Ball.prototype.point6 = function () {
		        var d = this.direction;
		        if (d.indexOf('up') > -1) {
			        this.position.y--;
		        }
		        else if (d.indexOf('right') > -1 || d.indexOf('down') > -1) {
			        this.position.x++;
			        // todo wan6_7
		        }
	        };
	        Ball.prototype.point7 = function () {
		        var d = this.direction;
		        if (d.indexOf('left') > -1 || d.indexOf('up') > -1) {
			        this.position.x--;
			        // todo wan6_7
		        }
		        else if (d.indexOf('right') > -1 || d.indexOf('down') > -1) {
			        this.position.x++;
			        // todo wan7_8
		        }
	        };
	        Ball.prototype.point8 = function () {
		        var d = this.direction;
		        if (d.indexOf('right') > -1) {
			        this.position.x++;
		        }
		        else if (d.indexOf('left') > -1 || d.indexOf('up') > -1) {
			        this.position.x--;
			        // todo wan7_8
		        }
	        };
	        Ball.prototype.point9 = function () {
		        var d = this.direction;
		        if (d.indexOf('right') > -1 || d.indexOf('up') > -1) {
			        this.position.x++;
			        // todo wan9_10
		        }
		        else if (d.indexOf('left') > -1) {
			        this.position.x--;
		        }
	        };
	        Ball.prototype.point10 = function () {
		        var d = this.direction;
		        if (d.indexOf('right') > -1 || d.indexOf('up') > -1) {
			        this.position.x++;
			        // todo wan10_11
		        }
		        else if (d.indexOf('left') > -1 || d.indexOf('down') > -1) {
			        this.position.x--;
			        // todo wan9_10
		        }
	        };
	        Ball.prototype.point11 = function () {
		        var d = this.direction;
		        if (d.indexOf('up') > -1) {
			        this.position.y--;
		        }
		        else if (d.indexOf('left') > -1 || d.indexOf('down') > -1) {
			        this.position.x--;
			        // todo wan10_11
		        }
	        };
	        Ball.prototype.point12 = function () {
		        var d = this.direction;
		        if (d.indexOf('down') > -1) {
			        this.position.y++;
		        }
	        };
	        Ball.prototype.point13 = function () {
		        var d = this.direction;
		        if (d.indexOf('right') > -1 && d.indexOf('down')) {
			        this.position.x++;
			        // todo wan13_18
		        }
		        else if (d.indexOf('up') > -1) {
			        this.position.y--;
		        }
		        else if (d.indexOf('down') > -1) {
			        this.position.y++;
		        }
	        };
	        Ball.prototype.point14 = function () {
		        var d = this.direction;
		        if (d.indexOf('up') > -1) {
			        this.position.y--;
		        }
		        else if (d.indexOf('down') > -1 || d.indexOf('left') > -1) {
			        this.position.y++;
			        // todo wan14_15
		        }
	        };
	        Ball.prototype.point15 = function () {
		        var d = this.direction;
		        if (d.indexOf('right') > -1) {
			        this.position.x++;
			        // todo wan14_15
		        }
		        else if (d.indexOf('left') > -1) {
			        this.position.x--;
			        // todo wan15_16
		        }
	        };
	        Ball.prototype.point16 = function () {
		        var d = this.direction;
		        if (d.indexOf('up') > -1) {
			        this.position.y--;
		        }
		        else if (d.indexOf('right') > -1 || d.indexOf('down') > -1) {
			        this.position.y++;
			        // todo wan15_16
		        }
	        };
	        Ball.prototype.point17 = function () {
		        var d = this.direction;
		        if (d.indexOf('down') > -1) {
			        this.position.y++;
		        }
	        };
	        Ball.prototype.point18 = function () {
		        var d = this.direction;
		        if (d.indexOf('right') > -1 || d.indexOf('down') > -1) {
			        this.position.x++;
			        // todo wan18_19
		        }
		        else if (d.indexOf('left') > -1 || d.indexOf('up') > -1) {
			        this.position.x--;
			        // todo wan18_13
		        }
	        };
	        Ball.prototype.point19 = function () {
		        var d = this.direction;
		        if (d.indexOf('right') > -1) {
			        this.position.x++;
		        }
		        else if (d.indexOf('left') > -1 || d.indexOf('up') > -1) {
			        this.position.x--;
			        // todo wan18_19
		        }
	        };
	        Ball.prototype.point20 = function () {
		        var d = this.direction;
		        if (d.indexOf('right') > -1 || d.indexOf('down') > -1) {
			        this.position.x++;
			        // todo wan20_21
		        }
		        else if (d.indexOf('left') > -1) {
			        this.position.x--;
		        }
	        };
	        Ball.prototype.point21 = function () {
		        var d = this.direction;
		        if (d.indexOf('down') > -1) {
			        this.position.x++;
			        // todo wan21_22
		        }
		        else if (d.indexOf('left') > -1 && d.indexOf('up') > -1) {
			        this.position.x--;
			        // todo wan20_21
		        }
	        };
	        Ball.prototype.point22 = function () {
		        var d = this.direction;
		        if (d.indexOf('up') > -1) {
			        this.position.x--;
			        // todo wan21_22
		        }
		        else if (d.indexOf('down') > -1) {
			        this.position.y++;
		        }
	        };
	        Ball.prototype.point23 = function () {
		        var d = this.direction;
		        if (d.indexOf('up') > -1) {
			        this.position.y--;
		        }
		        else if (d.indexOf('left') > -1 || d.indexOf('down') > -1) {
			        this.position.x--;
			        // todo wan23_24
		        }
	        };
	        Ball.prototype.point24 = function () {
		        var d = this.direction;
		        if (d.indexOf('up') > -1 ) {
			        this.position.x++;
			        // todo wan23_24
		        }
		        else if (d.indexOf('left') > -1) {
			        this.position.x--;
			        // todo wan24_25
		        }
	        };
	        Ball.prototype.point25 = function () {
		        var d = this.direction;
		        if (d.indexOf('right') > -1 || d.indexOf('up') > -1) {
			        this.position.x++;
			        // todo wan24_25
		        }
		        else if (d.indexOf('left') > -1) {
			        this.position.x--;
		        }
	        };
	        Ball.prototype.point26 = function () {
		        var d = this.direction;
		        if (d.indexOf('right') > -1) {
			        this.position.x++;
		        }
		        else if (d.indexOf('left') > -1 || d.indexOf('up') > -1) {
			        this.position.x--;
			        // todo wan26_27
		        }
	        };
	        Ball.prototype.point27 = function () {
		        var d = this.direction;
		        if (d.indexOf('up') > -1) {
			        this.position.x--;
			        // todo wan27_28
		        }
		        else if (d.indexOf('right') > -1 || d.indexOf('down') > -1) {
			        this.position.x++;
			        // todo wan26_27
		        }
	        };
	        Ball.prototype.point28 = function () {
		        var d = this.direction;
		        if (d.indexOf('up') > -1) {
			        this.position.y--;
		        }
		        else if (d.indexOf('right') > -1 || d.indexOf('down') > -1) {
			        this.position.x++;
			        // todo wan27_28
		        }
	        };
	        Ball.prototype.point29 = function () {
		        var d = this.direction;
		        if (d.indexOf('down') > -1) {
			        this.position.y++;
		        }
		        else if (d.indexOf('right') > -1 || d.indexOf('up') > -1) {
			        this.position.x++;
			        // todo wan29_30
		        }
	        };
	        Ball.prototype.point30 = function () {
		        var d = this.direction;
		        if (d.indexOf('down') > -1) {
			        this.position.x--;
			        // todo wan29_30
		        }
		        else if (d.indexOf('right') > -1 || d.indexOf('up') > -1) {
			        this.position.x++;
			        // todo wan30_31
		        }
	        };
	        Ball.prototype.point31 = function () {
		        var d = this.direction;
		        if (d.indexOf('right') > -1) {
			        this.position.x++;
		        }
		        else if (d.indexOf('left') > -1 || d.indexOf('down') > -1) {
			        this.position.x--;
			        // todo wan30_31
		        }
	        };
	        Ball.prototype.point32 = function () {
		        var d = this.direction;
		        if (d.indexOf('left') > -1) {
			        this.position.x--;
		        }
	        };
	        Ball.prototype.road1_2 = function () {
		        yMove(this.direction, this.position, p1, p2);
	        };
	        Ball.prototype.road2_13 = function () {
		        yMove(this.direction, this.position, p2, p13);
	        };
	        Ball.prototype.road2_3 = function () {
		        xMove(this.direction, this.position, p2, p3);
	        };
	        Ball.prototype.road13_14 = function () {
		        yMove(this.direction, this.position, p13, p14);
	        };
	        Ball.prototype.road16_17 = function () {
		        yMove(this.direction, this.position, p16, p17);
	        };
	        Ball.prototype.road5_6 = function () {
		        yMove(this.direction, this.position, p5, p6);
	        };
	        Ball.prototype.road8_9 = function () {
		        xMove(this.direction, this.position, p8, p9);
	        };
	        Ball.prototype.road11_12 = function () {
		        yMove(this.direction, this.position, p11, p12);
	        };
	        Ball.prototype.road19_20 = function () {
		        xMove(this.direction, this.position, p19, p20);
	        };
	        Ball.prototype.road22_23 = function () {
		        yMove(this.direction, this.position, p22, p23);
	        };
	        Ball.prototype.road25_26 = function () {
		        xMove(this.direction, this.position, p25, p26);
	        };
	        Ball.prototype.road28_29 = function () {
		        yMove(this.direction, this.position, p28, p29);
	        };
	        Ball.prototype.road31_32 = function () {
		        xMove(this.direction, this.position, p31, p32);
	        };
	        Ball.prototype.onPoint = function (callback) {
		        this.listener.push(callback);
	        };
	        Ball.prototype.emitPoint = function (evt) {
		        if (evt !== this.currentPoint) {
			        this.prePoint = this.currentPoint;
			        this.currentPoint = evt;
			        for (var i = 0; i < this.listener.length; i++) {
				        this.listener[i](evt);
			        }
		        }
	        };

	        Ball.prototype.animate = function () {
		        if (this.run) {
			        var me = this;
			        window.requestAnimationFrame(function () {
				        var position = me.position;
				        var x = position.x;
				        var y = position.y;
				        var road = getPoint(x, y) || getRoad(x, y) || getWan(x, y);

				        if (road.indexOf('point') > -1) {
					        me.emitPoint(road);
				        }
				        //console.log(me.direction);
				        me[road]();
				        //console.log(road, position, me.direction);
				        me.$dom.css({left: position.x, top: position.y});
				        me.animate();
			        });
		        }
	        };


            this.mapDom = $('.slide-map');
            this.ruleBtn = this.mapDom.find('.item-btn1');
            this.ball = this.mapDom.find('.item-tip1');
            this.ruleImg = this.mapDom.find('.item-tip2');
            this.ruleCloseBtn = this.ruleImg.find('.item-close');
	        this.ballObj = new Ball(this.ball, 'down');
            var me = this;
	        this.ballObj.onPoint(function (point) {
		        console.log(point);
                me.checkBallPos(point);
	        });
            this.oxImg = this.mapDom.find('.item-tip3');
            this.oxYesBtn = this.oxImg.find('.item-yes');
            this.oxNoBtn = this.oxImg.find('.item-no');

            this.monkeyImg = this.mapDom.find('.item-tip4');
            this.monkeyYesBtn = this.monkeyImg.find('.item-yes');
            this.monkeyNoBtn = this.monkeyImg.find('.item-no');

            this.dragonImg = this.mapDom.find('.item-tip5');
            this.dragonYesBtn = this.dragonImg.find('.item-yes');
            this.dragonNoBtn = this.dragonImg.find('.item-no');

            this.maskDom = this.mapDom.find('.item-mask');

            this.dragInitPos = [131, 35];
            this.ballPos = [131, 35];

            this.bindEvent();
            this.initDrag();

            this.inited = true;
            this.masked = false;
        },

        bindEvent: function () {
            var me = this;
            me.ruleBtn.click(function () {
                me.maskDom.fadeIn();
                me.ruleImg.fadeIn();
                me.masked = true;
            });

            // me.oxImg.fadeIn();
            // me.monkeyImg.fadeIn();
            // me.dragonImg.fadeIn();

            me.maskDom.click(function () {
                me.leave();
            });

            me.ruleCloseBtn.click(function () {
                me.leave();
            });

            me.oxYesBtn.click(function () {
                console.log('go ox page');
                unLockSwiper();
                swiper.slideTo(5, 0);
            });
            me.oxNoBtn.click(function () {
                me.leave();
                return false;
            });

            me.monkeyYesBtn.click(function () {
                console.log('go monkey btn');
                me.leave();
                unLockSwiper();
                swiper.slideTo(3, 0);
            });
            me.monkeyNoBtn.click(function () {
                me.leave();
                return false;
            });

            me.dragonYesBtn.click(function () {
                console.log('go dragon yes');
                unLockSwiper();
                swiper.slideTo(7, 0);
            });
            me.dragonNoBtn.click(function () {
                me.leave();
                return false;
            });
        },

        initDrag: function () {
            var me = this;

            me.positionEmitInter = 100; // 计算位移时间间隔
            me.hammertime = new Hammer(me.mapDom[0], {
                drag_max_touches: 0
            });

            me.hammertime.on("touch", function (ev) {
                me.catchEvt(ev, true);
                var target = ev.target || window.event.srcElement;

                console.log('dragstart');
            });

            me.hammertime.on("touchmove", function (ev) {
                if (!me.holding) {
                    return;
                }
                me.catchEvt(ev);
            });

            me.hammertime.on("touchend", function (ev) {
                me.holding = false;
                if (!ev.gesture) {
                    return;
                }

                ev.gesture.preventDefault();

                console.log('touchend');
                // me.resetPos();
            });
        },

        catchEvt: function(ev, isTouch) {
            var me = this;
            // console.log(ev.gesture);

            if (me.masked) {
                return;
            }
            if (!isTouch) {
                if (ev.changedTouches[0]) {
                    me.dragMove(ev.changedTouches[0].clientX, ev.changedTouches[0].clientY);
                }
                return;
            }
            var touches = ev.gesture.touches;

            if (ev.target.className.indexOf('btn') == -1) {
                ev.gesture.preventDefault();
            }

            for(var t = 0, len = touches.length; t < len; t++) {
                var touchEvt = touches[t];
                var target = touchEvt.target;

                var proxyX = touchEvt.pageX;
                var proxyY = touchEvt.pageY;
                if(isTouch) {
                    me.initTouchX = proxyX;
                    me.initTouchY = proxyY;

                    if (ev.target.className.indexOf('btn') == -1) {
                        me.holding = true;
                    }
                    me.tickTack();

                    me.ballPos = [me.dragInitPos[0], me.dragInitPos[1]];
                }
                me.dragMove(proxyX, proxyY);
            }
        },

        dragMove: function (toLeft, toTop) {
            var me = this;
            var moLeft = toLeft - me.initTouchX;
            var moTop = toTop - me.initTouchY;
            /*console.log('target:', tarLeft, tarTop
                , ' | ball:', ballX, ballY
                , ' | move:', moLeft, moTop);*/
	        this.ballObj.setDirection(moLeft, moTop);


            if (me.checkTimer) {
                clearTimeout(me.checkTimer);
            }

            if (!me.holding || me.masked) {
                return;
            }

            if ('point17' == me.ballObj.currentPoint || 'point12' == me.ballObj.currentPoint || 'point32' == me.ballObj.currentPoint) {
                me.checkTimer = setTimeout(function () {
                    if (me.masked) {
                        return;
                    }
                    if ('point17' == me.ballObj.currentPoint && Math.ceil(me.ball.position()['top']) == 210) {
                            me.maskDom.fadeIn();
                            me.oxImg.fadeIn();
                    }
                    else if ('point12' == me.ballObj.currentPoint && Math.ceil(me.ball.position()['top']) == 250) {
                            me.maskDom.fadeIn();
                            me.monkeyImg.fadeIn();
                    }
                    else if ('point32' == me.ballObj.currentPoint && Math.ceil(me.ball.position()['top']) == 361 && Math.ceil(me.ball.position()['left'] == 110)) {
                        me.maskDom.fadeIn();
                        me.dragonImg.fadeIn();
                    }
                }, 500);
            }
        },

        tickTack: function () {
            console.log('tick tack');
        },

        resetPos: function () {
            console.log('reset post');

            this.holding = false;
            clearTimeout(this.positionEmitter);

            // me.tickTack();
        },

        checkBallPos: function (pointName) {
            switch (pointName) {
                case 'point17':
                    this.maskDom.fadeIn();
                    this.oxImg.fadeIn();
                    break;
                case 'point12':
                    this.maskDom.fadeIn();
                    this.monkeyImg.fadeIn();
                    break;
                case 'point32':
                    this.maskDom.fadeIn();
                    this.dragonImg.fadeIn();
                    break;
            }
        },

        showTip: function (type) {
            switch (type) {
                case 'rule':
                    break;
                case 'ox':
                    break;
                case 'monkey':
                    break;
                case 'dragon':
                    break;
            }
        },

        leave: function () {
            this.maskDom.fadeOut();
            this.ruleImg.fadeOut();
            this.oxImg.fadeOut();
            this.monkeyImg.fadeOut();
            this.dragonImg.fadeOut();
            this.masked = false;
            this.holding = false;
        }
    };

    mapControl.init();

    var blackboardEraser = {
        holding: false,
        inBlackboardPage: false,
        init: function () {
            this.wrapper = $('.slide-5');
            this.eraser = this.wrapper.find('.item-block1 .item-tip3');
            this.blackboardText = this.wrapper.find('.item-block1 .item-tip4');
            this.blackboardBox = this.wrapper.find('.item-block1 .item-tip5');
            this.maskDom = this.wrapper.find('.item-mask');
            this.awardImg = this.wrapper.find('.item-award');
            this.awardClose = this.wrapper.find('.item-award .item-close');
            this.CDKInput = this.wrapper.find('.item-cdk-input');

            this.bindEvent();
        },

        refresh: function () {
            this.masked = false;
            this.holding = false;
            this.enterBoard = false;
            this.inBlackboardPage = true;
            this.blackboardText.hide();
            this.blackboardBox.removeClass('board-box-shake').hide();

            this.checkSavedSDK();
        },

        checkSavedSDK: function () {
            var savedCDK = localStorage.getItem('openid_cdk');
            if (savedCDK) {
                this.CDKInput.val(savedCDK);
            }
            else {
                // test
                this.CDKInput.val('test_CDK');
            }
        },

        bindEvent: function () {
            var me = this;

            me.blackboardBox.click(function () {
                // me.maskDom.fadeIn();
                // me.awardImg.fadeIn();
                // me.masked = true;
                unLockSwiper();
                swiper.slideTo(9, 0);
                lockSwiper();
            });

            // me.maskDom.click(function () {
            //     me.maskClose();
            // });

            // me.awardClose.click(function () {
            //     me.maskClose();
            // });

            me.initDrag();
        },

        maskClose: function () {
            this.maskDom.fadeOut();
            this.awardImg.fadeOut();
            this.masked = false;
        },

        initDrag: function () {
            var me = this;

            me.hammertime = new Hammer(me.wrapper[0], {
                drag_max_touches: 0
            });

            me.hammertime.on("touch", function (ev) {
                me.catchEvt(ev, true);
                console.log('dragstart');
            });

            me.hammertime.on("touchmove", function (ev) {
                if (!me.holding) {
                    return;
                }
                me.catchEvt(ev);
            });

            me.hammertime.on("touchend", function (ev) {
                me.holding = false;
                if (!ev.gesture) {
                    return;
                }
                console.log('touchend');
            });
        },

        catchEvt: function(ev, isTouch) {
            var me = this;
            // console.log(ev.gesture);

            if (!me.inBlackboardPage || me.masked) {
                return;
            }
            if (!isTouch) {
                if (ev.changedTouches[0]) {
                    me.dragMove(ev.changedTouches[0].clientX, ev.changedTouches[0].clientY);
                }
                return;
            }
            var touches = ev.gesture.touches;

            if (ev.target.className.indexOf('btn') == -1) {
                ev.gesture.preventDefault();
            }

            for(var t = 0, len = touches.length; t < len; t++) {
                var touchEvt = touches[t];
                var target = touchEvt.target;

                var proxyX = touchEvt.pageX;
                var proxyY = touchEvt.pageY;
                if(isTouch && ev.target.className.indexOf('item-eraser') > -1) {
                    me.initTouchX = proxyX;
                    me.initTouchY = proxyY;
                    me.holding = true;

                    lockSwiper();

                    var eraserPos = me.eraser.position();
                    me.eraserPos = [eraserPos['left'], eraserPos['top']];
                    console.log(me.eraserPos);


                }
                me.dragMove(proxyX, proxyY);
            }
        },

        dragMove: function (toLeft, toTop) {
            var me = this;
            if (!me.holding) {
                return;
            }

            var moLeft = toLeft - me.initTouchX;
            var moTop = toTop - me.initTouchY;

            var initLeft = me.eraserPos[0];
            var initTop = me.eraserPos[1];

            var tarLeft = initLeft + moLeft;
            var tarTop = initTop + moTop;
            console.log('target:', tarLeft, tarTop
                , ' | move:', moLeft, moTop);


            if (tarLeft <= 10) {
                tarLeft = 10;
            }
            else if (tarLeft > 208) {
                tarLeft = 208;
            }

            if (tarTop <= 0) {
                tarTop = 0;
            }
            else if (tarTop > 400) {
                tarTop = 400;
            }

            me.checkInBoard(tarTop);

            me.eraser.css({
                left: tarLeft,
                top: tarTop
            });
        },

        checkInBoard: function (tarTop) {
            var me = this;
            if (me.enterBoard) {
                return;
            }

            if (tarTop < 130) {
                me.enterBoard = true;
                me.clearBoardTimer = setTimeout(function () {
                    if (me.inBlackboardPage) {
                        me.blackboardText.fadeIn(200, null, function () {
                            me.blackboardBox.addClass('board-box-shake').show();
                        });
                        me.eraser.fadeOut(100);
                    }
                }, 1000);
            }
        }

    };

    blackboardEraser.init();


    var oxComputer = {
        init: function function_name() {
            this.blockDom = $('.slide-7 .item-block1');
            this.tip1Text = this.blockDom.find('.item-tip2');
            this.tip2Text = this.blockDom.find('.item-tip3');
            this.dateInput = this.blockDom.find('.item-date-input');
            this.checkBtn = this.blockDom.find('.item-tip4');

            this.bindEvent();
        },

        bindEvent: function () {
            var me = this;
            me.dateInput.click(function () {
                me.dateInput.focus();
                me.tip1Text.show();
                me.tip2Text.hide();
            });

            me.checkBtn.click(function () {
                if (me.dateInput.val() != 28) {
                    me.tip1Text.hide();
                    me.tip2Text.show();
                }
                else {
                    me.gotoAward();
                }
            });
        },

        gotoAward: function () {
            console.log('goto award');
            unLockSwiper();
            swiper.slideTo(9, 0);
            lockSwiper();
        }
    };

    oxComputer.init();

    var musicControl = {
        holding: false,
        inMusicPage: false,
        init: function () {
            var me = this;
            me.triggerBtn = $('.slide-8 .item-block3');
            me.pageDom = $('.slide-microphone');
            me.musicBtn = $('.slide-microphone .item-close');

            me.hammertime = new Hammer(me.musicBtn[0], {
                drag_max_touches: 0
            });

            me.hammertime.on("touch", function (ev) {
                if (true == me.holding) {
                    return;
                }
                me.holding = true;
                me.holdingTime = new Date().getTime();

                if (me.checkTimer) {
                    clearTimeout(me.checkTimer);
                }
                me.checkTimer = setTimeout(function () {
                    me.checkTime();
                }, 2000);

            });

            me.hammertime.on("touchend", function (ev) {
                me.checkTime();
                me.holding = false;
                me.holdingTime = false;
            });

            me.triggerBtn.on('click', function () {
                me.triggerBtn.find('.item-tip2').hide();
                me.pageDom.fadeIn(2000);
            });
        },

        checkTime: function () {
            if (this.holding && this.holdingTime) {
                var newTime = new Date().getTime();

                if (newTime - this.holdingTime >= 1000) {
                    clearTimeout(this.checkTimer);
                    this.holding = false;
                    this.holdingTime = false;
                    this.gotoAward();
                }
            }
        },

        gotoAward: function () {
            unLockSwiper();
            swiper.slideTo(9, 0);
            lockSwiper();
        }
    };

    musicControl.init();



});

