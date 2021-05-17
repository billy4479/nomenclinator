import type CompoundType from './compoundType';
import type ElementN from './elementN';

export default interface ICompound {
  readonly main: ElementN[];

  readonly parentheses: ICompound | null;

  readonly parenthesesN: number;

  compoundType: CompoundType;

  readonly isInsideParentheses: boolean;
}
