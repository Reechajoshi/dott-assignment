export default {
    testMatch: ['**/*.test.ts'],
    transform: {
      "^.+\\.tsx?$": "ts-jest"
    },
    verbose: true,
    testTimeout: 90000,
    testEnvironment: "node",
    collectCoverage: true,
    collectCoverageFrom: [
      '<rootDir>/src/**/*.ts',
    ],
    coverageThreshold: {
      global: {
        branches: 80,
        functions: 80,
        statements: 80,
      },
    }
  };
  