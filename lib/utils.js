"use strict";

var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

exports.assign = assign;
function assign(a, b) {
    if (a && b) {
        for (var key in b) if (b.hasOwnProperty(key)) {
            a[key] = b[key];
        }
    }
    return a;
}

exports.parseTime = parseTime;
function parseTime(s) {
    var key, number, timeUnits, unit, _i, _len, _ref;
    timeUnits = {
        year: {
            patterns: ["year", "years", "Y"],
            period: 365 * 24 * 60 * 60 * 1000
        },
        month: {
            patterns: ["month", "months", "M"],
            period: 30 * 7 * 24 * 60 * 60 * 1000
        },
        week: {
            patterns: ["week", "weeks", "W"],
            period: 7 * 24 * 60 * 60 * 1000
        },
        day: {
            patterns: ["day", "days", "D"],
            period: 24 * 60 * 60 * 1000
        },
        hour: {
            patterns: ["hour", "hours", "h"],
            period: 60 * 60 * 1000
        },
        minute: {
            patterns: ["minute", "minutes", "m"],
            period: 60 * 1000
        },
        second: {
            patterns: ["second", "seconds", "s"],
            period: 1000
        }
    };
    number = parseFloat(s.replace(/[a-zA-Z]+/g, "").trim());
    unit = s.replace(/[^a-zA-Z]+/g, "").trim();
    _ref = Object.keys(timeUnits);
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        key = _ref[_i];
        if (__indexOf.call(timeUnits[key].patterns, unit) >= 0) {
            return timeUnits[key].period * (number > 0 ? number : 1);
        }
    }
}