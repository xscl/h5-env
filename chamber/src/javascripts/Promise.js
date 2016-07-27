/**
 * Created by tingkl on 16/7/13.
 */
var EventEmitter = require('EventEmitter');
function Promise() {
    Promise.superClass.call(this);
};
Promise.event = {
    success: 'success',
    error: 'error',
    progress: 'progress'
};
function extend (child, parent) {
    var Child = null,
        Parent = null;
    if (typeof child === 'function') {
        Child = child;
    } else if (typeof child === 'string') {
        Child = this.get(child);
    }
    if (Child === null) {
        throw new Error('Child类型错误！');
    }
    if (typeof parent === 'function') {
        Parent = parent;
    } else if (typeof parent === 'string') {
        Parent = this.get(parent);
    }
    if (Parent === null) {
        throw new Error('Parent类型错误！');
    }
    var Clz = new Function();
    Clz.prototype = Parent.prototype;
    Child.prototype = new Clz();
    Child.prototype.constructor = Child;
    Child.superClass = Parent;
}
extend(Promise, EventEmitter);
Promise.prototype.then = function (fulfilledHandler, errorHandler, progressHandler) {
    if ($.isFunction(fulfilledHandler)) {
        this.on(Promise.event.success, fulfilledHandler);
    }
    if ($.isFunction(errorHandler)) {
        this.on(Promise.event.error, errorHandler);
    }
    if ($.isFunction(progressHandler)) {
        this.on(Promise.event.progress, progressHandler);
    }
    return this;
}
module.exports = Promise;