/*
Question:
McDonald’s sells chicken nuggets in batches of 3, 5, or 7. 
Given n, return true if McDonald’s can produce n chicken nuggets.
*/

const nuggetsSizes = [3, 5, 7];

const canProduceNuggets = (numNuggets) => {
    const canProduceCache = new Array(numNuggets + 1).fill(false);

    canProduceCache[0] = true;

    for (let nuggetCount = 1; nuggetCount <= numNuggets; nuggetCount += 1) {
        for (const nuggetsSize of nuggetsSizes) {
            const remainingNuggets = nuggetCount - nuggetsSize;

            if (canProduceCache[remainingNuggets]) {
                canProduceCache[nuggetCount] = true;
                break;
            }
        }
    }

    return canProduceCache[numNuggets];
};

let n = 24;

console.log(`Your answer: ${canProduceNuggets(n)}`);
console.log(`Correct answer: ${2}`);
