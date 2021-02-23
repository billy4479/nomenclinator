import parseCompound from '../logic/parseCompound';
import commonCompounds from './commonCompounds';
import Compound, { CompoundType } from './compound';
import ElementN from './elementN';
import PeriodicTable from './periodicTable';

test('compound equality', () => {
  const H20 = new Compound(
    [
      new ElementN(PeriodicTable.search('H'), 2),
      new ElementN(PeriodicTable.search('O'), 1),
    ],
    null,
    0,
    CompoundType.Special,
    true
  );
  const H20_2 = new Compound(
    [
      new ElementN(PeriodicTable.search('O'), 1),
      new ElementN(PeriodicTable.search('H'), 2),
    ],
    null,
    0,
    CompoundType.Special,
    true
  );

  expect(H20.isEqualTo(H20_2)).toEqual(true);
});

test('compound parsing', () => {
  const input = parseCompound('H2O');

  expect(input.isEqualTo(commonCompounds[0])).toEqual(true);
});

test('compound get element N', () => {
  const input = [
    parseCompound('H2O'),
    parseCompound('Fe(OH)3'),
    parseCompound('KMnO4'),
  ];

  expect(input[0].getElementN('H')).toBe(2);
  expect(input[0].getElementN('O')).toBe(1);
  expect(input[0].getElementN('Cl')).toBe(0);

  expect(input[1].getElementN('H')).toBe(3);
  expect(input[1].getElementN('O')).toBe(3);
  expect(input[1].getElementN('Fe')).toBe(1);
  expect(input[1].getElementN('P')).toBe(0);

  expect(input[2].getElementN('K')).toBe(1);
  expect(input[2].getElementN('Mn')).toBe(1);
  expect(input[2].getElementN('O')).toBe(4);
  expect(input[2].getElementN('H')).toBe(0);
});
