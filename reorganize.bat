@echo off
echo Creating folder structure...

mkdir docs\guides 2>nul
mkdir templates 2>nul
mkdir scripts 2>nul
mkdir examples 2>nul

echo Moving and renaming core documentation...
move context_guide.md docs\context-engineering-guide.md
move llm_instructions.md docs\llm-instructions.md
move performance_directives.md docs\performance-directives.md
move QUICK-START.md docs\quick-start.md
move framework_summary.md docs\framework-summary.md
copy README.md docs\README.md

echo Moving templates...
move claude_template.md templates\claude-template.md
move behavioral_spec_template.md templates\behavioral-spec-template.md
move task_execution_protocol.md templates\task-execution-protocol.md
move project_learnings_template.md templates\project-learnings-template.md
move state_snapshot_template.md templates\state-snapshot-template.md

echo Moving guides...
move ctxforge_action_plan.md docs\guides\action-plan.md
move ctxforge_claude_code_test.md docs\guides\testing-guide.md

echo.
echo OK Reorganization complete!
echo.
echo New structure:
tree /F