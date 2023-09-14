/*
Question:
A row-sorted binary matrix means that all elements are 0 or 1 and each row of the matrix is sorted in non-decreasing order.

Given a row-sorted binary matrix binaryMatrix, return the index (0-indexed) of the leftmost column with a 1 in it. 
If such an index does not exist, return -1.

You can't access the Binary Matrix directly. You may only access the matrix using a BinaryMatrix interface:

BinaryMatrix.get(row, col) returns the element of the matrix at index (row, col) (0-indexed).
BinaryMatrix.dimensions() returns the dimensions of the matrix as a list of 2 elements [rows, cols], which means the matrix is rows x cols.
Submissions making more than 1000 calls to BinaryMatrix.get will be judged Wrong Answer. 
Also, any solutions that attempt to circumvent the judge will result in disqualification.

For custom testing purposes, the input will be the entire binary matrix mat. You will not have access to the binary matrix directly.
*/

// 0 0
// F F

// 1 1
// T T

// 0 1
// F T
const NOT_FOUND = -1;

const getMidIdx = (leftIdx, rightIdx) => {
    const midIdx = leftIdx + Math.floor((rightIdx - leftIdx) / 2);

    return midIdx;
};

const getOneInLestMostCol = (row, BinaryMatrix) => {
    const [numRows, numCols] = BinaryMatrix.dimensions();

    let leftIdx = 0;
    let rightIdx = numCols - 1;

    let leftMostCol = Infinity;

    while (leftIdx <= rightIdx) {
        const midIdx = getMidIdx(leftIdx, rightIdx);
        const midValue = BinaryMatrix.get(row, midIdx);

        if (midValue === 1) {
            leftMostCol = midIdx;
            rightIdx = midIdx - 1;
        } else leftIdx = midIdx + 1;
    }

    return leftMostCol;
};

const leftMostColumnWithOne = (BinaryMatrix) => {
    const [numRows, numCols] = BinaryMatrix.dimensions();

    let leftMostCol = Infinity;

    for (let row = 0; row < numRows; row++) {
        const currentLeftMostCol = getOneInLestMostCol(row, BinaryMatrix);

        leftMostCol = Math.min(leftMostCol, currentLeftMostCol);
    }

    if (leftMostCol === Infinity) return NOT_FOUND;

    return leftMostCol;
};

let mat = [
    [0, 0],
    [1, 1],
];

console.log(`Your answer: ${leftMostColumnWithOne(mat)}`);
console.log(`Correct answer: ${0}`);
console.log();

// mat = [
//     [0, 0],
//     [0, 1],
// ];

// console.log(`Your answer: ${leftMostColumnWithOne(mat)}`);
// console.log(`Correct answer: ${1}`);
// console.log();
