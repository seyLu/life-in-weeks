'use strict';

import Canvas from './canvas';
import DatePicker from './datepicker';
import Loader from './loader';
import { LOADING_TIME } from './constant';

document.addEventListener('DOMContentLoaded', function () {
    const loader = document.getElementById('loader');
    if (loader === null) {
        console.error(`Missing element with id 'loader'`);
        return;
    }
    const elems = document.querySelectorAll('.no-js');
    if (elems === null) {
        console.error(`Missing element with class 'no-js'`);
        return;
    }
    const isPageVisited = localStorage.getItem('isPageVisited') === 'true';
    !isPageVisited ? Loader.init(loader) : Loader.show(elems);

    const canvas = document.getElementById('canvas');
    if (canvas === null) {
        console.error(`Missing element with id 'canvas'`);
        return;
    }
    Canvas.init(canvas);
    const boxes = document.querySelectorAll('.box');
    if (boxes === null) {
        console.error(`Missing element with class 'box'`);
        return;
    }
    const datepicker = document.getElementById('datepicker');
    if (datepicker === null) {
        console.error(`Missing element with id 'datepicker'`);
        return;
    }
    DatePicker.init(boxes, datepicker);

    if (!isPageVisited) {
        setTimeout(() => {
            Loader.end(loader);
            Loader.show(elems);
        }, LOADING_TIME);
    }
});
