import globals from "globals";
import pluginJs from "@eslint/js";
import prettierPlugin from "eslint-plugin-prettier";

export default [
    {
        ignores: ["android/wdio.conf.js", "ios/wdio.conf.js"],
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
            globals: {
                ...globals.node,
                ...globals.mocha,
                browser: "readonly",
                expect: "readonly",
                $: "readonly",
                $$: "readonly"
            }
        },

        plugins: {
            prettier: prettierPlugin
        },

        rules: {
            ...pluginJs.configs.recommended.rules,
            "prettier/prettier": [
                "error",
                {
                    singleQuote: false,
                    tabWidth: 4,
                    useTabs: false,
                    semi: true,
                    trailingComma: "none",
                    printWidth: 80,
                    arrowParens: "always",
                    bracketSpacing: true,
                    singleAttributePerLine: true
                }
            ],
            "no-console": "off",
            "prefer-const": "warn",
            "arrow-body-style": ["warn", "as-needed"],
            "prefer-arrow-callback": "off",
            "sort-imports": "error",
            "padding-line-between-statements": [
                "error",
                {
                    blankLine: "always",
                    prev: ["const", "let", "var"],
                    next: "*"
                },
                {
                    blankLine: "any",
                    prev: ["const", "let", "var"],
                    next: ["const", "let", "var"]
                },
                { blankLine: "always", prev: "*", next: "return" }
            ],
            "padded-blocks": [
                "error",
                {
                    blocks: "never",
                    classes: "never",
                    switches: "never"
                }
            ]
        }
    }
];
