#!/bin/bash
# Test script for ctxforge CLI commands

echo "======================================"
echo "ctxforge v3.0.1 Command Test Suite"
echo "======================================"
echo ""

# Test 1: Version
echo "Test 1: Version command"
echo "Command: npx ctxforge version"
npx ctxforge version
echo ""

# Test 2: Help
echo "Test 2: Help command"
echo "Command: npx ctxforge --help"
npx ctxforge --help
echo ""

# Create temp directory for testing
TEST_DIR=$(mktemp -d)
echo "Test directory: $TEST_DIR"
cd "$TEST_DIR"

# Test 3: Init
echo "Test 3: Init command"
echo "Command: npx ctxforge init"
npx ctxforge init
echo ""

# Test 4: Validate
echo "Test 4: Validate command (after init)"
echo "Command: npx ctxforge validate"
npx ctxforge validate
echo ""

# Test 5: Status
echo "Test 5: Status command"
echo "Command: npx ctxforge status"
npx ctxforge status
echo ""

# Test 6: Health
echo "Test 6: Health command"
echo "Command: npx ctxforge health"
npx ctxforge health
echo ""

# Test 7: Optimize
echo "Test 7: Optimize command"
echo "Command: npx ctxforge optimize"
npx ctxforge optimize
echo ""

# Verify files were created
echo "Test 8: Verify installation"
echo "Checking installed files..."
if [ -d "docs/context" ]; then
  echo "✅ docs/context/ exists"

  if [ -f "docs/context/CORE.md" ]; then
    echo "✅ CORE.md exists"
  else
    echo "❌ CORE.md missing"
  fi

  if [ -f "docs/context/FRAMEWORK.md" ]; then
    echo "✅ FRAMEWORK.md exists"
  else
    echo "❌ FRAMEWORK.md missing"
  fi

  if [ -f "docs/context/project.md" ]; then
    echo "✅ project.md exists"
  else
    echo "❌ project.md missing"
  fi

  if [ -d "docs/context/protocols" ]; then
    PROTOCOL_COUNT=$(ls docs/context/protocols/*.md 2>/dev/null | wc -l)
    echo "✅ protocols/ exists with $PROTOCOL_COUNT protocols"

    if [ "$PROTOCOL_COUNT" -ge 15 ]; then
      echo "✅ All 15 protocols present"
    else
      echo "❌ Missing protocols (found $PROTOCOL_COUNT, expected 15)"
    fi
  else
    echo "❌ protocols/ directory missing"
  fi
else
  echo "❌ docs/context/ not created"
fi
echo ""

# Cleanup
echo "Cleaning up test directory..."
cd -
rm -rf "$TEST_DIR"

echo "======================================"
echo "Test Suite Complete"
echo "======================================"
