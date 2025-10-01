# Changelog

All notable changes to ctxforge will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.2.0] - 2025-10-01

### 🚀 Major Features Added
- **Context Discovery System** - Intelligent analysis of user requests with domain expertise
  - `npx ctxforge spec "description"` command for LLM-driven specification generation
  - Smart questioning based on feature type and project context
  - Domain knowledge patterns for common feature types (search, forms, auth, uploads, etc.)
- **Modular Performance Directives** - Broke down 942-line monolith into focused modules
  - 11 specialized directive files by category (algorithmic, security, React, etc.)
  - Task-specific loading strategy for better context economy
  - 75% reduction in irrelevant context loading
- **Context Integration Map** - Comprehensive architectural overview
  - Relationships between all 33+ context files mapped
  - Reading order defined for different workflows
  - SOLID principles applied to context organization

### 🎯 Enhanced Features
- **Domain Knowledge Patterns** - Added real-time and mobile development patterns
- **Context Discovery Guide** - LLM methodology for analyzing user requests
- **Specification Generation Guide** - Structured approach to creating behavioral specs
- **Context Economy** - Load only relevant directives based on task type

### 🔧 Improvements
- **LLM Instructions Updated** - Integrated context discovery into core workflow
- **Cross-Stack Support** - Validated with React and Node.js projects
- **Context File Organization** - Single sources of truth established
- **Reference System** - Updated all PD-XXX directive references

### 🧪 Testing & Validation
- **Enhanced Testing** - Comprehensive validation across multiple project types
- **Real-World Scenarios** - File upload, authentication, search features tested
- **Cross-Project Consistency** - Framework works seamlessly across different tech stacks
- **Production Readiness** - All scenarios passed with excellent results

### Technical Details
- Context files modularized following DRY and SOLID principles
- Performance directive loading optimized for specific task types
- Framework architecture redesigned for better maintainability
- Enhanced domain expertise for better LLM guidance

## [1.1.0] - 2025-10-01

### Added
- **Framework Analytics System** - `npx ctxforge metrics` with comprehensive dashboard
- **Development Integration** - `npx ctxforge install-hooks` and `npx ctxforge ide-setup`
- **Enhanced CLI Commands** - `validate`, `status`, `optimize`, `health` commands
- **Progressive Onboarding** - `npx ctxforge guided` with automatic project detection

### Enhanced
- Universal LLM compatibility with improved duplicate detection
- Documentation structure with modular organization
- Context health scoring and optimization recommendations

### Fixed
- Duplication prevention in LLM integration files
- Improved error handling and validation

## [1.0.0] - 2025-01-15

### Added
- Initial release of ctxforge framework
- Core documentation files:
  - README.md - Framework overview
  - quick-start.md - Fast setup guide
  - context-engineering-guide.md - Complete step-by-step process
  - llm-instructions.md - Instructions for LLMs
  - performance-directives.md - Code quality directives
  - framework-summary.md - Framework summary
- Template files:
  - claude-template.md - Main project context template
  - behavioral-spec-template.md - Feature specification template
  - task-execution-protocol.md - Task execution guide
  - project-learnings-template.md - Learning documentation template
  - state-snapshot-template.md - State compression template
- CLI tool (`npx ctxforge init`) for easy framework installation
- npm package support for cross-platform installation
- MIT License

### Features
- Behavior-first specification approach
- Explicit technical inference verification
- Performance-by-default directives
- Atomic task execution model
- Project-specific learning system
- Context compression for long-running projects
- Support for Claude Code, Gemini CLI, ChatGPT, and any LLM
- Language and framework agnostic

[1.2.0]: https://github.com/vencolini/ctxforge/releases/tag/v1.2.0
[1.1.0]: https://github.com/vencolini/ctxforge/releases/tag/v1.1.0
[1.0.0]: https://github.com/vencolini/ctxforge/releases/tag/v1.0.0