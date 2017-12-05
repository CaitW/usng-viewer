/**
 * LeafletMap.jsx
 * Container with Leaflet map. References the primary map object (ObliquePhotoMap),
 * and facilitates communication between the map and interface.
 */

import React from 'react';

import Map from '../map';

export default class MapContainer extends React.Component {
    /**
     * When the component mounts to the DOM, create a new instance of the OlMap class.
     */
    componentDidMount() {
        this.map = new Map(this.mapComponent);
    }
    render() {
        return (
            <div ref={(map) => { this.mapComponent = map; }}
                id="map"
                className="usngviewer-map" />
        );
    }
}

