import {exec} from '../src/index';
const mockExit = jest.spyOn(process, 'exit')
.mockImplementation((number) => { throw new Error('process.exit: ' + number); });

import * as stdin from 'mock-stdin';
const mockStdin = stdin.stdin();

describe('index', () => {
    it('should return correct values', () => {
        exec();
        mockStdin.send("1", "ascii");
        mockStdin.send("3 4", "ascii");
        mockStdin.send("0001", "ascii");
        mockStdin.send("0011", "ascii");
        mockStdin.send("0110", "ascii");
        mockStdin.end();
    });
});