/**
  * This file is the primary entry point for the application.
  */
import React from 'react';
import { render } from 'react-dom';
// layout components
import { Grid, Row } from 'react-bootstrap';
import { Provider } from 'react-redux';
// containers
import MapContainer from './containers/MapContainer.jsx';

// Redux
import store from './store';
import { updateWindowDimensions } from './ducks/window';

class App extends React.Component {
    static updateDimensions() {
        const height = window.innerHeight;
        const width = window.innerWidth;
        store.dispatch(updateWindowDimensions(height, width));
    }
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.constructor.updateDimensions();
        window.addEventListener('resize', this.constructor.updateDimensions);
    }
    render() {
        return (
            <Provider store={store}>
                <Grid fluid className="usngviewer-grid">
                    <Row className="usngviewer-content-container">
                        <MapContainer />
                    </Row>
                </Grid>
            </Provider>
        );
    }
}
render(<App />, document.getElementById('react-root'));
