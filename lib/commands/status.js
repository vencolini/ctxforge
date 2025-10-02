const fs = require('fs');

/**
 * Show current context status
 */
function showContextStatus() {
  console.log('📋 Current Context Status (v3.0)\n');

  try {
    // Check project.md
    if (fs.existsSync('docs/context/project.md')) {
      const projectContent = fs.readFileSync('docs/context/project.md', 'utf8');
      const size = Math.round(projectContent.length / 1024);
      console.log(`📄 project.md: ${size}KB`);

      // Extract project name
      const nameMatch = projectContent.match(/# (.+)/);
      if (nameMatch) {
        console.log(`📦 Project: ${nameMatch[1]}`);
      }

      // Check for state snapshots
      const snapshotMatches = projectContent.match(/## 📸 State Snapshot/g);
      if (snapshotMatches) {
        console.log(`📸 State Snapshots: ${snapshotMatches.length} in project.md`);
      }

      // Count learnings
      const learningMatches = projectContent.match(/### Learning:/g);
      if (learningMatches) {
        console.log(`🧠 Project Learnings: ${learningMatches.length} documented`);
      }
    } else {
      console.log('❌ project.md not found');
      console.log('   Run: npx ctxforge init');
      return;
    }

    // Check core files
    const coreFiles = [
      'docs/context/CORE.md',
      'docs/context/FRAMEWORK.md',
      'docs/context/PERFORMANCE-DIRECTIVES.md'
    ];

    const missingCore = coreFiles.filter(f => !fs.existsSync(f));
    if (missingCore.length === 0) {
      console.log('✅ Core framework files present');
    } else {
      console.log(`⚠️  Missing core files: ${missingCore.length}`);
    }

    // Check protocols
    if (fs.existsSync('docs/context/protocols')) {
      const protocols = fs.readdirSync('docs/context/protocols').filter(f => f.endsWith('.md'));
      console.log(`✅ Protocols available: ${protocols.length}`);
    } else {
      console.log('⚠️  Protocols directory not found');
    }

    console.log('\n💡 Quick Start:');
    console.log('   Read docs/context/CORE.md and ask what I want to work on');

  } catch (error) {
    console.log(`❌ Error reading context: ${error.message}`);
  }
}

module.exports = { showContextStatus };
