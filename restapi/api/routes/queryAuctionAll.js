const express = require('express');
const router = express.Router();

const { Gateway, Wallets } = require('fabric-network');
const path = require('path');
const { buildCCPOrg1, buildCCPOrg2, buildWallet, prettyJSONString } = require('../../../../test-application/javascript/AppUtil.js');
const myChannel = 'mychannel';
const myChaincodeName = 'auction';

async function queryAuctionAll (ccp, wallet, user, status) {
	try {
		const gateway = new Gateway();
		// connect using Discovery enabled

		await gateway.connect(ccp,
			{ wallet: wallet, identity: user, discovery: { enabled: true, asLocalhost: true } });

		const network = await gateway.getNetwork(myChannel);
		const contract = network.getContract(myChaincodeName);

		console.log('\n--> Evaluate Transaction: query the auction');
		const result = await contract.evaluateTransaction('QueryAuctionsByStatus', status);
		console.log('*** Result: Auction: ' + prettyJSONString(result.toString()));
		const auctionInfo = prettyJSONString(result.toString());
		return auctionInfo;

		gateway.disconnect();
	} catch (error) {
		console.error(`******** FAILED to query Auction: ${error}`);
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
        status: req.body.status
    }
	var auctionDetails;
	
    try {
        const org = auction.org;
        const user = auction.user;
        const status = auction.status;

        if (org === 'Org1' || org === 'org1') {
			const ccp = buildCCPOrg1();
			const walletPath = path.join(__dirname, 'wallet/org1');
			const wallet = await buildWallet(Wallets, walletPath);
			auctionDetails = await queryAuctionAll(ccp, wallet, user, status);
			auctionDetails = JSON.parse(auctionDetails);
		} else if (org === 'Org2' || org === 'org2') {
			const ccp = buildCCPOrg2();
			const walletPath = path.join(__dirname, 'wallet/org2');
			const wallet = await buildWallet(Wallets, walletPath);
			auctionDetails = await queryAuctionAll(ccp, wallet, user, status);
			auctionDetails = JSON.parse(auctionDetails);
		} else {
			console.log('Usage: node queryAuction.js org userID auctionID');
			console.log('Org must be Org1 or Org2');
		}
    } catch (error) {
		console.error(`******** FAILED to run the application: ${error}`);
	}

    res.status(200).json({
        message: 'success get auction',
        auctionCreated: auction,
		auctionDetails: auctionDetails
    });
});

module.exports = router;