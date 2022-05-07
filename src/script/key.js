/* eslint-disable import/extensions */
import './const.js';

export default class Key {
  constructor({
    small, shift, code, type, isFn,
  }) {
    this.small = small;
    this.shift = shift;
    this.code = code;
    this.type = type;
    this.isFn = isFn;
    this.subLetter = this.createSub();
    this.letter = this.createLetter();
    this.containerKey = this.createKey();
  }

  createSub() {
    const sub = document.createElement('p');
    sub.className = 'sub';
    sub.innerHTML = this.shift;
    return sub;
  }

  createLetter() {
    const smallLetter = document.createElement('p');
    smallLetter.className = 'letter';
    smallLetter.innerHTML = this.small;
    return smallLetter;
  }

  createKey() {
    const conteiner = document.createElement('div');
    conteiner.className = 'key';
    conteiner.append(this.subLetter, this.letter);
    return conteiner;
  }
}
