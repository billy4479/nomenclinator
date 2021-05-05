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

      {
        const first =
          c.main[0].element.elementType === ElementType.NonMetal
            ? c.main[0]
            : c.main[1];

        const second =
          c.main[0].element.elementType === ElementType.Metal
            ? c.main[0]
            : c.main[1];

        // IUPAC
        {
          const prefixFirst = utils.getGreekPrefix(first.n);
          const prefixSecond = utils.getGreekPrefix(second.n);
          const body = utils.prepareForSuffix(first.element.name);
          names.IUPAC = `${prefixFirst}${
            prefixFirst === '' ? body : body.toLowerCase()
          }uro di ${prefixSecond}${
            prefixSecond === ''
              ? second.element.name
              : second.element.name.toLowerCase()
          }`;
        }

        // Traditional
        if (second.element.oxidationStates.length === 1) {
          names.traditional = `${utils.prepareForSuffix(
            first.element.name
          )}uro di ${second.element.name}`;
          break;
        }

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
      }

      break;

    case CompoundType.OssidoAcido:
    case CompoundType.OssidoBasico:
      // CO2   -> Anidride Carbonica
      //       -> Diossido di Carbonio
      // Ni2O3 -> Ossido Nichelico
      //       -> Triossido di Dinichel

      {
        const O = c.main[0].element.symbol === 'O' ? c.main[0] : c.main[1];
        const other = c.main[0].element.symbol !== 'O' ? c.main[0] : c.main[1];

        // IUPAC
        {
          const prefixO = utils.getGreekPrefix(O.n);
          const prefixOther = utils.getGreekPrefix(other.n);
          names.IUPAC = `${prefixO}${
            prefixO === '' ? 'Ossido' : 'ossido'
          } di ${prefixOther}${
            prefixOther === ''
              ? other.element.name
              : other.element.name.toLowerCase()
          }`;
        }

        // Traditional
        {
          if (other.element.oxidationStates.length === 1) {
            names.traditional = `Ossido di ${other.element.name}`;
            break;
          }

          let ox = 0;
          other.element.oxidationStates.forEach((v) => {
            if (v * other.n + O.element.oxidationStates[0] * O.n === 0) ox = v;
          });

          const filtered = other.element.oxidationStates.filter(
            (v) => v > 0 === ox > 0
          );

          const i = filtered.indexOf(ox);

          let suffix = '';
          if (c.compoundType === CompoundType.OssidoAcido)
            suffix = filtered.length / 2 > i ? 'osa' : 'ica';
          else suffix = filtered.length / 2 > i ? 'oso' : 'ico';

          let prefix = '';
          if (filtered.length >= 4) {
            if (i === 0) prefix = 'Ipo';
            if (i === filtered.length - 1) prefix = 'Per';
          }

          let body = utils.prepareForSuffix(other.element.name);
          if (body[body.length - 1] === suffix[0])
            body = body.slice(0, body.length - 2);

          names.traditional = `${
            c.compoundType === CompoundType.OssidoAcido ? 'Anidride' : 'Ossido'
          } ${prefix}${
            prefix === '' ? body : body.toLocaleLowerCase()
          }${suffix}`;
        }
      }
      break;

    case CompoundType.Idracido:
    case CompoundType.IdruroMetallico:
    case CompoundType.IdruroCovalente:
      {
        const H = c.main[0].element.symbol === 'H' ? c.main[0] : c.main[1];
        const other = c.main[0].element.symbol !== 'H' ? c.main[0] : c.main[1];

        // IUPAC
        {
          const prefixH = utils.getGreekPrefix(H.n);
          const prefixOther = utils.getGreekPrefix(other.n);
          names.IUPAC = `${prefixH}${
            prefixH === '' ? 'Idruro' : 'idruro'
          } di ${prefixOther}${
            prefixOther === ''
              ? other.element.name
              : other.element.name.toLowerCase()
          }`;
        }

        switch (c.compoundType) {
          case CompoundType.Idracido:
            let body = utils.prepareForSuffix(other.element.name);
            const suffix = 'idrico';
            if (body[body.length - 1] === suffix[0])
              body = body.slice(0, body.length - 1);

            names.traditional = `Acido ${body}${suffix}`;
            break;
          case CompoundType.IdruroCovalente:
          case CompoundType.IdruroMetallico:
            names.traditional = `Idruro di ${other.element.name}`;
            break;
          default:
            break;
        }
      }
      break;

    default:
      names.IUPAC = 'Error';
      names.traditional = 'Error';
      break;
  }

  return names;
}
