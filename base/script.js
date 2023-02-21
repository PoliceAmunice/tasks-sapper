document.addEventListener('DOMContentLoaded', function() {
  const minefieldElement = document.getElementById('js-minefield');

  let cellElement;
  for (let cellId = 1; cellId <= 81; cellId++) {
    cellElement = document.createElement('span');
    cellElement.className = 'minefield__cell';
    minefieldElement?.appendChild(cellElement.cloneNode());
  }

  const timer = document.getElementById('js-timer');
  const timerModel = {};

  Object.defineProperty(timerModel, 'value', {
    get() {
      return timer?.textContent;
    },
    set(value) {
      timer.textContent = value;
    }
  });

  let timerId;
  function initTimer() {
    timerId = setInterval(() => timerModel.value++, 1000);
    setTimeout(() => clearInterval(timerId), 100000);
  };

  minefieldElement?.addEventListener('click', initTimer, {once: true});

  const face = document.getElementById('js-face');
  face.addEventListener('click', () => {
    clearInterval(timerId);
  });
});