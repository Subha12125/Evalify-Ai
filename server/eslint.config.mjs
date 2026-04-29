export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        require: "readonly",
        module: "readonly",
        process: "readonly",
        console: "readonly",
        __dirname: "readonly",
        __filename: "readonly",
        exports: "readonly"
      }
    },
    rules: {
      "no-unused-vars": "error",
      "no-undef": "error"
    }
  }
];
