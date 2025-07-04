"use strict";
// 🏆 Performance Tracking System for Competitive Programming
// Tracks timing, success rates, and progress over time
Object.defineProperty(exports, "__esModule", { value: true });
exports.performanceTracker = exports.PerformanceTracker = void 0;
exports.formatDuration = formatDuration;
const fs = require('fs');
class PerformanceTracker {
    constructor(dataFilePath = './performance-data.json') {
        this.dataFilePath = dataFilePath;
        this.data = this.loadData();
    }
    // Load performance data from file or initialize new data
    loadData() {
        try {
            if (fs.existsSync(this.dataFilePath)) {
                return JSON.parse(fs.readFileSync(this.dataFilePath, 'utf8'));
            }
        }
        catch (error) {
            console.log('📊 Initializing new performance tracking data...');
        }
        return {
            results: [],
            dayStats: [],
            goals: {
                targetTimePerProblem: 300000, // 5 minutes default
                targetSuccessRate: 0.8, // 80% success rate
                dailyProblemGoal: 3
            },
            overallStats: {
                totalProblems: 0,
                totalSolved: 0,
                averageTime: 0,
                bestTime: Infinity,
                worstTime: 0,
                improvementTrend: 0
            }
        };
    }
    // Save performance data to file
    saveData() {
        try {
            fs.writeFileSync(this.dataFilePath, JSON.stringify(this.data, null, 2));
        }
        catch (error) {
            console.error('❌ Failed to save performance data:', error);
        }
    }
    // Start timing a problem
    startProblem(problemId, day, problemName) {
        const startTime = Date.now();
        console.log(`⏱️ Started "${problemName}" (Day ${day})`);
        // Store start time temporarily
        globalThis.currentProblem = {
            problemId,
            day,
            problemName,
            startTime,
            attempts: 1
        };
    }
    // End timing a problem and record result
    endProblem(passed, attempts = 1) {
        const currentProblem = globalThis.currentProblem;
        if (!currentProblem) {
            console.error('❌ No active problem to end');
            return null;
        }
        const endTime = Date.now();
        const duration = endTime - currentProblem.startTime;
        const result = {
            problemId: currentProblem.problemId,
            day: currentProblem.day,
            problemName: currentProblem.problemName,
            startTime: currentProblem.startTime,
            endTime: endTime,
            duration: duration,
            passed: passed,
            attempts: attempts,
            timestamp: new Date().toISOString()
        };
        this.addResult(result);
        // Clear current problem
        delete globalThis.currentProblem;
        return result;
    }
    // Add a problem result and update stats
    addResult(result) {
        this.data.results.push(result);
        this.updateStats();
        this.saveData();
        console.log(`✅ Problem "${result.problemName}" completed in ${(result.duration / 1000).toFixed(2)}s`);
        console.log(`   Status: ${result.passed ? '✅ PASSED' : '❌ FAILED'} | Attempts: ${result.attempts}`);
    }
    // Update overall and day statistics
    updateStats() {
        const results = this.data.results;
        // Update overall stats
        this.data.overallStats.totalProblems = results.length;
        this.data.overallStats.totalSolved = results.filter(r => r.passed).length;
        if (results.length > 0) {
            const times = results.map(r => r.duration);
            this.data.overallStats.averageTime = times.reduce((a, b) => a + b, 0) / times.length;
            this.data.overallStats.bestTime = Math.min(...times);
            this.data.overallStats.worstTime = Math.max(...times);
            // Calculate improvement trend (last 5 vs previous 5)
            if (results.length >= 10) {
                const recent = results.slice(-5).map(r => r.duration);
                const previous = results.slice(-10, -5).map(r => r.duration);
                const recentAvg = recent.reduce((a, b) => a + b, 0) / recent.length;
                const previousAvg = previous.reduce((a, b) => a + b, 0) / previous.length;
                this.data.overallStats.improvementTrend = previousAvg - recentAvg; // positive = getting faster
            }
        }
        // Update day stats
        this.updateDayStats();
    }
    // Update statistics for each day
    updateDayStats() {
        const dayGroups = this.groupResultsByDay();
        this.data.dayStats = [];
        for (const [day, results] of dayGroups) {
            const totalProblems = results.length;
            const solvedProblems = results.filter(r => r.passed).length;
            const totalTime = results.reduce((sum, r) => sum + r.duration, 0);
            const averageTime = totalProblems > 0 ? totalTime / totalProblems : 0;
            const successRate = totalProblems > 0 ? solvedProblems / totalProblems : 0;
            this.data.dayStats.push({
                day: day,
                totalProblems,
                solvedProblems,
                averageTime,
                successRate,
                totalTime
            });
        }
    }
    // Group results by day
    groupResultsByDay() {
        const groups = new Map();
        for (const result of this.data.results) {
            if (!groups.has(result.day)) {
                groups.set(result.day, []);
            }
            groups.get(result.day).push(result);
        }
        return groups;
    }
    // Get performance data
    getData() {
        return this.data;
    }
    // Update goals
    setGoals(targetTimePerProblem, targetSuccessRate, dailyProblemGoal) {
        if (targetTimePerProblem !== undefined) {
            this.data.goals.targetTimePerProblem = targetTimePerProblem;
        }
        if (targetSuccessRate !== undefined) {
            this.data.goals.targetSuccessRate = targetSuccessRate;
        }
        if (dailyProblemGoal !== undefined) {
            this.data.goals.dailyProblemGoal = dailyProblemGoal;
        }
        this.saveData();
        console.log('🎯 Goals updated successfully!');
    }
    // Get recent results
    getRecentResults(count = 10) {
        return this.data.results.slice(-count);
    }
    // Clear all data (for testing or reset)
    clearData() {
        this.data = {
            results: [],
            dayStats: [],
            goals: this.data.goals, // Keep goals
            overallStats: {
                totalProblems: 0,
                totalSolved: 0,
                averageTime: 0,
                bestTime: Infinity,
                worstTime: 0,
                improvementTrend: 0
            }
        };
        this.saveData();
        console.log('🔄 Performance data cleared!');
    }
}
exports.PerformanceTracker = PerformanceTracker;
// Utility function to format duration
function formatDuration(ms) {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    if (minutes > 0) {
        return `${minutes}m ${remainingSeconds}s`;
    }
    return `${remainingSeconds}s`;
}
// Export singleton instance
exports.performanceTracker = new PerformanceTracker();
