import PeriodicTable from '../models/periodicTable';
import Compound, { CompoundType } from '../models/compound';
import GetCompoundType from './compoundTypeParser';
import type ElementN from '../models/elementN';

function isUpperCase(input: string): boolean {
  if (input.match(/\d/)) return false;
  return input.toUpperCase() === input;
}

export default function parseCompound(
  data: string,
  canHaveParentheses = true
): Compound {
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

    parentheses = parseCompound(data.substring(first + 1, last));
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
    data = data.replace(data.substring(first, last + n.length + 1), '');
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

  const result = new Compound(
    main,
    parentheses || null,
    parenthesesN,
    CompoundType.Error
  );

  result.compoundType = GetCompoundType(result);

  return result;
}
