const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const {interface,bytecode} = require('./compile');

//HDWalletProvider is a library which provide a communication layer bween real(in this case rinkby) etherium network and Web3.
//now for a real network we dont have unlocked accounts so we must provide the account mnemonic
//we are using infura api which provides an infura node to connect the provider to rinkby network
const provider = new HDWalletProvider(
    'this flash open key cause muscle stand jazz security fruit february faint',
    'https://rinkeby.infura.io/3VVQx8fMEasaAFtBDewd'
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: "0x" + bytecode, arguments: ['Hi there!'] }) //If there's no '0x' it will convert the whole string to hexadecimal. This is bad because the bytecode will be double the size and completely wrong.
    .send({ gas: '1000000', from: accounts[0] });

  console.log('Contract deployed to', result.options.address);
};
deploy();