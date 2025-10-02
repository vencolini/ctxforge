const fs = require('fs');

/**
 * Detects the project type based on configuration files and structure
 * @returns {Object} Project information including type, framework, and language
 */
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

module.exports = { detectProjectType };
