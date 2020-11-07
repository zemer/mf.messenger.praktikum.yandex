##ЧАТ

[Прототип](https://www.figma.com/file/Q54yuzGZDILvmg4wCe5Kco/%D0%A7%D0%90%D0%A2?node-id=0%3A1)

[![Netlify Status](https://api.netlify.com/api/v1/badges/9930d43a-52de-4076-a5db-328eb15c058b/deploy-status)](https://app.netlify.com/sites/naughty-wescoff-127c17/deploys)

[Проектная работа. 3-й спринт](https://naughty-wescoff-127c17.netlify.app)

## Примечания

> точно нужен handlebars из cdn ? handlebars есть же в зависимостях, его можно импортировать в проект import Handlebars from "handlebars"; и использовать
Пока handlebars из cdn нужен. Вероятно, после темы webpack можно будет использовать импорт.
А до тех пор я получаю ошибку:
```
Uncaught TypeError: Failed to resolve module specifier "handlebars". Relative references must start with either "/", "./", or "../".
```

> для чего сейчас в проекте babel ? кажется, что лишнее на данном этапе проекта, вся сборка же через tsc
В проекте использую tsc. Однако для сборки тестов нужен babel. Я следовал этой инструкции: https://jestjs.io/docs/en/getting-started#using-typescript

## Запуск

1. Установка модулей: `npm install`
2. Тесты: `npm test`
3. Запуск приложения: `npm start`