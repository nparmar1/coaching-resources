/*
Question:
You are a product manager and currently leading a team to develop a new product. 
Unfortunately, the latest version of your product fails the quality check. 
Since each version is developed based on the previous version, all the versions after a bad version are also bad.

Suppose you have n versions [1, 2, ..., n] and you want to find out the first bad one, which causes all the following ones to be bad.

You are given an API bool isBadVersion(version) which returns whether version is bad. 
Implement a function to find the first bad version. You should minimize the number of calls to the API.
*/

/**
 * @param {function} isBadVersion()
 * @return {function}
 */

const getMidIdx = (leftIdx, rightIdx) => {
    const midInteger = leftIdx + Math.floor((rightIdx - leftIdx) / 2);

    return midInteger;
};

const NOT_FOUND = -1;

const solution = (isBadVersion) => {
    /**
     * @param {integer} n Total versions
     * @return {integer} The first bad version
     */
    return function (n) {
        let leftInteger = 0;
        let rightInteger = n;

        let firstBadVersion = NOT_FOUND;

        while (leftInteger <= rightInteger) {
            const midInteger = getMidIdx(leftInteger, rightInteger);
            if (isBadVersion(midInteger)) {
                firstBadVersion = midInteger;
                rightInteger = midInteger - 1;
            } else leftInteger = midInteger + 1;
        }

        return firstBadVersion;
    };
};
