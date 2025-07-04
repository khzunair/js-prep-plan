#!/usr/bin/env node
"use strict";
// 🚀 Competitive Programming Performance CLI
// Main interface for tracking performance and running tests
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDay3TestSuite = exports.createDay2TestSuite = exports.createDay1TestSuite = exports.testRunner = exports.dashboard = exports.performanceTracker = void 0;
const performance_tracker_1 = require("./performance-tracker");
Object.defineProperty(exports, "performanceTracker", { enumerable: true, get: function () { return performance_tracker_1.performanceTracker; } });
const dashboard_1 = require("./dashboard");
Object.defineProperty(exports, "dashboard", { enumerable: true, get: function () { return dashboard_1.dashboard; } });
const test_runner_1 = require("./test-runner");
Object.defineProperty(exports, "testRunner", { enumerable: true, get: function () { return test_runner_1.testRunner; } });
Object.defineProperty(exports, "createDay1TestSuite", { enumerable: true, get: function () { return test_runner_1.createDay1TestSuite; } });
Object.defineProperty(exports, "createDay2TestSuite", { enumerable: true, get: function () { return test_runner_1.createDay2TestSuite; } });
Object.defineProperty(exports, "createDay3TestSuite", { enumerable: true, get: function () { return test_runner_1.createDay3TestSuite; } });
// Main CLI functions
global.dashboard = () => {
    dashboard_1.dashboard.showDashboard();
};
global.runTests = async () => {
    console.log('🏃 Running all test suites...\n');
    const day1Suite = (0, test_runner_1.createDay1TestSuite)();
    const day2Suite = (0, test_runner_1.createDay2TestSuite)();
    const day3Suite = (0, test_runner_1.createDay3TestSuite)();
    const allSuites = [...day1Suite, ...day2Suite, ...day3Suite];
    await test_runner_1.testRunner.runSuite(allSuites);
    console.log('\n📊 Updated performance data available. Run dashboard() to see results!');
};
global.testDay = async (day) => {
    let suites;
    switch (day) {
        case 1:
            suites = (0, test_runner_1.createDay1TestSuite)();
            break;
        case 2:
            suites = (0, test_runner_1.createDay2TestSuite)();
            break;
        case 3:
            suites = (0, test_runner_1.createDay3TestSuite)();
            break;
        default:
            console.log('❌ Invalid day. Use 1, 2, or 3.');
            return;
    }
    console.log(`🏃 Running Day ${day} test suite...\n`);
    await test_runner_1.testRunner.runSuite(suites);
    console.log('\n📊 Run dashboard() to see updated results!');
};
global.setGoals = (timePerProblem, successRate, dailyGoal) => {
    if (timePerProblem === undefined && successRate === undefined && dailyGoal === undefined) {
        console.log('🎯 Current Goals:');
        const data = performance_tracker_1.performanceTracker.getData();
        console.log(`   ⏱️ Time per problem: ${(data.goals.targetTimePerProblem / 1000 / 60).toFixed(1)} minutes`);
        console.log(`   📊 Success rate: ${(data.goals.targetSuccessRate * 100).toFixed(1)}%`);
        console.log(`   📚 Daily problems: ${data.goals.dailyProblemGoal} problems/day`);
        console.log('\nTo update: setGoals(timeInMinutes, successRate0to1, dailyProblems)');
        console.log('Example: setGoals(5, 0.8, 4) // 5 min/problem, 80% success, 4 problems/day');
        return;
    }
    const timeMs = timePerProblem ? timePerProblem * 60 * 1000 : undefined;
    performance_tracker_1.performanceTracker.setGoals(timeMs, successRate, dailyGoal);
};
global.clearData = () => {
    console.log('⚠️  This will clear all performance data. Type "yes" to confirm:');
    // For now, just clear it - in a real CLI you'd use readline for confirmation
    performance_tracker_1.performanceTracker.clearData();
};
global.showProgress = () => {
    dashboard_1.dashboard.showProgressChart();
};
global.showInsights = () => {
    dashboard_1.dashboard.showInsights();
};
global.exportData = () => {
    dashboard_1.dashboard.exportData();
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
        (0, test_runner_1.createDay1TestSuite)()[0], // Max in array
        (0, test_runner_1.createDay2TestSuite)()[1], // Palindrome
        (0, test_runner_1.createDay3TestSuite)()[0] // Character frequency
    ];
    await test_runner_1.testRunner.runSuite(sampleSuites);
    console.log('\n🎉 Quick start complete! Now run dashboard() to see your performance metrics.');
    console.log('💡 Try runTests() to practice all available problems.');
};
console.log('\n✨ Pro tip: Try quickStart() for a demo, or runTests() to start practicing!');
