import type Compound from '../models/compound';
import commonCompounds from '../models/commonCompounds';
import CompoundType from '../models/compoundType';
import ElementN from '../models/elementN';

export default function GetCompoundType(c: Compound): CompoundType {
  // TODO: Perossidi

  let i: number | undefined;
  commonCompounds.forEach((comComp, index) => {
    if (comComp.isEqualTo(c)) {
      i = index;
    }
  });
  if (i !== undefined) return commonCompounds[i].compoundType;

  if (c.totalLength === 1) return CompoundType.ElementoSingolo;
  if (c.totalLength === 2) {
    // Possibilities:
    // - Idruro Metallico
    // - Idruro Covalente
    // - Idracido
    // - Ossido Acido
    // - Ossido Basico
    // - Sale Binario
    // - Ossoanione

    if (c.has('O')) {
      // Possibilities:
      // - Ossido Acido
      // - Ossido Basico
      // - Ossoanione

      if (c.checkMetal()) return CompoundType.OssidoBasico;

      if (c.isInsideParentheses) {
        const O = c.main[0].element.symbol === 'O' ? c.main[0] : c.main[1];
        const other = c.main[0].element.symbol !== 'O' ? c.main[0] : c.main[1];

        const chargeO = O.n * O.element.oxidationStates[0];
        const possibleChargesOther = other.element.oxidationStates.map(
          (v) => v * other.n
        );
        possibleChargesOther.forEach((v) => {
          const possibleCharge = chargeO + v;
          if (c.charge === 0 || Math.abs(possibleCharge) < c.charge) {
            c.setCharge(possibleCharge);
          }
        });

        if (c.charge !== 0) return CompoundType.Ossoanione;
      }

      return CompoundType.OssidoAcido;
    }

    if (c.has('H')) {
      // Possibilities:
      // - Idruro Metallico
      // - Idruro Covalente
      // - Idracido

      if (c.checkMetal()) return CompoundType.IdruroMetallico;
      if (c.has('S') || c.has('F') || c.has('Br') || c.has('Cl') || c.has('I'))
        return CompoundType.Idracido;
      return CompoundType.IdruroCovalente;
    }

    return CompoundType.SaleBinario;
  }
  if (c.totalLength === 3) {
    const hasMetal = c.checkMetal();
    const hasNonMetal = c.checkNonMetal();

    if (hasMetal && !hasNonMetal) return CompoundType.Idrossido;

    if (!hasMetal && hasNonMetal) {
      if (c.isInsideParentheses) {
        let O: ElementN | undefined;
        let H: ElementN | undefined;
        let other: ElementN | undefined;
        c.main.forEach((v) => {
          switch (v.element.symbol) {
            case 'O':
              O = v;
              break;
            case 'H':
              H = v;
              break;
            default:
              other = v;
              break;
          }
        });

        if (!O || !H || !other) return CompoundType.Error;

        const chargeO = O.n * O.element.oxidationStates[0];
        const chargeH = H.n * H.element.oxidationStates[0];
        const possibleChargesOther = other.element.oxidationStates.map(
          (v) => v * (other?.n || 0)
        );
        possibleChargesOther.forEach((v) => {
          const possibleCharge = chargeO + chargeH + v;
          if (c.charge === 0 || Math.abs(possibleCharge) < Math.abs(c.charge)) {
            c.setCharge(possibleCharge);
          }
        });

        if (c.charge !== 0) return CompoundType.Ossoanione;
      }

      return CompoundType.Ossiacido;
    }

    if (hasMetal && hasNonMetal) return CompoundType.SaleTernario;

    return CompoundType.Error;
  }
  if (c.totalLength === 4) {
    if (c.checkMetal() && c.checkNonMetal() && c.has('H'))
      return CompoundType.SaleAcido;
    return CompoundType.Error;
  }

  return CompoundType.Error;
}
