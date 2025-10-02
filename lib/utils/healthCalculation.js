const fs = require('fs');

/**
 * Calculate context health metrics
 * @returns {Object} Health metrics
 */
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

/**
 * Calculate health score from metrics
 * @param {Object} health - Health metrics
 * @returns {number} Score from 0-100
 */
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

/**
 * Get emoji indicator for health score
 * @param {number} score - Health score
 * @returns {string} Emoji indicator
 */
function getHealthEmoji(score) {
  if (score >= 90) return '🟢';
  if (score >= 70) return '🟡';
  return '🔴';
}

module.exports = {
  calculateContextHealth,
  calculateHealthScore,
  getHealthEmoji
};
