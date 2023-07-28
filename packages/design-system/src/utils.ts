const backgrounds = [
  'bg-oak',
  'bg-forest',
  'bg-sand',
  'bg-lime',
  'bg-sky',
  'bg-evening',
  'bg-stone',
  'bg-morning',
] as const;

export const getRandomBackground = () => {
  return backgrounds[Math.floor(Math.random() * backgrounds.length)];
};
