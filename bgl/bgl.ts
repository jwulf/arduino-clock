import axios from "axios";

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

export function updateBglFromNightscout() {
    return new Promise((resolve, reject) => {
        axios.get(nightscoutUrl).then(res => {
            try {
                console.log('Got CGM update');
                const data = res.data[0];
                let bgl = data.sgv;

                // Check if Nightscout data is more than 5 mins old
                const dateString = data.dateString;
                const timestamp = new Date(dateString).getTime();
                const now = new Date().getTime();
                const dataAgeMinutes = (now - timestamp) / 60 / 1000;
                console.log({dataAgeMinutes})
                const dataIsOld = dataAgeMinutes > nightscoutDataWindowTolerance
                // bglOutOfDate = dataIsOld;

                if (mmol) {
                    bgl = bgl / 18;
                }
                const arrow = arrows[data.direction] || '';
                resolve(round(bgl, 1) + ' ' + arrow);
            } catch (e) {
                // This will happen if Nightscout returns no BGL data
                console.log(e);
                resolve('--');
            }
        }).catch(err => {
            console.log(err);
            resolve("--");
        });
    });
}

/* Utility functions */

function round(value, precision) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
}

function zeroPadding(num, digit) {
    let zero = '';
    for (let i = 0; i < digit; i++) {
        zero += '0';
    }
    return (zero + num).slice(-digit);
}
