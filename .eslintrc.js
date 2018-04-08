module.exports = {
  root: true,
  env: {
    node: true
  },
  parser: 'babel-eslint',
  extends: [
    "eslint:recommended",
    "plugin:prettier/recommended"
  ],
  // required to lint *.vue files
  plugins: [],
  // add your custom rules here
  rules: {}
}
