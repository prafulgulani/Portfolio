export type Theme = {
  id: string;
  name: string;
  bg: string; // Main background
  surface: string; // Chat bubbles, cards, header
  textMain: string; // High-contrast primary text
  textDim: string; // Muted/Secondary text
  accent: string; // The brand "pop" color
  onAccent: string; // Text/icons on accent (for buttons, highlights)
};

export const THEMES: Theme[] = [
  {
    id: "theme-bert-dark",
    name: "Bert Dark",
    bg: "#0B0C10",
    surface: "#1F2833",
    textMain: "#FFFFFF",
    textDim: "#C5C6C7",
    accent: "#66FCF1",
    onAccent: "#45A29E",
  },
  {
    id: "theme-armchair-light",
    name: "Armchair Light",
    bg: "#EAE7DC",
    surface: "#D8C3A5",
    textMain: "#000000",
    textDim: "#8E8D8A",
    accent: "#E85A4F",
    onAccent: "#E98074",
  },
];
