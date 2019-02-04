const axios = require("axios");

var arrows = {
    SingleDown: '↓︎',
    DoubleDown: '↓︎↓︎',
    SingleUp: '↑',
    DoubleUp: '↑↑',
    FortyFiveDown: '↘',
    FortyFiveUp: '↗',
    Flat: '→'
};

// Set to the URL for your Nightscout instance
var nightscoutUrl = 'https://cgm.prahlads.space/api/v1/entries/current.json'

// Set to false to use the US units dg/L. Set to true to use EU/AU/NZ units mmol/L
var mmol = true

// If the Nightscout data is older than this, we'll change its color
var nightscoutDataWindowTolerance = 7 //mins

function updateBglFromNightscout() {
    axios.get(nightscoutUrl, { crossdomain: true }).then(res => {
        try {
            console.log('Got CGM update');
            var data = res.data[0];
            var bgl = data.sgv;

            // Check if Nightscout data is more than 5 mins old
            var dateString = data.dateString;
            var timestamp = new Date(dateString);
            var now = new Date();
            dataAgeMinutes = (now - timestamp) / 60 / 1000;
            console.log({dataAgeMinutes})
            var dataIsOld = dataAgeMinutes > nightscoutDataWindowTolerance
            clock.bglOutOfDate = dataIsOld;

            if (mmol) {
                bgl = bgl / 18;
            }
            var arrow = arrows[data.direction] || '';
            resolve(round(bgl, 1) + ' ' + arrow);
        } catch (e) {
            // This will happen if Nightscout returns no BGL data
            console.log(e);
            resolve('BGL n/a');
        }
    }).catch(console.log);
}

/* Utility functions */

function round(value, precision) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
}

function zeroPadding(num, digit) {
    var zero = '';
    for (var i = 0; i < digit; i++) {
        zero += '0';
    }
    return (zero + num).slice(-digit);
}

module.exports = updateBglFromNightscout;