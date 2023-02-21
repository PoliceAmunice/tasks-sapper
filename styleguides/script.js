// Имена в JS по-умолчанию в формате `camelCase`, тут всё верно.
// `const` тут больше подходит, тк ссылку на элемент переопределять не планируем.
const statusFace = document.getElementById('js-status-panel-face');

// getElementById может вернуть и `undefined`. Включи `checkJs`, чтобы Вскода тебе подсказывала такие моменты.
if (statusFace) {
  // Хороший вариант для поддержки IE9, но специфичный, тк ты переопределяешь всю строку со стилями сразу.
  statusFace.className = 'status-panel__face_proccess'; // Перезатрём к херам `status-panel__face`, плохо.

  // Вот так придётся дрочиться.
  statusFace.className += ' status-panel__face_proccess'; // add
  statusFace.className.replace('status-panel__face_proccess', ''); // remove

  // IE9 такое уже не поймёт, но нам это не важно. Зато так мы добавим/удалим только то, что нас интересует.
  statusFace.classList.add('status-panel__face_proccess');
  statusFace.classList.remove('status-panel__face_proccess');
}

function startGame(statusFace) {
  // Чтобы не заморачиваться, обнуляем селекторы от прошлой игры.
  statusFace.className = 'status-panel__face status-panel__face_proccess';
};

function failGame(statusFace) {
  // И меняем статус. Как раз тут `className` удобнее, тк с add/remove просто больше движений.
  statusFace.className.replace('status-panel__face_proccess', 'status-panel__face_defeat');
};
