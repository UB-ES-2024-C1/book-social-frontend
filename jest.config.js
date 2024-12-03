module.exports = {
    clearMocks: true,
    collectCoverage: true,
    coverageDirectory: "coverage",
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
    moduleNameMapper: {
        '\\.(css|less|scss)$': 'identity-obj-proxy',
        "\\.(jpg|jpeg|png|gif|svg)$/": "jest-transform-stub",
        '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/__mocks__/fileMock.js',
    },
    testEnvironment: "jsdom",
    transform: {
        "^.+\\.[tj]sx?$": "babel-jest",
    },
    transformIgnorePatterns: [
        "/node_modules/(?!axios|@mui)",
    ],
    extensionsToTreatAsEsm: ['.ts', '.tsx', '.jsx'],
};
