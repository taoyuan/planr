"use strict";

var schedule = require('node-schedule');
var utils = require('./utils');

module.exports = Plan;

function Plan(options, fn, hashFn) {
    if (!(this instanceof Plan)) {
        return new Plan(options, fn, hashFn);
    }

    if (typeof options === 'function') {
        hashFn = fn;
        fn = options;
        options = {};
    }
    this._options = utils.assign({
        continuous: false,
        time: '1s',
        scope: null
    }, options);
    this._fn = fn;
    this._hashFn = hashFn || function (value) { return value };

    this.jobs = {};
}

Plan.prototype.signal = function (key, data) {
    var self = this;
    var opts = this._options;
    var fn = this._fn;

    var hashKey = this._hashFn(key);
    var job = this.jobs[hashKey];


    if (job && !opts.continuous) return;

    if (job) job.cancel();

    var time = opts.time;
    if (typeof time === 'string') {
        time = Date.now() + utils.parseTime(time);
    }

    this.jobs[hashKey] = schedule.scheduleJob(time, function () {
        delete self.jobs[hashKey];
        fn.call(opts.scope, key, data);
    });
};