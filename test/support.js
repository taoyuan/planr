"use strict";

var t = require('chai').assert;

t.timeBetween = function (t1, t2, elapse, delta) {
    delta = delta || 10;
    return t.ok((Math.abs(Math.abs(t2 - t1) - elapse)) < delta);
};

t.plan = function (times, done) {
    return {
        done: function () {
            if (times <= 0) throw new Error('More than the plan times: ' + times);
            !(--times) && done();
        }
    }
};