"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dayjs_1 = __importDefault(require("dayjs"));
const getTime_1 = require("../time/getTime");
const bgl_1 = require("./bgl");
// Poll Nightscout every how many seconds?
var nightscoutPollInterval = 5; // seconds
function startBGLLoop(LCD) {
    setInterval(() => __awaiter(this, void 0, void 0, function* () {
        const { h, m } = getTime_1.getTime();
        if (h === 8 && m === 59) {
            return;
        }
        const bgl = yield bgl_1.updateBglFromNightscout();
        const today = dayjs_1.default().format('ddd D MMM');
        LCD.print(`${today} ${bgl}`, 1);
    }), nightscoutPollInterval * 1000);
}
exports.startBGLLoop = startBGLLoop;
