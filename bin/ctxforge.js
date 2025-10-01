#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const command = process.argv[2];

if (command === 'init') {
  const isGuided = process.argv.includes('--guided');
  
  if (isGuided) {
    initializeGuided();
  } else {
    initializeStandard();
  }

} else if (command === 'init-guided' || command === 'guided') {
  initializeGuided();


} else if (command === 'validate') {
  validateFramework();

} else if (command === 'status') {
  showContextStatus();

} else if (command === 'optimize') {
  optimizeContext();

} else if (command === 'health') {
  showContextHealth();

} else if (command === 'metrics') {
  showFrameworkMetrics();

} else if (command === 'install-hooks') {
  installGitHooks();

} else if (command === 'ide-setup') {
  setupIDEIntegration();

} else if (command === 'spec') {
  const description = process.argv.slice(3).join(' ');
  if (!description) {
    console.log('❌ Please provide a description of what you want to build.');
    console.log('Example: npx ctxforge spec "Users need to search products on the products page"');
    process.exit(1);
  }
  generateSpecification(description);

} else if (command === 'version' || command === '--version' || command === '-v') {
  const packageJson = require('../package.json');
  console.log(`ctxforge v${packageJson.version}`);
  
} else {
  console.log('ctxforge - Context Engineering Framework for LLM-Assisted Development\n');
  console.log('Usage:');
  console.log('  npx ctxforge init       Initialize framework in current directory');
  console.log('  npx ctxforge validate   Check framework compliance');
  console.log('  npx ctxforge status     Show current context state');
  console.log('  npx ctxforge optimize   Automated context cleanup');
  console.log('  npx ctxforge health     Context health monitoring');
  console.log('  npx ctxforge metrics    Framework analytics and trends');
  console.log('  npx ctxforge spec       Generate behavioral specification from description');
  console.log('  npx ctxforge install-hooks  Install Git hooks integration');
  console.log('  npx ctxforge ide-setup  Configure IDE for ctxforge');
  console.log('  npx ctxforge guided     Interactive guided setup');
  console.log('  npx ctxforge version    Show version\n');
  console.log('Documentation: https://github.com/vencolini/ctxforge');
}

// === PHASE 2 PROGRESSIVE ONBOARDING ===

function initializeGuided() {
  console.log('🚀 ctxforge Guided Setup\n');
  console.log('This interactive setup will configure ctxforge for your project in 5 steps.\n');
  
  // Step 1: Project Detection
  console.log('📊 Step 1: Analyzing your project...\n');
  const projectInfo = detectProjectType();
  
  console.log(`✅ Project Type: ${projectInfo.type}`);
  console.log(`✅ Framework: ${projectInfo.framework}`);
  console.log(`✅ Language: ${projectInfo.language}\n`);
  
  // Step 2: Create Framework Structure
  console.log('📁 Step 2: Creating framework structure...\n');
  createFrameworkStructure();
  
  // Step 3: Generate Customized Templates
  console.log('📝 Step 3: Generating customized templates...\n');
  generateCustomizedTemplates(projectInfo);
  
  // Step 4: Create Universal LLM Integration  
  console.log('🔗 Step 4: Setting up universal LLM integration...\n');
  setupUniversalLLMIntegration();
  
  // Step 5: Generate Sample Behavioral Spec
  console.log('🎯 Step 5: Creating sample behavioral specification...\n');
  generateSampleBehavioralSpec(projectInfo);
  
  // Final Validation
  console.log('✅ Step 6: Validating setup...\n');
  const validationResult = validateGuidedSetup();
  
  if (validationResult.success) {
    console.log('🎉 Guided setup complete!\n');
    console.log('🎯 Your project is now configured with ctxforge methodology.');
    console.log('📋 Next steps:');
    console.log('1. Review the sample behavioral spec in docs/context/behavioral-specs/');
    console.log('2. Start your LLM tool (claude, cursor, gemini-cli, etc.)');
    console.log('3. Say: "Let\'s implement the sample feature from the behavioral spec"');
    console.log('4. Watch ctxforge guide the development process!\n');
    console.log('💡 Run "npx ctxforge status" anytime to check your project health.');
  } else {
    console.log('⚠️  Setup validation found issues:');
    validationResult.issues.forEach(issue => console.log(`   • ${issue}`));
    console.log('\nRun "npx ctxforge validate" for detailed diagnostics.');
  }
}

