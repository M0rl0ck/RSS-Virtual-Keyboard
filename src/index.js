/* eslint-disable import/extensions */

import Keyboard from './script/Keyboard.js';

const rows = [
  ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace'],
  ['Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash', 'Delete'],
  ['CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter'],
  ['ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ArrowUp', 'ShiftRight'],
  ['ControlLeft', 'MetaLeft', 'AltLeft', 'Space', 'AltRight', 'ControlRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight'],
];

const lang = JSON.parse(window.localStorage.getItem('lang')) || 'ru';

const main = document.createElement('main');
main.className = 'main';
main.innerHTML = `<h1 class='title'>RSS Виртуальная клавиатура</h1>
<p>RSS Виртуальная клавиатура</p>
<p>Для переключения языка комбинация: левыe ctrl + alt</p>`;
const out = document.createElement('textarea');
out.className = 'out';
out.setAttribute('rows', '10');
out.setAttribute('cols', '70');
out.setAttribute('spellcheck', 'false');
out.setAttribute('autofocus', '');
main.append(out);
document.body.prepend(main);

const keyboard = new Keyboard(rows, lang);
keyboard.generate();
main.append(keyboard.container);
