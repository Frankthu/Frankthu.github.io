export function getRandomIdiom(idioms) {
  const randomIndex = Math.floor(Math.random() * idioms.length);
  return idioms[randomIndex];
}

