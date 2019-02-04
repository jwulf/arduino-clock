"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const localtunnel_1 = __importDefault(require("localtunnel"));
const port = 3000;
exports.tunnel = localtunnel_1.default(port, (err, tunnel) => {
    if (err) {
        console.log(err);
    }
    // the assigned public url for your tunnel
    // i.e. https://abcdefgjhij.localtunnel.me
    console.log(tunnel.url);
});
