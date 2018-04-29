const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('./build/CampaignFactory');


const provider = new HDWalletProvider(
    "gesture ancient impose danger wink leave race round cushion young magic maximum",
    "https://rinkeby.infura.io/vTwdTiIlPwAbLIRKTMYU"
);

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log("Atempting to deploy accounts", accounts[0]);
    const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
        .deploy({"data": compiledFactory.bytecode})
        .send({from: accounts[0], gas:1000000});

    console.log("Contract deployed to ", result.options.address);
};

deploy();
