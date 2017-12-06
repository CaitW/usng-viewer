/**
 * Map Container
 */

import React from 'react';
import { connect } from 'react-redux'
import { Table } from 'react-bootstrap';


function formatFeatureProperties (featureProperties) {
    return JSON.stringify(featureProperties);
}

const mapStateToProps = (state) => {
    return {
        ...state.feature
    }
}

class Sidebar extends React.Component {
    static renderRow(property, value) {
        return (
            <tr key={property}>
                <td className="usngviewer-table-cell-key"><strong>{property}</strong></td>
                <td className="usngviewer-table-cell-value">{value}</td>
            </tr>
        );
    }
    render() {
        let rows = [];
        if(this.props.selected === true) {
            for (const property in this.props.featureProperties) {
                const value = this.props.featureProperties[property];
                rows.push(
                    this.constructor.renderRow(property, value)
                );
            }
        }
        return (
            <div className="usngviewer-sidebar">
                <Table className="wiscviewer-data-table">
                    <tbody>
                        {rows}
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default connect(mapStateToProps)(Sidebar);
