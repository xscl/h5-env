var $ = jQuery = require('jquery');
function getPromise(paths, callback) {
    var map = {};
    for (var i = 0; i< paths.length; i++) {
        map[paths[i]] = false;
    }
    var count = 0;
    return function (path) {
        map[path] = true;
        count ++;
        var flag = true;
        for (var key in map) {
            if (map[key] === false) {
                flag = false;
                break;
            }
        }
        if (flag) {
            callback(true, count, paths.length, map);
        }
        else {
            callback(false, count, paths.length, path);
        }
    }
}
module.exports = {
    loadImage: function (path, promise) {
        $('<img/>').on('load', function () {
            promise(path);
        }).attr('src', path);
    },
    loadImages: function (paths, callback) {
        var promise = getPromise(paths, callback);
        for (var i = 0; i< paths.length; i++) {
           this.loadImage(paths[i], promise);
        }
    }
};