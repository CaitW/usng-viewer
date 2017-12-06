import OlSelect from 'ol/interaction/select';

import Mapbooks, { hoverStyle } from '../layers/layers/Mapbooks';

import condition from 'ol/events/condition';

const Select = new OlSelect({
    layers: [Mapbooks],
    style: hoverStyle,
    condition: condition.pointerMove
});

export default Select;
