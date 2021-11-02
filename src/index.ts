let lineNumber = 1;
let testCase = 0;
// let rows = 0;
// let cols = 0;

const listener = () => {
  process.stdin.on("data", (val: Buffer) => {
    switch(lineNumber) {
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
        console.log("ENDING");
    }
    lineNumber++;
  });
}

function processData(val: string) {
  console.log("processData")
}

function processTestCase(val: string) {
  console.log("processTestCase")
  testCase = Number(val);
}

function setRowsAndCols(val: string) {
  console.log("setRowsAndCols")
  // let splitString = val.split(" ");
  // rows = +splitString[0];
  // cols = +splitString[1];
  testCase++;
}

export function exec() {
  listener();
}