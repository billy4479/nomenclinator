import Element from './element';
import data from '../data';
import ElementType from './elementType';

export default class PeriodicTable {
  private static instance: PeriodicTable;

  private static isInitialized = false;

  public readonly elements: Element[];

  constructor(elements: Element[]) {
    this.elements = elements;
  }

  static get(): PeriodicTable {
    if (this.isInitialized) return PeriodicTable.instance;

    const elements = new Array<Element>(data.length);
    data.forEach((e) => {
      let elementType: ElementType;
      switch (e.rawType) {
        case 'Metal':
          elementType = ElementType.Metal;
          break;
        case 'NonMetal':
          elementType = ElementType.NonMetal;
          break;
        case 'Metalloid':
          elementType = ElementType.Metalloid;
          break;
        case 'Actinide':
          elementType = ElementType.Actinide;
          break;
        case 'Lanthanide':
          elementType = ElementType.Lanthanide;
          break;
        case 'NobleGas':
          elementType = ElementType.NobleGas;
          break;
        default:
          throw new Error(`Invalid ElementType: ${e.rawType}`);
      }

      elements.push(
        new Element(
          e.symbol,
          e.name,
          e.atomicNumber,
          e.atomicWeight,
          e.oxidationStates,
          elementType
        )
      );
    });

    this.instance = new PeriodicTable(
      elements.sort((a, b) => a.atomicNumber - b.atomicNumber)
    );

    this.isInitialized = true;
    return PeriodicTable.instance;
  }

  static search(symbol: string): Element {
    const p = PeriodicTable.get();
    if (!this.isInitialized) {
      throw new Error('Periodic Table is not initialized!');
    }
    for (let i = 0; i < p.elements.length; i++) {
      if (p.elements[i].symbol === symbol) return p.elements[i];
    }
    throw new Error(`Element not found: ${symbol}`);
  }

  static trySearch(symbol: string): Element | null {
    try {
      return this.search(symbol);
    } catch {
      return null;
    }
  }
}
