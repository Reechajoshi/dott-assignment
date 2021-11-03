import * as indexFunctions from '../src/index';

import * as fs from 'fs';
const stdoutSpy = jest.spyOn(process.stdout, 'write');
const consoleErrorSpy = jest.spyOn(console, 'error');

import * as stdin from 'mock-stdin';
const mockStdin = stdin.stdin();

process.stdin.on('data', (val) => {
    fs.appendFileSync(__dirname+ "output.txt", val + "\n");
})

describe('index', () => {
    beforeEach(() => {
        console.clear();
        consoleErrorSpy.mockClear();
    });
    it('should return correct values',  () => {
        const expectedArray = [ [ 3, 2, 1, 0 ], [ 2, 1, 0, 0 ], [ 1, 0, 0, 1 ] ];
            indexFunctions.exec();
            mockStdin.send("1", "ascii");
            mockStdin.send("3 4", "ascii");
            mockStdin.send("0001", "ascii");
            mockStdin.send("0011", "ascii");
            mockStdin.send("0110", "ascii");
            expect(stdoutSpy).toBeCalledWith(JSON.stringify(expectedArray));
    });

    it('should return correct values for multiple test suite',  () => {
        const expectedArray = [[3,2,1,0],[2,1,0,0],[1,0,0,1],[3,2,1,0],[2,1,0,0],[1,0,0,1],[1,0],[0,1]];
            indexFunctions.exec();
            mockStdin.send("2", "ascii");
            mockStdin.send("3 4", "ascii");
            mockStdin.send("0001", "ascii");
            mockStdin.send("0011", "ascii");
            mockStdin.send("0110", "ascii");
            mockStdin.send("2 2", "ascii");
            mockStdin.send("01", "ascii");
            mockStdin.send("10", "ascii");
            expect(stdoutSpy).toBeCalledWith(JSON.stringify(expectedArray));
    });

    it('should ignore extra rows entered after output is generated',  () => {
        const expectedArray = [[3,2,1,0],[2,1,0,0]];
            indexFunctions.exec();
            mockStdin.send("1", "ascii");
            mockStdin.send("2 4", "ascii");
            mockStdin.send("0001", "ascii");
            mockStdin.send("0011", "ascii");
            mockStdin.send("0110", "ascii");  
            expect(stdoutSpy).toBeCalledWith(JSON.stringify(expectedArray));
    });

    it('should throw an error for incorrect columns',  () => {
            indexFunctions.exec();
            mockStdin.send("1", "ascii");
            mockStdin.send("3 6", "ascii");
            mockStdin.send("0001", "ascii");
            mockStdin.send("0011", "ascii");
            mockStdin.send("0110", "ascii");
            expect(consoleErrorSpy).toBeCalledWith("Invalid Number of columns");
    });

    it('should throw an error for garbage values',  () => {
        indexFunctions.exec();
        mockStdin.send("may the force be with you", "ascii");
        expect(consoleErrorSpy).toBeCalledWith("invalid number of test cases");
    });
});