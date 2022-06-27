module.exports = {
  globals: {
    __PATH_PREFIX__: true,
  },
  extends: [
    "next/core-web-vitals",
    "plugin:react/recommended",
    "prettier",
    "plugin:prettier/recommended",
  ],
  plugins: ["react", "prettier"],
  rules: {
    "react/react-in-jsx-scope": "off",
  },
};
