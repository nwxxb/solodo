module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["plugin:react/recommended", "airbnb"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {
    "react/jsx-filename-extension": "off",
    "no-console": "off",
    // add proptypes later
    "react/prop-types": "off",
    "react/react-in-jsx-scope": "off",
    // spread off per line only for external component
  },
};
