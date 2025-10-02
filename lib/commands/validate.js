const fs = require('fs');

/**
 * Check if LLM files exist
 * @returns {boolean}
 */
function checkLLMFiles() {
  const llmFiles = ['CLAUDE.md', 'AGENTS.md', 'GEMINI.md', 'CODEX.md'];
  return llmFiles.some(file => fs.existsSync(file));
}

/**
 * Check if framework structure is valid
 * @returns {boolean}
 */
function checkFrameworkStructure() {
  const requiredPaths = [
    'docs/context',
    'docs/context/state-snapshots'
  ];
  return requiredPaths.every(path => fs.existsSync(path));
}

/**
 * Check if project learnings section exists
 * @returns {boolean}
 */
function checkProjectLearnings() {
  if (!fs.existsSync('CONTEXT.md')) return false;
  const content = fs.readFileSync('CONTEXT.md', 'utf8');
  return content.includes('## 🧠 Project Learnings');
}

/**
 * Check if performance directives are accessible
 * @returns {boolean}
 */
function checkPerformanceDirectives() {
  return fs.existsSync('docs/context/performance-directives.md');
}

/**
 * Validate ctxforge framework compliance
 */
function validateFramework() {
  console.log('🔍 Validating ctxforge framework compliance...\n');

  const checks = [
    { name: 'CONTEXT.md exists', check: () => fs.existsSync('CONTEXT.md') },
    { name: 'LLM context files present', check: () => checkLLMFiles() },
    { name: 'Framework structure valid', check: () => checkFrameworkStructure() },
    { name: 'Project learnings format', check: () => checkProjectLearnings() },
    { name: 'Performance directives accessible', check: () => checkPerformanceDirectives() }
  ];

  let passed = 0;
  let total = checks.length;

  checks.forEach(check => {
    try {
      const result = check.check();
      if (result) {
        console.log(`✅ ${check.name}`);
        passed++;
      } else {
        console.log(`❌ ${check.name}`);
      }
    } catch (error) {
      console.log(`❌ ${check.name} - Error: ${error.message}`);
    }
  });

  console.log(`\n📊 Framework Compliance: ${passed}/${total} checks passed`);

  if (passed === total) {
    console.log('🎉 Framework is properly configured!');
  } else {
    console.log('⚠️  Some issues found. Run "npx ctxforge init" to fix structure.');
  }
}

module.exports = { validateFramework };
