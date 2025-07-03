// 🔹 Problem 1: Reverse Array In-Place

let test_array: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// rough work
// Reverse the array
// left (first index), right (length - 1 / last index)
// temp = left
// left = right
// right = temp
// right--
// left++
// while left < right

function reverseArrayWithPointers(array: number[]): number[] {
    
    // if (array = undefined) return Error("Array is undefined")

    // Left and right are indexes not the values so treat them as indexes
    let left = 0;
    let right = array.length - 1;
    
    while (left < right) {
        let temp = array[left];
        array[left] = array[right];
        array[right] = temp;

        left++;
        right--;
    }

    return array;
}

console.log(reverseArrayWithPointers(test_array));



// 🔹 Problem 2: Is Palindrome?

// Input: "madam"
// Output: true

// Input: "hello"
// Output: false

function isPalindrome(str: string): boolean {
    let reverseString: string = str.split('').reverse().join('');
    return (reverseString === str) ? true : false;
}

console.log(isPalindrome("hello"));
console.log(isPalindrome("madam"));



// using the pointer approach

function check_isPalindrome(str: string): boolean {
    let left = 0;
    let right = str.length;

    while (left < right) {
        if (str[left] !== str[right]) {
            return false;
        }

        left++;
        right--;
    }

    return true;
}

console.log(check_isPalindrome("hello"));
console.log(check_isPalindrome("madam"));



// 🔹 Problem 3: Two Sum (Sorted Array)

// Input: arr = [1, 2, 4, 6, 10], target = 8
// Output: [1, 3] // 2 + 6

function twoSumSorted(arr: number[], target: number): [number, number] | [] {
    let left = 0;
    let right = arr.length - 1;

    while (left < right) {
        if (arr[left] + arr[right] === target) {
            return [left, right];
        }

        left++;
        right--;
    }

    return [];
}

console.log(twoSumSorted([1, 2, 4, 6, 10], 11));



// 🔹 Bonus (Optional): Move Zeroes to End

// Input: [0, 1, 0, 3, 12]
// Output: [1, 3, 12, 0, 0]

function moveZeroes(arr: number[]): number[] {
    let nonZeroIndex = 0;

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] !== 0) {
            [arr[nonZeroIndex], arr[i]] = [arr[i], arr[nonZeroIndex]];
            nonZeroIndex++;
        }
    }

    console.log(arr);
    return arr;
}

console.log(moveZeroes([0, 1, 0, 3, 12]));
