const childProcess = require('child_process');

// This includes all tests for getAllItemsHandler() 
describe('Test run cmd', () => { 
    let scanSpy; 
    let lambda;
    // Test one-time setup and teardown, see more in https://jestjs.io/docs/en/setup-teardown 
    beforeAll(() => { 
        // https://jestjs.io/docs/en/jest-object.html#jestspyonobject-methodname 
        scanSpy = jest.spyOn(childProcess, 'spawnSync'); 
        // Import handler
        lambda = require('../../../src/handlers/index');
    });
 
    // Clean up mocks 
    afterAll(() => { 
        scanSpy.mockRestore(); 
    });

    it('should run command synchronously', async () => {
        const cmd = 'pwd';
        // Return the specified value whenever the spied scan function is called 
 
        const event = { 
            headers: {
                ['content-type']: 'application/json'
            },
            body: JSON.stringify({
                httpMethod: 'GET',
                runner: 'exec',
                args: [
                    "spawnSync",
                    "bash",
                    "-c",
                    "pwd"
                ],
            }),
        } 
 
        // Invoke helloFromLambdaHandler() 
        const result = await lambda.handler(event);
        console.log(result)
        // Compare the result with the expected result 
        expect(scanSpy.mock.calls[0][0]).toEqual("bash");
        expect(JSON.stringify(scanSpy.mock.calls[0][1])).toEqual(JSON.stringify(["-c", "pwd"])); 
    }); 
}); 
