# 🚀 TypeScript Competitive Programming Journey

Welcome to my 15-day TypeScript-based Competitive Programming Practice repo.  
Each day contains 2–4 core problems, solved in both `.ts` and `.js` for learning and compatibility.

## 🏆 NEW: Performance Tracking System

This repository now includes a comprehensive performance tracking system to help you become a competitive programmer!

### 🎯 Features:
- ⏱️ **Automatic timing** for all problem-solving sessions
- 📊 **Success rate tracking** and improvement trends
- 🏃 **Goal setting** for time, accuracy, and daily practice
- 📈 **Progress visualization** and detailed analytics
- 🧠 **AI insights** for personalized improvement recommendations
- 📅 **Daily progress breakdown** by topic

### 🚀 Quick Start:
```bash
# Run the performance tracker
node performance-cli.js

# Quick demo (3 sample problems)
quickStart()

# View your dashboard
dashboard()

# Practice all problems with timing
runTests()

# Test specific day
testDay(1)  # or testDay(2), testDay(3)

# Set your goals
setGoals(5, 0.8, 4)  # 5 min/problem, 80% success, 4 problems/day
```

### 📊 What Gets Tracked:
- Time taken for each problem
- Success/failure rates
- Daily progress and streaks
- Improvement trends over time
- Areas needing more practice

---

## 📁 Folder Structure

📦/  
├── 📂 day1  
│ ├── day1.ts // TypeScript version (source code)  
│ └── day1.js // Transpiled JavaScript version (compiled)  
├── 📂 day2  
│ ├── day2.ts  
│ └── day2.js  
├── 📂 day3  
│ ├── day3.ts  
│ └── day3.js  
├── tsconfig.json  
├── package.json  
└── README.md  

---

## 🧠 Day-by-Day Problem Breakdown

### 📅 Day 1: JavaScript & TypeScript Basics

| Problem | Description |
|--------|-------------|
| ✅ Max in Array | Finds the largest number in an array |
| ✅ Reverse String | Reverses a given string |
| ✅ First Unique Character | Finds the first non-repeating character in a string |

### 📅 Day 2: Two Pointers & Array Manipulation

| Problem | Description |
|--------|-------------|
| ✅ Reverse Array In-place | Swaps elements using two-pointer technique |
| ✅ Is Palindrome | Checks if a string reads the same backward |
| ✅ Two Sum (Sorted Array) | Finds indices of two numbers that sum to a target |
| ✅ Move Zeroes | Moves all 0s to the end while preserving order |

### 📅 Day 3: Maps, Strings & Frequency Logic

| Problem | Description |
|--------|-------------|
| ✅ Character Frequency Counter | Returns count of each character in a string |
| ✅ Are Anagrams? | Compares character frequency maps |
| ✅ Count Vowels | Counts all vowels in a string |
| 🟡 (Optional) Longest Word in Sentence | Bonus word-processing practice |

---

## 🛠️ How to Run the Code

### ▶️ Online (No Setup Needed)

Use: [Programiz TypeScript Compiler](https://www.programiz.com/typescript/online-compiler)  
Paste contents of `.ts` files and run.

---

### 💻 Run Locally (VS Code Recommended)

1. Compile the TypeScript:
```bash
tsc day1/day1.ts
node day1/day1.js