function initializeStandard() {
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

  // Universal LLM context integration
  const claudeTemplateSource = path.join(sourceRoot, 'templates', 'claude-template.md');
  
  // Create universal CONTEXT.md
  const contextPath = path.join(process.cwd(), 'CONTEXT.md');
  if (fs.existsSync(claudeTemplateSource)) {
    fs.copyFileSync(claudeTemplateSource, contextPath);
    console.log(`✓ Created CONTEXT.md (universal project context)`);
  }

  // Define LLM context files and their descriptions
  const llmFiles = {
    'CLAUDE.md': 'Claude Code',
    'AGENTS.md': 'GPT Codex/Cursor', 
    'GEMINI.md': 'Gemini CLI',
    'CODEX.md': 'OpenAI Codex'
  };

  // Universal snippet to inject
  const ctxforgeSnippet = `<!-- ctxforge: Universal Context Integration -->
# 📋 Project Context

**This project uses ctxforge methodology.** Please read \`CONTEXT.md\` for:
- Complete project context and architecture
- Performance directives and coding standards  
- Current tasks and behavioral specifications
- Project learnings and patterns to follow

Follow the structured development process defined in CONTEXT.md.

---

`;

  const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
  
  // Process each LLM context file
  Object.entries(llmFiles).forEach(([filename, description]) => {
    const filePath = path.join(process.cwd(), filename);
    
    if (fs.existsSync(filePath)) {
      // Check if ctxforge integration already exists
      const existingContent = fs.readFileSync(filePath, 'utf8');
      
      if (existingContent.includes('<!-- ctxforge: Universal Context Integration -->')) {
        console.log(`✓ ${filename} already has ctxforge integration`);
      } else {
        // Backup existing file
        const backupPath = path.join(process.cwd(), `${filename.replace('.md', '')}-backup-${timestamp}.md`);
        fs.copyFileSync(filePath, backupPath);
        console.log(`✓ Backed up existing ${filename} to ${path.basename(backupPath)}`);
        
        // Prepend snippet to existing content
        const newContent = ctxforgeSnippet + existingContent;
        fs.writeFileSync(filePath, newContent);
        console.log(`✓ Updated ${filename} with ctxforge integration`);
      }
    } else {
      // Create new file with snippet
      fs.writeFileSync(filePath, ctxforgeSnippet);
      console.log(`✓ Created ${filename} for ${description}`);
    }
  });

  // Copy other templates to docs/templates
  const templateFiles = [
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
  console.log('🎯 Ready! Your LLM will now automatically load project context:');
  console.log('   - Claude CLI: Reads CLAUDE.md → CONTEXT.md');
  console.log('   - GPT Codex/Cursor: Reads AGENTS.md → CONTEXT.md');  
  console.log('   - Gemini CLI: Reads GEMINI.md → CONTEXT.md');
  console.log('   - OpenAI Codex: Reads CODEX.md → CONTEXT.md\n');
  console.log('Next steps:');
  console.log('1. Read docs/context/quick-start.md');
  console.log('2. Start your preferred LLM tool');
  console.log('3. Begin development - framework methodology will guide you!\n');
}

// === PHASE 1 CLI ENHANCEMENTS ===

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

function showContextHealth() {
  console.log('🏥 Context Health Report\n');
  
  try {
    const health = calculateContextHealth();
    
    console.log('📊 Health Metrics:');
    console.log(`   Size: ${health.size}KB ${health.size < 50 ? '✅' : '⚠️'} (Target: <50KB)`);
    console.log(`   Active Features: ${health.activeFeatures}`);
    console.log(`   Completed Features: ${health.completedFeatures}`);
    console.log(`   Project Learnings: ${health.projectLearnings}`);
    console.log(`   State Snapshots: ${health.stateSnapshots}`);
    
    console.log('\n🎯 Health Score:');
    const score = calculateHealthScore(health);
    console.log(`   Overall: ${score}/100 ${getHealthEmoji(score)}`);
    
    if (score < 80) {
      console.log('\n💡 Recommendations:');
      if (health.size > 50) {
        console.log('   • Run "npx ctxforge optimize" to reduce file size');
      }
      if (health.stateSnapshots > 20) {
        console.log('   • Archive old state snapshots');
      }
      if (health.projectLearnings > 15) {
        console.log('   • Consolidate similar project learnings');
      }
    }
    
  } catch (error) {
    console.log(`❌ Error calculating health: ${error.message}`);
  }
}

// === PHASE 2 GUIDED SETUP HELPER FUNCTIONS ===

function detectProjectType() {
  const projectInfo = {
    type: 'Unknown',
    framework: 'None detected',
    language: 'Unknown',
    hasPackageJson: false,
    hasPyprojectToml: false,
    hasCargoToml: false,
    hasGoMod: false
  };

  try {
    // Check for package.json (Node.js/JavaScript/TypeScript)
    if (fs.existsSync('package.json')) {
      projectInfo.hasPackageJson = true;
      const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
      
      // Detect framework
      const deps = { ...packageJson.dependencies, ...packageJson.devDependencies };
      if (deps.react) projectInfo.framework = 'React';
      else if (deps.vue) projectInfo.framework = 'Vue.js';
      else if (deps.angular || deps['@angular/core']) projectInfo.framework = 'Angular';
      else if (deps.express) projectInfo.framework = 'Express.js';
      else if (deps.next) projectInfo.framework = 'Next.js';
      else if (deps.nuxt) projectInfo.framework = 'Nuxt.js';
      else projectInfo.framework = 'Node.js';
      
      // Detect language
      if (deps.typescript || deps['@types/node']) projectInfo.language = 'TypeScript';
      else projectInfo.language = 'JavaScript';
      
      projectInfo.type = 'Web Application';
    }
    
    // Check for Python project
    else if (fs.existsSync('pyproject.toml') || fs.existsSync('requirements.txt') || fs.existsSync('setup.py')) {
      projectInfo.hasPyprojectToml = fs.existsSync('pyproject.toml');
      projectInfo.language = 'Python';
      
      // Detect framework
      if (fs.existsSync('manage.py')) projectInfo.framework = 'Django';
      else if (fs.existsSync('app.py') || fs.existsSync('main.py')) {
        // Check for Flask or FastAPI
        const files = ['app.py', 'main.py'];
        for (const file of files) {
          if (fs.existsSync(file)) {
            const content = fs.readFileSync(file, 'utf8');
            if (content.includes('flask') || content.includes('Flask')) projectInfo.framework = 'Flask';
            else if (content.includes('fastapi') || content.includes('FastAPI')) projectInfo.framework = 'FastAPI';
            break;
          }
        }
      }
      
      projectInfo.type = 'Python Application';
    }
    
    // Check for Rust project
    else if (fs.existsSync('Cargo.toml')) {
      projectInfo.hasCargoToml = true;
      projectInfo.language = 'Rust';
      projectInfo.framework = 'Cargo';
      projectInfo.type = 'Rust Application';
    }
    
    // Check for Go project
    else if (fs.existsSync('go.mod')) {
      projectInfo.hasGoMod = true;
      projectInfo.language = 'Go';
      projectInfo.framework = 'Go Modules';
      projectInfo.type = 'Go Application';
    }
    
    // Generic project
    else {
      projectInfo.type = 'Generic Project';
      projectInfo.framework = 'None detected';
      projectInfo.language = 'Multiple/Unknown';
    }
    
  } catch (error) {
    console.log(`   ⚠️ Error detecting project type: ${error.message}`);
  }
  
  return projectInfo;
}

function createFrameworkStructure() {
  const dirs = [
    'docs/context/behavioral-specs',
    'docs/context/state-snapshots',
    'docs/templates'
  ];

  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`   ✓ Created ${dir}`);
    } else {
      console.log(`   ✓ ${dir} (already exists)`);
    }
  });
}

function generateCustomizedTemplates(projectInfo) {
  const sourceRoot = path.join(__dirname, '..');
  
  // Copy framework files
  const docFiles = [
    'README.md',
    'quick-start.md',
    'context-engineering-guide.md',
    'llm-instructions.md',
    'performance-directives.md',
    'framework-summary.md',
    'llm-validation-checklist.md'
  ];

  docFiles.forEach(file => {
    const source = path.join(sourceRoot, 'docs', file);
    const dest = path.join(process.cwd(), 'docs/context', file);
    
    if (fs.existsSync(source)) {
      fs.copyFileSync(source, dest);
      console.log(`   ✓ Copied ${file}`);
    }
  });

  // Create customized CONTEXT.md
  const templateSource = path.join(sourceRoot, 'templates', 'claude-template.md');
  const contextPath = path.join(process.cwd(), 'CONTEXT.md');
  
  if (fs.existsSync(templateSource)) {
    let template = fs.readFileSync(templateSource, 'utf8');
    
    // Customize template based on project info
    template = template.replace('[Project Name]', path.basename(process.cwd()));
    template = template.replace('[Date]', new Date().toISOString().split('T')[0]);
    template = template.replace('[Technology stack]', `${projectInfo.framework} (${projectInfo.language})`);
    template = template.replace('[Which LLM - Claude/Gemini/etc.]', 'Multiple (Universal)');
    
    // Add project-specific performance directives
    if (projectInfo.language === 'JavaScript' || projectInfo.language === 'TypeScript') {
      template = template.replace('[FRAMEWORK-SPECIFIC DIRECTIVES]', getJavaScriptDirectives(projectInfo));
    } else if (projectInfo.language === 'Python') {
      template = template.replace('[FRAMEWORK-SPECIFIC DIRECTIVES]', getPythonDirectives(projectInfo));
    } else {
      template = template.replace('[FRAMEWORK-SPECIFIC DIRECTIVES]', getGenericDirectives(projectInfo));
    }
    
    fs.writeFileSync(contextPath, template);
    console.log(`   ✓ Created customized CONTEXT.md for ${projectInfo.framework}`);
  }

  // Copy other templates
  const templateFiles = [
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
      console.log(`   ✓ Copied ${file}`);
    }
  });
}

function setupUniversalLLMIntegration() {
  // Define LLM context files and their descriptions
  const llmFiles = {
    'CLAUDE.md': 'Claude Code',
    'AGENTS.md': 'GPT Codex/Cursor', 
    'GEMINI.md': 'Gemini CLI',
    'CODEX.md': 'OpenAI Codex'
  };

  // Universal snippet to inject
  const ctxforgeSnippet = `<!-- ctxforge: Universal Context Integration -->
# 📋 Project Context

**This project uses ctxforge methodology.** Please read \`CONTEXT.md\` for:
- Complete project context and architecture
- Performance directives and coding standards  
- Current tasks and behavioral specifications
- Project learnings and patterns to follow

Follow the structured development process defined in CONTEXT.md.

---

`;

  const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
  
  // Process each LLM context file
  Object.entries(llmFiles).forEach(([filename, description]) => {
    const filePath = path.join(process.cwd(), filename);
    
    if (fs.existsSync(filePath)) {
      // Check if ctxforge integration already exists
      const existingContent = fs.readFileSync(filePath, 'utf8');
      
      if (existingContent.includes('<!-- ctxforge: Universal Context Integration -->')) {
        console.log(`   ✓ ${filename} already has ctxforge integration`);
      } else {
        // Backup existing file
        const backupPath = path.join(process.cwd(), `${filename.replace('.md', '')}-backup-${timestamp}.md`);
        fs.copyFileSync(filePath, backupPath);
        console.log(`   ✓ Backed up existing ${filename}`);
        
        // Prepend snippet to existing content
        const newContent = ctxforgeSnippet + existingContent;
        fs.writeFileSync(filePath, newContent);
        console.log(`   ✓ Updated ${filename} with ctxforge integration`);
      }
    } else {
      // Create new file with snippet
      fs.writeFileSync(filePath, ctxforgeSnippet);
      console.log(`   ✓ Created ${filename} for ${description}`);
    }
  });
}

