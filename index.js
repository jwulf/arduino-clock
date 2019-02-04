const dayjs = require('dayjs')
const os = require('os');
const localtunnel = require('localtunnel');
const LCD = require('./lcd');

const port = 3000;

console.log('Starting j5...');

function printTime(h, m, s) {
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

setInterval(() => {
    const date = new Date();
    const h = date.getHours();
    const m = date.getMinutes();
    const s = date.getSeconds();
    printTime(h, m, s);
}, 1000);




var tunnel = localtunnel(port, function(err, tunnel) {
    if (err) {
        console.log(err);
    }

    // the assigned public url for your tunnel
    // i.e. https://abcdefgjhij.localtunnel.me
    console.log(tunnel.url);
});

tunnel.on("error", (err) => console.log(err));

tunnel.on('close', function() {
    // tunnels are closed
});
