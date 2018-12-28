const dayjs = require('dayjs')
const five = require("johnny-five")

const board = new five.Board({repl: false})

console.log('Starting j5...')

board.on("ready", function() {
  console.log('Board ready...')
  const lcd = new five.LCD({
    // LCD pin name  RS  EN  DB4 DB5 DB6 DB7
    // Arduino pin # 7    8   9   10  11  12
    pins: [12, 11, 5, 4, 3, 2],
    backlight: 6,
    rows: 2,
    cols: 20
  });


  function printTime(h, m, s) {
    const pad = n => n.toString().padStart(2, '0')
    const fill = s => s.padStart(15, ' ')
    lcd.cursor(0,0).print(`  ${h}:${pad(m)}:${pad(s)} `)
    if (h === 8 && m === 59) {
        lcd.cursor(1,0).print(`T minus ${ 60 - s} `)
    } else {
      const today = dayjs().format('ddd D MMM')
      lcd.cursor(1,0).print(fill(today))
    }
  }

  setInterval(() => {
    const date = new Date()
    const h = date.getHours()
    const m = date.getMinutes()
    const s = date.getSeconds()
    printTime(h, m, s)
  }, 1000)
});



