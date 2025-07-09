module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.ts', '**/?(*.)+(spec|test).ts'],
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/app.ts',
    '!src/infrastructure/web/app.controller.ts',
    '!src/application/use-cases/app.service.ts',
    '!src/application/ports/inbound/app.service.interface.ts',
    '!src/**/*.interface.ts',
    '!src/**/index.ts',
    '!src/infrastructure/persistence/typeorm/entities/index.ts',
  ],
  moduleFileExtensions: ['ts', 'js', 'json'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
};