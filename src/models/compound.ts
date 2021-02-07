import isUpperCase from '../utils';
import ElementN from './elementN';
import PeriodicTable from './periodicTable';

export const enum CompoundType {
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

  containsElement(symbol: string): boolean {
    return (
      this.containsElementInMain(symbol) ||
      this.containsElementInParentheses(symbol)
    );
  }

  containsElementInMain(symbol: string): boolean {
    return this.main.some((e: ElementN) => e.element.symbol === symbol);
  }

  containsElementInParentheses(symbol: string): boolean {
    if (this.canHaveParentheses && this.parentheses !== null) {
      return this.parentheses.containsElementInMain(symbol);
    }
    return false;
  }

  private constructor(
    /* eslint-disable no-unused-vars */
    public readonly main: ElementN[],
    public readonly parentheses: Compound | null,
    public readonly parenthesesN: number,
    public readonly compoundType: CompoundType,
    public readonly canHaveParentheses: boolean = true /* eslint-enable */
  ) {
    this.totalLength = main.length + (this.parentheses?.totalLength || 0);
  }

  static async parse(
    data: string,
    canHaveParentheses = true
  ): Promise<Compound> {
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

      parentheses = await Compound.parse(data.substring(first + 1, last));
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
    for (let i = 0; i < elementsN; i++) {
      let element = '';
      let n = 1;
      let nStr = '';
      for (let j = 0; j < data.length; j++) {
        if (isUpperCase(data[j])) {
          if (element.length === 0) element += data[j];
          else break;
        } else if (data[j].match(/\d/)) {
          for (let k = j; k < data.length; k++) {
            if (data[k].match(/\d/)) nStr += data[k];
            else break;
          }
          n = parseInt(nStr, 10);
        } else {
          element += data[j];
        }
      }
      main.push({
        element: await PeriodicTable.search(element),
        n,
      });
    }

    return new Compound(
      main,
      parentheses || null,
      parenthesesN,
      CompoundType.Error
    );
  }
}
