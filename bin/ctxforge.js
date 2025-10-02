#!/usr/bin/env node

/**
 * ctxforge CLI - Context Engineering Framework for LLM-Assisted Development
 *
 * This is the main entry point that routes commands to their respective modules.
 */

// Import command modules
const { initializeStandard } = require('../lib/commands/init');
const { validateFramework } = require('../lib/commands/validate');
const { showContextHealth } = require('../lib/commands/health');
const { showContextStatus } = require('../lib/commands/status');
const { optimizeContext } = require('../lib/commands/optimize');
const { generateSpecification } = require('../lib/commands/spec');

const command = process.argv[2];

// Route commands to appropriate handlers
if (command === 'init') {
  const isGuided = process.argv.includes('--guided');

  if (isGuided) {
    console.log('⚠️  Guided mode not yet refactored. Using standard init...\n');
    initializeStandard();
  } else {
    initializeStandard();
  }

} else if (command === 'init-guided' || command === 'guided') {
  console.log('⚠️  Guided mode not yet refactored. Using standard init...\n');
  initializeStandard();

} else if (command === 'validate') {
  validateFramework();

} else if (command === 'status') {
  showContextStatus();

} else if (command === 'optimize') {
  optimizeContext();

} else if (command === 'health') {
  showContextHealth();

} else if (command === 'metrics') {
  console.log('⚠️  Metrics command not yet refactored.');
  console.log('Use "npx ctxforge health" for basic health information.');

} else if (command === 'install-hooks') {
  console.log('⚠️  Git hooks installation not yet refactored.');
  console.log('This feature will be available in a future update.');

} else if (command === 'ide-setup') {
  console.log('⚠️  IDE setup not yet refactored.');
  console.log('This feature will be available in a future update.');

} else if (command === 'spec') {
  const description = process.argv.slice(3).join(' ');
  if (!description) {
    console.log('❌ Please provide a description of what you want to build.');
    console.log('Example: npx ctxforge spec "Users need to search products on the products page"');
    console.log('💡 Tip: Rich context leads to rich results. See docs/context/context-quality-guide.md');
    process.exit(1);
  }
  generateSpecification(description);

} else if (command === 'context-help') {
  showContextHelp();

} else if (command === 'context-examples') {
  showContextExamples();

} else if (command === 'version' || command === '--version' || command === '-v') {
  const packageJson = require('../package.json');
  console.log(`ctxforge v${packageJson.version}`);

} else {
  // Show help
  console.log('ctxforge - Context Engineering Framework for LLM-Assisted Development\n');
  console.log('Usage:');
  console.log('  npx ctxforge init       Initialize framework in current directory');
  console.log('  npx ctxforge guided     Interactive guided setup (coming soon)');
  console.log('  npx ctxforge validate   Check framework compliance');
  console.log('  npx ctxforge status     Show current context state');
  console.log('  npx ctxforge health     Context health monitoring');
  console.log('  npx ctxforge optimize   Automated context cleanup\n');
  console.log('Context Discovery:');
  console.log('  npx ctxforge spec "description"    Generate behavioral specification');
  console.log('  npx ctxforge context-help          Learn how to provide better context');
  console.log('  npx ctxforge context-examples      See examples of good vs poor context\n');
  console.log('Development Integration:');
  console.log('  npx ctxforge version        Show version\n');
  console.log('💡 Tip: Rich context leads to rich results. Learn more:');
  console.log('   docs/context/context-quality-guide.md');
  console.log('\nDocumentation: https://github.com/vencolini/ctxforge');
}

// Helper functions for context education
function showContextHelp() {
  console.log('💡 Context Quality Quick Guide\n');

  console.log('Better context = Better AI results\n');

  console.log('Before asking AI for help, provide:\n');

  console.log('🛠️  Technology: What stack/framework to use');
  console.log('   Example: "using React with TypeScript" or "with PHP Laravel"\n');

  console.log('📊 Scale: How much data/how many users');
  console.log('   Example: "for 500+ products" or "handling 100 users"\n');

  console.log('📍 Location: Where this goes in your app');
  console.log('   Example: "on the dashboard page" or "in the admin section"\n');

  console.log('🎨 UX: What users should see');
  console.log('   Example: "with loading states" or "showing error messages"\n');

  console.log('🔗 Integration: How it connects to existing code');
  console.log('   Example: "following our component patterns" or "using existing API"\n');

  console.log('📚 Learn more: docs/context/context-quality-guide.md');
  console.log('🎯 See examples: npx ctxforge context-examples');
}

function showContextExamples() {
  console.log('📖 Context Examples: Poor vs Rich\n');

  console.log('❌ POOR CONTEXT:');
  console.log('"Add search"\n');
  console.log('Problems: No technology, no scale, no location, no requirements\n');

  console.log('✅ BETTER CONTEXT:');
  console.log('"Add search to products page using React"\n');
  console.log('Better: Has technology and location\n');

  console.log('🌟 RICH CONTEXT:');
  console.log('"Add real-time search to products page using React, filtering 500+ products');
  console.log('by name and category, with loading states and empty results message"\n');
  console.log('Excellent: Technology, scale, location, features, and UX details\n');

  console.log('🎯 Another Example:\n');

  console.log('❌ POOR: "Create user authentication"');
  console.log('✅ BETTER: "Create JWT authentication for React app"');
  console.log('🌟 RICH: "Create JWT authentication for React TypeScript app with');
  console.log('login/register forms, password validation, and remember me option"\n');

  console.log('💡 Pattern: Start with basic request, then add:');
  console.log('   • Technology details');
  console.log('   • Scale/volume information');
  console.log('   • Specific features');
  console.log('   • User experience requirements');
  console.log('   • Integration context\n');

  console.log('📚 Complete guide: docs/context/context-quality-guide.md');
}
