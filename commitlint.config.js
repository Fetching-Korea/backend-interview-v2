'use strict';

module.exports = {
  parserPreset: 'conventional-changelog-conventionalcommits',
  rules: {
    'body-leading-blank': [2, 'always'],
    'body-max-line-length': [2, 'always', 72],

    'footer-leading-blank': [2, 'always'],
    'footer-empty': [2, 'always'],
    'footer-max-line-length': [2, 'always', Infinity],

    'header-max-length': [2, 'always', 50],
    'header-min-length': [2, 'always', 0],

    'scope-case': [2, 'always', 'lower-case'],

    'subject-case': [
      2,
      'never',
      ['sentence-case', 'start-case', 'pascal-case', 'upper-case'],
    ],

    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    'type-enum': [
      2,
      'always',
      ['int', 'doc', 'ftr', 'mod', 'fix', 'rfc', 'add', 'rmv', 'rls'],
    ],
  },
};
