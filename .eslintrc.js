/*
 * @Description:
 * @Author: Levine
 * @Date: 2021-07-30 15:35:07
 * @LastEditors: Levine
 * @LastEditTime: 2021-11-05 09:41:07
 * @FilePath: \change-face\.eslintrc.js
 */
const { defineConfig } = require('eslint-define-config')
module.exports = defineConfig({
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true
  },
  parser: 'vue-eslint-parser',
  globals: {
    uni: 'readonly',
    wx: 'readonly'
  },
  extends: ['eslint:recommended', 'plugin:vue/strongly-recommended'],
  rules: {
    /**
     * 关闭规则：0 || off
     * 警告：1 || warn
     * 错误：2 || error
     */
    'no-unused-vars': 'off', // 禁止出现未使用过的变量
    'no-irregular-whitespace': 'off', // 禁止不规则的空白
    // 'vue/custom-event-name-casing': 'off',
    'no-use-before-define': 'off',
    'space-before-function-paren': 'off',
    'vue/attributes-order': 'off',
    'vue/one-component-per-file': 'off',
    'vue/html-closing-bracket-newline': 'off',
    'vue/max-attributes-per-line': 'off',
    'vue/multiline-html-element-content-newline': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/attribute-hyphenation': 'off',
    'vue/require-default-prop': 'off',
    'vue/script-setup-uses-vars': 'off',
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'always',
          normal: 'never',
          component: 'always'
        },
        svg: 'always',
        math: 'always'
      }
    ]
  }
})
