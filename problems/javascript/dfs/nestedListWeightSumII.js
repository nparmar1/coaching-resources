/*
Note: that the test case “[[1,1],2,[1,1],[[[[]]]]]” is weird, so your code will probably fail that case. 
Don't worry about passing that case, if that's the only case you fail, then you're fine (our solution also fails against this case).

You are given a nested list of integers nestedList. Each element is either an integer or a list whose elements may also be integers or other lists.

The depth of an integer is the number of lists that it is inside of. For example, the nested list [1,[2,2],[[3],2],1] has each integer's value set to its depth. 
Let maxDepth be the maximum depth of any integer.

The weight of an integer is maxDepth - (the depth of the integer) + 1.

Return the sum of each integer in nestedList multiplied by its weight.
*/

const getMaxDepth = (nestedList) => {
    let maxDepth = 1;

    for (const nestedInteger of nestedList) {
        if (nestedInteger.isInteger()) continue;

        const innerList = nestedInteger.getList();
        const innerListMaxDepth = getMaxDepth(innerList);

        maxDepth = Math.max(maxDepth, innerListMaxDepth + 1);
    }

    return maxDepth;
};

const computeWeightedDepthSum = (nestedList, curWeight) => {
    const weightedDepthSum = 0;

    for (const nestedInteger of nestedList) {
        if (nestedInteger.isInteger()) {
            const integer = nestedInteger.getInteger();
            weightedDepthSum += integer * curWeight;
        } else {
            const innerList = nestedInteger.getList();
            const innerWeight = curWeight - 1;

            weightedDepthSum += computeWeightedDepthSum(innerList, innerWeight);
        }
    }

    return weightedDepthSum;
};

const depthSumInverse = (nestedList) => {
    const maxDepth = getMaxDepth(nestedList);
    return computeWeightedDepthSum(nestedList, maxDepth);
};
