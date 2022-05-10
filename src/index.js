/* eslint-disable no-param-reassign */
/* eslint-disable import/extensions */

import Keyboard from './script/Keyboard.js';
import { ru, en } from './script/const.js';

const rows = [
  ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace'],
  ['Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash', 'Delete'],
  ['CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter'],
  ['ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ArrowUp', 'ShiftRight'],
  ['ControlLeft', 'MetaLeft', 'AltLeft', 'Space', 'AltRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'ControlRight'],
];

let lang = JSON.parse(window.localStorage.getItem('lang')) || 'ru';
let keyBase = '';
const changeBase = () => {
  if (lang === 'ru') {
    keyBase = ru;
  } else if (lang === 'en') {
    keyBase = en;
  }
};

changeBase();

const main = document.createElement('main');
main.className = 'main';
main.innerHTML = `<h1 class='title'>RSS Виртуальная клавиатура</h1>
<p class='text'>RSS Виртуальная клавиатура</p>
<p class='text'>Для переключения языка комбинация: левыe ctrl + alt</p>`;
const out = document.createElement('textarea');
out.className = 'out';
out.setAttribute('rows', '10');
out.setAttribute('cols', '70');
out.setAttribute('spellcheck', 'false');
out.setAttribute('autofocus', '');
main.append(out);
document.body.prepend(main);

const keyboard = new Keyboard(rows, keyBase);
keyboard.generate();
main.append(keyboard.container);

function printLetter(key) {
  const isShift = keyboard.keyPressed.ShiftLeft || keyboard.keyPressed.ShiftRight;
  if (keyboard.keyPressed.CapsLock && isShift) {
    out.setRangeText(key.small, out.selectionStart, out.selectionEnd, 'end');
  } else if (keyboard.keyPressed.CapsLock || isShift) {
    out.setRangeText(key.shift, out.selectionStart, out.selectionEnd, 'end');
  } else {
    out.setRangeText(key.small, out.selectionStart, out.selectionEnd, 'end');
  }
}

function printDigit(key) {
  const isShift = keyboard.keyPressed.ShiftLeft || keyboard.keyPressed.ShiftRight;
  if (isShift) {
    out.setRangeText(key.shift, out.selectionStart, out.selectionEnd, 'end');
  } else {
    out.setRangeText(key.small, out.selectionStart, out.selectionEnd, 'end');
  }
}

function initLang() {
  keyboard.keyBase = keyBase;
  keyboard.keys.forEach((element) => {
    const obj = keyBase.find((el) => el.code === element.code);
    element.letter.innerHTML = obj.small;
    element.small = obj.small;
    element.subLetter.innerHTML = obj.shift;
    element.shift = obj.shift;
    if (element.code === 'Backquote') {
      element.type = obj.type;
      element.containerKey.classList.remove('letter');
      element.containerKey.classList.remove('digit');
      if (obj.type === 'digit') {
        element.containerKey.classList.add('digit');
      } else {
        element.containerKey.classList.add('letter');
      }
    }
  });
}

function changeLang() {
  if (lang === 'ru') {
    lang = 'en';
  } else {
    lang = 'ru';
  }

  changeBase();
  initLang();
}

function pressFn(key) {
  if (key.code === 'ShiftRight' || key.code === 'ShiftLeft') {
    keyboard.keys.forEach((el) => {
      if (!el.isFn) {
        el.containerKey.classList.add('key_shift');
      }
    });
    if (keyboard.keyPressed.AltLeft || keyboard.keyPressed.AltRight) {
      changeLang();
    }
  }

  if (key.code === 'AltRight' || key.code === 'AltLeft') {
    if (keyboard.keyPressed.ShiftRight || keyboard.keyPressed.ShiftLeft) {
      changeLang();
    }
  }
}

function unPressFn(key) {
  if (key.code === 'ShiftRight' || key.code === 'ShiftLeft') {
    keyboard.keys.forEach((el) => {
      if (!el.isFn) {
        el.containerKey.classList.remove('key_shift');
      }
    });
  }
}

const pressKey = (key) => {
  if (key.type === 'letter') {
    printLetter(key);
  }
  if (key.type === 'digit') {
    printDigit(key);
  }
  if (key.isFn) {
    pressFn(key);
  }
};

const pressVirtualKeyboardKey = (e) => {
  const keyOrNot = e.target.closest('.key');
  if (!keyOrNot) {
    return;
  }
  keyOrNot.classList.add('key_pressed');
  if (!keyboard.keyPressed[keyOrNot.dataset.code]) {
    keyboard.keyPressed[keyOrNot.dataset.code] = true;
  }
  const key = keyboard.keys.find((element) => keyOrNot.dataset.code === element.code);
  pressKey(key);
};

const upVirtualKeyboardKey = (e) => {
  const keyOrNot = e.target.closest('.key');
  if (!keyOrNot) {
    return;
  }
  keyOrNot.classList.remove('key_pressed');
  keyboard.keyPressed[keyOrNot.dataset.code] = false;
  const key = keyboard.keys.find((element) => keyOrNot.dataset.code === element.code);
  if (key.isFn) {
    unPressFn(key);
  }
};

const pressKeyboardKey = (e) => {
  e.preventDefault();
  const key = keyboard.keys.find((element) => e.code === element.code);
  key.containerKey.classList.add('key_pressed');
  if (!keyboard.keyPressed[key.containerKey.dataset.code]) {
    keyboard.keyPressed[key.containerKey.dataset.code] = true;
  }
  pressKey(key);
};

const upKeyboardKey = (e) => {
  const key = keyboard.keys.find((element) => e.code === element.code);
  key.containerKey.classList.remove('key_pressed');
  keyboard.keyPressed[key.containerKey.dataset.code] = false;
  if (key.isFn) {
    unPressFn(key);
  }
};

keyboard.container.addEventListener('mousedown', pressVirtualKeyboardKey);
document.addEventListener('keydown', pressKeyboardKey);
keyboard.container.addEventListener('mouseup', upVirtualKeyboardKey);
document.addEventListener('keyup', upKeyboardKey);
keyboard.container.addEventListener('mouseout', upVirtualKeyboardKey);
