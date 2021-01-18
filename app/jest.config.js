module.exports = {
    moduleNameMapper: {
        "\\.(css|scss)$": "identity-obj-proxy",
        "\\.(png|svg|pdf|jpg|jpeg)$": "<rootDir>/test/__mocks__/fileMock.js",
    },
    setupFilesAfterEnv: ['./src/setupTests.js'],
    collectCoverage: true,
    collectCoverageFrom: ['src/**/*.{js,jsx}', '!src/App.js', '!src/index.js', '!src/setupProxy.js'],
};