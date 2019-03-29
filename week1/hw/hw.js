"use strict";
exports.__esModule = true;
var node_fetch_1 = require("node-fetch");
// to call this function, you'll need to do two things
// 1st, your function must have the keyword "async" before the parameters
// 2nd when you call it, you must preface it with "await"
// like this: await getDataFromAPI(url)
var getDataFromAPI = function (url) {
    return new Promise(function (res, rej) {
        node_fetch_1["default"](url)
            .then(function (data) { return data.json(); })
            .then(function (json) {
            // the json variable here is just the stuff you see in the browser
            res(json);
        })["catch"](function (err) { return rej(err); });
    });
};
// write your homework here
// put all this in your "objectively" function after you make it
var whatAmI = { 0: 'A', 1: 'B', 2: 'C', 3: 'D' };
// put this stuff in your "awry" function after you make it
var docTester = [];
// fill docTester with 1000 random integers between 0 and 99
for (var i = 0; i < 1000; i++)
    docTester[i] = Math.floor(Math.random() * 100);
console.log(docTester);
