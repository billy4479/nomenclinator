export default class CompoundNames {
  constructor(public traditional: string = '', public IUPAC: string = '') {
    this.traditional = traditional;
    this.IUPAC = IUPAC;
  }
}
