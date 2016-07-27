/**
 * Created by tingkl on 16/7/27.
 */
(function($, window) {
	var audioOn = true,
		audio = $('#music_audio')[0],
		sourceId = getparam("star-carpool-source") || "default";
	var baseName = "star-carpool",
		baseUrl = "http://static.udache.com/gulfstream/webapp/modules/" + baseName + "/",
		shareUrl = "http://gsactivity.diditaxi.com.cn/gulfstream/activity/v2/gsactivity/microActivity?product=taxi&details=2&redirect_url=" + encodeURIComponent(baseUrl + "index.html?star-carpool-source=" + sourceId),
		rpUrl = "",
		dstitle = "杨幂，你出大事了，周一见！",
		dicon = baseUrl + "images/yangmi2.jpg",
		ddesc = "下周一，12月7日，都拼出大事了！";
	var wxdata = {
		title: dstitle,
		link: shareUrl,
		icon: dicon,
		desc: ddesc,
		success: function() {
			//didi.trace("share_succ");
			_hmt.push(['_trackEvent', 'share-succ-star-carpool-' + sourceId, 'click']);
		},
		cancel: function() {}
	};
	var shareTitle = {
			3: '杨幂，你出大事了，周一见！',
			4: '贾乃亮，你出大事了，周一见！',
			5: '李小璐，你出大事了，周一见！',
			6: '杨宗纬，你出大事了，周一见！',
			7: '夏雨，你出大事了，周一见！'
		},
		name2 = [' ', ' ', ' ', '杨幂', '贾乃亮', '李小璐', '杨宗纬', '夏雨'],
		headimgurl = baseUrl + 'images/headimg.jpg',
		name3 = [' ', ' ', ' ', 'yangmi2', 'jianailiang2', 'xiaolu2', 'yangzongwei2', 'xiayu2'];

	function getparam(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if (r != null) return unescape(r[2]);
		return null;
	}

	function setDate() {
		getDate();
		setInterval(getDate, 10000);
	};

	function getDate() {
		var dayNames = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
			d = new Date(),
			h = d.getHours(),
			m = d.getMinutes(),
			mo = d.getMonth() + 1,
			m2 = [],
			day = d.getDate(),
			week = dayNames[d.getDay()],
			h2 = [];
		if (m < 10) {
			m = "0" + m;
		};
		$('.time2').html(h + ':' + m);
		$('.date').html(mo + '月' + day + '日 ' + week);
		if (h > 10) {
			h2 = h.toString().split('');
			$('.sb1').css("background-position-y", (-h2[0] * 100) + "%");
			$('.sb2').css("background-position-y", (-h2[1] * 100) + "%");
		} else {
			$('.sb1').css("display", "none");
			$('.sb2').css("background-position-y", (-h2[0] * 100) + "%");
		};
		m2 = m.toString().split('');
		$('.sb4').css("background-position-y", (-m2[0] * 100) + "%");
		$('.sb5').css("background-position-y", (-m2[1] * 100) + "%");
	};

	function initLoader() {
		$(".wp").queryLoader2({
			barColor: "#000",
			backgroundColor: '#000',
			percentage: false,
			barHeight: 6,
			onProgress: function(loaded, len) {
				/*	//console.log(loaded+"-"+len);
				 var val = parseInt(loaded);
				 $(".loading-overlay .load-plane").css("-webkit-transform","translate3D("+val+"%,0,0)");
				 $(".loading-overlay .load-bar .lbar").width(val+"%");
				 $(".loading-overlay .load-bar .lnum").html(val+"%");*/
			},
			onComplete: function() {
				/*$(".loading-overlay").addClass("fadeOut");
				 setTimeout(function () {
				 $(".loading-overlay").hide();
				 },1000)
				 */
				startPage();
				//startFullpage();
			},
			overlayId: 'myOverlay',
			percentageId: 'myqLpercentage',
			deepSearch: true,
			minimumTime: 300,
			maxTime: 10000,
			fadeOutTime: 300
		});
	}

	function audioPlay() {
		audio.src = "audio/audio.mp3";
		audio.pause();
		audio.play();
	};

	function hashchange() {
		if (location.hash == "") {
			$(".mp").hide();
			$(".wp-2").show();
		};

	};

	function initEvent() {
		var call = function(e){
			e.preventDefault();
		};
		$('body').on("touchmove",call);
		window.addEventListener("hashchange", hashchange);
		$('.wp-2').on("click", '.list2', function() {
			var name = $(this).attr('data-name') * 1;
			if (name * 1 < 8) {
				window.location.hash = "page-next";
				$('.wp-2').css('display', 'none');
				$(".wp-" + name).css('display', 'block');
				document.title = name2[name];
				var $body = $('body');
				// hack在微信等webview中无法修改document.title的情况
				var $iframe = $('<iframe src="/favicon.ico"></iframe>').on('load', function() {
					setTimeout(function() {
						$iframe.off('load').remove()
					}, 0)
				}).appendTo($body);
				wxdata.icon = baseUrl + "images/" + name3[name] + ".jpg";
				wxdata.title = shareTitle[name];
				console.log(wxdata.title);
				didi.setShare(wxdata);

				if (name == 3) {
					$('.wp-3 .msg1').addClass('showmsg');
					setTimeout(function() {
						$('.wp-3 .msg2').addClass('showmsg');
					}, 1000);
					setTimeout(function() {
						$('.wp-3 .msg3').addClass('showmsg');
					}, 2000);
					setTimeout(function() {
						$('.wp-3 .msg4').addClass('showmsg');
					}, 3000);
					setTimeout(function() {
						$('.wp-3 .msg5').addClass('showmsg');
					}, 4000);
					setTimeout(function() {
						$('.wp-3 .msg6').addClass('showmsg');
					}, 5000);
					setTimeout(function() {
						$('.wp-3 .msg7').addClass('showmsg');
					}, 6000);
				} else if (name == 4) {
					$('.wp-4 .msg1').addClass('showmsg');

					setTimeout(function() {
						$('.wp-4 .msg2').addClass('showmsg');
					}, 1000);
					setTimeout(function() {
						$('.wp-4 .msg3').addClass('showmsg');
					}, 2000);
					setTimeout(function() {
						$('.wp-4 .msg4').addClass('showmsg');
					}, 3000);
					setTimeout(function() {
						$('.wp-4 .msg5').addClass('showmsg');
					}, 4000);
				} else if (name == 5) {
					$('.wp-5 .msg1').addClass('showmsg');
					setTimeout(function() {
						$('.wp-5 .msg2').addClass('showmsg');
					}, 1000);
					setTimeout(function() {
						$('.wp-5 .msg3').addClass('showmsg');
					}, 2000);
					setTimeout(function() {
						$('.wp-5 .msg4').addClass('showmsg');
					}, 3000);
				} else if (name == 6) {
					$('.wp-6 .msg1').addClass('showmsg');
					setTimeout(function() {
						$('.wp-6 .msg2').addClass('showmsg');
					}, 1000);
					setTimeout(function() {
						$('.wp-6 .msg3').addClass('showmsg');
					}, 2000);
					setTimeout(function() {
						$('.wp-6 .msg4').addClass('showmsg');
					}, 3000);
					setTimeout(function() {
						$('.wp-6 .msg5').addClass('showmsg');
					}, 4000);
					setTimeout(function() {
						$('.wp-6 .msg6').addClass('showmsg');
					}, 5000);
					setTimeout(function() {
						$('.wp-6 .msg7').addClass('showmsg');
					}, 6000);
				} else if (name == 7) {
					$('.wp-7 .msg1').addClass('showmsg');
					setTimeout(function() {
						$('.wp-7 .msg2').addClass('showmsg');
					}, 1000);
					setTimeout(function() {
						$('.wp-7 .msg3').addClass('showmsg');
					}, 2000);
					setTimeout(function() {
						$('.wp-7 .msg4').addClass('showmsg');
					}, 3000);
					setTimeout(function() {
						$('.wp-7 .msg5').addClass('showmsg');
					}, 4000);
					setTimeout(function() {
						$('.wp-7 .msg6').addClass('showmsg');
					}, 5000);
				};
			} else {
				if (name * 1 == 8) {
					window.location.href = "http://gsactivity.diditaxi.com.cn/gulfstream/activity/v2/giftpackage/index?g_channel=91e2edcf43a79de9bced8ed05e823ae9";
				} else if (name * 1 == 9) {
					window.location.href = "http://static.udache.com/gulfstream/webapp/modules/star-flier/index.html?single=false";
				} else if (name * 1 == 10) {
					window.location.href = "http://dc.tt/Krz2";
				};
			};
		});
		$('.over').on('click', function() {
			var name = $(this).attr("data-name");
			window.location.href = 'http://static.udache.com/gulfstream/webapp/modules/star-flier/index.html?single=false&star=' + name;
		});

	}

	function setHtml() {
		//获取页面的宽度
		setTimeout(function() {
			var htmlElm = $('html'),
				width = $(window).width(),
				fontSize = width * 13 / 320;
			if (fontSize >= 30) {
				fontSize = 30;
			};
			$('html').css({
				fontSize: fontSize + 'px'
			});
			$(window).on('resize', function() {
				var width = $(window).width(),
					fontSize = width * 13 / 320;
				if (fontSize >= 30) {
					fontSize = 30;
				};
				$('html').css({
					fontSize: fontSize + 'px'
				});
			}, 300);
		});
	}

	function autoPlay() {
		if (audioOn) {
			audio.play();
		}
	};

	function leftToRight(e) {
		var el = document.querySelector('.wp-1');
		var startPosition, endPosition, deltaX, deltaY, moveLength;

		el.addEventListener('touchstart', function(e) {
			e.preventDefault();
			var touch = e.changedTouches[0];
			startPosition = {
				x: touch.pageX,
				y: touch.pageY,
				startdate: Date.now()
			}
		});
		el.addEventListener('touchmove', function(e) {
			e.preventDefault();
			var touch = e.changedTouches[0];
			movePosition = {
				x: touch.pageX,
				y: touch.pageY,
				startdate: Date.now()
			}
			var x_m = movePosition.x - startPosition.x;
			if (x_m < 0) {
				x_m = 0;
			};
			$(".wp-2").css("display", "block");
			$('.wp-1').css("transform", "translate(" + x_m + "px,0)");
		});
		el.addEventListener('touchend', function(e) {
			e.preventDefault();
			var touch = e.changedTouches[0];
			endPosition = {
				x: touch.pageX,
				y: touch.pageY,
				enddate: Date.now()
			}

			deltaX = endPosition.x - startPosition.x;
			deltaY = endPosition.y - startPosition.y;
			date = endPosition.enddate - startPosition.startdate;
			moveLength = Math.sqrt(Math.pow(Math.abs(deltaX), 2) + Math.pow(Math.abs(deltaY), 2));
			console.log(deltaX);
			console.log(date);
			if (deltaX >= 30 && Math.abs(deltaY) <= 75 && date <= 1000) {
				console.log("swipeLeftToRight");
				$('.wp-1').css("transform", "translate(0,0)");
				$('.wp-1').css("display", "none");
				$(".wp-2").css("display", "block");
				var $body = $('body');
				document.title = '微信(8)';
				// hack在微信等webview中无法修改document.title的情况
				var $iframe = $('<iframe src="/favicon.ico"></iframe>').on('load', function() {
					setTimeout(function() {
						$iframe.off('load').remove();
					}, 0);
				}).appendTo($body);
			} else {
				$('.wp-1').css("transform", "translate(0,0)");
			};
		});
		/*el.addEventListener('touchcancel', function(e) {
		 var touch = e.changedTouches[0];
		 endPosition = {
		 x: touch.pageX,
		 y: touch.pageY,
		 enddate: Date.now()
		 }

		 deltaX = endPosition.x - startPosition.x;
		 deltaY = endPosition.y - startPosition.y;
		 date = endPosition.enddate - startPosition.startdate;
		 moveLength = Math.sqrt(Math.pow(Math.abs(deltaX), 2) + Math.pow(Math.abs(deltaY), 2));
		 console.log(deltaX);
		 console.log(date);
		 if (deltaX >= 30 && Math.abs(deltaY) <= 75 && date <= 1000) {
		 console.log("swipeLeftToRight");
		 $('.wp-1').css("transform", "translate(0,0)");
		 $('.wp-1').css("display", "none");
		 $(".wp-2").css("display", "block");
		 document.title = '微信(8)';
		 // hack在微信等webview中无法修改document.title的情况
		 var $iframe = $('<iframe src="/favicon.ico"></iframe>').on('load', function() {
		 setTimeout(function() {
		 $iframe.off('load').remove();
		 }, 0);
		 }).appendTo($body);
		 } else {
		 $('.wp-1').css("transform", "translate(0,0)");
		 };
		 });*/
	}

	function getheadimg() {
		if (didi.is("weixin")) {
			headimgurl = didi.query("headimgurl");
			$('.mymsg .head img').attr("src", headimgurl);
		}

	};

	function startPage() {
		var list = $('.list'),
			length = list.length;
		setTimeout(function() {
			$('.list').eq(0).addClass('showmsg');
			audioPlay();
		}, 1000);
		setTimeout(function() {
			$('.list').eq(1).addClass('showmsg');
			audioPlay();
		}, 2000);
		setTimeout(function() {
			$('.list').eq(2).addClass('showmsg');
			audioPlay();
		}, 3000);
		setTimeout(function() {
			$('.list').eq(3).addClass('showmsg');
			audioPlay();
		}, 4000);
		setTimeout(function() {
			$('.list').eq(4).addClass('showmsg');
			audioPlay();
		}, 5000);
		setTimeout(function() {
			$('.wp-1 .bottom').show();
			leftToRight();
		}, 5500);
	};

	function initPage() {
		initLoader();
		initEvent();
		setHtml();
		didi.setShare(wxdata);
		// leftToRight();
		getheadimg();
		setDate();
		_hmt.push(['_trackEvent', 'sourceid-' + sourceId, 'click']);
	}
	initPage();
})(Zepto, window)