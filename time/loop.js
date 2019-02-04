const getTime = require('./getTime');
const dayjs = require('dayjs')

function printTime(h, m, s, LCD) {
    const pad = n => n.toString().padStart(2, '0');
    // const fill = s => s.padStart(15, ' ')
    LCD.print(`  ${h}:${pad(m)}:${pad(s)} `, 0);
    if (h === 8 && m === 59) {
        LCD.print(`T minus ${ 60 - s} `, 1);
    } else {
        const today = dayjs().format('ddd D MMM');
        LCD.print(today, 1);
    }
}

function startTimeLoop(LCD) {
    setInterval(() => {
        const {h,m,s} = getTime();
        printTime(h, m, s, LCD);
    }, 1000);
}

module.exports = startTimeLoop;