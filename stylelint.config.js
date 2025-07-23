// stylelint.config.js
module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-recess-order',
    'stylelint-config-prettier',
  ],
  plugins: [
    'stylelint-prettier',
    'stylelint-high-performance-animation',
    'stylelint-no-unsupported-browser-features',
  ],
  rules: {
    'prettier/prettier': true,
    'block-no-empty': true,
    'color-no-invalid-hex': true,
    'declaration-block-no-duplicate-properties': true,
    'declaration-block-no-shorthand-property-overrides': true,
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['focus-visible', 'global', 'local'],
      },
    ],
    'plugin/no-low-performance-animation-properties': true,
    'plugin/no-unsupported-browser-features': [
      true,
      {
        severity: 'warning',
        ignore: ['css-resize', 'css-appearance'],
      },
    ],
    'a11y/media-prefers-reduced-motion': true,
    'custom-property-pattern': [
      '^[a-z][a-z0-9]*(-[a-z0-9]+)*$',
      {
        message: 'Custom properties should be kebab-case (e.g., --nasa-blue)',
      },
    ],
    'function-url-no-scheme-relative': true,
    'function-url-scheme-allowed-list': ['https', 'data'],
    'color-named': 'never',
    'color-hex-length': 'long',
    'selector-class-pattern': [
      '^[a-z][a-z0-9]*(-[a-z0-9]+)*$',
      {
        message: 'Class names should be kebab-case',
      },
    ],
  },
  overrides: [
    {
      files: ['**/*.module.css', '**/*.module.scss'],
      rules: {
        'selector-class-pattern': null,
      },
    },
  ],
  ignoreFiles: [
    '**/node_modules/**',
    '**/dist/**',
    '**/coverage/**',
  ],
};