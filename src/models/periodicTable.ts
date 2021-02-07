import Element from './element';

export default class PeriodicTable {
  static instance: PeriodicTable;

  private static isInitialized = false;

  private readonly elements: Element[];

  constructor(elements: Element[]) {
    this.elements = elements;
  }

  static async get(): Promise<PeriodicTable> {
    if (this.isInitialized) return PeriodicTable.instance;

    const elements: Element[] = [];
    await fetch('/data.json')
      .then((value: Response) => value.json())
      .then((value: any) => {
        value.elements.forEach((e: any) => {
          elements.push(
            new Element(
              e.symbol,
              e.name,
              e.atomicNumber,
              e.atomicWeight,
              e.type
            )
          );
        });
      });

    this.instance = new PeriodicTable(
      elements.sort((a, b) => a.atomicNumber - b.atomicNumber)
    );

    this.isInitialized = true;
    return PeriodicTable.instance;
  }

  static async search(symbol: string): Promise<Element> {
    const p = await PeriodicTable.get();
    if (!this.isInitialized) {
      throw new Error('Periodic Table is not initialized!');
    }
    for (let i = 0; i < p.elements.length; i++) {
      if (p.elements[i].symbol === symbol) return p.elements[i];
    }
    throw new Error(`Element not found: ${symbol}`);
  }

  static async trySearch(symbol: string): Promise<Element | null> {
    try {
      return await this.search(symbol);
    } catch (_) {
      return null;
    }
  }
}
