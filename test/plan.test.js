"use strict";

var planr = require('../');
var t = require('chai').assert;
require('./support');

describe('planr/plan', function () {

    it('should schedule a job', function (done) {
        var data = {};
        var start = Date.now();
        var plan = planr.plan({ time: '0.1s' }, function (a, b) {
            t.equal(a, 1);
            t.equal(b, data);
            t.timeBetween(Date.now(), start, 100);
            done();
        });
        plan.signal(1, data);
    });

    it('should delay the exactly time ignore re-signal within scheduled time', function (done) {
        var data = {};
        var start = Date.now();
        var plan = planr.plan({ time: '0.1s'}, function (a, b) {
            t.equal(a, 1);
            t.equal(b, data);
            t.timeBetween(Date.now(), start, 100);
            done();
        });
        plan.signal(1, data);
        setTimeout(function () {
            plan.signal(1, data);
        }, 50);
    });

    it('should continuous delay job when continuous is true', function (done) {
        var data = {};
        var start = Date.now();
        var plan = planr.plan({ continuous: true, time: '0.1s'}, function (a, b) {
            t.equal(a, 1);
            t.equal(b, data);
            t.timeBetween(Date.now(), start, 150);
            done();
        });
        plan.signal(1, data);
        setTimeout(function () {
            plan.signal(1, data);
        }, 50);
    });

    it('should execute 2 times for 2 different keys', function (done) {
        var data = {};
        var p = t.plan(2, done);
        var plan = planr.plan({ time: '0.1s'}, function (a, b) {
            t.equal(b, data);
            p.done();
        });
        plan.signal(1, data);
        plan.signal(2, data);
    });

    it('should execute only one time for two same content object keys', function (done) {
        var data = {};
        var p = t.plan(1, done);
        var plan = planr.plan({ time: '0.1s'}, function (a, b) {
            t.equal(b, data);
            p.done();
        });
        plan.signal({ a: 1 , b: { c: 2 }}, data);
        plan.signal({ a: 1 , b: { c: 2 }}, data);
    });

    it('should execute only one time using custom hash function with object key', function (done) {
        var data = {};
        var p = t.plan(1, done);
        var plan = planr.plan({ time: '0.1s'}, function (a, b) {
            t.equal(b, data);
            p.done();
        }, function (key) {
            return JSON.stringify(key);
        });
        plan.signal({ foo: 1 }, data);
        plan.signal({ foo: 1 }, data);
    });
});
