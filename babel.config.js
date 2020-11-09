//В проекте использую tsc. Однако для сборки тестов нужен babel.
//Я следовал этой инструкции: https://jestjs.io/docs/en/getting-started#using-typescript
module.exports = {
    presets: [["@babel/preset-env", { targets: { node: "current" } }]],
};