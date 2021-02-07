export enum ElementType {
  /* eslint-disable no-unused-vars */
  Metall = 'Metall',
  NonMetall = 'NonMetall',
  Metalloid = 'Metalloid',
  Actinide = 'Actinide',
  Lanthanide = 'Lanthanide',
  NobleGas = 'NobleGas',
  /* eslint-enable */
}

export default class Element {
  public elementType: ElementType;

  constructor(
    /* eslint-disable no-unused-vars */
    public readonly symbol: string,
    public readonly name: string,
    public readonly atomicNumber: number,
    public readonly atomicWeight: number,
    type: string
    /* eslint-enable */
  ) {
    switch (type) {
      case 'Metall':
        this.elementType = ElementType.Metall;
        break;
      case 'NonMetall':
        this.elementType = ElementType.NonMetall;
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
