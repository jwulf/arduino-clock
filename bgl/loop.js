const dayjs = require('dayjs')
const getTime = require('../time/getTime');
const updateBglFromNightscout = require('./bgl');

// Poll Nightscout every how many seconds?
var nightscoutPollInterval = 5 // seconds

function startBGLLoop(LCD) {
    setInterval(async () => {
        const {h,m,s} = getTime();
        if (h === 8 && m === 59) {
            return;
        }
        const bgl = await updateBglFromNightscout();
        const today = dayjs().format('ddd D MMM');
        LCD.print(`${today} ${bgl}`, 1);
    }, nightscoutPollInterval * 1000);
}

module.exports = startBGLLoop;