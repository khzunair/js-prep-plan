// 📊 Performance Dashboard for Competitive Programming
// Displays progress, analytics, and insights

import { performanceTracker, formatDuration, PerformanceData, ProblemResult, DayStats } from './performance-tracker';

export class PerformanceDashboard {
    private data: PerformanceData;

    constructor() {
        this.data = performanceTracker.getData();
    }

    // Refresh data from tracker
    private refreshData(): void {
        this.data = performanceTracker.getData();
    }

    // Display overall performance summary
    showOverallStats(): void {
        this.refreshData();
        const stats = this.data.overallStats;
        
        console.log('\n🏆 OVERALL PERFORMANCE SUMMARY');
        console.log('='.repeat(50));
        console.log(`📈 Total Problems Attempted: ${stats.totalProblems}`);
        console.log(`✅ Problems Solved: ${stats.totalSolved}`);
        console.log(`📊 Success Rate: ${stats.totalProblems > 0 ? (stats.totalSolved / stats.totalProblems * 100).toFixed(1) : 0}%`);
        
        if (stats.totalProblems > 0) {
            console.log(`⏱️ Average Time: ${formatDuration(stats.averageTime)}`);
            console.log(`🏃 Best Time: ${formatDuration(stats.bestTime)}`);
            console.log(`🐌 Worst Time: ${formatDuration(stats.worstTime)}`);
            
            // Improvement trend
            if (stats.improvementTrend !== 0) {
                const trend = stats.improvementTrend > 0 ? '📈 Improving' : '📉 Needs work';
                const change = Math.abs(stats.improvementTrend / 1000).toFixed(1);
                console.log(`🎯 Trend: ${trend} (${change}s ${stats.improvementTrend > 0 ? 'faster' : 'slower'})`);
            }
        }
    }

    // Display progress by day
    showDayBreakdown(): void {
        this.refreshData();
        
        console.log('\n📅 DAILY PROGRESS BREAKDOWN');
        console.log('='.repeat(50));
        
        if (this.data.dayStats.length === 0) {
            console.log('   No progress data available yet.');
            return;
        }

        this.data.dayStats.forEach(day => {
            console.log(`\n📚 Day ${day.day}:`);
            console.log(`   Problems: ${day.solvedProblems}/${day.totalProblems} solved`);
            console.log(`   Success Rate: ${(day.successRate * 100).toFixed(1)}%`);
            console.log(`   Average Time: ${formatDuration(day.averageTime)}`);
            console.log(`   Total Time: ${formatDuration(day.totalTime)}`);
            
            // Performance indicator
            const indicator = day.successRate >= 0.8 ? '🟢' : day.successRate >= 0.6 ? '🟡' : '🔴';
            console.log(`   Performance: ${indicator}`);
        });
    }

    // Show recent activity
    showRecentActivity(count: number = 5): void {
        this.refreshData();
        const recent = this.data.results.slice(-count);
        
        console.log(`\n⚡ RECENT ACTIVITY (Last ${count})`);
        console.log('='.repeat(50));
        
        if (recent.length === 0) {
            console.log('   No recent activity.');
            return;
        }

        recent.forEach((result, index) => {
            const status = result.passed ? '✅' : '❌';
            const timeAgo = this.getTimeAgo(new Date(result.timestamp));
            
            console.log(`${recent.length - index}. ${status} ${result.problemName} (Day ${result.day})`);
            console.log(`   Time: ${formatDuration(result.duration)} | ${timeAgo}`);
            if (result.attempts > 1) {
                console.log(`   Attempts: ${result.attempts}`);
            }
        });
    }

    // Show goals progress
    showGoalsProgress(): void {
        this.refreshData();
        const goals = this.data.goals;
        const stats = this.data.overallStats;
        
        console.log('\n🎯 GOALS PROGRESS');
        console.log('='.repeat(50));
        
        // Time goal
        if (stats.totalProblems > 0) {
            const avgTimeVsGoal = stats.averageTime <= goals.targetTimePerProblem;
            const timeStatus = avgTimeVsGoal ? '✅' : '❌';
            console.log(`${timeStatus} Average Time Goal: ${formatDuration(stats.averageTime)} / ${formatDuration(goals.targetTimePerProblem)}`);
        } else {
            console.log(`⏱️ Average Time Goal: - / ${formatDuration(goals.targetTimePerProblem)}`);
        }
        
        // Success rate goal
        if (stats.totalProblems > 0) {
            const successRate = stats.totalSolved / stats.totalProblems;
            const successVsGoal = successRate >= goals.targetSuccessRate;
            const successStatus = successVsGoal ? '✅' : '❌';
            console.log(`${successStatus} Success Rate Goal: ${(successRate * 100).toFixed(1)}% / ${(goals.targetSuccessRate * 100).toFixed(1)}%`);
        } else {
            console.log(`📊 Success Rate Goal: - / ${(goals.targetSuccessRate * 100).toFixed(1)}%`);
        }
        
        // Daily problems goal (check today)
        const today = new Date().toDateString();
        const todayResults = this.data.results.filter(r => new Date(r.timestamp).toDateString() === today);
        const dailyStatus = todayResults.length >= goals.dailyProblemGoal ? '✅' : '❌';
        console.log(`${dailyStatus} Daily Problems Goal: ${todayResults.length} / ${goals.dailyProblemGoal} problems today`);
    }

