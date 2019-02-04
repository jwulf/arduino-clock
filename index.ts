import {startBGLLoop} from './bgl/loop';
import {startTimeLoop} from './time/loop';
import {LCD} from './lcd/lcd';

const lcd = new LCD();

startBGLLoop(lcd);
startTimeLoop(lcd);
