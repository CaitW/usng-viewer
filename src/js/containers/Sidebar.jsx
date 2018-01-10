/**
 * Map Container
 */

import React from 'react';
import { connect } from 'react-redux'
import { Table, Button } from 'react-bootstrap';

const mapStateToProps = (state) => {
    return {
        ...state.feature
    }
}

class Sidebar extends React.Component {
    render() {
        let title = [];
        let buttons = [];
        if(this.props.selected === true) {
            let featureProperties = this.props.featureProperties;
            if (typeof featureProperties.name_displ !== "undefined") {
                title.push(
                    <div key="title" className="usngviewer-mapbook-title">
                        {featureProperties.name_displ}
                    </div>
                );
            }
            if(typeof featureProperties.TYPE !== "undefined") {
                title.push(
                    <div key="type" className="usngviewer-mapbook-type">
                         {featureProperties.TYPE}
                    </div>
                );
            }
            if(typeof featureProperties.LinkBook !== "undefined") {
                buttons.push(
                    <a href={featureProperties.LinkBook} target='_blank' rel="noopener noreferrer" key="LinkBook">
                        <Button>
                            <i className="fa fa-download"> </i> Download
                        </Button>
                    </a>
                );
            }
            if(typeof featureProperties.SrcLink !== "undefined") {
                buttons.push(
                    <a href={featureProperties.SrcLink} target='_blank' rel="noopener noreferrer" key="SrcLink">
                        <Button>
                            <i className="fa fa-home"> </i> Source
                        </Button>
                    </a>
                );
            }
        }
        return (
            <div className="usngviewer-sidebar">
                {title}
                <div className="usngviewer-mapbook-buttons">
                    {buttons}
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps)(Sidebar);
