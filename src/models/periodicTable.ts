import Element from './element';
import data from '../data.json'; // Yeah I know, I'm using a JSON file as a TS file, but otherwise jest would complain

export default class PeriodicTable {
  private static instance: PeriodicTable;

  private static isInitialized = false;

  public readonly elements: Element[];

  constructor(elements: Element[]) {
    this.elements = elements;
  }

  static get(): PeriodicTable {
    if (this.isInitialized) return PeriodicTable.instance;

    const elements: Element[] = [];

    data.elements.forEach((e: any) => {
      elements.push(
        new Element(
          e.symbol,
          e.name,
          e.atomicNumber,
          e.atomicWeight,
          e.oxidationStates,
          e.type
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
