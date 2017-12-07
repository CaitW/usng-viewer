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

const circleBackgroundFill = 'rgba(35, 31, 32, 1)';
const polygonStroke = 'rgba(35, 31, 32, 1)';
const polygonFill = 'rgba(123, 75, 148, 1)';

/**
    $color1: rgba(15, 139, 141, 1);
    $color2: rgba(19, 154, 67, 1);
    $color3: rgba(192, 50, 33, 1);
    $color4: rgba(233, 215, 88, 1);
    $color5: rgba(211, 97, 53, 1);
*/

function getTypeColor(feature) {
    let featureType = feature.getProperties().TYPE;
    switch (featureType) {
        case 'County':
            return 'rgba(15, 139, 141, 1)';
            break;
        case 'Fire District':
            return 'rgba(19, 154, 67, 1)';
            break;
        case 'City':
            return 'rgba(192, 50, 33, 1)';
            break;
        case 'Parish':
            return 'rgba(233, 215, 88, 1)';
            break;
        default:
            return 'rgba(211, 97, 53, 1)';
            break;
    }
}

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
                        color: getTypeColor(feature)
                    })
                })
            ]
            break;
        case 'Polygon':
            return new Style({
                stroke: new Stroke({
                    color: getTypeColor(feature),
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
                        color: getTypeColor(feature)
                    })
                })
            ]
            break;
        case 'Polygon':
            return new Style({
                stroke: new Stroke({
                    color: getTypeColor(feature),
                    width: 5
                }),
                fill: new Fill({
                    color: getTypeColor(feature)
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
                        let radius = pointSizeByResolution(8, resolution);
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
                        color: getTypeColor(feature)
                    })
                })
            ]
            break;
        case 'Polygon':
            return new Style({
                stroke: new Stroke({
                    color: getTypeColor(feature),
                    width: 5
                }),
                fill: new Fill({
                    color: getTypeColor(feature)
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
