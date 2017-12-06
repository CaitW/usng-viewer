import VectorLayer from 'ol/layer/vector';
import VectorSource from 'ol/source/vector';
import GeoJSON from 'ol/format/geojson';

// Styles
import Style from 'ol/style/style';
import Fill from 'ol/style/fill';
import Stroke from 'ol/style/stroke';
import Circle from 'ol/style/circle';

// Geometries
import CircleGeometry from 'ol/geom/circle';

import { pointSizeByResolution } from '../../../util';

const circleForegroundFill = 'rgba(15, 139, 141, 1)';
const circleBackgroundFill = 'rgba(35, 31, 32, 1)';
const polygonStroke = 'rgba(35, 31, 32, 1)';
const polygonFill = 'rgba(123, 75, 148, 1)';

const style = function(feature, resolution) {
    switch (feature.getGeometry().getType()) {
        case 'Point':
            let coordinates = feature.getGeometry().getCoordinates();
            return [
                new Style({
                    geometry: function(feature) {
                        let radius = pointSizeByResolution(5, resolution);
                        return new CircleGeometry(coordinates, radius);
                    },
                    fill: new Fill({
                        color: circleBackgroundFill
                    })
                }),
                new Style({
                    geometry: function(feature) {
                        let radius = pointSizeByResolution(3, resolution);
                        return new CircleGeometry(coordinates, radius)
                    },
                    fill: new Fill({
                        color: circleForegroundFill
                    })
                })
            ]
            break;
        case 'Polygon':
            return new Style({
                stroke: new Stroke({
                    color: polygonStroke,
                    width: 3
                })
            });
            break;
        default:
            return null;
    }
};

const hoverStyle = function(feature, resolution) {
    switch (feature.getGeometry().getType()) {
        case 'Point':
            let coordinates = feature.getGeometry().getCoordinates();
            return [
                new Style({
                    geometry: function(feature) {
                        let radius = pointSizeByResolution(6, resolution);
                        return new CircleGeometry(coordinates, radius);
                    },
                    fill: new Fill({
                        color: circleBackgroundFill
                    })
                }),
                new Style({
                    geometry: function(feature) {
                        let radius = pointSizeByResolution(4, resolution);
                        return new CircleGeometry(coordinates, radius)
                    },
                    fill: new Fill({
                        color: 'rgba(123, 75, 148, 1)'
                    })
                })
            ]
            break;
        case 'Polygon':
            return new Style({
                stroke: new Stroke({
                    color: polygonStroke,
                    width: 3
                }),
                fill: new Fill({
                    color: polygonFill
                })
            });
            break;
        default:
            return null;
    }
};

const clickStyle = function(feature, resolution) {
    switch (feature.getGeometry().getType()) {
        case 'Point':
            let coordinates = feature.getGeometry().getCoordinates();
            return [
                new Style({
                    geometry: function(feature) {
                        let radius = pointSizeByResolution(6, resolution);
                        return new CircleGeometry(coordinates, radius);
                    },
                    fill: new Fill({
                        color: '#ffffff'
                    })
                }),
                new Style({
                    geometry: function(feature) {
                        let radius = pointSizeByResolution(4, resolution);
                        return new CircleGeometry(coordinates, radius)
                    },
                    fill: new Fill({
                        color: circleForegroundFill
                    })
                })
            ]
            break;
        case 'Polygon':
            return new Style({
                stroke: new Stroke({
                    color: polygonStroke,
                    width: 3
                }),
                fill: new Fill({
                    color: polygonFill
                })
            });
            break;
        default:
            return null;
    }
};

const Mapbooks = new VectorLayer({
    source: new VectorSource({
        url: './data/layers/mapbooks.json',
        format: new GeoJSON({
            defaultDataProjection: 'EPSG:4326'
        })
    }),
    style
});

export default Mapbooks;
export { hoverStyle, clickStyle };
