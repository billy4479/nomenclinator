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

    case CompoundType.OssidoAcido:
      // CO2 -> Anidride Carbonica
      //     -> Diossido di Carbonio

      const O = c.main[0].element.symbol === 'O' ? c.main[0] : c.main[1];
      const other = c.main[0].element.symbol !== 'O' ? c.main[0] : c.main[1];

      // IUPAC
      {
        const prefix = utils.getGreekPrefix(O.n);
        names.IUPAC = `${prefix}${prefix === '' ? 'Ossido' : 'ossido'} di ${
          other.element.name
        }`;
      }

      // Traditional
      {
        let ox = 0;
        other.element.oxidationStates.forEach((v) => {
          if (v * other.n + O.element.oxidationStates[0] * O.n === 0) ox = v;
        });

        const filtered = other.element.oxidationStates.filter(
          (v) => v > 0 === ox > 0
        );

        const i = filtered.indexOf(ox);

        const suffix = filtered.length / 2 > i ? 'osa' : 'ica';
        let prefix = '';
        if (filtered.length >= 4) {
          if (i === 0) prefix = 'Ipo';
          if (i === filtered.length - 1) prefix = 'Per';
        }

        let body = utils.prepareForSuffix(other.element.name);
        if (body[body.length - 1] === suffix[0])
          body = body.slice(0, body.length - 2);

        names.traditional = `Anidride ${prefix}${
          prefix === '' ? body : body.toLocaleLowerCase()
        }${suffix}`;
      }

      break;

    default:
      names.IUPAC = 'Error';
      names.traditional = 'Error';
      break;
  }

  return names;
}
