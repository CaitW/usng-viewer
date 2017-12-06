import OlSelect from 'ol/interaction/select';

import Mapbooks, { clickStyle } from '../layers/layers/Mapbooks';

import condition from 'ol/events/condition';

import store from '../../store';

import { selected, unselected } from '../../ducks/feature';

function getDisplayableProperties (properties) {
    let displayableProperties = {};
    for(let property in properties) {
        let value = properties[property];
        let isString = (typeof value === "string" && value.length > 0);
        let isNumber = (typeof value === "number");
        if (isString || isNumber) {
            displayableProperties[property] = value;
        }
    }
    return displayableProperties;
}

const Select = new OlSelect({
    layers: [Mapbooks],
    style: clickStyle,
    condition: condition.click
});

Select.on('select', function (e) {
    if(e.selected.length > 0) {
        let selectedFeature = e.selected[0];
        let selectedFeatureProperties = getDisplayableProperties(selectedFeature.getProperties());
        store.dispatch(selected(selectedFeatureProperties));
    } else {
        store.dispatch(unselected());
    }
});

export default Select;
