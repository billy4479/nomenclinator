import parse from '../logic/parseCompound';
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
  const input = parse('H2O');

  expect(input.isEqualTo(commonCompounds[0])).toEqual(true);
});
