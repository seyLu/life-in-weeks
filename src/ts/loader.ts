'use strict';

const Loader = {
    init: (loader: HTMLElement) => {
        loader.classList.remove('hidden');
        localStorage.setItem('isPageVisited', true.toString());
    },
    end: (loader: HTMLElement) => {
        loader.classList.add('hidden');
    },
    show: (elems: NodeListOf<Element>) => {
        for (const el of elems) {
            el.classList.remove('hidden');
        }
    },
};

export default Loader;
