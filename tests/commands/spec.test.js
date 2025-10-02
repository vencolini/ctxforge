const { test, describe } = require('node:test');
const assert = require('node:assert');
const { generateBasicSpec } = require('../../lib/commands/spec');

describe('Spec Command', () => {
  describe('generateBasicSpec', () => {
    test('should generate spec with feature name in title', () => {
      const spec = generateBasicSpec('Add search functionality');

      assert.ok(spec.includes('# Behavioral Specification:'));
      assert.ok(spec.includes('Search Functionality'));
    });

    test('should include original request in spec', () => {
      const description = 'Users need to upload profile pictures';
      const spec = generateBasicSpec(description);

      assert.ok(spec.includes(description));
    });

    test('should include user scenarios section', () => {
      const spec = generateBasicSpec('Add login form');

      assert.ok(spec.includes('## User Scenarios'));
      assert.ok(spec.includes('SCENARIO'));
      assert.ok(spec.includes('GIVEN'));
      assert.ok(spec.includes('WHEN'));
      assert.ok(spec.includes('THEN'));
    });

    test('should include success criteria', () => {
      const spec = generateBasicSpec('Create dashboard');

      assert.ok(spec.includes('## Success Criteria'));
      assert.ok(spec.includes('✅'));
    });

    test('should handle complex descriptions', () => {
      const description = 'Build an Astro.js blog with Cloudflare Pages deployment and n8n automation';
      const spec = generateBasicSpec(description);

      assert.ok(spec.length > 500); // Should generate substantial content
      assert.ok(spec.includes('Astro'));
    });
  });
});
