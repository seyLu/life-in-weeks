'use strict';

import { BOX_WIDTH, LIFESPAN, WEEKS_IN_YEAR } from './constant';

const Canvas = {
    init: (canvas: HTMLElement) => {
        for (let age = -1; age <= LIFESPAN; age++) {
            const row = document.createElement('div');
            row.classList.add('flex');

            const ageLabel = document.createElement('div');
            ageLabel.classList.add(
                'mr-1',
                'w-4',
                'h-2',
                'text-xs',
                'text-right'
            );
            if (age % 5 === 0) {
                ageLabel.innerText = age.toString();
            }
            row.append(ageLabel);

            for (let week = 0; week < WEEKS_IN_YEAR; week++) {
                if (age === -1) {
                    const weekLabel = document.createElement('div');
                    weekLabel.classList.add(
                        'mb-0',
                        BOX_WIDTH,
                        'h-4',
                        'm-[1px]',
                        'text-xs',
                        'text-right'
                    );
                    if (week % 5 === 0) {
                        if (week === 0) {
                            week += 1;
                        }
                        weekLabel.innerText = week.toString();
                    }
                    row.append(weekLabel);
                } else {
                    const box = document.createElement('div');
                    box.classList.add(
                        'box',
                        BOX_WIDTH,
                        'h-2',
                        'm-[1px]',
                        'border-solid',
                        'border',
                        'border-sky-500'
                    );
                    box.dataset['week'] = (
                        1 +
                        age * WEEKS_IN_YEAR +
                        week
                    ).toString();
                    row.append(box);
                }
            }
            canvas.append(row);
        }
    },
};

export default Canvas;
