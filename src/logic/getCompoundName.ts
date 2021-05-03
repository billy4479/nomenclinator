import commonCompounds from '../models/commonCompounds';
import Compound from '../models/compound';
import CompoundNames from '../models/compoundNames';
import CompoundType from '../models/compoundType';
import ElementType from '../models/elementType';
import utils from './utils';

export default function getCompoundName(c: Compound): CompoundNames {
  const names = new CompoundNames();

  {
    let i: number | undefined;
    commonCompounds.forEach((comComp, index) => {
      if (comComp.isEqualTo(c)) {
        i = index;
      }
    });
    if (i !== undefined) return commonCompounds[i].names;
  }
  switch (c.compoundType) {
    case CompoundType.ElementoSingolo:
      names.IUPAC = c.main[0].element.name;
      names.traditional = c.main[0].element.name;
      break;

    case CompoundType.SaleBinario:
      // FeCl3 -> Cloruro Ferr-oso
      //       -> tri-cloruro di ferro

      const first =
        c.main[0].element.elementType === ElementType.NonMetal
          ? c.main[0]
          : c.main[1];

      const second =
        c.main[0].element.elementType === ElementType.Metal
          ? c.main[0]
          : c.main[1];

      // Traditional
      {
        const os = first.n;
        const i = second.element.oxidationStates.indexOf(os);
        if (!i) names.traditional = 'Error';
        const suffix =
          second.element.oxidationStates.length / 2 > i ? 'oso' : 'ico';

        names.traditional = `${utils.prepareForSuffix(
          first.element.name
        )}uro ${utils.prepareForSuffix(second.element.name)}${suffix}`;
      }

      // IUPAC
      names.IUPAC = `${utils.getGreekPrefix(first.n)}${utils
        .prepareForSuffix(first.element.name)
        .toLowerCase()}uro di ${second.element.name}`;

      break;

    default:
      names.IUPAC = 'Error';
      names.traditional = 'Error';
      break;
  }

  return names;
}
