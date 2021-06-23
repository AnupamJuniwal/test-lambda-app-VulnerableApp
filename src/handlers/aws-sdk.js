/* eslint-disable no-undef */

const aws = require('@aws-sdk/client-lambda');
// const aws = require('aws-sdk');
const lambda = new aws.Lambda();

exports.fn = async (args) => {
    const [arn, version, data] = args;
    console.log('invoking lambda arn:', arn);
    console.log('invoking lambda version:', version);
    console.log('invoking lambda data:', data);
    console.log('lambda::::', lambda);
    const invokeResult = await lambda.invoke({
        FunctionName: arn,
        ClientContext: Buffer.from('{}').toString('base64'),
        InvocationType: 'Event',
        LogType: 'Tail',
        Payload: Buffer.from(data),
        Qualifier: version
    });
    // .promise();
    console.log('invoking lambda invokeResult:', invokeResult);
    return invokeResult;
};
exports.moduleName = 'lambdaInvoke';