    // Show performance insights and recommendations
    showInsights(): void {
        this.refreshData();
        
        console.log('\n🧠 PERFORMANCE INSIGHTS');
        console.log('='.repeat(50));
        
        const insights = this.generateInsights();
        
        if (insights.length === 0) {
            console.log('   Complete more problems to get personalized insights!');
            return;
        }
        
        insights.forEach((insight, index) => {
            console.log(`${index + 1}. ${insight}`);
        });
    }

    // Generate performance insights
    private generateInsights(): string[] {
        const insights: string[] = [];
        const stats = this.data.overallStats;
        const goals = this.data.goals;
        
        if (this.data.results.length < 3) {
            insights.push('💡 Complete more problems to unlock detailed insights!');
            return insights;
        }
        
        // Success rate insights
        const successRate = stats.totalSolved / stats.totalProblems;
        if (successRate < 0.5) {
            insights.push('🎯 Focus on accuracy - consider reviewing problem solutions before timing yourself');
        } else if (successRate > 0.9) {
            insights.push('🏆 Excellent accuracy! Try tackling harder problems to challenge yourself');
        }
        
        // Speed insights
        if (stats.averageTime > goals.targetTimePerProblem * 1.5) {
            insights.push('⏱️ Work on speed - practice similar problem patterns to build familiarity');
        } else if (stats.averageTime < goals.targetTimePerProblem * 0.5) {
            insights.push('🚀 Great speed! Consider tackling more complex algorithmic challenges');
        }
        
        // Improvement trend insights
        if (stats.improvementTrend > 0) {
            insights.push('📈 You\'re getting faster! Keep practicing consistently');
        } else if (stats.improvementTrend < -30000) { // 30 seconds slower
            insights.push('📉 Consider reviewing problem-solving strategies and taking breaks when stuck');
        }
        
        // Day-specific insights
        const dayStats = this.data.dayStats;
        if (dayStats.length > 1) {
            const hardestDay = dayStats.reduce((prev, curr) => prev.averageTime > curr.averageTime ? prev : curr);
            const easiestDay = dayStats.reduce((prev, curr) => prev.averageTime < curr.averageTime ? prev : curr);
            
            if (hardestDay.day !== easiestDay.day) {
                insights.push(`🔍 Day ${hardestDay.day} topics took longest - consider reviewing those concepts`);
            }
        }
        
        // Recent performance
        const recent = this.data.results.slice(-5);
        if (recent.length >= 5) {
            const recentFailures = recent.filter(r => !r.passed).length;
            if (recentFailures >= 3) {
                insights.push('💪 Take a break and review fundamentals - you might be rushing');
            }
        }
        
        return insights;
    }

    // Show complete dashboard
    showDashboard(): void {
        console.clear();
        console.log('🏆 COMPETITIVE PROGRAMMING PERFORMANCE DASHBOARD');
        console.log('='.repeat(60));
        
        this.showOverallStats();
        this.showGoalsProgress();
        this.showDayBreakdown();
        this.showRecentActivity();
        this.showInsights();
        
        console.log('\n' + '='.repeat(60));
        console.log('💡 Use the following commands:');
        console.log('   📊 dashboard() - Show this dashboard');
        console.log('   🏃 runTests() - Run practice problems');
        console.log('   🎯 setGoals() - Update your goals');
        console.log('   🧪 testDay(n) - Test specific day problems');
    }

    // Utility function to get human-readable time ago
    private getTimeAgo(date: Date): string {
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffMinutes = Math.floor(diffMs / (1000 * 60));
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        
        if (diffMinutes < 1) return 'just now';
        if (diffMinutes < 60) return `${diffMinutes}m ago`;
        if (diffHours < 24) return `${diffHours}h ago`;
        return `${diffDays}d ago`;
    }

    // Export performance data to console for analysis
    exportData(): void {
        this.refreshData();
        console.log('\n📋 PERFORMANCE DATA EXPORT');
        console.log('='.repeat(50));
        console.log(JSON.stringify(this.data, null, 2));
    }

    // Generate a simple progress chart
    showProgressChart(): void {
        this.refreshData();
        
        console.log('\n📈 PROGRESS CHART (Success Rate by Day)');
        console.log('='.repeat(50));
        
        if (this.data.dayStats.length === 0) {
            console.log('   No data to chart yet.');
            return;
        }
        
        this.data.dayStats.forEach(day => {
            const rate = day.successRate;
            const bar = '█'.repeat(Math.floor(rate * 20)) + '░'.repeat(20 - Math.floor(rate * 20));
            console.log(`Day ${day.day}: [${bar}] ${(rate * 100).toFixed(1)}%`);
        });
    }
}

// Export dashboard instance
export const dashboard = new PerformanceDashboard();