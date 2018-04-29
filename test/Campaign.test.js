const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const compiledFactory = require('../ethereum/build/CampaignFactory.json');
const compiledCampaign = require('../ethereum/build/Campaign.json');

let accounts;
let factory;
let campaignAddress;
let campaign;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();

    factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
        .deploy({data: compiledFactory.bytecode})
        .send({from: accounts[0], gas: 1000000});

    await factory.methods.createCampaign('100').send({
        from: accounts[0],
        gas: 1000000
    });

    [campaignAddress] = await factory.methods.getDeployedCampaigns().call();

    campaign = await new web3.eth.Contract(
        JSON.parse(compiledCampaign.interface),
        campaignAddress
    );

});

describe('Campaign', () => {
    it("deploy a factory and campaign", () => {
        assert.ok(factory.options.address);
        assert.ok(campaign.options.address);
    });

    it("mark call as campaign manager", async () => {
       const manager = await campaign.methods.manager().call();
        assert.equal(accounts[0], manager);
    });

    it("allow to people to contribute the money and marks as approvers", async () => {
        await campaign.methods.contribute().send({
            value: '200',
            from: accounts[1]
        });
         const isContributor = await campaign.methods.approvers(accounts[1]).call();
         assert(isContributor);
    });

    it('require the minimun contributions', async () => {

        try {
            await campaign.methods.contribute().send({
                value: '200',
                from: accounts[1]
            });
            assert(false);
        }catch (err){
            assert(err);
        }
    });

    it('allow the manager to make payment request', async () => {

         await campaign.methods
             .createRequest('Buy Now', '100', accounts[1])
             .send({
                 from: accounts[0],
                 gas: '1000000'
             });
         const request = await campaign.methods.requests(0).call();
         assert('Buy Now', request.description);
    });
});

