module.exports = {
    preset: 'react-native',
    setupFilesAfterEnv: ['<rootDir>/jest-setup.js'],
    transformIgnorePatterns: [
      'node_modules/(?!(jest-)?react-native|@react-native|@react-native-community|@react-navigation|@react-native-polyfills|@expo/vector-icons)'
    ],
    transform: {
      '^.+\\.jsx$': 'babel-jest',
      '^.+\\.tsx?$': [
        'ts-jest',
        {
          tsconfig: 'tsconfig.spec.json',
        },
      ],
    },
    moduleNameMapper: {
      '^@expo/vector-icons$': '<rootDir>/src/components/__mocks__/@expo/vector-icons.js',
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    collectCoverage: true,
    coverageDirectory: '<rootDir>/coverage',
    coverageReporters: ['json', 'lcov', 'text', 'clover'],
    collectCoverageFrom: [
      'src/**/*.{js,jsx,ts,tsx}',
      '!src/**/*.d.ts',
      '!src/**/index.{js,ts}'
    ]
  };
  