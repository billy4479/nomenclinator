import commonCompounds from '../models/commonCompounds';
import Compound from '../models/compound';
import CompoundNames from '../models/compoundNames';
import CompoundType from '../models/compoundType';

export default function getCompoundName(c: Compound): CompoundNames {
  const names = new CompoundNames();

  let i: number | undefined;
  commonCompounds.forEach((comComp, index) => {
    if (comComp.isEqualTo(c)) {
      i = index;
    }
  });
  if (i !== undefined) return commonCompounds[i].names;

  switch (c.compoundType) {
    case CompoundType.ElementoSingolo:
      names.IUPAC = c.main[0].element.name;
      names.traditional = c.main[0].element.name;
      break;

    default:
      break;
  }

  return names;
}
