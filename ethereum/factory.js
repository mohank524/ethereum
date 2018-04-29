import web3 from './web3';

import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0x94033cFAa811EED8f533AEd56263595DcD81A3fe'
);

export default instance;