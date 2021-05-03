function getGreekPrefix(n: number): string {
  switch (n) {
    case 1:
      return '';
    case 2:
      return 'Di';
    case 3:
      return 'Tri';
    case 4:
      return 'Tetra';
    case 5:
      return 'Penta';
    case 6:
      return 'Esa';
    case 7:
      return 'Sept';
    default:
      throw new Error(`Invalid number: ${n}`);
  }
}

function prepareForSuffix(elementName: string): string {
  return elementName.slice(undefined, elementName.length - 1);
}

export default { getGreekPrefix, prepareForSuffix };
