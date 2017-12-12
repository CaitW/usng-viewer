import CONFIG from './config.json';

import proj from 'ol/proj';

export function pointSizeByResolution(size, resolution) {
    let multiplier = 1;
    if (resolution < 300) {
        multiplier = 2;
    } else if (resolution < 750) {
        multiplier = 2.5;
    } else if (resolution < 1500) {
        multiplier = 2;
    } else if (resolution < 3000) {
        multiplier = 1.5
    }
    return size * resolution * multiplier;
}
