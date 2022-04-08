export const getTheme = (theme) => (theme === "light" ? light : dark);

const dark = {
  body: {
    background: "#565656",
    textColor: "#FFFFFF",
  },
  components: {
    background: "#a9a9a9",
    textColor: "#FFFFFF",
  },
};

const light = {
  body: {
    background: "#F9F9FA",
    textColor: "#545454",
  },
  components: {
    background: "#F9F9FA",
    textColor: "#545454",
  },
};
