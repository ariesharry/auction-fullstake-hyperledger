const express = require('express');
const router = express.Router();

const { Gateway, Wallets } = require('fabric-network');
const path = require('path');
const { buildCCPOrg1, buildCCPOrg2, buildWallet, prettyJSONString } = require('../../../../test-application/javascript/AppUtil.js');
const myChannel = 'mychannel';
const myChaincodeName = 'papercontract';
const CommercialPaper = require('../contract/lib/paper.js');


async function createAuction (ccp, wallet, user, key, id) {
	try {
		const gateway = new Gateway();
		// connect using Discovery enabled

		await gateway.connect(ccp,
			{ wallet: wallet, identity: user, discovery: { enabled: true, asLocalhost: true } });

		const network = await gateway.getNetwork(myChannel);
		const contract = network.getContract(myChaincodeName);

		console.log('\n--> Evaluate Transaction: query the auction that was just created');
		const result = await contract.evaluateTransaction('queryHistory', key, id);
		console.log('*** Result: Query Commodity: ' + prettyJSONString(result.toString()));

        json_result = CommercialPaper.fromBuffer(result);
		gateway.disconnect();
        return json_result;

	} catch (error) {
		console.error(`******** FAILED to query commodity: ${error}`);
		throw error;
	}
}

router.post('/', async function (req, res, next) {
    let result;
    const auction ={
        org: req.body.org,
        user: req.body.user,
        key: req.body.key,
        id: req.body.id
    }
    try {
        const org = auction.org;
        const user = auction.user;
        const key = auction.key;
        const id = auction.id;

        if (org === "Org1" || org === "org1") {
            const ccp = buildCCPOrg1();
            const walletPath = path.join(__dirname, 'wallet/org1');
            const wallet = await buildWallet(Wallets, walletPath);
            result = await createAuction(ccp, wallet, user, key, id);
        } else if (org === 'Org2' || org === 'org2') {
            const ccp = buildCCPOrg2();
            const walletPath = path.join(__dirname, 'wallet/org2');
            const wallet = await buildWallet(Wallets, walletPath);
            result = await createAuction(ccp, wallet, user, key, id);
        } else {
            console.log('Usage: node createAuction.js org userID auctionID item quantity');
            console.log('Org must be Org1 or Org2');
        }
    } catch (error) {
		console.error(`******** FAILED to run the application: ${error}`);
	}

    res.status(200).json({
        message: 'success add new auction',
        result: result
    });
});

module.exports = router;