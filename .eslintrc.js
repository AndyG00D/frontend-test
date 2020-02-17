module.exports = {
  "settings": {
    "import/parsers": { "@typescript-eslint/parser": [".ts"] },
    "import/resolver": { "eslint-import-resolver-typescript": true },
  },
  "env": {
    "browser": true,
    "es6": true
  },
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "project": "tsconfig.json",
    "sourceType": "module"
  },
  "plugins": [
    "@typescript-eslint",
    "@typescript-eslint/tslint",
    "import",
  ],
  "rules": {
    "@typescript-eslint/adjacent-overload-signatures": "error",
    "@typescript-eslint/array-type": "error",
    "@typescript-eslint/ban-types": "error",
    "@typescript-eslint/class-name-casing": "error",
    "@typescript-eslint/indent": ["error", 2],
    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/no-empty-interface": "error",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-inferrable-types": "off",
    "@typescript-eslint/no-misused-new": "error",
    "@typescript-eslint/no-namespace": "error",
    "@typescript-eslint/no-non-null-assertion": "error",
    "@typescript-eslint/no-parameter-properties": "off",
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/prefer-function-type": "error",
    "@typescript-eslint/prefer-namespace-keyword": "error",
    "@typescript-eslint/type-annotation-spacing": "error",
    "@typescript-eslint/unified-signatures": "error",
    "arrow-body-style": "error",
    "arrow-parens": [
      "off",
      "as-needed"
    ],
    "complexity": "off",
    "constructor-super": "error",
    "curly": "error",
    "dot-notation": "warn",
    "eol-last": "error",
    "guard-for-in": "error",
    "max-classes-per-file": "off",
    "new-parens": "error",
    "no-bitwise": "error",
    "no-caller": "error",
    "no-cond-assign": "error",
    "prefer-template": "error",
    "no-debugger": "error",
    "no-empty": "off",
    "no-empty-functions": "off",
    "no-fallthrough": "error",
    "no-invalid-this": "off",
    "no-multiple-empty-lines": "error",
    "no-new-wrappers": "error",
    "no-throw-literal": "error",
    "no-undef-init": "error",
    "no-unsafe-finally": "error",
    "no-unused-labels": "error",
    "no-var": "error",
    "object-shorthand": "error",
    "prefer-const": "error",
    "quote-props": [
      "error",
      "as-needed"
    ],
    "radix": "error",
    "space-before-function-paren": [
      "error",
      {
        "anonymous": "never",
        "asyncArrow": "always",
        "named": "never"
      }
    ],
    "use-isnan": "error",
    "valid-typeof": "off",
    "@typescript-eslint/tslint/config": [
      "error",
      {
        "rulesDirectory": [
          "rxjs-tslint-rules",
          "codelyzer",
          "rxjs-tslint",
          "tslint-consistent-codestyle",
          "tslint-no-focused-test"
        ],
        "rules": {
          "align": [
            true,
            "parameters",
            "statements"
          ],
          "comment-format": [
            true,
            "check-space"
          ],
          "component-class-suffix": true,
          "component-selector": [
            true,
            "element",
            "kebab-case"
          ],
          "contextual-lifecycle": true,
          "directive-class-suffix": true,
          "directive-selector": [
            true,
            "attribute",
            "camelCase"
          ],
          "import-blacklist": [
            true,
            "rxjs/Rx",
            {
              "@angular/core": [
                "CUSTOM_ELEMENTS_SCHEMA"
              ]
            }
          ],
          "import-spacing": true,
          "jsdoc-format": true,
          "max-line-length": [
            true,
            140
          ],
          "naming-convention": [
            true,
            {
              "type": "enum",
              "format": "PascalCase"
            }
          ],
          "no-focused-test": true,
          "no-accessor-recursion": true,
          "no-async-without-await": true,
          "no-collapsible-if": true,
          "no-conflicting-lifecycle": true,
          "no-default-export": true,
          "no-else-after-return": true,
          "no-host-metadata-property": true,
          "no-inputs-metadata-property": true,
          "no-output-native": true,
          "no-output-on-prefix": true,
          "no-output-rename": true,
          "no-outputs-metadata-property": true,
          "no-redundant-jsdoc": true,
          "no-reference-import": true,
          "no-return-undefined": true,
          "no-shadowed-variable": true,
          "no-static-this": true,
          "no-trailing-whitespace": true,
          "no-unnecessary-else": true,
          "no-unused-expression": true,
          "no-var-before-return": true,
          "one-line": [
            true,
            "check-catch",
            "check-else",
            "check-finally",
            "check-open-brace",
            "check-whitespace"
          ],
          "only-arrow-functions": [
            true,
            "allow-declarations",
            "allow-named-functions"
          ],
          "prefer-const-enum": true,
          "quotemark": [
            true,
            "single"
          ],
          "rxjs-collapse-imports": true,
          "rxjs-no-static-observable-methods": true,
          "rxjs-pipeable-operators-only": true,
          "rxjs-proper-imports": true,
          "semicolon": [
            true,
            "always"
          ],
          "template-banana-in-box": true,
          "template-no-negated-async": true,
          "triple-equals": [
            true,
            "allow-null-check"
          ],
          "typedef": [
            true,
            "call-signature",
            "parameter",
            "member-variable-declaration",
            "property-declaration"
          ],
          "use-lifecycle-interface": true,
          "use-pipe-transform-interface": true,
          "variable-name": [
            true,
            "ban-keywords",
            "check-format",
            "allow-pascal-case"
          ],
          "whitespace": [
            true,
            "check-branch",
            "check-decl",
            "check-operator",
            "check-separator",
            "check-type",
            "check-typecast"
          ]
        }
      }
    ]
  }
};
