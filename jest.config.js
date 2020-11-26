module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "^Utils(.*)$": "<rootDir>/src/utils$1",
    "^Common(.*)$": "<rootDir>/src/$1",
    "^Components(.*)$": "<rootDir>/src/components/$1",
    "^Pages(.*)$": "<rootDir>/src/pages/$1",
    "^Api(.*)$": "<rootDir>/src/api/$1",
    "^Store(.*)$": "<rootDir>/src/store/$1",
    "^Controllers(.*)$": "<rootDir>/src/controllers/$1",
  } 
};
