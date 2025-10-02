const fs = require('fs');

/**
 * Check if core framework files exist
 * @returns {boolean}
 */
function checkCoreFiles() {
  const coreFiles = [
    'docs/context/CORE.md',
    'docs/context/FRAMEWORK.md',
    'docs/context/PERFORMANCE-DIRECTIVES.md'
  ];
  return coreFiles.every(file => fs.existsSync(file));
}

/**
 * Check if protocol files exist
 * @returns {boolean}
 */
function checkProtocols() {
  const protocolsDir = 'docs/context/protocols';
  if (!fs.existsSync(protocolsDir)) return false;

  const protocols = fs.readdirSync(protocolsDir);
  // Should have at least 10 protocols
  return protocols.filter(f => f.endsWith('.md')).length >= 10;
}

/**
 * Check if framework structure is valid
 * @returns {boolean}
 */
function checkFrameworkStructure() {
  const requiredPaths = [
    'docs/context',
    'docs/context/protocols'
  ];
  return requiredPaths.every(path => fs.existsSync(path));
}

/**
 * Check if project.md exists
 * @returns {boolean}
 */
function checkProjectContext() {
  return fs.existsSync('docs/context/project.md');
}

/**
 * Check if performance directives are accessible
 * @returns {boolean}
 */
function checkPerformanceDirectives() {
  return fs.existsSync('docs/context/PERFORMANCE-DIRECTIVES.md');
}

/**
 * Validate ctxforge framework compliance
 */
function validateFramework() {
  console.log('🔍 Validating ctxforge v3.0 framework...\n');

  const checks = [
    { name: 'Core files present (CORE.md, FRAMEWORK.md, etc.)', check: () => checkCoreFiles() },
    { name: 'Protocol files (15 protocols)', check: () => checkProtocols() },
    { name: 'Framework structure valid', check: () => checkFrameworkStructure() },
    { name: 'Project context (project.md)', check: () => checkProjectContext() },
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
    console.log('🎉 Framework v3.0 is properly configured!');
  } else {
    console.log('⚠️  Some issues found. Run "npx ctxforge init" to install v3.0.');
  }
}

module.exports = { validateFramework };
