const fs = require('fs');
const path = require('path');

/**
 * Comprehensive file copying function for framework documentation
 * @param {string} sourceRoot - Source directory
 * @param {string} targetRoot - Target directory
 */
function copyFrameworkDocs(sourceRoot, targetRoot) {
  console.log('📁 Copying comprehensive framework documentation...\n');

  const copyActions = [];

  // Define all source and destination mappings
  const fileMappings = [
    // Core context files from docs/ to docs/context/
    { source: 'docs/README.md', dest: 'docs/context/README.md' },

    // Context files from docs/context/ to docs/context/
    { source: 'docs/context/quick-start.md', dest: 'docs/context/quick-start.md' },
    { source: 'docs/context/context-engineering-guide.md', dest: 'docs/context/context-engineering-guide.md' },
    { source: 'docs/context/llm-instructions.md', dest: 'docs/context/llm-instructions.md' },
    { source: 'docs/context/framework-summary.md', dest: 'docs/context/framework-summary.md' },
    { source: 'docs/context/performance-directives.md', dest: 'docs/context/performance-directives.md' },
    { source: 'docs/context/llm-validation-checklist.md', dest: 'docs/context/llm-validation-checklist.md' },
    { source: 'docs/context/context-discovery-guide.md', dest: 'docs/context/context-discovery-guide.md' },
    { source: 'docs/context/specification-generation-guide.md', dest: 'docs/context/specification-generation-guide.md' },
    { source: 'docs/context/context-integration-map.md', dest: 'docs/context/context-integration-map.md' },
    { source: 'docs/context/domain-knowledge-patterns.md', dest: 'docs/context/domain-knowledge-patterns.md' },
    { source: 'docs/context/context-analysis-framework.md', dest: 'docs/context/context-analysis-framework.md' },
    { source: 'docs/context/framework-file-reference.md', dest: 'docs/context/framework-file-reference.md' },
    { source: 'docs/context/context-quality-guide.md', dest: 'docs/context/context-quality-guide.md' },
    { source: 'docs/context/context-discovery-prompts.md', dest: 'docs/context/context-discovery-prompts.md' }
  ];

  // Performance directives subdirectory
  const performanceDirectivesFiles = [
    'README.md',
    'algorithmic-efficiency.md',
    'memory-management.md',
    'data-handling.md',
    'user-interaction.md',
    'react-specific.md',
    'accessibility.md',
    'error-handling.md',
    'code-organization.md',
    'testing.md',
    'security.md',
    'documentation.md',
    'directive-summary.md'
  ];

  performanceDirectivesFiles.forEach(file => {
    fileMappings.push({
      source: `docs/context/performance-directives/${file}`,
      dest: `docs/context/performance-directives/${file}`
    });
  });

  // Quick start guides (already in correct location)
  const quickStartFiles = [
    'README.md',
    'validation.md',
    'step-1.md',
    'step-2.md'
  ];

  quickStartFiles.forEach(file => {
    fileMappings.push({
      source: `docs/context/quick-start/${file}`,
      dest: `docs/context/quick-start/${file}`
    });
  });

  // Copy each file
  fileMappings.forEach(mapping => {
    const sourcePath = path.join(sourceRoot, mapping.source);
    const destPath = path.join(targetRoot, mapping.dest);

    if (fs.existsSync(sourcePath)) {
      // Ensure destination directory exists
      const destDir = path.dirname(destPath);
      if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir, { recursive: true });
      }

      try {
        fs.copyFileSync(sourcePath, destPath);
        copyActions.push(`✓ ${mapping.source} → ${mapping.dest}`);
      } catch (error) {
        copyActions.push(`❌ Failed to copy ${mapping.source}: ${error.message}`);
      }
    } else {
      copyActions.push(`⚠️ Source not found: ${mapping.source}`);
    }
  });

  // Display results
  copyActions.forEach(action => console.log(action));

  const successful = copyActions.filter(a => a.startsWith('✓')).length;
  const total = fileMappings.length;

  console.log(`\n📊 Documentation Copy Summary: ${successful}/${total} files copied successfully`);

  if (successful < total) {
    console.log('⚠️ Some files were not found in the package - this may be expected for development vs published versions');
  }
}

module.exports = { copyFrameworkDocs };
