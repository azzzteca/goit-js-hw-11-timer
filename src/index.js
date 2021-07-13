import './sass/main.scss';
import Swal from 'sweetalert2';

const refs = {
  input: document.getElementById('date-selector'),
  button: document.querySelector('button[data-start]'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};

const INTERVAL_TIME = 1000;
let settedDate;
let currentDate;
let timeLeft;

refs.input.addEventListener('input', isSettedDateCorrect);

function isSettedDateCorrect(evt) {
  settedDate = Date.parse(evt.target.value);
  const currentDateForCheck = Date.now();

  if (settedDate <= currentDateForCheck) {
    Swal.fire('Please choose a date in the future');
    return;
  }

  refs.button.style.display = 'flex';
  refs.button.addEventListener('click', startTimer);
}

function startTimer() {
  refs.input.removeEventListener('input', isSettedDateCorrect);

  setInterval(() => {
    currentDate = Date.now();

    timeLeft = settedDate - currentDate;

    const { days, hours, minutes, seconds } = convertMs(timeLeft);

    if ((days === '00') & (hours === '00') & (minutes === '00') & (seconds === '00')) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Кина не будет!',
        // footer: '<a href="">Why do I have this issue?</a>'
      });
      return;
    }

    refs.seconds.textContent = `${seconds}`;
    refs.minutes.textContent = `${minutes}`;
    refs.hours.textContent = `${hours}`;
    refs.days.textContent = `${days}`;
  }, INTERVAL_TIME);
}

function finish() {
  Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: 'Your work has been saved',
    showConfirmButton: false,
    timer: 5500,
  });
}

function pad(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = pad(Math.floor(ms / day));
  // Remaining hours
  const hours = pad(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); //{days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6, minutes: 42, seconds: 20}
