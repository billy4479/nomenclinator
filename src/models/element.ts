import noop from '../noop';
import type ElementType from './elementType';
// import type IElement from './IElement';

export default class Element {
  constructor(
    /* eslint-disable no-unused-vars */
    public readonly symbol: string,
    public readonly name: string,
    public readonly atomicNumber: number,
    public readonly atomicWeight: number,
    public readonly oxidationStates: number[],
    public readonly elementType: ElementType // readonly rawType: string /* eslint-enable */
  ) {
    noop();
  }
}
