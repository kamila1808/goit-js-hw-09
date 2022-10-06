const bodyEl = document.querySelector('body');
const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }

  let timer = null;

  startButton.addEventListener('click', () => {
    timer = setInterval(() => {
        bodyEl.style.backgroundColor = getRandomHexColor();
        startButton.disabled = true;
    }, 1000)
  });

  stopButton.addEventListener('click', () => {
   startButton.disabled = false;
   clearInterval(timer);
  })

