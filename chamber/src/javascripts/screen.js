/**
 * Created by tingkl on 16/7/14.
 */
var $ = require('jquery');
var orientation;
var handler;
var width, height;
function orient() {
    if (window.orientation != undefined) {
        if (window.orientation == 0 || window.orientation == 180) {
            orientation = 'portrait';

        }
        else if (window.orientation == 90 || window.orientation == -90) {
            orientation = 'landscape';
        }
    } else {
        orientation = (window.innerWidth > window.innerHeight) ? "landscape": "portrait"
    }
    if (orientation === 'portrait') {
        height = $(window).height();
        width = $(window).width();
    }
    else {
        width = $(window).height();
        height = $(window).width();
    }
    //console.log(window.orientation + ',' +  orientation + ',' + width + ',' + height);
    return false;
}
function proxy(callback) {
    return function orient() {
        if (window.orientation == 0 || window.orientation == 180) {
            $("body").attr("class", "portrait");
            if (orientation !== 'portrait') {
                orientation = 'portrait';
                if (!mockMobile) {
                    height = $(window).height();
                    width = $(window).width();
                }
                callback(true, width, height);
            }
            return false;
        }
        else if (window.orientation == 90 || window.orientation == -90) {
            $("body").attr("class", "landscape");
            if (orientation !== 'landscape') {
                orientation = 'landscape';
                if (!mockMobile) {
                    width = $(window).height();
                    height = $(window).width();
                }
                callback(false, width, height);
            }
            return false;
        }
    }
}
$(orient);
var mockMobile = false;
module.exports = {
    start: function (callback) {
        handler = proxy(callback);
        $(window).bind('orientationchange', handler);
    },
    stop: function () {
        $(window).unbind('orientationchange', handler);
    },
    sync: function (callback) {
        if (orientation === 'portrait') {
            callback(true, width, height);
        }
        else {
            callback(false, width, height);
        }
    },
    setMock: function (mock) {
        mockMobile = mock;
    }
};