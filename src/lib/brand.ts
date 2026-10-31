/** Travel Jungle brand tokens — keep in sync with globals.css */
export const brand = {
  colors: {
    jungleGreen: "#183D2B",
    warmSand: "#F5F0E5",
    earthCoral: "#E97848",
    goldenYellow: "#D5B46A",
    leafSage: "#DCE5D5",
  },
  fonts: {
    display: "var(--font-playfair)",
    sans: "var(--font-dm-sans)",
  },
  tagline: "Find the Hidden. Feel the Story.",
  name: "Travel Jungle",
  scopeNote: "India-only travel experiences and stories.",
} as const;

export type BrandColor = keyof typeof brand.colors;
