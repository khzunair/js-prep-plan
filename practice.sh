#!/bin/bash

# 🏆 Competitive Programming Performance Tracker
# Quick access script for performance tracking

echo "🚀 Competitive Programming Performance Tracker"
echo "=============================================="

case "$1" in
    "dashboard"|"d")
        echo "📊 Loading dashboard..."
        node -e "require('./performance-cli.js'); dashboard()"
        ;;
    "test"|"t")
        echo "🏃 Running all tests..."
        node -e "require('./performance-cli.js'); runTests()"
        ;;
    "day1"|"day2"|"day3")
        DAY=${1:3:1}
        echo "📚 Testing Day $DAY..."
        node -e "require('./performance-cli.js'); testDay($DAY)"
        ;;
    "quick"|"q")
        echo "⚡ Quick start demo..."
        node -e "require('./performance-cli.js'); quickStart()"
        ;;
    "goals"|"g")
        echo "🎯 Current goals..."
        node -e "require('./performance-cli.js'); setGoals()"
        ;;
    "progress"|"p")
        echo "📈 Progress chart..."
        node -e "require('./performance-cli.js'); showProgress()"
        ;;
    "insights"|"i")
        echo "🧠 Performance insights..."
        node -e "require('./performance-cli.js'); showInsights()"
        ;;
    "clear")
        echo "🗑️ Clearing performance data..."
        node -e "require('./performance-cli.js'); clearData()"
        ;;
    *)
        echo "Usage: $0 {dashboard|test|day1|day2|day3|quick|goals|progress|insights|clear}"
        echo ""
        echo "Commands:"
        echo "  dashboard (d)  - Show performance dashboard"
        echo "  test (t)       - Run all problem tests"
        echo "  day1/day2/day3 - Test specific day"
        echo "  quick (q)      - Quick demo"
        echo "  goals (g)      - View/set goals"
        echo "  progress (p)   - Show progress chart"
        echo "  insights (i)   - Get insights"
        echo "  clear          - Clear all data"
        echo ""
        echo "Examples:"
        echo "  $0 dashboard   # Show dashboard"
        echo "  $0 test        # Practice all problems"
        echo "  $0 day1        # Practice Day 1 only"
        echo "  $0 quick       # Quick demo"
        ;;
esac