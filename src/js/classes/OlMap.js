import axios from 'axios';

import Map from 'ol/map';
import View from 'ol/view';

// basemaps
import Light from '../layers/basemaps/Light';

// Layers
import Mapbooks from '../layers/Mapbooks.js';

// extent
import Extent from 'ol/extent';

// proj
import Proj from 'ol/proj';

import CONFIG from '../config.json';

import store from '../store';

/**
 * The main class that contains the Openlayers Map Component
 */
export default class OlMap {
    constructor(map) {
        const self = this;
        const initialExtent = Proj.transformExtent(CONFIG.map.initialExtent, 'EPSG:4326', 'EPSG:3857');
        const initialCenter = Extent.getCenter(initialExtent);
        this.view = new View({
            center: initialCenter,
            zoom: 5
        });
        this.map = new Map({
            target: map,
            layers: [
                Light,
                Mapbooks
            ],
            view: self.view
        });
        // debugging
        window.map = this.map;
        this.view.fit(initialExtent);
    }
}
