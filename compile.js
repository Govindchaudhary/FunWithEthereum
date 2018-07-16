const path = require('path') //used to build a path independent of system(ie. compatible with windows,unix etc)
const fs = require('fs');
const solc = require('solc');

const inboxPath = path.resolve(__dirname,'contracts','Inbox.sol');

const source = fs.readFileSync(inboxPath,'utf8');  //reading the content of inbox.sol
module.exports =  solc.compile(source,1).contracts[':Inbox'] //actual compile statement here 1 is the no. of contracts yu want to compile


