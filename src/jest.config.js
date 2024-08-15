module.exports = {
    globalSetup: './test/setup.ts',
    globalTeardown: './test/teardown.ts',
    testEnvironment: 'node',
    transform: {
      '^.+\\.(t|j)s$': 'ts-jest',
    },
    moduleFileExtensions: ['ts', 'js', 'json'],
    testMatch: ['**/*.spec.ts'],
  };