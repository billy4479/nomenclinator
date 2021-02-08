import type Element from './element';

export default class ElementN {
  public element: Element;

  public n: number;

  constructor(element: Element, n: number) {
    this.element = element;
    this.n = Math.floor(n);
  }
}
