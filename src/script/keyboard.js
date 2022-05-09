/* eslint-disable import/extensions */
import Key from './Key.js';

export default class Keyboard {
  constructor(rows, keyBase) {
    this.rows = rows;

    this.keys = [];
    this.keyPressed = {};
    this.caps = false;
    this.keyBase = keyBase;
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
