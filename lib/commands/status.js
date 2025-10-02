const fs = require('fs');

/**
 * Show current context status
 */
function showContextStatus() {
  console.log('📋 Current Context Status\n');

  try {
    // Check CONTEXT.md
    if (fs.existsSync('CONTEXT.md')) {
      const contextContent = fs.readFileSync('CONTEXT.md', 'utf8');
      const size = Math.round(contextContent.length / 1024);
      console.log(`📄 CONTEXT.md: ${size}KB`);

      // Extract current feature if present
      const featureMatch = contextContent.match(/## 🎭 Current Feature: (.+)/);
      if (featureMatch) {
        console.log(`🎯 Current Feature: ${featureMatch[1]}`);
      } else {
        console.log('🎯 Current Feature: None active');
      }

      // Count tasks if present
      const taskMatches = contextContent.match(/#### TASK-\d+/g);
      if (taskMatches) {
        console.log(`📋 Tasks: ${taskMatches.length} defined`);
      }
    } else {
      console.log('❌ CONTEXT.md not found - run "npx ctxforge init"');
    }

    // Check state snapshots
    if (fs.existsSync('docs/context/state-snapshots')) {
      const snapshots = fs.readdirSync('docs/context/state-snapshots').filter(f => f.endsWith('.md'));
      console.log(`📸 State Snapshots: ${snapshots.length} files`);
    }

    // Check project learnings
    const learningsPattern = /### PL-\d+:/g;
    if (fs.existsSync('CONTEXT.md')) {
      const contextContent = fs.readFileSync('CONTEXT.md', 'utf8');
      const learnings = contextContent.match(learningsPattern);
      console.log(`🧠 Project Learnings: ${learnings ? learnings.length : 0} documented`);
    }

  } catch (error) {
    console.log(`❌ Error reading context: ${error.message}`);
  }
}

module.exports = { showContextStatus };
