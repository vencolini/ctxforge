const fs = require('fs');
const path = require('path');
const { copyFrameworkDocs } = require('../utils/fileOperations');

/**
 * Standard initialization without guided setup
 */
function initializeStandard() {
  console.log('Initializing ctxforge framework v3.0...\n');

  // Create directory structure
  const dirs = [
    'docs/context',
    'docs/context/protocols'
  ];

  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`✓ Created ${dir}`);
    }
  });

  // Copy v3.0 framework files
  const sourceRoot = path.join(__dirname, '..', '..');
  const frameworkSource = path.join(sourceRoot, 'lib', 'framework');
  const frameworkDest = path.join(process.cwd(), 'docs', 'context');
  const protocolsDest = path.join(frameworkDest, 'protocols');

  // Core framework files
  const coreFiles = [
    'CORE.md',
    'FRAMEWORK.md',
    'PERFORMANCE-DIRECTIVES.md',
    'DISCOVERY-QUESTIONS.md',
    'TEMPLATES.md',
    'QUICK-RELOAD.md'
  ];

  // Protocol files
  const protocolFiles = [
    'FEATURE-DEVELOPMENT.md',
    'BUG-FIXING.md',
    'REFACTORING.md',
    'CODE-REVIEW.md',
    'TESTING.md',
    'INVESTIGATION.md',
    'DOCUMENTATION.md',
    'PERFORMANCE-OPTIMIZATION.md',
    'SECURITY-AUDIT.md',
    'ARCHITECTURE-DESIGN.md',
    'DEPENDENCY-MANAGEMENT.md',
    'DEPLOYMENT.md',
    'PAIR-PROGRAMMING.md',
    'LEARNING.md',
    'DATABASE-MIGRATION.md'
  ];

  console.log('📦 Installing framework v3.0...\n');

  // Install core files
  console.log('Core framework:');
  coreFiles.forEach(file => {
    const source = path.join(frameworkSource, file);
    const dest = path.join(frameworkDest, file);

    if (fs.existsSync(source)) {
      fs.copyFileSync(source, dest);
      console.log(`  ✓ ${file}`);
    } else {
      console.log(`  ⚠️  Warning: ${file} not found`);
    }
  });

  // Install protocol files
  console.log('\nProtocols (15 total):');
  const protocolsSource = path.join(frameworkSource, 'protocols');
  protocolFiles.forEach(file => {
    const source = path.join(protocolsSource, file);
    const dest = path.join(protocolsDest, file);

    if (fs.existsSync(source)) {
      fs.copyFileSync(source, dest);
      console.log(`  ✓ ${file}`);
    } else {
      console.log(`  ⚠️  Warning: ${file} not found`);
    }
  });

  // Create placeholder project.md (will be filled by LLM)
  const projectMdPath = path.join(frameworkDest, 'project.md');
  if (!fs.existsSync(projectMdPath)) {
    const placeholder = `---
# [Your Project Name]

**Status:** Awaiting initialization

---

Run your LLM with: docs/context/CORE.md

The LLM will ask what you want to work on and auto-load the right protocol.

---
`;
    fs.writeFileSync(projectMdPath, placeholder);
    console.log(`\n✓ Created project.md (ready for LLM initialization)`);
  }

  console.log('\n✅ Framework v3.0 installed successfully!\n');
  console.log('📊 Installation summary:');
  console.log('   • Core: 6 files (lightweight)');
  console.log('   • Protocols: 15 files (auto-loaded on demand)');
  console.log('   • Per-session load: ~8-10K tokens (60-70% reduction!)');
  console.log('   • Universal LLM compatibility\n');

  console.log('🚀 Quick Start:\n');
  console.log('  Read docs/context/CORE.md and ask what I want to work on\n');

  console.log('📖 How it works:\n');
  console.log('1. Load CORE.md (5K tokens)');
  console.log('2. LLM asks: "What should we work on?"');
  console.log('3. LLM detects intent → auto-loads protocol');
  console.log('4. Systematic discovery workflow begins\n');

  console.log('🎯 Example intents:\n');
  console.log('   • "Add user login" → FEATURE-DEVELOPMENT');
  console.log('   • "Fix login bug" → BUG-FIXING');
  console.log('   • "Review auth code" → CODE-REVIEW');
  console.log('   • "Write tests" → TESTING');
  console.log('   • "Deploy to production" → DEPLOYMENT\n');

  console.log('📚 Documentation:');
  console.log('   • Framework overview: docs/context/FRAMEWORK.md');
  console.log('   • All protocols: docs/context/protocols/\n');
}

module.exports = { initializeStandard };
