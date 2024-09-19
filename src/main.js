const LIFESPAN = 89;
const WEEKS_IN_YEAR = 52;
const INITIAL_DATE = new Date(2000, 0, 1);
const DATE_TODAY = new Date();
const BOX_COLOR = 'bg-red-600';

let boxes = null;

function secondsToWeek(seconds) {
    const weeks = seconds / 604800;
    return Math.floor(weeks);
}

const Canvas = {
    init: () => {
        const canvas = document.getElementById('canvas');

        let boxCounter = 0;
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
                        'w-2',
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
                        'w-2',
                        'h-2',
                        'm-[1px]',
                        'border-solid',
                        'border',
                        'border-sky-500'
                    );
                    box.id = `box-${boxCounter}`;
                    boxCounter++;
                    row.append(box);
                }
            }

            canvas.append(row);
        }
    },
};

const DatePicker = {
    init: () => {
        new AirDatepicker('#datepicker', {
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
                const numWeeks = secondsToWeek(timeDiffInSeconds);
                const filteredBoxes = Array.from(boxes).filter((box) => {
                    const idNum = parseInt(box.id.replace('box-', ''), 10); // Extract the number part of the id
                    return idNum <= numWeeks; // Check if the number is less than or equal to 52
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
    },
};

document.addEventListener('DOMContentLoaded', function () {
    Canvas.init();

    boxes = document.querySelectorAll('[id^="box-"]');
    const datepicker = document.getElementById('datepicker');
    const dp = DatePicker.init();
    let isDatepickerClicked = false;
    datepicker.onclick = () => {
        if (!isDatepickerClicked) {
            dp.selectDate(INITIAL_DATE, { silent: false });
        }
        isDatepickerClicked = true;
    };
});
