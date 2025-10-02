const { calculateContextHealth, calculateHealthScore, getHealthEmoji } = require('../utils/healthCalculation');

/**
 * Display context health report
 */
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

module.exports = { showContextHealth };
