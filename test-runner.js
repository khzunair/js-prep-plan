"use strict";
// 🧪 Test Runner with Performance Tracking
// Validates solutions and tracks timing for competitive programming problems
Object.defineProperty(exports, "__esModule", { value: true });
exports.testRunner = exports.TestRunner = void 0;
exports.createDay1TestSuite = createDay1TestSuite;
exports.createDay2TestSuite = createDay2TestSuite;
exports.createDay3TestSuite = createDay3TestSuite;
const performance_tracker_1 = require("./performance-tracker");
class TestRunner {
    // Run a single problem with performance tracking
    async runProblem(suite) {
        console.log(`\n🧪 Testing: ${suite.name} (Day ${suite.day})`);
        console.log('─'.repeat(50));
        // Start performance tracking
        performance_tracker_1.performanceTracker.startProblem(suite.problemId, suite.day, suite.name);
        let passed = 0;
        let total = suite.testCases.length;
        let attempts = 1;
        try {
            for (let i = 0; i < suite.testCases.length; i++) {
                const testCase = suite.testCases[i];
                const result = this.runTestCase(suite.solution, testCase, i + 1);
                if (result)
                    passed++;
            }
        }
        catch (error) {
            console.error(`❌ Error running ${suite.name}:`, error);
            attempts++;
        }
        const success = passed === total;
        const result = performance_tracker_1.performanceTracker.endProblem(success, attempts);
        console.log(`\n📊 Result: ${passed}/${total} tests passed`);
        if (result) {
            console.log(`⏱️ Time: ${(0, performance_tracker_1.formatDuration)(result.duration)}`);
        }
        return success;
    }
    // Run a single test case
    runTestCase(solution, testCase, caseNumber) {
        try {
            const result = Array.isArray(testCase.input)
                ? solution(...testCase.input)
                : solution(testCase.input);
            const passed = this.deepEqual(result, testCase.expected);
            console.log(`  Test ${caseNumber}: ${passed ? '✅ PASS' : '❌ FAIL'}`);
            if (testCase.description) {
                console.log(`    ${testCase.description}`);
            }
            if (!passed) {
                console.log(`    Expected: ${JSON.stringify(testCase.expected)}`);
                console.log(`    Got:      ${JSON.stringify(result)}`);
            }
            return passed;
        }
        catch (error) {
            console.log(`  Test ${caseNumber}: ❌ ERROR`);
            console.log(`    ${error}`);
            return false;
        }
    }
    // Deep equality check for test results
    deepEqual(a, b) {
        if (a === b)
            return true;
        if (Array.isArray(a) && Array.isArray(b)) {
            if (a.length !== b.length)
                return false;
            return a.every((val, index) => this.deepEqual(val, b[index]));
        }
        if (typeof a === 'object' && typeof b === 'object' && a !== null && b !== null) {
            const keysA = Object.keys(a);
            const keysB = Object.keys(b);
            if (keysA.length !== keysB.length)
                return false;
            return keysA.every(key => this.deepEqual(a[key], b[key]));
        }
        return false;
    }
    // Run multiple problem suites
    async runSuite(suites) {
        console.log('🚀 Starting Competitive Programming Test Suite');
        console.log('='.repeat(60));
        let totalPassed = 0;
        const startTime = Date.now();
        for (const suite of suites) {
            const passed = await this.runProblem(suite);
            if (passed)
                totalPassed++;
            // Add small delay between problems
            await new Promise(resolve => setTimeout(resolve, 100));
        }
        const totalTime = Date.now() - startTime;
        console.log('\n🏆 Test Suite Complete');
        console.log('='.repeat(60));
        console.log(`✅ Problems Solved: ${totalPassed}/${suites.length}`);
        console.log(`⏱️ Total Time: ${(0, performance_tracker_1.formatDuration)(totalTime)}`);
        console.log(`📈 Success Rate: ${(totalPassed / suites.length * 100).toFixed(1)}%`);
    }
}
exports.TestRunner = TestRunner;
// Create test suites for existing problems
function createDay1TestSuite() {
    return [
        {
            problemId: 'day1-max-array',
            day: 1,
            name: 'Find Maximum in Array',
            solution: (arr) => {
                let maximum = arr[0];
                for (const item of arr) {
                    if (item > maximum) {
                        maximum = item;
                    }
                }
                return maximum;
            },
            testCases: [
                { input: [[1, 2, 3, 45, 21, 12, -2]], expected: 45, description: 'Standard array' },
                { input: [[-5, -2, -10, -1]], expected: -1, description: 'All negative numbers' },
                { input: [[100]], expected: 100, description: 'Single element' },
                { input: [[5, 5, 5, 5]], expected: 5, description: 'All same elements' }
            ]
        },
        {
            problemId: 'day1-reverse-string',
            day: 1,
            name: 'Reverse String',
            solution: (str) => str.split('').reverse().join(''),
            testCases: [
                { input: 'zunair', expected: 'rianuz', description: 'Basic string' },
                { input: 'hello', expected: 'olleh', description: 'Another string' },
                { input: 'a', expected: 'a', description: 'Single character' },
                { input: '', expected: '', description: 'Empty string' },
                { input: 'racecar', expected: 'racecar', description: 'Palindrome' }
            ]
        },
        {
            problemId: 'day1-first-unique',
            day: 1,
            name: 'First Unique Character',
            solution: (str) => {
                const freq = {};
                for (const char of str) {
                    freq[char] = (freq[char] || 0) + 1;
                }
                for (const char of str) {
                    if (freq[char] === 1) {
                        return char;
                    }
                }
                return '_';
            },
            testCases: [
                { input: 'aabbccddeeffg', expected: 'g', description: 'Standard case' },
                { input: 'aabbcc', expected: '_', description: 'No unique character' },
                { input: 'abcdef', expected: 'a', description: 'All unique' },
                { input: 'programming', expected: 'p', description: 'Programming example' }
            ]
        }
    ];
}
function createDay2TestSuite() {
    return [
        {
            problemId: 'day2-reverse-array',
            day: 2,
            name: 'Reverse Array In-Place',
            solution: (arr) => {
                let left = 0;
                let right = arr.length - 1;
                while (left < right) {
                    [arr[left], arr[right]] = [arr[right], arr[left]];
                    left++;
                    right--;
                }
                return arr;
            },
            testCases: [
                { input: [[1, 2, 3, 4, 5]], expected: [5, 4, 3, 2, 1], description: 'Odd length array' },
                { input: [[1, 2, 3, 4]], expected: [4, 3, 2, 1], description: 'Even length array' },
                { input: [[42]], expected: [42], description: 'Single element' },
                { input: [[-1, -2, -3]], expected: [-3, -2, -1], description: 'Negative numbers' }
            ]
        },
        {
            problemId: 'day2-palindrome',
            day: 2,
            name: 'Is Palindrome',
            solution: (str) => {
                const reversed = str.split('').reverse().join('');
                return reversed === str;
            },
            testCases: [
                { input: 'madam', expected: true, description: 'Classic palindrome' },
                { input: 'hello', expected: false, description: 'Not a palindrome' },
                { input: 'racecar', expected: true, description: 'Another palindrome' },
                { input: 'a', expected: true, description: 'Single character' },
                { input: '', expected: true, description: 'Empty string' }
            ]
        },
        {
            problemId: 'day2-two-sum',
            day: 2,
            name: 'Two Sum (Sorted Array)',
            solution: (arr, target) => {
                let left = 0;
                let right = arr.length - 1;
                while (left < right) {
                    const sum = arr[left] + arr[right];
                    if (sum === target) {
                        return [left, right];
                    }
                    else if (sum < target) {
                        left++;
                    }
                    else {
                        right--;
                    }
                }
                return [];
            },
            testCases: [
                { input: [[1, 2, 4, 6, 10], 8], expected: [1, 3], description: '2 + 6 = 8' },
                { input: [[1, 2, 4, 6, 10], 11], expected: [0, 4], description: '1 + 10 = 11' },
                { input: [[1, 3, 5, 7], 10], expected: [1, 3], description: '3 + 7 = 10' },
                { input: [[1, 2, 3], 7], expected: [], description: 'No solution' }
            ]
        }
    ];
}
function createDay3TestSuite() {
    return [
        {
            problemId: 'day3-char-frequency',
            day: 3,
            name: 'Character Frequency Counter',
            solution: (str) => {
                str = str.toLowerCase();
                const freq = {};
                for (const char of str) {
                    freq[char] = (freq[char] || 0) + 1;
                }
                return freq;
            },
            testCases: [
                { input: 'Hello', expected: { h: 1, e: 1, l: 2, o: 1 }, description: 'Basic case' },
                { input: 'Programming', expected: { p: 1, r: 2, o: 1, g: 2, a: 1, m: 2, i: 1, n: 1 }, description: 'Repeated letters' },
                { input: 'aaa', expected: { a: 3 }, description: 'All same letter' },
                { input: '', expected: {}, description: 'Empty string' }
            ]
        },
        {
            problemId: 'day3-anagrams',
            day: 3,
            name: 'Are Anagrams',
            solution: (str1, str2) => {
                const getFreq = (s) => {
                    s = s.toLowerCase();
                    const freq = {};
                    for (const char of s) {
                        freq[char] = (freq[char] || 0) + 1;
                    }
                    return freq;
                };
                const freq1 = getFreq(str1);
                const freq2 = getFreq(str2);
                const keys1 = Object.keys(freq1).sort();
                const keys2 = Object.keys(freq2).sort();
                if (keys1.length !== keys2.length)
                    return false;
                for (let i = 0; i < keys1.length; i++) {
                    if (keys1[i] !== keys2[i] || freq1[keys1[i]] !== freq2[keys2[i]]) {
                        return false;
                    }
                }
                return true;
            },
            testCases: [
                { input: ['listen', 'silent'], expected: true, description: 'Classic anagram' },
                { input: ['hello', 'world'], expected: false, description: 'Not anagrams' },
                { input: ['evil', 'vile'], expected: true, description: 'Another anagram' },
                { input: ['', ''], expected: true, description: 'Empty strings' }
            ]
        },
        {
            problemId: 'day3-count-vowels',
            day: 3,
            name: 'Count Vowels',
            solution: (str) => {
                const vowels = new Set(['a', 'e', 'i', 'o', 'u']);
                let count = 0;
                for (const char of str.toLowerCase()) {
                    if (vowels.has(char)) {
                        count++;
                    }
                }
                return count;
            },
            testCases: [
                { input: 'Zunair', expected: 3, description: 'u, a, i' },
                { input: 'HELLO', expected: 2, description: 'e, o' },
                { input: 'bcdfg', expected: 0, description: 'No vowels' },
                { input: 'aeiou', expected: 5, description: 'All vowels' }
            ]
        }
    ];
}
// Export test runner instance
exports.testRunner = new TestRunner();
