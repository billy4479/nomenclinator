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
      return 'Epta';
    default:
      throw new Error(`Invalid number: ${n}`);
  }
}

// const vocals = ['a', 'e', 'i', 'o', 'u'];

// function prepareForSuffix(elementName: string): string {
//   let index = 0;
//   for (let i = elementName.length - 1; i > 0; i--) {
//     if (!vocals.includes(elementName[i])) {
//       index = i;
//       break;
//     }
//   }
//   return elementName.slice(undefined, index);
// }

function prepareForSuffix(elementName: string): string {
  return elementName.slice(undefined, elementName.length - 1);
}

export default { getGreekPrefix, prepareForSuffix };
