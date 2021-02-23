import noop from '../noop';
import type ElementN from './elementN';
import PeriodicTable from './periodicTable';

export enum CompoundType {
  /* eslint-disable no-unused-vars */
  SaleBinnario,
  OssidoAcido,
  OssidoBasico,
  Idracido,
  IdruroCovalente,
  IdruroMetallico,
  Idrossido,
  Ossiacido,
  SaleTernario,
  // Ossoanione,
  ElementoSingolo,
  Error,
  Special,
  /* eslint-enable */
}

export default class Compound {
  // private main: ElementN[];

  // private parentheses: Compound | null;

  // private parenthesesN: number;

  // private canHaveParentheses: boolean;

  // private compoundType: CompoundType;

  countElement(symbol: string): number {
    return (
      this.countElementInMain(symbol) + this.countElementInParentheses(symbol)
    );
  }

  countElementInMain(symbol: string): number {
    let count = 0;
    this.main.forEach((element) => {
      if (element.element.symbol === symbol) count = element.n;
    });
    return count;
  }

  countElementInParentheses(symbol: string): number {
    if (this.canHaveParentheses && this.parentheses !== null) {
      return this.parentheses.countElementInMain(symbol);
    }
    return 0;
  }

  constructor(
    /* eslint-disable no-unused-vars */
    readonly main: ElementN[],
    readonly parentheses: Compound | null,
    readonly parenthesesN: number,
    public compoundType: CompoundType,
    readonly canHaveParentheses: boolean = true /* eslint-enable */
  ) {
    noop(); // Ehm ok...
  }

  isEqualTo(other: Compound): boolean {
    if (other.parentheses !== null) {
      if (this.parentheses === null) return false;
      if (!other.parentheses.isEqualTo(this.parentheses)) return false;
    } else if (this.parentheses !== null) return false;

    // if (other.compoundType !== this.compoundType) return false;
    if (other.main.length !== this.main.length) return false;

    let result = true;
    other.main.forEach((value) => {
      if (
        this.countElementInMain(value.element.symbol) !==
        other.countElementInMain(value.element.symbol)
      )
        result = false;
    });

    return result;
  }

  has(element: string): boolean {
    return this.hasInMain(element) || this.hasInParentheses(element);
  }

  hasInMain(element: string): boolean {
    let result = false;
    this.main.forEach((e) => {
      if (e.element.symbol === element) result = true;
    });
    return result;
  }

  hasInParentheses(element: string): boolean {
    if (!this.canHaveParentheses || this.parentheses === null) return false;
    return this.parentheses.has(element);
  }

  get totalLength(): number {
    return this.main.length + (this.parentheses?.totalLength || 0);
  }

  get hasParentheses(): boolean {
    return this.canHaveParentheses && this.parentheses !== null;
  }

  getElementN(e: string): number {
    const element = PeriodicTable.search(e);
    let result = 0;

    this.main.forEach((t) => {
      if (t.element.symbol === element.symbol) result += t.n;
    });

    if (this.parentheses !== null)
      result += this.parentheses.getElementN(e) * this.parenthesesN;

    return result;
  }
}
