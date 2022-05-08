/* eslint-disable import/extensions */
import Key from './Key.js';
import { ru, en } from './const.js';

export default class Keyboard {
  constructor(rows, lang) {
    this.rows = rows;

    this.keys = [];
    this.keyPressed = {};
    this.caps = false;
    if (lang === 'ru') {
      this.keyBase = ru;
    } else if (lang === 'en') {
      this.keyBase = en;
    }
  }

  generate() {
    this.container = document.createElement('div');
    this.container.className = 'keyboard';
    this.rows.forEach((element) => {
      const row = document.createElement('div');
      row.className = 'keyboard__row';
      this.container.append(row);
      element.forEach((code) => {
        const keyObj = this.keyBase.find((key) => key.code === code);
        const button = new Key(keyObj);
        this.keys.push(button);
        row.append(button.containerKey);
      });
    });
  }
}
