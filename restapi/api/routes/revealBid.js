const express = require('express');
const router = express.Router();

const { Gateway, Wallets } = require('fabric-network');
const path = require('path');
const { buildCCPOrg1, buildCCPOrg2, buildWallet, prettyJSONString } = require('../../../../test-application/javascript/AppUtil.js');
const myChannel = 'mychannel';
const myChaincodeName = 'auction';

async function addBid (ccp, wallet, user, auctionID, bidID) {
	try {
		const gateway = new Gateway();
		// connect using Discovery enabled

		await gateway.connect(ccp,
			{ wallet: wallet, identity: user, discovery: { enabled: true, asLocalhost: true } });

		const network = await gateway.getNetwork(myChannel);
		const contract = network.getContract(myChaincodeName);

		console.log('\n--> Evaluate Transaction: read your bid');
		const bidString = await contract.evaluateTransaction('QueryBid', auctionID, bidID);
		const bidJSON = JSON.parse(bidString);

		// console.log('\n--> Evaluate Transaction: query the auction you want to join');
		const auctionString = await contract.evaluateTransaction('QueryAuction', auctionID);
		// console.log('*** Result:  Bid: ' + prettyJSONString(auctionString.toString()));
		const auctionJSON = JSON.parse(auctionString);

		const bidData = { objectType: 'bid', quantity: parseInt(bidJSON.quantity), price: parseInt(bidJSON.price), org: bidJSON.org, buyer: bidJSON.buyer };
		console.log('*** Result:  Bid: ' + JSON.stringify(bidData, null, 2));

		const statefulTxn = contract.createTransaction('RevealBid');
		const tmapData = Buffer.from(JSON.stringify(bidData));
		statefulTxn.setTransient({
			bid: tmapData
		});

		if (auctionJSON.organizations.length === 2) {
			statefulTxn.setEndorsingOrganizations(auctionJSON.organizations[0], auctionJSON.organizations[1]);
		} else {
			statefulTxn.setEndorsingOrganizations(auctionJSON.organizations[0]);
		}

		await statefulTxn.submit(auctionID, bidID);

		console.log('\n--> Evaluate Transaction: query the auction to see that our bid was added');
		const result = await contract.evaluateTransaction('QueryAuction', auctionID);
		console.log('*** Result: Auction: ' + prettyJSONString(result.toString()));

		gateway.disconnect();
	} catch (error) {
		console.error(`******** FAILED to submit bid: ${error}`);
		process.exit(1);
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
			await addBid(ccp, wallet, user, auctionID, bidID);
		} else if (org === 'Org2' || org === 'org2') {
			const ccp = buildCCPOrg2();
			const walletPath = path.join(__dirname, 'wallet/org2');
			const wallet = await buildWallet(Wallets, walletPath);
			await addBid(ccp, wallet, user, auctionID, bidID);
		} else {
			console.log('Usage: node revealBid.js org userID auctionID bidID');
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