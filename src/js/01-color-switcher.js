const bodyEl = document.querySelector('body');
const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');

  let timer = null;

  startButton.addEventListener('click', () => {
    startButton.disabled = true;
    timer = setInterval(() => {
        bodyEl.style.backgroundColor = getRandomHexColor();
    }, 1000)
  });

  stopButton.addEventListener('click', () => {
   startButton.disabled = false;
   clearInterval(timer);
  })

  function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  };
