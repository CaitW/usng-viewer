import OlSelect from 'ol/interaction/select';

import Mapbooks, { clickStyle } from '../layers/layers/Mapbooks';

import condition from 'ol/events/condition';

const Select = new OlSelect({
    layers: [Mapbooks],
    style: clickStyle,
    condition: condition.click
});

export default Select;
