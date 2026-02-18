export type Theme = {
  id: string;
  name: string;
  bg: string;
  textMain: string;
  textDim: string;
  accent: string;
  accentSoft: string;
};

export const THEMES: Theme[] = [
  {
    id: 'theme-bert-dark',
    name: 'Bert Dark',
    bg: '#0B0C10',
    textMain: '#C5C6C7',
    textDim: '#1F2833',
    accent: '#66FCF1',
    accentSoft: '#45A29E',
  },
  {
    id: 'theme-armchair-light',
    name: 'Armchair',
    bg: '#EAE7DC',
    textMain: '#8E8D8A',
    textDim: '#D8C3A5',
    accent: '#E98074',
    accentSoft: '#E85A4F',
  },
  {
    id: 'theme-matrix',
    name: 'Matrix',
    bg: '#000000',
    textMain: '#00FF41',
    textDim: '#003B00',
    accent: '#00FF41',
    accentSoft: '#008F11',
  }
];