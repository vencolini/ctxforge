# ctxforge Test Suite

## Structure

```
tests/
├── commands/           # Tests for CLI commands
│   ├── init.test.js
│   ├── validate.test.js
│   ├── spec.test.js
│   └── health.test.js
├── utils/             # Tests for utility functions
│   ├── projectDetection.test.js
│   ├── fileOperations.test.js
│   └── healthCalculation.test.js
└── integration/       # End-to-end tests
    └── fullWorkflow.test.js
```

## Running Tests

```bash
# Run all tests
npm test

# Run specific test file
npm test tests/commands/init.test.js

# Run with coverage
npm run test:coverage
```

## Test Conventions

- Use descriptive test names: `it('should create CONTEXT.md when running init')`
- Group related tests with `describe` blocks
- Clean up any test artifacts in `afterEach` hooks
- Use fixtures for complex test data

## TODO

- [ ] Implement actual test logic (currently placeholders)
- [ ] Add test coverage reporting
- [ ] Add integration tests for full workflows
- [ ] Add tests for edge cases and error handling
- [ ] Set up CI to run tests on push
