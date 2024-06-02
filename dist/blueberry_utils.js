"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assert = exports.rand = exports.make_environment = void 0;
// Function from https://github.com/tsoding/olive.c/blob/master/js/vc.js
function make_environment(...envs) {
    return new Proxy(envs, {
        get(_, prop) {
            for (let env of envs) {
                if (env.hasOwnProperty(prop)) {
                    return env[prop];
                }
            }
            return (...args) => { console.error("NOT IMPLEMENTED: " + prop, args); };
        }
    });
}
exports.make_environment = make_environment;
function rand() {
    return Math.floor(Math.random() * 65535);
}
exports.rand = rand;
function assert(exp) {
    if (exp === 0)
        console.error("WASM assertion failed");
}
exports.assert = assert;
