module.exports = {
    roots: ['<rootDir>/src'],
    preset: "ts-jest",
    transform: { "\\.ts$": ["ts-jest"] },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    globals: {
        "ts-jest": {
          tsConfig: {
            allowJs: true,
          },
        },
    },
};