import './sass/main.scss';
import Swal from 'sweetalert2';

const refs = {
  input: document.getElementById('date-selector'),
  button: document.querySelector('button[data-start]'),
};

refs.input.addEventListener('input', isSettedDateCorrect);

function isSettedDateCorrect(evt) {
  const settedDate = Date.parse(evt.target.value);
  const currentDate = Date.now();

  if (settedDate <= currentDate) {
    console.log('Выберите пожалуйста корректную дату');
    return;
  }

  refs.button.addEventListener('click', startTimer);
}

function startTimer() {
  console.log('стартую');
  // refs.button.textContent = 'Stop countdown';
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

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); //{days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6, minutes: 42, seconds: 20}
