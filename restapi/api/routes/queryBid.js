const express = require('express');
const router = express.Router();

const { Gateway, Wallets } = require('fabric-network');
const path = require('path');
const { buildCCPOrg1, buildCCPOrg2, buildWallet, prettyJSONString } = require('../../../../test-application/javascript/AppUtil.js');
const myChannel = 'mychannel';
const myChaincodeName = 'auction';

async function queryBid (ccp, wallet, user, auctionID, bidID) {
	try {
		const gateway = new Gateway();
		// connect using Discovery enabled

		await gateway.connect(ccp,
			{ wallet: wallet, identity: user, discovery: { enabled: true, asLocalhost: true } });

		const network = await gateway.getNetwork(myChannel);
		const contract = network.getContract(myChaincodeName);

		console.log('\n--> Evaluate Transaction: read bid from private data store');
		const result = await contract.evaluateTransaction('QueryBid', auctionID, bidID);
		console.log('*** Result: Bid: ' + prettyJSONString(result.toString()));

		gateway.disconnect();
	} catch (error) {
		console.error(`******** FAILED to submit bid: ${error}`);
	}
}

// router.get('/', (req, res, next) => {
//     res.status(200).json({
//         message: 'success get broo!'
//     });
// });

router.post('/', async function (req, res, next) {
    const auction ={
        org: req.body.org,
        user: req.body.user,
        auctionID: req.body.auctionID,
        bidID: req.body.bidID
    }
    try {
        const org = auction.org;
        const user = auction.user;
        const auctionID = auction.auctionID;
        const bidID = auction.bidID;

        if (org === 'Org1' || org === 'org1') {
			const ccp = buildCCPOrg1();
			const walletPath = path.join(__dirname, 'wallet/org1');
			const wallet = await buildWallet(Wallets, walletPath);
			await queryBid(ccp, wallet, user, auctionID, bidID);
		} else if (org === 'Org2' || org === 'org2') {
			const ccp = buildCCPOrg2();
			const walletPath = path.join(__dirname, 'wallet/org2');
			const wallet = await buildWallet(Wallets, walletPath);
			await queryBid(ccp, wallet, user, auctionID, bidID);
		} else {
			console.log('Usage: node bid.js org userID auctionID bidID');
			console.log('Org must be Org1 or Org2');
		}
    } catch (error) {
		console.error(`******** FAILED to run the application: ${error}`);
	}

    res.status(200).json({
        message: 'success place bid',
        auctionCreated: auction
    });
});

module.exports = router;