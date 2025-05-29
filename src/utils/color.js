// Returns the HSL string for the complementary color
export function getComplementaryHSL(h, s, l) {
  // h: 0-360, s: 0-100, l: 0-100
  // Complementary color: hue shifted by 180 degrees
  const compHue = (h + 180) % 360;
  return `hsl(${compHue}, ${s}%, ${l}%)`;
}

// Example usage:
// const original = { h: 200, s: 80, l: 90 };
// const compColor = getComplementaryHSL(original.h, original.s, original.l);
// console.log(compColor); // "hsl(20, 80%, 90%)"
