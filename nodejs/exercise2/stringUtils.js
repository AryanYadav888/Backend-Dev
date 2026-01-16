function capitalize(str){
    if(typeof str !== 'string' || str.length === 0){
        return '';
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function reverseString(str){
    return str.split('').reverse().join('');
}

function isPalindrome(str){
    const cleanedStr = str.replace(/[^A-Za-z0-9]/g, '').toLowerCase();
    const reversedStr = cleanedStr.split('').reverse().join('');
    return cleanedStr === reversedStr;
}

function countVowels(str){
    const vowel = 'aeiouAEIOU';
    let count = 0;
    for(let char of str){
        if(vowel.includes(char)){
            count++;
        }
    }
    return count;
}

module.exports = {
    capitalize,
    reverseString,
    isPalindrome,
    countVowels
};