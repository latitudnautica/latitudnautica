const colors = {
  background: `linear-gradient(
    90deg,
    rgba(75, 205, 238, 1) 0%,
    rgba(75, 255, 182, 1) 20%,
    rgba(75, 255, 182, 1) 80%,
    rgba(75, 205, 238, 1) 100%
  )`,
  backgroundHover: "rgba(75, 205, 238, 1)",
  primary: "#278dcd",
  paleCerulean: "#98C1D9",
  price: "#326273",
  greenPantone: "#4DAA57",
  celadon: "#3B5DDA4",
  raisinBlack: "#25171A",
  lightBlack: "#F5F5F5",
  border: "#edf2f7",
};

const input = {
  background: "#f7fafc",
  border: "#cbd5e0",
  borderOnFocus: "#4299e1",
  error: "#f56565",
};

const button = {
  background: `rgba(75, 255, 182)`,
  textColor: "#333333",
  textColorHover: "#000",
  hover: `rgba(75,205,238)`,
};

const menu = {
  background: `linear-gradient(
    0deg,
    rgba(75, 205, 238, 1) 0%,
    rgba(75, 255, 182, 1) 30%,
    rgba(75, 255, 182, 1) 70%,
    rgba(75, 205, 238, 1) 100%
  )`,
  burgerBackground: colors.primary,
  burgerBackgroundHover: colors.raisinBlack,
};
const border = {
  gradient: `linear-gradient(
    0deg,
    rgba(75, 205, 238, 1) 0%,
    rgba(75, 255, 182, 1) 30%,
    rgba(75, 255, 182, 1) 70%,
    rgba(75, 205, 238, 1) 100%
  )`,
};
const details = {
  boxShadow: "0 0 5px -4px #25171A",
  boxShadowBottom: "0 10px 18px -10px #25171A",
};

const theme = { colors, button, input, details, menu, border };

export default theme;
