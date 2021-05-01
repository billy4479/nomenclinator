import type Compound from '../models/compound';
import commonCompounds from '../models/commonCompounds';
import ElementType from '../models/elementType';
import CompoundType from '../models/compoundType';

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
    if (c.has('H')) {
      if (c.main.some((e) => e.element.elementType === ElementType.Metal))
        return CompoundType.IdruroMetallico;
      if (c.has('S') || c.has('F') || c.has('Br') || c.has('Cl') || c.has('I'))
        return CompoundType.Idracido;
      return CompoundType.IdruroCovalente;
    }
    if (c.has('O')) {
      if (c.main.some((e) => e.element.elementType === ElementType.Metal))
        return CompoundType.OssidoBasico;
      return CompoundType.OssidoAcido;
    }
    return CompoundType.SaleBinnario;
  }
  if (c.totalLength === 3) {
    const hasMetal = c.checkMetal();
    const hasNonMetal = c.checkNonMetal();

    if (hasMetal && !hasNonMetal) return CompoundType.Idrossido;

    if (!hasMetal && hasNonMetal) return CompoundType.Ossiacido;

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
