const fs = require('fs');
const path = require('path');
const { copyFrameworkDocs } = require('../utils/fileOperations');

/**
 * Standard initialization without guided setup
 */
function initializeStandard() {
  console.log('Initializing ctxforge framework v2.0...\n');

  // Create directory structure
  const dirs = [
    'docs/context'
  ];

  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`✓ Created ${dir}`);
    }
  });

  // Copy v2.0 framework files (5 essential files)
  const sourceRoot = path.join(__dirname, '..', '..');
  const frameworkSource = path.join(sourceRoot, 'lib', 'framework');
  const frameworkDest = path.join(process.cwd(), 'docs', 'context');

  const v2Files = [
    'FRAMEWORK.md',
    'LLM-INSTRUCTIONS.md',
    'PERFORMANCE-DIRECTIVES.md',
    'DISCOVERY-QUESTIONS.md',
    'TEMPLATES.md'
  ];

  console.log('📦 Installing framework v2.0 (5 files, 60K tokens)...\n');

  v2Files.forEach(file => {
    const source = path.join(frameworkSource, file);
    const dest = path.join(frameworkDest, file);

    if (fs.existsSync(source)) {
      fs.copyFileSync(source, dest);
      console.log(`✓ Installed ${file}`);
    } else {
      console.log(`⚠️  Warning: ${file} not found in framework`);
    }
  });

  // Create placeholder project.md (will be filled by LLM)
  const projectMdPath = path.join(frameworkDest, 'project.md');
  if (!fs.existsSync(projectMdPath)) {
    const placeholder = `---
# [Your Project Name]

**Status:** Awaiting initialization

---

Run your LLM with: docs/context/FRAMEWORK.md

The LLM will ask 3 questions and generate this file automatically.

---
`;
    fs.writeFileSync(projectMdPath, placeholder);
    console.log(`✓ Created project.md (ready for LLM initialization)`);
  }

  console.log('\n✅ Framework v2.0 installed successfully!\n');
  console.log('📊 Installation summary:');
  console.log('   • 5 framework files (60K tokens total)');
  console.log('   • Zero configuration required');
  console.log('   • Universal LLM compatibility\n');

  console.log('🚀 Next steps:\n');
  console.log('1. Start your LLM and load FRAMEWORK.md:');
  console.log('   claude-code docs/context/FRAMEWORK.md');
  console.log('   # or any LLM: "Read docs/context/FRAMEWORK.md"\n');

  console.log('2. LLM will ask 3 questions:');
  console.log('   • Project name and vision?');
  console.log('   • Tech stack?');
  console.log('   • First feature to build?\n');

  console.log('3. LLM creates project.md automatically');
  console.log('   • You\'re ready to develop!\n');

  console.log('💡 Framework operates through context discovery:');
  console.log('   • You describe WHAT users experience');
  console.log('   • LLM asks questions to discover HOW');
  console.log('   • You approve before any coding');
  console.log('   • Quality enforced automatically\n');

  console.log('📚 Learn more: docs/context/FRAMEWORK.md');
  console.log('🔧 Framework files: docs/context/\n');
}

module.exports = { initializeStandard };
