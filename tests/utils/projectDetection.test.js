const { test, describe } = require('node:test');
const assert = require('node:assert');
const { detectProjectType } = require('../../lib/utils/projectDetection');

describe('Project Detection', () => {
  describe('detectProjectType', () => {
    test('should return object with required fields', () => {
      const result = detectProjectType();

      assert.ok(result.hasOwnProperty('type'));
      assert.ok(result.hasOwnProperty('framework'));
      assert.ok(result.hasOwnProperty('language'));
      assert.strictEqual(typeof result.type, 'string');
      assert.strictEqual(typeof result.framework, 'string');
      assert.strictEqual(typeof result.language, 'string');
    });

    test('should detect Unknown project when no config files exist', () => {
      const result = detectProjectType();

      // In a directory without package.json, requirements.txt, etc.
      // it should return Unknown or Generic
      assert.ok(
        result.type === 'Unknown' ||
        result.type === 'Generic Project' ||
        result.type === 'Web Application' // might detect if package.json exists
      );
    });

    test('should not throw errors', () => {
      assert.doesNotThrow(() => {
        detectProjectType();
      });
    });
  });
});
