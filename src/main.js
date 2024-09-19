const LIFESPAN = 89;
const WEEKS_IN_YEAR = 52;

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
                console.log(date.date);
                console.log(date.formattedDate);
                console.log(date.datepicker);
            },
        });
    },
};

document.addEventListener('DOMContentLoaded', function () {
    Canvas.init();
    const dp = DatePicker.init();
    let isDatepickerClicked = false;
    document.getElementById('datepicker').onclick = () => {
        if (!isDatepickerClicked) {
            dp.selectDate(new Date(2000, 0, 1), { silent: false });
        }
        isDatepickerClicked = true;
    };
});
