#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const command = process.argv[2];

if (command === 'init') {
  console.log('Initializing ctxforge framework...\n');

  // Create directory structure
  const dirs = [
    'docs/context/behavioral-specs',
    'docs/context/state-snapshots',
    'docs/templates'
  ];

  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`✓ Created ${dir}`);
    }
  });

  // Copy framework files
  const sourceRoot = path.join(__dirname, '..');
  
  // Copy docs
  const docFiles = [
    'README.md',
    'quick-start.md',
    'context-engineering-guide.md',
    'llm-instructions.md',
    'performance-directives.md',
    'framework-summary.md'
  ];

  docFiles.forEach(file => {
    const source = path.join(sourceRoot, 'docs', file);
    const dest = path.join(process.cwd(), 'docs/context', file);
    
    if (fs.existsSync(source)) {
      fs.copyFileSync(source, dest);
      console.log(`✓ Copied ${file} to docs/context/`);
    }
  });

  // Copy templates
  const templateFiles = [
    'claude-template.md',
    'behavioral-spec-template.md',
    'task-execution-protocol.md',
    'project-learnings-template.md',
    'state-snapshot-template.md'
  ];

  templateFiles.forEach(file => {
    const source = path.join(sourceRoot, 'templates', file);
    const dest = path.join(process.cwd(), 'docs/templates', file);
    
    if (fs.existsSync(source)) {
      fs.copyFileSync(source, dest);
      console.log(`✓ Copied ${file} to docs/templates/`);
    }
  });

  console.log('\n[OK] ctxforge initialized successfully!\n');
  console.log('Next steps:');
  console.log('1. Read docs/context/quick-start.md');
  console.log('2. Start with: claude-code --file docs/context/llm-instructions.md\n');

} else if (command === 'version' || command === '--version' || command === '-v') {
  const packageJson = require('../package.json');
  console.log(`ctxforge v${packageJson.version}`);
  
} else {
  console.log('ctxforge - Context Engineering Framework for LLM-Assisted Development\n');
  console.log('Usage:');
  console.log('  npx ctxforge init       Initialize framework in current directory');
  console.log('  npx ctxforge version    Show version\n');
  console.log('Documentation: https://github.com/vencolini/ctxforge');
}