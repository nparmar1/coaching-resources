/*
Question:
Given two strings s and t, return true if t is an anagram of s, and false otherwise.

An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, 
typically using all the original letters exactly once.
*/

const getFrequencyCount = (array) => {
    const frequencyCount = {};

    for (const element of array) {
        const inFrequencyCount = frequencyCount.hasOwnProperty(element);

        if (!inFrequencyCount) frequencyCount[element] = 0;
        frequencyCount[element]++;
    }

    return frequencyCount;
};

const areIdenticalObjects = (objectOne, objectTwo) => {
    const objectOneKeys = Object.keys(objectOne);

    for (const key of objectOneKeys) {
        const keyInObjectTwo = objectTwo.hasOwnProperty(key);

        if (!keyInObjectTwo || objectOne[key] !== objectTwo[key]) return false;
    }

    const objectTwoKeys = Object.keys(objectTwo);

    for (const key of objectTwoKeys) {
        const keyInObjectOne = objectOne.hasOwnProperty(key);

        if (!keyInObjectOne || objectOne[key] !== objectTwo[key]) return false;
    }

    return true;
};

const isAnagram = (stringOne, stringTwo) => {
    if (stringOne.length !== stringTwo.length) return false;

    const stringOneChars = stringOne.split('');
    const stringTwoChars = stringTwo.split('');

    const charCountOne = getFrequencyCount(stringOneChars);
    const charCountTwo = getFrequencyCount(stringTwoChars);

    return areIdenticalObjects(charCountOne, charCountTwo);
};

const s = 'anagram';
const t = 'nagaram';

console.log(`Your answer: ${isAnagram(s, t)}`);
console.log(`Correct answer: ${true}`);
