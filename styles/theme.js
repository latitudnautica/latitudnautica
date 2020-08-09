const colors = {
  background: "#f29b0b",
  backgroundHover: "#cd8104",
  primary: "#4888ca",
  paleCerulean: "#98C1D9",
  blueSapphire: "#326273",
  greenPantone: "#4DAA57",
  celadon: "#3B5DDA4",
  raisinBlack: "#25171A",
  lightBlack: "#F5F5F5"
};

const button = {
  background: colors.background,
  textColor: "#333333",
  textColorHover: "#000",
  hover: colors.backgroundHover
};

const details = {
  boxShadow: "0 0 8px -4px #25171A",
  boxShadowBottom: "0 10px 18px -10px #25171A"
};

const theme = { colors, button, details };

export default theme;