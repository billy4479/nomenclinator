import Compound, { CompoundType } from '../models/compound';
import commonCompounds from '../models/commonCompounds';
import { ElementType } from '../models/element';

export default function GetCompoundType(c: Compound): CompoundType {
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
    let hasNonMetal = false;
    let hasMetal = false;

    c.main.forEach((element) => {
      if (element.element.symbol === 'O' || element.element.symbol === 'H')
        return;
      if (element.element.elementType === ElementType.Metal) hasMetal = true;
      if (element.element.elementType === ElementType.NonMetal)
        hasNonMetal = true;
    });

    if (c.parentheses !== null) {
      c.parentheses.main.forEach((element) => {
        if (element.element.symbol === 'O' || element.element.symbol === 'H')
          return;
        if (element.element.elementType === ElementType.Metal) hasMetal = true;
        if (element.element.elementType === ElementType.NonMetal)
          hasNonMetal = true;
      });
    }

    if (hasMetal && !hasNonMetal) return CompoundType.Idrossido;

    if (!hasMetal && hasNonMetal) return CompoundType.Ossiacido;

    if (hasMetal && hasNonMetal) return CompoundType.SaleTernario;

    return CompoundType.Error;
  }

  return CompoundType.Error;
}
