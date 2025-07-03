// let fruits: string[] = ["apple", "banana", "orange"];
// let scores: number[] = [85, 90, 78];


// console.log(fruits[0]); // "apple"

// fruits[1] = "mango";
// console.log(fruits); // ["apple", "mango", "orange"]


// fruits.push("grapes");

// fruits.pop(); // removes "grapes"

// fruits.unshift("kiwi");

// console.log(fruits)

// fruits.shift();

// console.log(fruits); // ["mango", "orange"]

// // Remove 1 element at index 1
// fruits.splice(1, 1);
// console.log(fruits); // ["mango"]

// // Insert at index 1
// fruits.splice(1, 0, "lemon");


// const newFruits = fruits.slice(0, 2); // First two items
// console.log(newFruits); // ["mango", "lemon"]


// fruits.sort();
// console.log(fruits); // ["lemon", "mango"]

// fruits.reverse();
// console.log(fruits); // ["mango", "lemon"]

// fruits.forEach((fruitItem, index)=>{
//     console.log(`Index: ${index}, Fruit: ${fruitItem}`);
// })



// let lengths: number[] = fruits.map(fruit => fruit.length);
// console.log(lengths); // [5, 6] (lengths of "mango" and "lemon")


// let longFruits = fruits.filter(fruit => fruit.length > 5);
// console.log(longFruits); // ["lemon"] (only "lemon" has length > 5)


// let total: number = scores.reduce((sum, score) => sum + score, 0);
// let average: number = total / scores.length;
// console.log(`Total: ${total}, Average: ${average}`); // Total: 253, Average: 84.33333333333333


// let scorez: number[] = [85, 90, 78];
// let IKnow: number = scorez.reduce((IKnow,score )=> IKnow*score, 0);
// console.log(`Product of scores: ${IKnow}`); // Product of scores: 600300

// let uniQueCalculationThatIKnow: number = scorez.reduce((uniQueCalculationThatIKnow,score )=> IKnow*score, 0);
// console.log(`Product of scores: ${IKnow}`); // Product of scores: 600300


// const arrayOfNumbers: number[] =[1,2,3,22,43,53,423,43,22,31,44,90]
// // sum fo array  number of even numbers
// const sumOfArray: number = arrayOfNumbers.reduce((sum, num) => sum + num, 0);
// const evenNumbers: number[] = arrayOfNumbers.filter(num => num % 2 === 0);


// let studentScore: number[] = [90,29,50,20,87,83,77];
// let averageScore: number = studentScore.reduce((sum, score) => sum + score, 0) / studentScore.length;
// let maxScore: number = Math.max(...studentScore);
// let minScore: number = Math.min(...studentScore);
// let sortedScores: number[] = [...studentScore].sort((a, b) => a - b);
// let topThreeScores: number[] = sortedScores.slice(-3).reverse();

// console.log(averageScore)



// const firstNamey: string = "Zunair";

// function greete(name: string):string {
//     return `Hello, ${name}!`;
// }

// const greetMesage  = (message: string): string=> {
//     return `Hello, ${message}!`;

// }


// console.log(greete(firstNamey))  // "Hello, Zunair!"

// console.log("first day of typescript is done");




// Map/Object Frequency in TS
// This function takes a string and returns a frequency map of its characters
// Example: "hello" -> { 'h': 1, 'e': 1, 'l': 2, 'o': 1 }


// function getFrequencyMap(str: string): Record<string, number> {
//   const map: Record<string, number> = {};
//   for (const char of str) {
//     map[char] = (map[char] || 0) + 1;
//   }
//   return map;
// }

// // Example usage
// const inputString = "hello";
// const frequencyMap = getFrequencyMap(inputString);



// let studentScore: number[] = [90,29,50,20,87,898, 83,77];



// const maxFinder = (param_array: number[]): number =>{
//         let max: number = studentScore[0];
        
//     for(const item of param_array){
//     if(item > max){
//         max = item
//     };
// }
//  return max;   
// }


// console.log(maxFinder(studentScore));


// // Reverse String
// let test = "TypeScript";

// // Reverse this string

// function reverseString(str: string): string {
//     return str.split('').reverse().join('')
// }


// console.log(reverseString(test))


// First Non-Repeating Character


// Problem 1: Find Maximum in Array

// Input: [1, 5, 3, 9, 2]
// Output: 9

function findMaximumOfArray(arr: number[]){
    let maximum = arr[0];
    for(const item of arr){
       if(item > maximum){
         maximum = item;  
       } 
    }
    return maximum;
}


let arraytest: number[] = [1,2,3,45,21,12,-2];
console.log(findMaximumOfArray(arraytest));


// 🔸 Problem 2: Reverse a String
// Input: "zunair"
// Output: "rianuz"

function reverseString(str: string): string {
    return str.split('').reverse().join('')
}

console.log(reverseString("zunair"))


// 🔸 Problem 3: First Non-Repeating Character
function firstUniqueChar(str: string): string {
  const freq: Record<string, number> = {};

  for (const char of str) {
    if (freq[char] !== undefined) {
      freq[char] += 1;
    } else {
      freq[char] = 1;
    }
  }

  console.log(freq); // Debugging line to see frequency map

  for (const char of str) {
    if (freq[char] === 1) return char;
  }

  return "_"; // if no unique character found
}

console.log(firstUniqueChar("aabbccddeeffg")); // Output: g
console.log(firstUniqueChar("aabbcc"));        // Output: _
