module.exports = {
  testEnvironment: 'jsdom',
  testMatch: ['**/?(*.)+(test).[jt]s?(x)'],
  moduleNameMapper: {
    '\\.css$': '<rootDir>/src/__tests__/styleMock.cjs',
    '\\.png$': '<rootDir>/src/__tests__/fileMock.cjs',
  },
};