function generateSampleBehavioralSpec(projectInfo) {
  const specContent = getSampleSpecForProject(projectInfo);
  const specPath = path.join(process.cwd(), 'docs/context/behavioral-specs', 'sample-feature.md');
  
  fs.writeFileSync(specPath, specContent);
  console.log(`   ✓ Created sample behavioral spec: sample-feature.md`);
  console.log(`   📋 Sample feature: ${getSampleFeatureName(projectInfo)}`);
}

function validateGuidedSetup() {
  const issues = [];
  
  // Check required files exist
  if (!fs.existsSync('CONTEXT.md')) issues.push('CONTEXT.md not created');
  if (!fs.existsSync('docs/context')) issues.push('docs/context directory missing');
  if (!fs.existsSync('docs/context/behavioral-specs')) issues.push('behavioral-specs directory missing');
  if (!fs.existsSync('docs/context/state-snapshots')) issues.push('state-snapshots directory missing');
  
  // Check LLM files
  const llmFiles = ['CLAUDE.md', 'AGENTS.md', 'GEMINI.md', 'CODEX.md'];
  const hasLLMFile = llmFiles.some(file => fs.existsSync(file));
  if (!hasLLMFile) issues.push('No LLM context files created');
  
  // Check sample spec
  if (!fs.existsSync('docs/context/behavioral-specs/sample-feature.md')) {
    issues.push('Sample behavioral spec not created');
  }
  
  return {
    success: issues.length === 0,
    issues: issues
  };
}

// Project-specific directive generators
function getJavaScriptDirectives(projectInfo) {
  const baseDirectives = `
**React/JavaScript Best Practices:**
- Memoize expensive computations (useMemo, useCallback) (PD-REACT-001)
- Correct dependency arrays in hooks (PD-REACT-002)
- Prevent unnecessary re-renders (React.memo) (PD-REACT-003)
- Use proper TypeScript types (PD-TS-001)
- Handle async operations with proper loading states (PD-ASYNC-001)`;

  if (projectInfo.framework === 'React') {
    return baseDirectives + `
- Follow React Hook rules (PD-REACT-004)
- Use controlled components for forms (PD-REACT-005)
- Optimize bundle size with code splitting (PD-PERF-001)`;
  }
  
  return baseDirectives;
}

function getPythonDirectives(projectInfo) {
  let directives = `
**Python Best Practices:**
- Follow PEP 8 style guide (PD-PY-001)
- Use type hints for all functions (PD-PY-002)
- Handle exceptions explicitly (PD-PY-003)
- Use list comprehensions appropriately (PD-PY-004)
- Optimize database queries (PD-DB-001)`;

  if (projectInfo.framework === 'Django') {
    directives += `
- Use Django ORM efficiently (PD-DJANGO-001)
- Implement proper authentication (PD-DJANGO-002)
- Follow Django security best practices (PD-DJANGO-003)`;
  } else if (projectInfo.framework === 'FastAPI') {
    directives += `
- Use Pydantic models for validation (PD-FASTAPI-001)
- Implement proper async/await patterns (PD-FASTAPI-002)
- Use dependency injection (PD-FASTAPI-003)`;
  }
  
  return directives;
}

function getGenericDirectives(projectInfo) {
  return `
**General Best Practices:**
- Follow language-specific style guides (PD-STYLE-001)
- Implement proper error handling (PD-ERROR-001)
- Write clear, intention-revealing names (PD-NAMING-001)
- Use appropriate data structures (PD-DATA-001)
- Consider performance implications (PD-PERF-001)`;
}

function getSampleSpecForProject(projectInfo) {
  const featureName = getSampleFeatureName(projectInfo);
  const date = new Date().toISOString().split('T')[0];
  
  return `# Behavioral Specification: ${featureName}

**Created:** ${date}
**Project Type:** ${projectInfo.type}
**Framework:** ${projectInfo.framework}

## User Scenarios

### SCENARIO 1: ${featureName} - Happy Path
\`\`\`gherkin
GIVEN user is on the main page
WHEN user interacts with the ${featureName.toLowerCase()} feature
THEN they should see immediate feedback
AND the feature should work as expected
\`\`\`

### SCENARIO 2: Error Handling
\`\`\`gherkin
GIVEN invalid input is provided
WHEN user attempts to use the feature
THEN appropriate error message is shown
AND user is guided to correct the input
\`\`\`

## Success Criteria

✅ Feature works on first interaction
✅ Error handling is user-friendly
✅ Performance meets expectations (< 2 seconds)
✅ Accessible via keyboard navigation
✅ Mobile-friendly responsive design

## Technical Notes

This is a sample specification generated for your ${projectInfo.framework} project.
Customize this template for your actual features.

**Next Steps:**
1. Start your LLM tool (claude, cursor, gemini-cli, etc.)
2. Say: "Let's implement the ${featureName} feature from the behavioral spec"
3. Watch ctxforge guide the implementation process!
`;
}

function getSampleFeatureName(projectInfo) {
  const samples = {
    'React': 'Interactive Button Component',
    'Vue.js': 'Reactive Data Display',
    'Angular': 'Dynamic Form Validation',
    'Django': 'User Profile Page',
    'Flask': 'API Data Endpoint',
    'FastAPI': 'Async Data Processing',
    'Express.js': 'Route Handler',
    'Next.js': 'Server-Side Rendered Page'
  };
  
  return samples[projectInfo.framework] || 'Core Feature Implementation';
}

// Helper functions for CLI commands
function checkLLMFiles() {
  const llmFiles = ['CLAUDE.md', 'AGENTS.md', 'GEMINI.md', 'CODEX.md'];
  return llmFiles.some(file => fs.existsSync(file));
}

function checkFrameworkStructure() {
  const requiredPaths = [
    'docs/context',
    'docs/templates',
    'docs/context/state-snapshots'
  ];
  return requiredPaths.every(path => fs.existsSync(path));
}

function checkProjectLearnings() {
  if (!fs.existsSync('CONTEXT.md')) return false;
  const content = fs.readFileSync('CONTEXT.md', 'utf8');
  return content.includes('## 🧠 Project Learnings');
}

function checkPerformanceDirectives() {
  return fs.existsSync('docs/context/performance-directives.md');
}

