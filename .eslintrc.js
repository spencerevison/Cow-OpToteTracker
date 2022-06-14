module.exports = {
  globals: {
    __PATH_PREFIX__: true,
  },
  extends: ["next/core-web-vitals", "prettier", "plugin:prettier/recommended"],
  plugins: ["react", "prettier"],
  rules: {},
};
