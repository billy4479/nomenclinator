import Compound from './models/compound';

async function life() {
  const e = await Compound.parse('Mg(OH)2');
  console.log(e);
}

life();
