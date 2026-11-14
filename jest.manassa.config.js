/**
 * Standalone Jest config for the Manassa test suite.
 * (The upstream jest.config.ts needs @nx/jest, which is not installed in
 * this repository.) Run: npx jest -c jest.manassa.config.js
 */
module.exports = {
  testEnvironment: 'node',
  roots: ['<rootDir>/var/tests'],
  testMatch: ['**/*.manassa.spec.ts'],
  transform: {
    '^.+\.tsx?$': [
      'ts-jest',
      {
        isolatedModules: true,
        tsconfig: {
          experimentalDecorators: true,
          emitDecoratorMetadata: true,
          esModuleInterop: true,
          target: 'es2021',
          module: 'commonjs',
          jsx: 'react-jsx',
        },
      },
    ],
  },
  moduleNameMapper: {
    '^@gitroom/helpers/(.*)$': '<rootDir>/libraries/helpers/src/$1',
    '^@gitroom/nestjs-libraries/(.*)$': '<rootDir>/libraries/nestjs-libraries/src/$1',
    '^@gitroom/react/(.*)$': '<rootDir>/libraries/react-shared-libraries/src/$1',
    '^@gitroom/frontend/(.*)$': '<rootDir>/apps/frontend/src/$1',
  },
  setupFiles: ['reflect-metadata'],
};
