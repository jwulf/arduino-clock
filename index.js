"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const loop_1 = require("./bgl/loop");
const loop_2 = require("./time/loop");
const lcd_1 = require("./lcd/lcd");
const lcd = new lcd_1.LCD();
loop_1.startBGLLoop(lcd);
loop_2.startTimeLoop(lcd);
