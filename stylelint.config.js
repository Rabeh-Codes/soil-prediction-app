// stylelint.config.js

module.exports = {
  extends: [
    'stylelint-config-standard', // Base recommended rules
    'stylelint-config-prettier', // Disable rules that conflict with Prettier
  ],
  plugins: [
    'stylelint-prettier', // Integrates Prettier with Stylelint
  ],
  rules: {
    'prettier/prettier': true, // Enable Prettier as a Stylelint rule
    'block-no-empty': true, // Disallow empty code blocks
    'color-no-invalid-hex': true, // Disallow invalid hex colors
    'declaration-block-no-duplicate-properties': true, // Avoid duplicate CSS properties
    'declaration-block-no-shorthand-property-overrides': true,
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global', 'local'], // Support for CSS Modules
      },
    ],
  },
  ignoreFiles: [
    '**/*.js', // Ignore JS files
    '**/*.ts', // Ignore TypeScript files
    '**/*.tsx', // Ignore React TSX files
  ],
};
