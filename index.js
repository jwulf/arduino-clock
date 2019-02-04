const startBGLLoop = require('./bgl/loop');
const startTimeLoop = require('./time/loop');
const LCD = require('./lcd/lcd');

startBGLLoop(LCD);
startTimeLoop(LCD);




