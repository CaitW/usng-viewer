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

const styleFunction = function(feature, resolution) {
    switch (feature.getGeometry().getType()) {
        case 'Point':
            return new Style({
                geometry: function(feature) {
                    return new CircleGeometry(feature.getGeometry().getCoordinates(), 3 * resolution)
                },
                fill: new Fill({
                    color: 'rgba(60, 128, 158, 1)'
                })
            })
            break;
        case 'Polygon':
            return new Style({
                stroke: new Stroke({
                    color: 'rgba(109, 114, 117, 1)',
                    width: 3
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
    style: styleFunction
});

export default Mapbooks;
