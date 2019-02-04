"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const johnny_five_1 = __importDefault(require("johnny-five"));
const raspi = require('raspi-io');
console.log('Starting j5...');
class LCD {
    constructor() {
        this.board = new johnny_five_1.default.Board({ repl: false, io: new raspi() });
        this.board.on("ready", () => {
            console.log('Board ready...');
            this.lcd = new johnny_five_1.default.LCD({
                // LCD pin name  RS  EN  DB4 DB5 DB6 DB7
                // Arduino pin # 7    8   9   10  11  12
                // pins: [12, 11, 5, 4, 3, 2],
                // raspi pins: ["GPIO18", "GPIO23", "GPIO24", "GPIO27", "GPIO25", "GPIO22"]
                pins: ["GPIO18", "GPIO23", "GPIO24", "GPIO27", "GPIO25", "GPIO22"],
                backlight: 6,
                rows: 2,
                cols: 20
            });
        });
    }
    print(message = "", lineNum = 0) {
        if (this.lcd) {
            this.lcd.cursor(lineNum, 0).print(message);
        }
    }
    printAt(message = "", lineNum = 0, colNum = 0) {
        if (this.lcd) {
            this.lcd.cursor(lineNum, colNum).print(message);
        }
    }
}
exports.LCD = LCD;
