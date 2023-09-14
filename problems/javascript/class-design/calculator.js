/*
Imagine a calculator that has the following characters: 0-9, +, -, =, and the “c” symbol. 
This functions like an old school calculator, so when you press a number, that's the
only thing you see on the screen. When you press the equals sign, the calculator computes
the specified values and returns the result. The "c" key clears the screen. Write a function
`keyPress` in a class `Calculator` that takes in a key and returns what would appear on the 
calculator screen.

Example usage:
const calc = new Calculator();
calc.keyPress('5');
calc.keyPress('+');
calc.keyPress('7');
console.log(calc.keyPress('=')); // This should print 12
calc.keyPress('-');
calc.keyPress('3');
console.log(calc.keyPress('=')); // This should print 9, since we stored the previous result of 12
*/

/*
Instructions:
There is no starter code for this problem. Simply create your own .js file and write everything
from scratch. There are tests at the bottom of this file, and you should be able to copy
those over to your new file to test your solution (as long as you name your class `Calculator`
and you expose a function `keyPress`, then the tests should work). Our solution is also
included below for you to reference.
*/

// START OF TESTS. COPY FROM HERE ONWARDS TO TEST YOUR CODE.

const ADD = '+';
const SUBTRACT = '-';
const EVALUATE = '=';
const CLEAR = 'c';

const DIGIT_REGEX_PATTERN = new RegExp('^[0-9]*$');

const isValidKeyPress = (string) => string.match(DIGIT_REGEX_PATTERN);

class Calculator {
    constructor() {
        this.refreshSettings();
    }

    refreshSettings() {
        this.numBeforeOperation = null;
        this.operation = null;
        this.numAfterOperation = null;
    }

    updateKeyPress(key) {
        if (this.numBeforeOperation !== null && this.operation !== null) {
            this.numAfterOperation = parseInt(key);
            return;
        }

        this.numBeforeOperation = parseInt(key);
    }

    evaluateNums() {
        if (
            this.numBeforeOperation !== null &&
            this.operation !== null &&
            this.numAfterOperation !== null
        ) {
            switch (this.operation) {
                case ADD:
                    return this.numBeforeOperation + this.numAfterOperation;

                case SUBTRACT:
                    return this.numBeforeOperation - this.numAfterOperation;
            }
        }
    }

    keyPress(key) {
        switch (key) {
            case CLEAR:
                this.refreshSettings();
                break;

            case ADD:
                this.operation = ADD;
                break;

            case SUBTRACT:
                this.operation = SUBTRACT;
                break;

            case EVALUATE:
                const evaluatedNum = this.evaluateNums();
                this.refreshSettings();
                this.numBeforeOperation = evaluatedNum;
                return evaluatedNum;

            default:
                const keyAsString = key.toString();
                if (!isValidKeyPress(keyAsString)) {
                    console.log('Error: Must enter valid key press');
                    return;
                }

                this.updateKeyPress(key);
        }
    }
}

const calc = new Calculator();

// Test 1
calc.keyPress('5');
calc.keyPress('+');
calc.keyPress('7');
let result = calc.keyPress('=');
console.log(`Expected: ${12}\nYour code's output: ${result}\n`);
calc.keyPress('c');

// Test 2
calc.keyPress('7');
calc.keyPress('-');
calc.keyPress('5');
result = calc.keyPress('=');
calc.keyPress('c');

// Test 3
calc.keyPress('15');
calc.keyPress('+');
calc.keyPress('3');
result = calc.keyPress('=');
console.log(`Expected: ${18}\nYour code's output: ${result}`);
calc.keyPress('-');
calc.keyPress('7');
result = calc.keyPress('=');
console.log(`Expected: ${11}\nYour code's output: ${result}\n`);
calc.keyPress('c');

// Test 4
calc.keyPress(15);
calc.keyPress('+');
calc.keyPress(3);
result = calc.keyPress('=');
console.log(`Expected: ${18}\nYour code's output: ${result}`);
calc.keyPress('-');
calc.keyPress(7);
result = calc.keyPress('=');
console.log(`Expected: ${11}\nYour code's output: ${result}\n`);
calc.keyPress('c');

// Test 5
calc.keyPress('15a');
calc.keyPress('+');
calc.keyPress('5');
result = calc.keyPress('=');
console.log(`Expected: ${null}\nYour code's output: ${result}`);
