#!/usr/bin/env node

// 🚀 Competitive Programming Performance CLI
// Main interface for tracking performance and running tests

import { performanceTracker } from './performance-tracker';
import { dashboard } from './dashboard';
import { testRunner, createDay1TestSuite, createDay2TestSuite, createDay3TestSuite } from './test-runner';

// Global functions for easy CLI usage
declare var global: any;

// Main CLI functions
global.dashboard = () => {
    dashboard.showDashboard();
};

global.runTests = async () => {
    console.log('🏃 Running all test suites...\n');
    
    const day1Suite = createDay1TestSuite();
    const day2Suite = createDay2TestSuite();
    const day3Suite = createDay3TestSuite();
    
    const allSuites = [...day1Suite, ...day2Suite, ...day3Suite];
    await testRunner.runSuite(allSuites);
    
    console.log('\n📊 Updated performance data available. Run dashboard() to see results!');
};

global.testDay = async (day: number) => {
    let suites;
    
    switch (day) {
        case 1:
            suites = createDay1TestSuite();
            break;
        case 2:
            suites = createDay2TestSuite();
            break;
        case 3:
            suites = createDay3TestSuite();
            break;
        default:
            console.log('❌ Invalid day. Use 1, 2, or 3.');
            return;
    }
    
    console.log(`🏃 Running Day ${day} test suite...\n`);
    await testRunner.runSuite(suites);
    console.log('\n📊 Run dashboard() to see updated results!');
};

global.setGoals = (timePerProblem?: number, successRate?: number, dailyGoal?: number) => {
    if (timePerProblem === undefined && successRate === undefined && dailyGoal === undefined) {
        console.log('🎯 Current Goals:');
        const data = performanceTracker.getData();
        console.log(`   ⏱️ Time per problem: ${(data.goals.targetTimePerProblem / 1000 / 60).toFixed(1)} minutes`);
        console.log(`   📊 Success rate: ${(data.goals.targetSuccessRate * 100).toFixed(1)}%`);
        console.log(`   📚 Daily problems: ${data.goals.dailyProblemGoal} problems/day`);
        console.log('\nTo update: setGoals(timeInMinutes, successRate0to1, dailyProblems)');
        console.log('Example: setGoals(5, 0.8, 4) // 5 min/problem, 80% success, 4 problems/day');
        return;
    }
    
    const timeMs = timePerProblem ? timePerProblem * 60 * 1000 : undefined;
    performanceTracker.setGoals(timeMs, successRate, dailyGoal);
};

global.clearData = () => {
    console.log('⚠️  This will clear all performance data. Type "yes" to confirm:');
    // For now, just clear it - in a real CLI you'd use readline for confirmation
    performanceTracker.clearData();
};

global.showProgress = () => {
    dashboard.showProgressChart();
};

global.showInsights = () => {
    dashboard.showInsights();
};

global.exportData = () => {
    dashboard.exportData();
};

// Welcome message and setup
function showWelcome() {
    console.clear();
    console.log('🚀 COMPETITIVE PROGRAMMING PERFORMANCE TRACKER');
    console.log('='.repeat(60));
    console.log('Welcome to your TypeScript competitive programming journey!');
    console.log('This tool tracks your performance and helps you improve.');
    console.log('\n🎯 Available Commands:');
    console.log('  dashboard()      - Show complete performance dashboard');
    console.log('  runTests()       - Run all problem test suites');
    console.log('  testDay(1-3)     - Test specific day problems');
    console.log('  setGoals()       - View/set performance goals');
    console.log('  showProgress()   - Show progress chart');
    console.log('  showInsights()   - Get performance insights');
    console.log('  clearData()      - Reset all data');
    console.log('  exportData()     - Export data for analysis');
    console.log('\n💡 Start with: dashboard() to see your current status');
    console.log('   Then try: runTests() to practice all problems');
    console.log('='.repeat(60));
}

// Run setup
showWelcome();

// Quick start function for immediate testing
global.quickStart = async () => {
    console.log('🚀 Quick Start: Running a sample to show how it works...\n');
    
    // Run just a few problems to demonstrate
    const sampleSuites = [
        createDay1TestSuite()[0], // Max in array
        createDay2TestSuite()[1], // Palindrome
        createDay3TestSuite()[0]  // Character frequency
    ];
    
    await testRunner.runSuite(sampleSuites);
    
    console.log('\n🎉 Quick start complete! Now run dashboard() to see your performance metrics.');
    console.log('💡 Try runTests() to practice all available problems.');
};

console.log('\n✨ Pro tip: Try quickStart() for a demo, or runTests() to start practicing!');

export { 
    performanceTracker, 
    dashboard, 
    testRunner,
    createDay1TestSuite,
    createDay2TestSuite, 
    createDay3TestSuite
};