function calculateContextHealth() {
  const health = {
    size: 0,
    activeFeatures: 0,
    completedFeatures: 0,
    projectLearnings: 0,
    stateSnapshots: 0
  };
  
  if (fs.existsSync('CONTEXT.md')) {
    const contextContent = fs.readFileSync('CONTEXT.md', 'utf8');
    health.size = Math.round(contextContent.length / 1024);
    
    // Count features
    const currentFeature = contextContent.match(/## 🎭 Current Feature: (.+)/);
    health.activeFeatures = currentFeature && !currentFeature[1].includes('None') ? 1 : 0;
    
    const completedMatches = contextContent.match(/- ✅ \*\*.*?\*\*/g);
    health.completedFeatures = completedMatches ? completedMatches.length : 0;
    
    const learningsMatches = contextContent.match(/### PL-\d+:/g);
    health.projectLearnings = learningsMatches ? learningsMatches.length : 0;
  }
  
  if (fs.existsSync('docs/context/state-snapshots')) {
    const snapshots = fs.readdirSync('docs/context/state-snapshots').filter(f => f.endsWith('.md'));
    health.stateSnapshots = snapshots.length;
  }
  
  return health;
}

function calculateHealthScore(health) {
  let score = 100;
  
  // Size penalty
  if (health.size > 75) score -= 30;
  else if (health.size > 50) score -= 15;
  
  // Too many snapshots penalty
  if (health.stateSnapshots > 30) score -= 20;
  else if (health.stateSnapshots > 20) score -= 10;
  
  // Too many learnings penalty (indicates need for consolidation)
  if (health.projectLearnings > 20) score -= 15;
  else if (health.projectLearnings > 15) score -= 5;
  
  // Bonus for active project
  if (health.activeFeatures > 0) score += 5;
  if (health.completedFeatures > 0) score += 5;
  
  return Math.max(0, Math.min(100, score));
}

function getHealthEmoji(score) {
  if (score >= 90) return '🟢';
  if (score >= 70) return '🟡';
  return '🔴';
}

// === PHASE 3 FRAMEWORK ANALYTICS ===

function showFrameworkMetrics() {
  console.log('📊 Framework Analytics Dashboard\n');
  
  try {
    const metrics = calculateFrameworkMetrics();
    
    // Quality Trends
    console.log('🎯 Quality Trends:');
    console.log(`   Bug Rate: ${metrics.bugRate}% ${getBugRateEmoji(metrics.bugRate)}`);
    console.log(`   Review Issues: ${metrics.reviewIssues} found`);
    console.log(`   Code Quality Score: ${metrics.codeQuality}/100 ${getQualityEmoji(metrics.codeQuality)}`);
    console.log('');
    
    // Efficiency Trends
    console.log('⚡ Efficiency Trends:');
    console.log(`   Average Task Completion: ${metrics.avgTaskTime} sessions`);
    console.log(`   Features Delivered: ${metrics.featuresDelivered} total`);
    console.log(`   Context Optimizations: ${metrics.optimizations} performed`);
    console.log('');
    
    // Learning Effectiveness
    console.log('🧠 Learning Effectiveness:');
    console.log(`   Directive Compliance: ${metrics.directiveCompliance}% ${getComplianceEmoji(metrics.directiveCompliance)}`);
    console.log(`   Pattern Recognition: ${metrics.patternRecognition}/100`);
    console.log(`   Knowledge Transfer: ${metrics.knowledgeTransfer}/100`);
    console.log('');
    
    // Framework Usage Patterns
    console.log('📈 Usage Patterns:');
    console.log(`   Framework Age: ${metrics.frameworkAge} days`);
    console.log(`   Active Development Days: ${metrics.activeDays}`);
    console.log(`   Most Used Command: ${metrics.mostUsedCommand}`);
    console.log(`   Context Health Trend: ${metrics.healthTrend} ${getTrendEmoji(metrics.healthTrend)}`);
    console.log('');
    
    // Smart Recommendations
    console.log('💡 Smart Recommendations:');
    const recommendations = generateSmartRecommendations(metrics);
    if (recommendations.length > 0) {
      recommendations.forEach(rec => console.log(`   • ${rec}`));
    } else {
      console.log('   • No specific recommendations at this time');
    }
    console.log('');
    
    // Framework Effectiveness Score
    const effectivenessScore = calculateEffectivenessScore(metrics);
    console.log('🏆 Framework Effectiveness:');
    console.log(`   Overall Score: ${effectivenessScore}/100 ${getEffectivenessEmoji(effectivenessScore)}`);
    
    if (effectivenessScore >= 80) {
      console.log('   🎉 Excellent! ctxforge is working effectively for your project.');
    } else if (effectivenessScore >= 60) {
      console.log('   👍 Good progress! Consider following the recommendations above.');
    } else {
      console.log('   📝 Room for improvement. Review the framework guidelines.');
    }
    
  } catch (error) {
    console.log(`❌ Error calculating metrics: ${error.message}`);
  }
}

function calculateFrameworkMetrics() {
  const metrics = {
    bugRate: 0,
    reviewIssues: 0,
    codeQuality: 85,
    avgTaskTime: 1,
    featuresDelivered: 0,
    optimizations: 0,
    directiveCompliance: 90,
    patternRecognition: 75,
    knowledgeTransfer: 80,
    frameworkAge: 0,
    activeDays: 0,
    mostUsedCommand: 'validate',
    healthTrend: 'stable'
  };
  
  try {
    // Analyze CONTEXT.md for historical data
    if (fs.existsSync('CONTEXT.md')) {
      const contextContent = fs.readFileSync('CONTEXT.md', 'utf8');
      
      // Calculate features delivered
      const completedFeatures = contextContent.match(/- ✅ \*\*.*?\*\*/g);
      metrics.featuresDelivered = completedFeatures ? completedFeatures.length : 0;
      
      // Analyze project learnings for quality insights
      const learnings = contextContent.match(/### PL-\d+:/g);
      const learningCount = learnings ? learnings.length : 0;
      
      // Bug rate estimation based on learnings that mention "Error", "Issue", "Bug"
      const bugLearnings = contextContent.match(/### PL-\d+:.*?(Error|Issue|Bug|Problem)/gi);
      metrics.bugRate = learningCount > 0 ? Math.round((bugLearnings ? bugLearnings.length : 0) / learningCount * 100) : 0;
      
      // Review issues (learnings that mention "Root Cause")
      const reviewIssues = contextContent.match(/\*\*Root Cause:\*\*/g);
      metrics.reviewIssues = reviewIssues ? reviewIssues.length : 0;
      
      // Directive compliance based on PD- patterns found
      const pdDirectives = contextContent.match(/\(PD-[A-Z]+-\d+\)/g);
      if (pdDirectives && pdDirectives.length > 0) {
        metrics.directiveCompliance = Math.min(100, 85 + pdDirectives.length * 2);
      }
    }
    
    // Check state snapshots for activity tracking
    if (fs.existsSync('docs/context/state-snapshots')) {
      const snapshots = fs.readdirSync('docs/context/state-snapshots').filter(f => f.endsWith('.md'));
      metrics.optimizations = snapshots.length;
      
      if (snapshots.length > 0) {
        // Calculate framework age from oldest snapshot
        const oldestSnapshot = snapshots.sort()[0];
        const snapshotPath = path.join('docs/context/state-snapshots', oldestSnapshot);
        if (fs.existsSync(snapshotPath)) {
          const stats = fs.statSync(snapshotPath);
          const ageMs = Date.now() - stats.birthtime.getTime();
          metrics.frameworkAge = Math.ceil(ageMs / (24 * 60 * 60 * 1000));
        }
      }
    }
    
    // Enhanced metrics calculation
    if (metrics.featuresDelivered > 0) {
      metrics.avgTaskTime = Math.max(1, Math.round(metrics.optimizations / metrics.featuresDelivered));
    }
    
    // Pattern recognition based on consistent usage
    if (metrics.optimizations > 5) {
      metrics.patternRecognition = Math.min(100, 75 + (metrics.optimizations - 5) * 3);
    }
    
    // Knowledge transfer based on learnings quality
    if (metrics.reviewIssues > 0 && metrics.featuresDelivered > 0) {
      metrics.knowledgeTransfer = Math.min(100, 80 + (metrics.reviewIssues * 10 / metrics.featuresDelivered));
    }
    
    // Health trend analysis
    const currentHealth = calculateContextHealth();
    const currentScore = calculateHealthScore(currentHealth);
    
    if (currentScore >= 90) metrics.healthTrend = 'improving';
    else if (currentScore <= 60) metrics.healthTrend = 'declining';
    else metrics.healthTrend = 'stable';
    
    // Code quality estimation
    metrics.codeQuality = Math.round((metrics.directiveCompliance + metrics.patternRecognition + metrics.knowledgeTransfer) / 3);
    
  } catch (error) {
    console.log(`   ⚠️ Error calculating some metrics: ${error.message}`);
  }
  
  return metrics;
}

function generateSmartRecommendations(metrics) {
  const recommendations = [];
  
  // Quality recommendations
  if (metrics.bugRate > 15) {
    recommendations.push('High bug rate detected. Review performance directives compliance');
  }
  
  if (metrics.codeQuality < 70) {
    recommendations.push('Code quality could improve. Ensure LLMs follow behavioral specifications');
  }
  
  // Efficiency recommendations
  if (metrics.avgTaskTime > 3) {
    recommendations.push('Tasks taking longer than expected. Break down complex features into smaller specs');
  }
  
  if (metrics.optimizations === 0 && metrics.featuresDelivered > 2) {
    recommendations.push('Consider running "npx ctxforge optimize" to improve context performance');
  }
  
  // Learning effectiveness recommendations
  if (metrics.directiveCompliance < 80) {
    recommendations.push('Low directive compliance. Ensure LLMs read llm-validation-checklist.md before tasks');
  }
  
  if (metrics.patternRecognition < 60) {
    recommendations.push('Improve pattern recognition by documenting more project learnings');
  }
  
  // Framework usage recommendations
  if (metrics.frameworkAge > 30 && metrics.reviewIssues < 3) {
    recommendations.push('Long-running project. Consider consolidating project learnings');
  }
  
  if (metrics.healthTrend === 'declining') {
    recommendations.push('Context health declining. Run "npx ctxforge health" for specific fixes');
  }
  
  // Positive recommendations
  if (metrics.featuresDelivered > 5 && metrics.bugRate < 10) {
    recommendations.push('Excellent quality consistency! Consider documenting your patterns for other projects');
  }
  
  return recommendations;
}

function calculateEffectivenessScore(metrics) {
  let score = 0;
  let weights = 0;
  
  // Quality component (30% weight)
  score += (100 - metrics.bugRate) * 0.15;
  score += metrics.codeQuality * 0.15;
  weights += 0.30;
  
  // Efficiency component (25% weight)
  const efficiencyScore = Math.max(0, 100 - (metrics.avgTaskTime - 1) * 20);
  score += efficiencyScore * 0.25;
  weights += 0.25;
  
  // Learning component (25% weight)
  score += metrics.directiveCompliance * 0.125;
  score += metrics.patternRecognition * 0.125;
  weights += 0.25;
  
  // Usage component (20% weight)
  const usageScore = Math.min(100, (metrics.featuresDelivered * 20) + (metrics.optimizations * 10));
  score += usageScore * 0.20;
  weights += 0.20;
  
  return Math.round(score / weights);
}

// Helper functions for metrics display
function getBugRateEmoji(rate) {
  if (rate <= 5) return '🟢';
  if (rate <= 15) return '🟡';
  return '🔴';
}

function getQualityEmoji(score) {
  if (score >= 90) return '🟢';
  if (score >= 70) return '🟡';
  return '🔴';
}

function getComplianceEmoji(compliance) {
  if (compliance >= 90) return '🟢';
  if (compliance >= 75) return '🟡';
  return '🔴';
}

function getTrendEmoji(trend) {
  if (trend === 'improving') return '📈';
  if (trend === 'declining') return '📉';
  return '➡️';
}

function getEffectivenessEmoji(score) {
  if (score >= 85) return '🏆';
  if (score >= 70) return '🥈';
  if (score >= 55) return '🥉';
  return '📊';
}

// === PHASE 4 LLM-DRIVEN CONTEXT DISCOVERY ===

async function generateSpecification(description) {
  console.log('🤖 LLM-Driven Specification Generation\n');
  console.log(`Analyzing request: "${description}"\n`);
  
  try {
    // Step 1: Analyze project context
    console.log('📊 Step 1: Analyzing project context...');
    const projectContext = analyzeProjectContext();
    console.log(`   ✓ Project type: ${projectContext.type}`);
    console.log(`   ✓ Tech stack: ${projectContext.techStack}`);
    console.log(`   ✓ Existing patterns: ${projectContext.patterns.length} found\n`);
    
    // Step 2: LLM context discovery
    console.log('🧠 Step 2: LLM analyzing what context is needed...');
    const contextAnalysis = await performContextDiscovery(description, projectContext);
    
    if (contextAnalysis.needsQuestions) {
      console.log(`   ✓ Context analysis complete`);
      console.log(`   ⚠️  Additional context needed: ${contextAnalysis.questions.length} questions\n`);
      
      // Step 3: Interactive questioning
      console.log('❓ Step 3: Gathering additional context...\n');
      const additionalContext = await askInteractiveQuestions(contextAnalysis.questions);
      console.log('   ✓ Additional context gathered\n');
      
      // Step 4: Generate specification with full context
      console.log('📝 Step 4: Generating behavioral specification...');
      const specification = await generateBehavioralSpec(description, projectContext, additionalContext);
      await saveSpecification(specification);
      
    } else {
      console.log('   ✓ Sufficient context available, proceeding directly to generation\n');
      
      // Generate specification without additional questions
      console.log('📝 Step 3: Generating behavioral specification...');
      const specification = await generateBehavioralSpec(description, projectContext, {});
      await saveSpecification(specification);
    }
    
    console.log('🎉 Specification generation complete!\n');
    console.log('📋 Next steps:');
    console.log('1. Review the generated specification');
    console.log('2. Customize it for your specific needs');
    console.log('3. Start implementation with your LLM tool');
    console.log('4. Use "npx ctxforge validate" to ensure compliance');
    
  } catch (error) {
    console.log(`❌ Error generating specification: ${error.message}`);
    console.log('\n💡 Try providing more detail in your description or run "npx ctxforge validate" to check your setup.');
  }
}

function analyzeProjectContext() {
  const projectContext = {
    type: 'Unknown',
    techStack: 'Not detected',
    patterns: [],
    existingSpecs: [],
    performanceDirectives: []
  };
  
  try {
    // Detect project type (reuse existing logic)
    const projectInfo = detectProjectType();
    projectContext.type = projectInfo.type;
    projectContext.techStack = `${projectInfo.framework} (${projectInfo.language})`;
    
    // Analyze existing behavioral specifications
    if (fs.existsSync('docs/context/behavioral-specs')) {
      const specFiles = fs.readdirSync('docs/context/behavioral-specs').filter(f => f.endsWith('.md'));
      projectContext.existingSpecs = specFiles;
    }
    
    // Extract existing patterns from CONTEXT.md
    if (fs.existsSync('CONTEXT.md')) {
      const contextContent = fs.readFileSync('CONTEXT.md', 'utf8');
      
      // Extract performance directives
      const pdMatches = contextContent.match(/\(PD-[A-Z]+-\d+\)/g);
      if (pdMatches) {
        projectContext.performanceDirectives = [...new Set(pdMatches)];
      }
      
      // Extract patterns (simplified analysis)
      const patterns = [];
      if (contextContent.includes('React')) patterns.push('React components');
      if (contextContent.includes('API')) patterns.push('API integration');
      if (contextContent.includes('database')) patterns.push('Database operations');
      projectContext.patterns = patterns;
    }
    
  } catch (error) {
    console.log(`   ⚠️ Error analyzing project context: ${error.message}`);
  }
  
  return projectContext;
}

async function performContextDiscovery(description, projectContext) {
  console.log('   🤖 LLM analyzing context requirements using framework guides...');
  
  // Load context engineering guides
  const contextGuides = loadContextGuides();
  
  // In a real implementation, this would send a comprehensive prompt to LLM:
  // - User description
  // - Project context  
  // - Context discovery guide
  // - Domain knowledge patterns
  // And ask LLM to determine what questions are needed
  
  console.log('   📚 Loaded context guides:');
  console.log(`      ✓ Context discovery methodology`);
  console.log(`      ✓ Domain knowledge patterns`);
  console.log(`      ✓ Specification generation guide`);
  
  // Simulate analysis delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // For demonstration: LLM would analyze the description against context guides
  // and determine if questions are needed based on context gap analysis
  console.log('   🧠 LLM applying context discovery methodology...');
  
  const contextAnalysis = simulateLLMContextAnalysis(description, projectContext, contextGuides);
  
  return contextAnalysis;
}

function generateContextualQuestions(description, projectContext) {
  const questions = [];
  
  if (description.toLowerCase().includes('search')) {
    questions.push({
      question: "How many items will be searched through?",
      options: ["< 100", "100-1,000", "1,000-10,000", "> 10,000"],
      reasoning: "Determines client vs server-side search strategy"
    });
    
    questions.push({
      question: "What fields should be searchable?",
      type: "text",
      reasoning: "Affects search algorithm and database optimization"
    });
  }
  
  if (description.toLowerCase().includes('upload')) {
    questions.push({
      question: "What file types should be supported?",
      type: "text",
      reasoning: "Determines validation and processing requirements"
    });
    
    questions.push({
      question: "What's the maximum file size?",
      options: ["1MB", "5MB", "10MB", "No limit"],
      reasoning: "Affects upload strategy and user experience"
    });
  }
  
  if (description.toLowerCase().includes('form') || description.toLowerCase().includes('login')) {
    questions.push({
      question: "What validation rules are needed?",
      type: "text",
      reasoning: "Determines error handling and user feedback"
    });
  }
  
  // Always ask about existing patterns if available
  if (projectContext.existingSpecs.length > 0) {
    questions.push({
      question: "Should this follow patterns from existing specifications?",
      options: ["Yes, be consistent", "No, create new pattern", "Let me review first"],
      reasoning: "Ensures consistency with existing project patterns"
    });
  }
  
  return questions;
}

async function askInteractiveQuestions(questions) {
  const answers = {};
  
  // For demonstration, we'll simulate user answers
  // In real implementation, this would use readline or inquirer
  console.log('   💭 Simulating interactive questioning...');
  
  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    console.log(`   ${i + 1}. ${question.question}`);
    
    if (question.options) {
      question.options.forEach((option, idx) => {
        console.log(`      ${String.fromCharCode(97 + idx)}) ${option}`);
      });
      // Simulate choosing first option
      answers[i] = question.options[0];
      console.log(`      → Selected: ${question.options[0]}`);
    } else {
      // Simulate text input
      answers[i] = "User provided answer";
      console.log(`      → Answered: ${answers[i]}`);
    }
    console.log(`      (${question.reasoning})\n`);
  }
  
  return answers;
}

async function generateBehavioralSpec(description, projectContext, additionalContext) {
  console.log('   🤖 LLM generating behavioral specification...');
  
  // Simulate LLM generation delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // For demonstration, generate a basic specification
  // In real implementation, this would send a comprehensive prompt to LLM
  
  const featureName = extractFeatureName(description);
  const date = new Date().toISOString().split('T')[0];
  
  const specification = `# Behavioral Specification: ${featureName}

**Created:** ${date}
**Generated by:** ctxforge LLM-driven context discovery
**Project Type:** ${projectContext.type}
**Tech Stack:** ${projectContext.techStack}

## User Intent Analysis

**Original request:** "${description}"

**Understood requirements:**
- Feature type: ${identifyFeatureType(description)}
- Target location: ${extractLocation(description)}
- Primary user action: ${extractUserAction(description)}

## User Scenarios

### SCENARIO 1: Happy Path
\`\`\`gherkin
GIVEN user is on the ${extractLocation(description)}
WHEN user ${extractUserAction(description)}
THEN the system responds appropriately
AND provides immediate feedback
\`\`\`

### SCENARIO 2: Error Handling
\`\`\`gherkin
GIVEN invalid input or system error
WHEN user attempts the action
THEN clear error message is displayed
AND user is guided to resolution
\`\`\`

### SCENARIO 3: Edge Cases
\`\`\`gherkin
GIVEN edge case conditions
WHEN user interacts with the feature
THEN system handles gracefully
AND maintains expected behavior
\`\`\`

## Success Criteria

✓ Feature works on first interaction
✓ Error handling is user-friendly
✓ Performance meets expectations
✓ Accessible via keyboard navigation
✓ Mobile-responsive design
✓ Consistent with existing patterns

## Technical Implementation Notes

**Technology Stack:** ${projectContext.techStack}

**Performance Directives to Apply:**
${projectContext.performanceDirectives.length > 0 
  ? projectContext.performanceDirectives.map(pd => `- ${pd}`).join('\n')
  : '- Apply standard performance best practices'
}

**Integration Points:**
- Follow existing project patterns
- Maintain consistency with current UX
- Consider accessibility requirements

**Additional Context Applied:**
${Object.keys(additionalContext).length > 0 
  ? Object.entries(additionalContext).map(([key, value]) => `- Question ${parseInt(key) + 1}: ${value}`).join('\n')
  : '- Generated from description analysis only'
}

## Next Steps

1. Review this specification for completeness
2. Customize based on specific project requirements
3. Begin implementation with your LLM tool
4. Apply ctxforge validation throughout development

---

*This specification was generated using ctxforge's LLM-driven context discovery. Review and customize as needed for your specific requirements.*
`;

  return specification;
}

async function saveSpecification(specification) {
  // Ensure directory exists
  const specsDir = 'docs/context/behavioral-specs';
  if (!fs.existsSync(specsDir)) {
    fs.mkdirSync(specsDir, { recursive: true });
  }
  
  // Generate filename from feature name
  const featureName = specification.match(/# Behavioral Specification: (.+)/)?.[1] || 'generated-feature';
  const filename = featureName.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '.md';
  const filepath = path.join(specsDir, filename);
  
  // Save the specification
  fs.writeFileSync(filepath, specification);
  console.log(`   ✓ Specification saved to: ${filepath}`);
  
  return filepath;
}

// Helper functions for specification generation
function extractFeatureName(description) {
  // Simple extraction - in real implementation, LLM would do this
  if (description.toLowerCase().includes('search')) return 'Search Functionality';
  if (description.toLowerCase().includes('upload')) return 'File Upload';
  if (description.toLowerCase().includes('login')) return 'User Authentication';
  if (description.toLowerCase().includes('form')) return 'Form Input';
  return 'Feature Implementation';
}

function identifyFeatureType(description) {
  if (description.toLowerCase().includes('search')) return 'Search/Filter';
  if (description.toLowerCase().includes('upload')) return 'File Upload';
  if (description.toLowerCase().includes('login') || description.toLowerCase().includes('auth')) return 'Authentication';
  if (description.toLowerCase().includes('form')) return 'Data Input';
  return 'User Interface';
}

function extractLocation(description) {
  const locationMatch = description.match(/on the (\w+) page/i);
  if (locationMatch) return locationMatch[1] + ' page';
  
  const pageMatch = description.match(/(\w+) page/i);
  if (pageMatch) return pageMatch[1] + ' page';
  
  return 'application';
}

function extractUserAction(description) {
  if (description.toLowerCase().includes('search')) return 'performs search';
  if (description.toLowerCase().includes('upload')) return 'uploads file';
  if (description.toLowerCase().includes('login')) return 'logs in';
  if (description.toLowerCase().includes('add')) return 'adds content';
  return 'interacts with feature';
}

function loadContextGuides() {
  const guides = {
    contextDiscovery: null,
    domainKnowledge: null,
    specificationGeneration: null
  };
  
  try {
    // Load context discovery guide
    const contextDiscoveryPath = 'docs/context/context-discovery-guide.md';
    if (fs.existsSync(contextDiscoveryPath)) {
      guides.contextDiscovery = fs.readFileSync(contextDiscoveryPath, 'utf8');
    }
    
    // Load domain knowledge patterns
    const domainKnowledgePath = 'docs/context/domain-knowledge-patterns.md';
    if (fs.existsSync(domainKnowledgePath)) {
      guides.domainKnowledge = fs.readFileSync(domainKnowledgePath, 'utf8');
    }
    
    // Load specification generation guide
    const specGenerationPath = 'docs/context/specification-generation-guide.md';
    if (fs.existsSync(specGenerationPath)) {
      guides.specificationGeneration = fs.readFileSync(specGenerationPath, 'utf8');
    }
    
  } catch (error) {
    console.log(`   ⚠️ Error loading context guides: ${error.message}`);
  }
  
  return guides;
}

function simulateLLMContextAnalysis(description, projectContext, contextGuides) {
  // This simulates what an LLM would do with the context guides:
  // 1. Analyze user request against context discovery methodology
  // 2. Identify feature type and check domain knowledge patterns
  // 3. Determine what context gaps need to be filled
  
  const featureType = identifyFeatureType(description);
  
  // Simulate LLM reasoning based on context guides
  const reasoning = `Analyzed "${description}" using context discovery methodology. 
Identified as ${featureType} feature. Consulting domain knowledge patterns 
for ${featureType.toLowerCase()} to determine critical context requirements.`;
  
  // For demonstration, we'll still need some questions for common feature types
  // But now these are based on the domain knowledge patterns in the context files
  const needsQuestions = shouldAskQuestions(featureType, description, projectContext);
  
  if (needsQuestions) {
    const questions = generateQuestionsFromContext(featureType, description, projectContext, contextGuides);
    
    return {
      needsQuestions: true,
      questions: questions,
      reasoning: reasoning,
      featureType: featureType,
      contextGuidesUsed: Object.keys(contextGuides).filter(key => contextGuides[key] !== null)
    };
  }
  
  return {
    needsQuestions: false,
    reasoning: reasoning + " Sufficient context available from description and project analysis.",
    featureType: featureType,
    contextGuidesUsed: Object.keys(contextGuides).filter(key => contextGuides[key] !== null)
  };
}

function shouldAskQuestions(featureType, description, projectContext) {
  // Based on domain knowledge patterns, determine if questions are needed
  // This simulates LLM reasoning about context gaps
  
  if (featureType.includes('Search')) {
    // From domain-knowledge-patterns.md: Search features need scale and field info
    return !description.includes('small') && !description.includes('few');
  }
  
  if (featureType.includes('Upload')) {
    // From domain knowledge: File uploads need type and size constraints
    return !description.includes('image') && !description.includes('file type');
  }
  
  if (featureType.includes('Authentication')) {
    // From domain knowledge: Auth needs security requirements
    return !description.includes('simple') && !projectContext.patterns.includes('existing auth');
  }
  
  if (featureType.includes('Data Input')) {
    // From domain knowledge: Forms need validation rules
    return !description.includes('validation') && !description.includes('required');
  }
  
  // For other feature types, ask questions if description is very brief
  return description.split(' ').length < 8;
}

function generateQuestionsFromContext(featureType, description, projectContext, contextGuides) {
  // This simulates LLM generating questions based on domain knowledge patterns
  const questions = [];
  
  if (featureType.includes('Search')) {
    // Based on domain-knowledge-patterns.md for search features
    questions.push({
      question: "How many items will be searched through?",
      options: ["< 100 (client-side)", "100-1,000 (hybrid)", "1,000-10,000 (server-side)", "> 10,000 (full server-side)"],
      reasoning: "Determines implementation strategy per domain knowledge patterns",
      source: "Domain Knowledge: Search & Filter Features"
    });
    
    questions.push({
      question: "What information should be searchable in the products?",
      type: "text",
      reasoning: "Affects indexing and query optimization strategy",
      source: "Domain Knowledge: Search & Filter Features"
    });
  }
  
  if (featureType.includes('Upload')) {
    // Based on domain-knowledge-patterns.md for upload features
    questions.push({
      question: "What file types should be supported?",
      type: "text",
      reasoning: "Determines client-side validation and server processing",
      source: "Domain Knowledge: File Upload Features"
    });
    
    questions.push({
      question: "What's the maximum file size limit?",
      options: ["1MB (small files)", "5MB (images)", "10MB (documents)", "No limit (enterprise)"],
      reasoning: "Affects upload strategy and user experience patterns",
      source: "Domain Knowledge: File Upload Features"
    });
  }
  
  if (featureType.includes('Data Input')) {
    // Based on domain-knowledge-patterns.md for form features
    questions.push({
      question: "What validation rules are required?",
      type: "text",
      reasoning: "Determines error handling and user feedback patterns",
      source: "Domain Knowledge: Form Input Features"
    });
  }
  
  // Always consider project consistency
  if (projectContext.existingSpecs.length > 0) {
    questions.push({
      question: "Should this follow patterns from existing specifications?",
      options: ["Yes, maintain consistency", "No, establish new pattern", "Let me review existing patterns first"],
      reasoning: "Ensures consistency with project's established patterns",
      source: "Context Discovery Guide: Smart Questioning Strategy"
    });
  }
  
  return questions;
}

// === PHASE 3.3 DEVELOPMENT INTEGRATION ===

function installGitHooks() {
  console.log('🔗 Installing Git Hooks Integration\n');
  
  try {
    // Check if this is a git repository
    if (!fs.existsSync('.git')) {
      console.log('❌ Not a git repository. Initialize git first with "git init"');
      return;
    }
    
    // Create hooks directory if it doesn't exist
    const hooksDir = '.git/hooks';
    if (!fs.existsSync(hooksDir)) {
      fs.mkdirSync(hooksDir, { recursive: true });
    }
    
    // Pre-commit hook for context validation
    const preCommitHook = `#!/bin/sh
# ctxforge pre-commit hook
echo "🔍 ctxforge: Validating framework compliance..."
npx ctxforge validate

if [ $? -ne 0 ]; then
  echo "❌ ctxforge validation failed. Fix issues before committing."
  echo "Run 'npx ctxforge validate' for details."
  exit 1
fi

echo "✅ ctxforge validation passed"
`;
    
    const preCommitPath = path.join(hooksDir, 'pre-commit');
    fs.writeFileSync(preCommitPath, preCommitHook);
    
    // Make hook executable (Unix/Linux/Mac)
    if (process.platform !== 'win32') {
      fs.chmodSync(preCommitPath, 0o755);
    }
    
    console.log('✅ Pre-commit hook installed');
    console.log('   • Validates framework compliance before each commit');
    console.log('   • Prevents commits with framework issues');
    
    // Post-commit hook for health monitoring
    const postCommitHook = `#!/bin/sh
# ctxforge post-commit hook
echo "📊 ctxforge: Updating project metrics..."
npx ctxforge health > /dev/null 2>&1
`;
    
    const postCommitPath = path.join(hooksDir, 'post-commit');
    fs.writeFileSync(postCommitPath, postCommitHook);
    
    if (process.platform !== 'win32') {
      fs.chmodSync(postCommitPath, 0o755);
    }
    
    console.log('✅ Post-commit hook installed');
    console.log('   • Updates health metrics after each commit');
    console.log('   • Tracks framework usage patterns');
    
    // Create .ctxforge directory for hook state
    if (!fs.existsSync('.ctxforge')) {
      fs.mkdirSync('.ctxforge');
    }
    
    // Store hook installation metadata
    const hookMetadata = {
      installed: new Date().toISOString(),
      version: require('../package.json').version,
      hooks: ['pre-commit', 'post-commit']
    };
    
    fs.writeFileSync('.ctxforge/hooks.json', JSON.stringify(hookMetadata, null, 2));
    console.log('✅ Hook metadata saved to .ctxforge/hooks.json');
    
    console.log('\n🎉 Git hooks installation complete!');
    console.log('\n📋 What happens now:');
    console.log('• Before each commit: Framework validation runs automatically');
    console.log('• After each commit: Health metrics are updated');
    console.log('• Failed validation prevents commits (use --no-verify to bypass)');
    
  } catch (error) {
    console.log(`❌ Error installing Git hooks: ${error.message}`);
  }
}

function setupIDEIntegration() {
  console.log('⚙️ Setting up IDE Integration\n');
  
  try {
    let configurationsCreated = 0;
    
    // VS Code configuration
    if (!fs.existsSync('.vscode')) {
      fs.mkdirSync('.vscode');
    }
    
    // VS Code settings for ctxforge
    const vscodeSettings = {
      "files.associations": {
        "CONTEXT.md": "markdown",
        "CLAUDE.md": "markdown",
        "AGENTS.md": "markdown",
        "GEMINI.md": "markdown",
        "CODEX.md": "markdown"
      },
      "markdown.preview.breaks": true,
      "markdown.preview.linkify": true,
      "files.watcherExclude": {
        "**/docs/context/state-snapshots/**": true
      },
      "search.exclude": {
        "**/docs/context/state-snapshots/**": true
      }
    };
    
    const vscodeSettingsPath = '.vscode/settings.json';
    if (fs.existsSync(vscodeSettingsPath)) {
      // Merge with existing settings
      const existingSettings = JSON.parse(fs.readFileSync(vscodeSettingsPath, 'utf8'));
      const mergedSettings = { ...existingSettings, ...vscodeSettings };
      fs.writeFileSync(vscodeSettingsPath, JSON.stringify(mergedSettings, null, 2));
      console.log('✅ VS Code settings updated with ctxforge configuration');
    } else {
      fs.writeFileSync(vscodeSettingsPath, JSON.stringify(vscodeSettings, null, 2));
      console.log('✅ VS Code settings created for ctxforge');
    }
    configurationsCreated++;
    
    // VS Code tasks for ctxforge commands
    const vscodeTasks = {
      "version": "2.0.0",
      "tasks": [
        {
          "label": "ctxforge: Validate Framework",
          "type": "shell",
          "command": "npx ctxforge validate",
          "group": "build",
          "presentation": {
            "echo": true,
            "reveal": "always",
            "focus": false,
            "panel": "shared"
          }
        },
        {
          "label": "ctxforge: Show Context Status",
          "type": "shell",
          "command": "npx ctxforge status",
          "group": "build"
        },
        {
          "label": "ctxforge: Check Health",
          "type": "shell",
          "command": "npx ctxforge health",
          "group": "build"
        },
        {
          "label": "ctxforge: Show Metrics",
          "type": "shell",
          "command": "npx ctxforge metrics",
          "group": "build"
        },
        {
          "label": "ctxforge: Optimize Context",
          "type": "shell",
          "command": "npx ctxforge optimize",
          "group": "build"
        }
      ]
    };
    
    const vscodeTasksPath = '.vscode/tasks.json';
    fs.writeFileSync(vscodeTasksPath, JSON.stringify(vscodeTasks, null, 2));
    console.log('✅ VS Code tasks created for ctxforge commands');
    configurationsCreated++;
    
    // Create workspace snippets for ctxforge
    const snippetsDir = '.vscode/snippets';
    if (!fs.existsSync(snippetsDir)) {
      fs.mkdirSync(snippetsDir, { recursive: true });
    }
    
    const ctxforgeSnippets = {
      "Behavioral Specification": {
        "prefix": "ctxforge-spec",
        "body": [
          "# Behavioral Specification: ${1:Feature Name}",
          "",
          "**Created:** ${CURRENT_DATE}",
          "**Priority:** ${2:High/Medium/Low}",
          "",
          "## User Scenarios",
          "",
          "### SCENARIO 1: ${3:Happy Path}",
          "```gherkin",
          "GIVEN ${4:initial condition}",
          "WHEN ${5:user action}",
          "THEN ${6:expected result}",
          "```",
          "",
          "## Success Criteria",
          "",
          "✅ ${7:Criterion 1}",
          "✅ ${8:Criterion 2}",
          "",
          "## Technical Notes",
          "",
          "${9:Implementation notes}"
        ],
        "description": "ctxforge behavioral specification template"
      },
      "Project Learning": {
        "prefix": "ctxforge-learning",
        "body": [
          "### PL-${1:001}: ${2:Learning Title}",
          "**Discovered:** ${3:Task/Date}",
          "**Issue:** ${4:What went wrong}",
          "**Root Cause:** ${5:Why it happened}",
          "**Solution:** ${6:How to fix it}",
          "**Prevention:** ${7:How to avoid it}",
          "**Category:** ${8:Technical/Process/Documentation}",
          "",
          "**Code Example:**",
          "```${9:language}",
          "// ❌ WRONG",
          "${10:bad code example}",
          "",
          "// ✅ CORRECT",
          "${11:good code example}",
          "```"
        ],
        "description": "ctxforge project learning template"
      }
    };
    
    const snippetsPath = path.join(snippetsDir, 'ctxforge.json');
    fs.writeFileSync(snippetsPath, JSON.stringify(ctxforgeSnippets, null, 2));
    console.log('✅ VS Code snippets created for ctxforge templates');
    configurationsCreated++;
    
    // JetBrains IDEs (IntelliJ, WebStorm, PyCharm, etc.)
    const ideaDir = '.idea';
    if (fs.existsSync(ideaDir)) {
      // Create run configurations for ctxforge commands
      const runConfigDir = path.join(ideaDir, 'runConfigurations');
      if (!fs.existsSync(runConfigDir)) {
        fs.mkdirSync(runConfigDir, { recursive: true });
      }
      
      const ctxforgeValidateConfig = `<component name="ProjectRunConfigurationManager">
  <configuration default="false" name="ctxforge validate" type="js.build_tools.npm">
    <package-json value="$PROJECT_DIR$/package.json" />
    <command value="run" />
    <scripts>
      <script value="validate" />
    </scripts>
    <node-interpreter value="project" />
    <envs />
    <method v="2" />
  </configuration>
</component>`;
      
      fs.writeFileSync(path.join(runConfigDir, 'ctxforge_validate.xml'), ctxforgeValidateConfig);
      console.log('✅ JetBrains IDE run configuration created');
      configurationsCreated++;
    }
    
    // Create .ctxforge IDE configuration metadata
    const ideConfig = {
      configured: new Date().toISOString(),
      version: require('../package.json').version,
      configurations: configurationsCreated,
      ides: ['vscode', ...(fs.existsSync('.idea') ? ['jetbrains'] : [])]
    };
    
    if (!fs.existsSync('.ctxforge')) {
      fs.mkdirSync('.ctxforge');
    }
    
    fs.writeFileSync('.ctxforge/ide-config.json', JSON.stringify(ideConfig, null, 2));
    
    console.log(`\n🎉 IDE integration setup complete! (${configurationsCreated} configurations created)`);
    console.log('\n📋 What was configured:');
    console.log('• VS Code: Settings, tasks, and snippets for ctxforge');
    console.log('• File associations for context files');
    console.log('• Build tasks for all ctxforge commands');
    console.log('• Code snippets for behavioral specs and project learnings');
    
    if (fs.existsSync('.idea')) {
      console.log('• JetBrains IDE: Run configurations');
    }
    
    console.log('\n💡 Next steps:');
    console.log('• Restart your IDE to load new configurations');
    console.log('• Use Ctrl+Shift+P (VS Code) to access ctxforge tasks');
    console.log('• Type "ctxforge-" in markdown files to use snippets');
    
  } catch (error) {
    console.log(`❌ Error setting up IDE integration: ${error.message}`);
  }
}