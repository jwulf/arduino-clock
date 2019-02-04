import dayjs from 'dayjs';
import {getTime} from '../time/getTime';
import {updateBglFromNightscout} from './bgl';

// Poll Nightscout every how many seconds?
var nightscoutPollInterval = 5 // seconds

export function startBGLLoop(LCD) {
    setInterval(async () => {
        const {h,m} = getTime();
        if (h === 8 && m === 59) {
            return;
        }
        const bgl = await updateBglFromNightscout();
        const today = dayjs().format('ddd D MMM');
        LCD.print(`${today} ${bgl}`, 1);
    }, nightscoutPollInterval * 1000);
}
