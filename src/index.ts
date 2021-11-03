import * as fs from 'fs';
const TOPIC = process.env.TOPIC || "data";

let lineNumber: number;
let rows: number | string, cols: number | string;
let totalTestSuite: number;
let currentTestSuite: number;
let testSuiteLineNumber: number;
let dotMatrix: string[][] = [];
let outputMatrix: number[][] = [];

const listener = () => {
  process.stdin.on(TOPIC, (val: Buffer) => {
    fs.appendFileSync(__dirname+ "output.txt", "Line Number " +lineNumber + "value: " +val+ " \n");
    switch(lineNumber) {
      case 0: 
        console.info("Execution completed for test case number: " + currentTestSuite);
        break;
      case 1:
        processTestCase(val.toString());
        break;
      case 2:
        setRowsAndCols(val.toString());
        break;
      case 3:
        processData(val.toString());
        break;
      default:
        console.error("Random Error");
        break;
    }
  });
}

function outputResult() {
  fs.appendFileSync(__dirname+ "output.txt", "Final Result: "+JSON.stringify(outputMatrix)+" \n\n\n");
  process.stdout.write(JSON.stringify(outputMatrix));
  resetValues();
}

function processDotMatrix() {
  fs.appendFileSync(__dirname+ "output.txt", "Processing Matrix: "+JSON.stringify(dotMatrix)+" \n");
  for (const i of dotMatrix) {
    const outputMatrixRow = [];
    for (let j = 0; j < i.length; j++) {
      const stringifiedRow = i.join("");
      let correctIndex: number;
      const leftString = stringifiedRow.substring(0, j);
      const reverseLeftString = leftString.split("").reverse().join();

      const rightString = stringifiedRow.substring(j+1, i.length);
      
      const leftIndex = reverseLeftString.indexOf("1");
      const rightIndex = rightString.indexOf("1");
      correctIndex = ((leftIndex == -1) ? rightIndex: (rightIndex == -1 ? leftIndex: Math.min(leftIndex, rightIndex))) + 1;
      if(i[j] == "1") correctIndex=0;
      
      outputMatrixRow.push(correctIndex);
    }
    outputMatrix.push(outputMatrixRow);
  }

  lineNumber = 2;
  testSuiteLineNumber=0;
  currentTestSuite++;
}

function processRow(val: string) {
  fs.appendFileSync(__dirname+ "output.txt", "Process Rows: "+val+" \n");
  const splitRow = val.split("");
  if(splitRow.length !== cols) {
    fs.appendFileSync(__dirname+ "output.txt", "WE GOT THE ERROR \n\n\n");
    console.error("Invalid Number of columns");
  } else {
    dotMatrix.push(splitRow);
  }
}

function processData(val: string) {
  fs.appendFileSync(__dirname+ "output.txt", "Process Data testSuiteLineNumber: "+testSuiteLineNumber + " rows: " + rows+" \n");
  if (testSuiteLineNumber > rows) {
    fs.appendFileSync(__dirname+ "output.txt", "WE GOT THE rows \n\n\n");
    console.error("Invalid rows");
  }
  
  if (testSuiteLineNumber > 0 && testSuiteLineNumber <= rows) {
    processRow(val);
    lineNumber = 3;
  }
  // output if last row reached
  if (testSuiteLineNumber === rows) {
    
    processDotMatrix();
    fs.appendFileSync(__dirname+ "output.txt", "Last test suite: "+typeof currentTestSuite  + currentTestSuite + " "+ typeof totalTestSuite + totalTestSuite+" \n");
    if (currentTestSuite === totalTestSuite) {
      outputResult();  
    } else {
      fs.appendFileSync(__dirname+ "output.txt", "SHOULD WORK HERE MAN! "+testSuiteLineNumber + " lineNumber " + lineNumber + " testsuite" + currentTestSuite + totalTestSuite+" \n");
    }
  } 
  testSuiteLineNumber++;
}

function processTestCase(val: string) {
  totalTestSuite = Number(val);
  fs.appendFileSync(__dirname+ "output.txt", "Process test case: testSuite: "+totalTestSuite+" \n");
  
  if (isNaN(totalTestSuite)) {
    console.error("invalid number of test cases");
    fs.appendFileSync(__dirname+ "output.txt", "Invalid error \n");
    lineNumber = 0;
  } else {
    lineNumber++;
  }
}

function setRowsAndCols(val: string) {
  const splitString = val.split(" ");
  if (splitString.length == 2) {
    rows = +splitString[0];
    cols = +splitString[1];
  } else {
    lineNumber = 0;
    console.error("Invalid rows and column value");
  }
  fs.appendFileSync(__dirname+ "output.txt", "Setting rows and cols: "+rows+ cols+" \n");
  lineNumber++;
}

function resetValues() {
  fs.appendFileSync(__dirname+ "output.txt", "resetting values\n");
  process.stdin.removeAllListeners();
  console.clear();
  lineNumber = 1;
  currentTestSuite = 0;
  totalTestSuite = 0;
  testSuiteLineNumber = 1;
  rows = 0;
  cols = 0;
  dotMatrix = []
  outputMatrix = [];
}

export function exec() {
  fs.appendFileSync(__dirname+ "output.txt", "started execution\n");
  resetValues();
  listener();
}