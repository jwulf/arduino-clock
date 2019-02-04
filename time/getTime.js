"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getTime() {
    const date = new Date();
    const h = date.getHours();
    const m = date.getMinutes();
    const s = date.getSeconds();
    return {
        h, m, s
    };
}
exports.getTime = getTime;
