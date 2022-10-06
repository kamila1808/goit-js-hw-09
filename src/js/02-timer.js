import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const startButton = document.querySelector('[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');


let userSelectedDates = null;
let timer = null;

startButton.disabled = true;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    
    onClose(selectedDates) {
        if (selectedDates[0] < options.defaultDate) {
            window.alert('Please choose a date in the future.')
        } else 
        startButton.disabled = false;
        userSelectedDates = selectedDates[0];
    },
};

flatpickr('#datetime-picker', options);


const updateTimer = () => {
  timer = setInterval(() => {
        const delta = userSelectedDates - new Date().getTime();
        if (delta <= 0) {
            clearTimeout(timer);
            return;
        };
    const time = convertMs(delta);
    getTimeComponents(time);
    }, 1000)
}

function getTimeComponents({ days, hours, minutes, seconds }) {
  daysEl.textContent = `${days}`;
  hoursEl.textContent = `${hours}`;
  minutesEl.textContent = `${minutes}`;
  secondsEl.textContent = `${seconds}`;
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

startButton.addEventListener("click", updateTimer);
