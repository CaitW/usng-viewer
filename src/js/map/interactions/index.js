import DragRotate from 'ol/interaction/dragrotate';
import DoubleClickZoom from 'ol/interaction/doubleclickzoom';
import DragPan from 'ol/interaction/dragpan';
import PinchRotate from 'ol/interaction/pinchrotate';
import PinchZoom from 'ol/interaction/pinchzoom';
import KeyboardPan from 'ol/interaction/keyboardpan';
import KeyboardZoom from 'ol/interaction/keyboardzoom';
import MouseWheelZoom from 'ol/interaction/mousewheelzoom';
import DragZoom from 'ol/interaction/dragzoom';

const INTERACTIONS = [
    new DragRotate(),
    new DoubleClickZoom(),
    new DragPan(),
    new PinchRotate(),
    new PinchZoom(),
    new KeyboardPan(),
    new KeyboardZoom(),
    new MouseWheelZoom(),
    new DragZoom()
];

export default INTERACTIONS;
