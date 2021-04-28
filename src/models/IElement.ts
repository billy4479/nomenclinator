export default interface IElement {
  readonly name: string;
  readonly symbol: string;
  // readonly elementType: ElementType;
  readonly atomicNumber: number;
  readonly atomicWeight: number;
  readonly oxidationStates: number[];
  rawType: string;

  // elementType(): ElementType;
}
