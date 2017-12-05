import CONFIG from './config.json';

import mgrs from 'mgrs';
import proj from 'ol/proj';
import { randomPoint } from '@turf/random';


/**
 * @param coords - [x,y] (EPSG:3857)
 * @param resolution - resolution
 * @returns xybbox - bounding box in X,Y (EPSG:3857 coordinates)
 **/
function getUSNGGridLines (coords, resolution) {
    let latlng = proj.transform(coords, "EPSG:3857", "EPSG:4326");
    let accuracy = 1;
    if(resolution > 30000) {
        accuracy = 1;
    } else if (resolution >= 3000) {
        accuracy = 2;
    } else if (resolution >= 300) {
        accuracy = 3;
    } else if (resolution >= 30) {
        accuracy = 4;
    } else if (resolution < 30) {
        accuracy = 5;
    }
    console.log("accuracy " + accuracy);
    const mgrsCoords = mgrs.forward(latlng, accuracy);
    console.log(mgrsCoords);
    const latlngbbox = mgrs.inverse(mgrsCoords);
    console.log(latlngbbox);
    const xybbox = proj.transformExtent(latlngbbox, "EPSG:4326", "EPSG:3857");
    return xybbox;
}

function generateLotsOfDots () {
    return randomPoint(100000, {bbox: [-93.054199,42.293564,-86.901855,47.294134]})
}

export { getUSNGGridLines, generateLotsOfDots };
