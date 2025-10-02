const fs = require('fs');
const path = require('path');

/**
 * Optimize context files by archiving old snapshots and checking sizes
 */
function optimizeContext() {
  console.log('🧹 Optimizing context files...\n');

  try {
    let optimizations = 0;

    // Archive old state snapshots (>30 days)
    if (fs.existsSync('docs/context/state-snapshots')) {
      const snapshots = fs.readdirSync('docs/context/state-snapshots');
      const thirtyDaysAgo = Date.now() - (30 * 24 * 60 * 60 * 1000);

      snapshots.forEach(file => {
        if (file.endsWith('.md')) {
          const filePath = path.join('docs/context/state-snapshots', file);
          const stats = fs.statSync(filePath);

          if (stats.mtime.getTime() < thirtyDaysAgo) {
            // Create archive directory
            if (!fs.existsSync('docs/context/archived-snapshots')) {
              fs.mkdirSync('docs/context/archived-snapshots', { recursive: true });
            }

            // Move old snapshot
            const archivePath = path.join('docs/context/archived-snapshots', file);
            fs.renameSync(filePath, archivePath);
            console.log(`📦 Archived old snapshot: ${file}`);
            optimizations++;
          }
        }
      });
    }

    // Check CONTEXT.md size and suggest optimization
    if (fs.existsSync('CONTEXT.md')) {
      const contextContent = fs.readFileSync('CONTEXT.md', 'utf8');
      const sizeKB = Math.round(contextContent.length / 1024);

      if (sizeKB > 50) {
        console.log(`⚠️  CONTEXT.md is ${sizeKB}KB (target: <50KB)`);
        console.log('💡 Consider archiving completed features or consolidating learnings');
      } else {
        console.log(`✅ CONTEXT.md size: ${sizeKB}KB (within target)`);
      }
    }

    console.log(`\n🎉 Optimization complete! ${optimizations} files processed.`);

  } catch (error) {
    console.log(`❌ Error during optimization: ${error.message}`);
  }
}

module.exports = { optimizeContext };
