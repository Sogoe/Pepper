/**
 * Created by Sogoe on 2015/6/26.
 */
window.requestNextAnimationFrame =
    (function() {
        return window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.oRequestAnimationFrame ||
                window.msRequestAnimationFrame ||
                function(callBack, element) {
                    var self, start, finish;

                    window.setTimeout(function() {
                        start = +new Date();
                        callBack(start);
                        finish = +new Date();

                        self.timeout = 1000 / 60 - (finish - start);
                    }, self.timeout);
                }
    })();