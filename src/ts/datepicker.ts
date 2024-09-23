'use strict';

import AirDatepicker from '../../node_modules/air-datepicker/air-datepicker';
import { DATE_TODAY, WEEKS_IN_YEAR, BOX_COLOR, INITIAL_DATE } from './constant';

function getElapasedWeeks(selectedDate: Date): number {
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

const DatePicker = {
    init: (boxes: NodeListOf<Element>, datepicker: HTMLElement) => {
        const dp = new AirDatepicker(`#${datepicker.id}`, {
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
            dateFormat(date: Date) {
                return date.toLocaleString('en', {
                    year: 'numeric',
                    day: '2-digit',
                    month: 'long',
                });
            },
            onSelect(date: {
                date: Date | Date[];
                formattedDate: string | string[];
                datepicker: AirDatepicker<HTMLElement>;
            }) {
                const selectedDate = date.date;
                if (Array.isArray(selectedDate)) {
                    console.error('Selecting multiple dates not supported');
                    return;
                }
                localStorage.setItem('selectedDate', selectedDate.toString());
                const numWeeks = getElapasedWeeks(selectedDate);
                const filteredBoxes = Array.from(boxes).filter((box) => {
                    const dataWeek = box.getAttribute('data-week');
                    if (dataWeek === null) {
                        return false;
                    }
                    const weekNum = parseInt(dataWeek, 10);
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

        const storedSelectedDate = localStorage.getItem('selectedDate');
        if (storedSelectedDate !== null) {
            dp.selectDate(storedSelectedDate, { silent: false });
        } else {
            let isDatepickerClicked = false;
            datepicker.onclick = () => {
                if (!isDatepickerClicked) {
                    isDatepickerClicked = true;
                    dp.selectDate(INITIAL_DATE, { silent: false });
                }
            };
        }
    },
};

export default DatePicker;
