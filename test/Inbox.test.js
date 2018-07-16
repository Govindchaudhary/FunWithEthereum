/*
Mocha is a feature-rich JavaScript test framework running on Node.js and in the browser, 
making asynchronous testing simple and fun
it mainly have 3 main functions:
1) 'it':run a test and make an assertion
2) 'describe':grouping of 'it' functions
3)  'beforeEach':execute some general set up code before each 'it' function
*/


const assert = require('assert')
const ganache = require('ganache-cli')  //local etherium test network
const Web3 = require('web3')  //constructor function is imported used to create the instances

//provider is a communication layer bween etherium network and Web3. here bascially we are creating an instance of Web3 and connect it to local etherium network

const web3 = new Web3(ganache.provider());

//bytecode is the compiled contract and Interface(ABI) is the transaltion layer that communicates data from the network to the javascript world 
const {interface,bytecode} = require('../compile');
let accounts; 
let inbox; 

beforeEach(async() => {
    //get a list of all accounts
    accounts = await web3.eth.getAccounts();

    //use one of those accounts to deploy the contract

   inbox =  await new web3.eth.Contract(JSON.parse(interface))  //teaches web3 what methods an Inbox contract has, we are parsing since we want an object not json
    .deploy({data:bytecode,arguments:['Hello this is Govind']})  //tells web3 that we want to deploy a new copy of this contract , here arguments is the array of initial parametres that our contract requires
    .send({from:accounts[0],gas:'1000000'})   //instructs web3 to send a transaction that creates this contract

});

describe('Inbox',() => {
    it('deploys a contract' ,() => {
        assert.ok(inbox.options.address);
    });

    it('has a ddefault message' ,async() => {
        const message = await inbox.methods.message().call();
        assert.equal(message,'Hello this is Govind');
        
    });

    it('can change message' ,async() => {
        await inbox.methods.setMessage('Bye').send({from:accounts[0]});
        const message = await inbox.methods.message().call();
        assert.equal(message,'Bye');

    })
})