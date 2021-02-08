export enum ElementType {
  /* eslint-disable no-unused-vars */
  Metal = 'Metal',
  NonMetal = 'NonMetal',
  Metalloid = 'Metalloid',
  Actinide = 'Actinide',
  Lanthanide = 'Lanthanide',
  NobleGas = 'NobleGas',
  /* eslint-enable */
}

export default class Element {
  public readonly elementType: ElementType;

  constructor(
    /* eslint-disable no-unused-vars */
    public readonly symbol: string,
    public readonly name: string,
    public readonly atomicNumber: number,
    public readonly atomicWeight: number,
    public readonly oxidationStates: number[],
    type: string
    /* eslint-enable */
  ) {
    switch (type) {
      case 'Metal':
        this.elementType = ElementType.Metal;
        break;
      case 'NonMetal':
        this.elementType = ElementType.NonMetal;
        break;
      case 'Metalloid':
        this.elementType = ElementType.Metalloid;
        break;
      case 'Actinide':
        this.elementType = ElementType.Actinide;
        break;
      case 'Lanthanide':
        this.elementType = ElementType.Lanthanide;
        break;
      case 'NobleGas':
        this.elementType = ElementType.NobleGas;
        break;

      default:
        throw new Error(`Invalid ElementType: ${type}`);
    }
  }
}
