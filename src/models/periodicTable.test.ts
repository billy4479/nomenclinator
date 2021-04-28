import Element from './element';
import ElementType from './elementType';
import PeriodicTable from './periodicTable';

test('element loading', () => {
  const { elements } = PeriodicTable.get();
  expect(elements).toBeDefined();
  expect(elements.length).toBeGreaterThan(0);
});

test('search element', () => {
  const H = new Element('H', 'Idrogeno', 1, 1.00794, [1], ElementType.NonMetal);
  expect(PeriodicTable.search('H')).toEqual(H);
});
