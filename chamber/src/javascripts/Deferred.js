/**
 * Created by tingkl on 16/7/13.
 */
var Promise = require('Promise');
function Deferred() {
    this.state = Deferred.state.unfulfilled;
    this.promise = new Promise();
};
Deferred.state = {
    unfulfilled: 'unfulfilled',
    fulfilled: 'fulfilled',
    failed: 'failed'
};
Deferred.prototype.resolve = function() {
    //console.log("resolve", arguments);
    this.state = Deferred.state.fulfilled;
    var args =  $.toArray(arguments);
    args.splice(0, 0, Promise.event.success);
    this.promise.emit.apply(this.promise, args);
};
Deferred.prototype.reject = function() {
    this.state = Deferred.state.failed;
    var args =  $.toArray(arguments);
    args.splice(0, 0, Promise.event.error);
    this.promise.emit.apply(this.promise, args);
};
Deferred.prototype.progress = function() {
    var args =  $.toArray(arguments);
    args.splice(0, 0, Promise.event.progress);
    this.promise.emit.apply(this.promise, args);
};
Deferred.prototype.all = function(promises) {
    var count = promises.length;
    var that = this;
    var results = [];
    promises.each(function(promise, index) {
        promise.then(function(data) {
            count --;
            results[index] = data;
            if (count === 0) {
                that.resolve(results);
            }
        }, function(err) {
            that.reject(err);
        });
    });
    return this.promise;
};
module.exports = Deferred;