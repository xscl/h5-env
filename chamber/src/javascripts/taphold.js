/**
 * Created by tingkl on 16/7/15.
 */
var $ = require('jquery');
module.exports = {
    bind: function (selector, callback) {
        var timeout;
        function handler(evt) {
            var me = this;
            timeout = setTimeout(function () {
                callback.apply(me);
            }, 1000);
            evt.preventDefault();
        }
        $(selector).bind('touchstart', handler).on('touchend', function () {
            clearTimeout(timeout);
        }).on('touchcancel', function () {
            clearTimeout(timeout);
        });
        return handler;
    },
    unbind: function (selector, handler) {
        $(selector).unbind('touchstart', handler);
    }
};