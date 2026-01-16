const su = require('./stringUtils');

const text = "Hello, World!";

console.log("Original : "+text);
console.log("Uppercase: "+su.capitalize(text));
console.log("reversed: "+su.reverseString(text));
console.log("Palindrome: "+su.isPalindrome(text));
console.log("Vowels   : "+su.countVowels(text));