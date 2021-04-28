import Compound from './compound';
import CompoundType from './compoundType';
import ElementN from './elementN';
import PeriodicTable from './periodicTable';

const commonCompounds: Compound[] = [
  new Compound(
    [
      new ElementN(PeriodicTable.search('H'), 2),
      new ElementN(PeriodicTable.search('O'), 1),
    ],
    null,
    0,
    CompoundType.Special,
    true
  ),
];

export default commonCompounds;
