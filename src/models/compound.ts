import type ElementN from './elementN';
import PeriodicTable from './periodicTable';

function isUpperCase(input: string): boolean {
  if (input.match(/\d/)) return false;
  return input.toUpperCase() === input;
}

export const enum CompoundType {
  /* eslint-disable no-unused-vars */
  SaleBinnario,
  OssidoAcido,
  OssidoBasico,
  Idracido,
  IdruroCovalente,
  IdruroMetalico,
  Idrossido,
  Ossiacido,
  SaleTernario,
  Ossoanione,
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

  private totalLength: number;

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
    public readonly main: ElementN[],
    public readonly parentheses: Compound | null,
    public readonly parenthesesN: number,
    public readonly compoundType: CompoundType,
    public readonly canHaveParentheses: boolean = true /* eslint-enable */
  ) {
    this.totalLength = main.length + (this.parentheses?.totalLength || 0);
  }

  static parse(data: string, canHaveParentheses = true): Compound {
    /* eslint-disable no-param-reassign */
    /* eslint-disable no-await-in-loop */
    data = data.trim();
    let foundParentheses = false;
    let parentheses: Compound | undefined;
    let parenthesesN = 0;

    // Check parentheses
    if (data.includes('(')) {
      if (foundParentheses || !canHaveParentheses)
        throw new Error('Too many parentheses!');

      // Find the index of the last parentheses
      const first = data.indexOf('(');
      const last = data.indexOf(')');
      if (last === -1) throw new Error('Unable to find closing parentheses');

      parentheses = Compound.parse(data.substring(first + 1, last));
      let i = last + 1;
      let n = '';
      for (i; i < data.length; i++) {
        if (data[i].match(/\d/)) {
          n += data[i].toString();
        } else {
          n = '1';
          break;
        }
      }
      parenthesesN = parseInt(n, 10);

      foundParentheses = true;
      // Strip parentheses
      data = data.replace(data.substring(first, last + 1), '');
    }

    let elementsN = 0;
    for (let i = 0; i < data.length; i++) {
      if (isUpperCase(data[i])) elementsN++;
    }

    const main: ElementN[] = [];

    // Foreach found element
    for (let i = 0; i < elementsN; i++) {
      let element = '';
      let n = 1;
      let nStr = '';
      let endIndex = 0;
      for (let j = 0; j < data.length; j++) {
        if (isUpperCase(data[j])) {
          if (element.length === 0) element += data[j];
          else {
            endIndex = j;
            break;
          }
        } else if (data[j].match(/\d/)) {
          for (let k = j; k < data.length; k++) {
            if (data[k].match(/\d/)) nStr += data[k];
            else {
              endIndex = k;
              break;
            }
          }
          n = parseInt(nStr, 10);
          break;
        } else {
          element += data[j];
        }
      }

      data = data.substring(endIndex);

      const newElement = PeriodicTable.search(element);
      main.push({
        element: newElement,
        n,
      });

      if (data === '') break;
    }

    return new Compound(
      main,
      parentheses || null,
      parenthesesN,
      CompoundType.Special // TODO: Compound-type parsing
    );
  }

  isEqualTo(other: Compound): boolean {
    if (other.parentheses !== null) {
      if (this.parentheses === null) return false;
      if (!other.parentheses.isEqualTo(this.parentheses)) return false;
    } else if (this.parentheses !== null) return false;

    if (other.compoundType !== this.compoundType) return false;
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
}
