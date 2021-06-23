const WebSocket = require('ws');

const WS_PROTOCOL = 'ws://';
const COLON_CHARACTER = ':';
const WS_ON_OPEN = 'open';
const WS_ON_MSG = 'message';

exports.fn = async (args) => {
    const [ip, port] = args;
    let url = WS_PROTOCOL + ip + COLON_CHARACTER + port;
    let connectionOpenEvent;
    try{
    const ws = new WebSocket(url);

    ws.on(WS_ON_MSG, (msg) => {
        console.log("msg from ws::", msg);
    });
    console.log("awaiting for websocket connection...");
    connectionOpenEvent = await new Promise ((resolve) => {
        ws.on(WS_ON_OPEN, event => {
            resolve(event);
        });
    });
    console.log("connectionOpenEvent::", connectionOpenEvent);
    connectionOpenEvent = true;
    } catch (err) {
        console.log(err)
    }
    
    return connectionOpenEvent || "Failure";
};

exports.moduleName = 'ws';