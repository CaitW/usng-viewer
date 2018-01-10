/**
  * This file is the primary entry point for the application.
  */
import React from 'react';
import { render } from 'react-dom';
// layout components
import { Grid, Row, Col } from 'react-bootstrap';
import { Provider } from 'react-redux';
// containers
import MapContainer from './containers/MapContainer.jsx';
import Sidebar from './containers/Sidebar.jsx';

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
                    <Row className="usngviewer-title-container">
                        USNG Mapbooks
                    </Row>
                    <Row className="usngviewer-content-container">
                        <Col xs={12} sm={12} md={8} lg={9} className="usngviewer-col-map">
                            <MapContainer />
                        </Col>
                        <Col xs={12} sm={12} md={4} lg={3} className="usngviewer-col-sidebar">
                            <Sidebar />
                        </Col>
                    </Row>
                </Grid>
            </Provider>
        );
    }
}
render(<App />, document.getElementById('react-root'));
