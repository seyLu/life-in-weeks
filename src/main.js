const LIFESPAN = 89;
const WEEKS_IN_YEAR = 52;
const INITIAL_DATE = new Date(2000, 0, 1);
const DATE_TODAY = new Date();
const BOX_WIDTH = 'w-[min(0.5rem,1.25vw)]';
const BOX_COLOR = 'bg-red-600';
const LOADING_TIME = 3000;

const isPageVisited = localStorage.getItem('isPageVisited', false);

function getElapasedWeeks(selectedDate, diff) {
    // https://github.com/bryanbraun/your-life/blob/gh-pages/your-life.js
    // func getElapsedWeeeks is mostly taken from reference above, with some modifications to make it work :3
    const elapsedYears =
        DATE_TODAY.getUTCFullYear() - selectedDate.getUTCFullYear();
    const isThisYearsBirthdayPassed =
        DATE_TODAY.getTime() >
        new Date(
            DATE_TODAY.getUTCFullYear(),
            selectedDate.getMonth(),
            selectedDate.getDate()
        ).getTime();
    const birthdayYearOffset = isThisYearsBirthdayPassed ? 0 : 1;
    const dateOfLastBirthday = new Date(
        DATE_TODAY.getUTCFullYear() - birthdayYearOffset,
        selectedDate.getMonth(),
        selectedDate.getDate()
    );
    const elapsedDaysSinceLastBirthday = Math.floor(
        (DATE_TODAY.getTime() - dateOfLastBirthday.getTime()) /
            (1000 * 60 * 60 * 24)
    );
    const elapsedWeeks =
        elapsedYears * WEEKS_IN_YEAR +
        Math.floor(elapsedDaysSinceLastBirthday / 7);

    return elapsedWeeks;
}

const Canvas = {
    init: () => {
        const canvas = document.getElementById('canvas');

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
                ageLabel.innerText = age;
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
                        weekLabel.innerText = week;
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
                    box.dataset.week = 1 + age * WEEKS_IN_YEAR + week;
                    row.append(box);
                }
            }

            canvas.append(row);
        }
    },
};

const DatePicker = {
    init: (boxes, datepicker) => {
        dp = new AirDatepicker('#datepicker', {
            locale: {
                days: [
                    'Sunday',
                    'Monday',
                    'Tuesday',
                    'Wednesday',
                    'Thursday',
                    'Friday',
                    'Saturday',
                ],
                daysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                daysMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
                months: [
                    'January',
                    'February',
                    'March',
                    'April',
                    'May',
                    'June',
                    'July',
                    'August',
                    'September',
                    'October',
                    'November',
                    'December',
                ],
                monthsShort: [
                    'Jan',
                    'Feb',
                    'Mar',
                    'Apr',
                    'May',
                    'Jun',
                    'Jul',
                    'Aug',
                    'Sep',
                    'Oct',
                    'Nov',
                    'Dec',
                ],
                today: 'Today',
                clear: 'Clear',
                dateFormat: 'MM/dd/yyyy',
                timeFormat: 'hh:mm aa',
                firstDay: 0,
            },
            dateFormat(date) {
                return date.toLocaleString('en', {
                    year: 'numeric',
                    day: '2-digit',
                    month: 'long',
                });
            },
            onSelect(date) {
                const selectedDate = date.date;
                const timeDiffInSeconds = Math.abs(
                    (DATE_TODAY.getTime() - selectedDate.getTime()) / 1000
                );

                const numWeeks = getElapasedWeeks(
                    selectedDate,
                    timeDiffInSeconds
                );
                const filteredBoxes = Array.from(boxes).filter((box) => {
                    const weekNum = parseInt(box.getAttribute('data-week'), 10);
                    return weekNum <= numWeeks;
                });

                for (const box of boxes) {
                    if (filteredBoxes.includes(box)) {
                        box.classList.add(BOX_COLOR);
                    } else {
                        box.classList.remove(BOX_COLOR);
                    }
                }
            },
        });

        let isDatepickerClicked = false;
        datepicker.onclick = () => {
            if (!isDatepickerClicked) {
                isDatepickerClicked = true;
                dp.selectDate(INITIAL_DATE, { silent: false });
            }
        };
    },
};

const Loader = {
    init: (loader) => {
        loader.classList.remove('hidden');
        localStorage.setItem('isPageVisited', true);
    },
    end: (loader) => {
        loader.classList.add('hidden');
    },
    show: (elems) => {
        for (const el of elems) {
            el.classList.remove('hidden');
        }
    },
};

document.addEventListener('DOMContentLoaded', function () {
    const loader = document.getElementById('loader');
    const elems = document.querySelectorAll('.no-js');
    !isPageVisited ? Loader.init(loader) : Loader.show(elems);

    Canvas.init();
    const boxes = document.querySelectorAll('.box');
    const datepicker = document.getElementById('datepicker');
    DatePicker.init(boxes, datepicker);

    if (!isPageVisited) {
        setTimeout(() => {
            Loader.end(loader);
            Loader.show(elems);
        }, LOADING_TIME);
    }
});
