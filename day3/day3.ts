// 📌 Concept 1: Character Frequency with Record<string, number>

// syntax
// const freq: Record<string, number> = {};

// let str: string = "zunairZ"

// // Want to ignore casing?
// str = str.toLowerCase();

// const freq: Record<string, number> = {};

// for (const char of str){
//     freq[char] = (freq[char] || 0) +1;
// }

// console.log(freq)


// 🔹 Function: getCharFrequency
// Counts the number of occurrences of each character in the input string.
// function getCharFrequency(str: string): Record<string, number>
const getFrequenciesOfEachCharcter =(str: string): Record<string, number> =>{
    str = str.toLowerCase();
    const freq: Record<string, number> = {};
    
    for (const char of str){
        freq[char] = (freq[char] || 0) +1;
    }

    return freq; 
}
    


console.log(getFrequenciesOfEachCharcter("zunaira"))

/**
 * Problem 1: Character Frequency Counter
 * ---------------------------------------
 * Given a string `str`, return an object that maps each character 
 * to its number of occurrences in the string.
 * 
 * The result should be case-insensitive.
 * 
 * Example:
 * Input: "Hello"
 * Output: { h: 1, e: 1, l: 2, o: 1 }
 * 
 * Constraints:
 * - Only letters (a-z or A-Z), spaces and punctuation can appear
 * - You should count every character including space and symbols
 */

function getCharFrequency(testString: string): Record<string, number> {

  testString = testString.toLowerCase();
  
  const frequency: Record<string, number> = {};
  
  for(let item of testString){
      frequency[item] = (frequency[item] || 0) + 1;
  }
  
  return frequency;
}

// 🔍 Test Cases
console.log(getCharFrequency("MProgramming"))
console.log(getCharFrequency("Hello"));     
// // { h:1, e:1, l:2, o:1 }
console.log(getCharFrequency("Zunair Z"));  
// // { z:2, u:1, n:1, a:1, i:1, r:1, ' ':1 }
                                                                                               


/**
 * Problem 2: Check If Two Strings Are Anagrams
 * ---------------------------------------------
 * Two strings are anagrams if they contain the same characters
 * in the same frequency, regardless of order or case.
 * 
 * Example:
 * Input: "Listen", "Silent"
 * Output: true
 * 
 * Input: "Hello", "Olelh"
 * Output: true
 * 
 * Input: "Test", "Taste"
 * Output: false
 */


// I compare anagrams by creating frequency maps for both strings. Instead of relying on JSON.stringify(), which is order-sensitive, I loop through each key and check that the value is the same in both maps. This ensures a logical comparison and avoids hidden bugs due to key order.
function areAnagrams(str1: string, str2: string): boolean {
  const freq1 = getCharFrequency(str1);
  const freq2 = getCharFrequency(str2);

  // Step 1: Check if number of keys is different
  if (Object.keys(freq1).length !== Object.keys(freq2).length) {
    return false;
  }

  // Step 2: Check each key and value
  for (const key in freq1) {

    if (freq1[key] !== freq2[key]) {
      return false;
    }
  }

  return true;
}

// using from problem 1
// function getCharFrequency(testString: string): Record<string, number> {

//   testString = testString.toLowerCase();
  
//   const frequency: Record<string, number> = {};
  
//   for(let item of testString){
//       frequency[item] = (frequency[item] || 0) + 1;
//   }
  
//   return frequency;
// }


// 🔍 Test Cases
console.log(areAnagrams("Listen", "Silent"));  // true
// console.log(areAnagrams("Hello", "Olelh"));    // true
// console.log(areAnagrams("Test", "Taste"));     // false




/**
 * Problem 3: Count Vowels in a String
 * -----------------------------------
 * Return the number of vowels (a, e, i, o, u) in a given string.
 * 
 * The check should be case-insensitive.
 * 
 * Example:
 * Input: "Zunair"
 * Output: 3  // u, a, i
 * 
 * Input: "HELLO"
 * Output: 2  // e, o
 */


function countVowels(str: string): number {
    str = str.toLowerCase();
    let count = 0
    for (let char of str){
        if (char === 'a' || char === 'e' || char === "i" || char === "o" || char === "u" ){
            count++
        }
    }
  return count
}

// 🔍 Test Cases
console.log(countVowels("Zunair"));   // 3
console.log(countVowels("HELLO"));    // 2
console.log(countVowels("bcdfg"));    // 0
