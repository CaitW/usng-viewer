import TileLayer from 'ol/layer/tile';
import TileImage from 'ol/source/tileimage';

const key = "pk.eyJ1IjoiYXNmcG0iLCJhIjoiY2l5c3dkaGpoMDAxNjJxbzU5bnF1dW1sbCJ9.GjU3Gi7_OgI_whH2ZXrxVw";

const Light = new TileLayer({
    source: new TileImage({
        tilePixelRatio: 2,
        url: "https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}@2x?access_token=" + key
    })
})

export default Light;
