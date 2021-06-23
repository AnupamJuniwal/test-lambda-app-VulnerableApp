/* eslint-disable no-undef */
try {
    const aws = require('aws-sdk');
    const lambda = new aws.Lambda();
    
    exports.fn = async (args) => {
        let [arn, version, data] = args;
        data = JSON.stringify(data);
        const invokeResult = await lambda.invoke({
            FunctionName: arn,
            ClientContext: Buffer.from('{}').toString('base64'),
            InvocationType: 'Event',
            LogType: 'Tail',
            Payload: Buffer.from(data),
            Qualifier: version
        }).promise();
        console.log('invoking lambda invokeResult:', invokeResult);
        return invokeResult;
    };
} catch (err) {
    console.log('ERRROR', err);
}
exports.moduleName = 'lambdaInvokeUnEscaped';