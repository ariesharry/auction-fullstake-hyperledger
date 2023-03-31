const express = require('express');
const router = express.Router();

const { Gateway, Wallets } = require('fabric-network');
const path = require('path');
const { buildCCPOrg1, buildCCPOrg2, buildWallet, prettyJSONString } = require('../../../../test-application/javascript/AppUtil.js');
const myChannel = 'mychannel';
const myChaincodeName = 'auction';

async function closeAuction (ccp, wallet, user, auctionID) {
	try {
		const gateway = new Gateway();
		// connect using Discovery enabled

		await gateway.connect(ccp,
			{ wallet: wallet, identity: user, discovery: { enabled: true, asLocalhost: true } });

		const network = await gateway.getNetwork(myChannel);
		const contract = network.getContract(myChaincodeName);

		// Query the auction to get the list of endorsing orgs.
		// console.log('\n--> Evaluate Transaction: query the auction you want to close');
		const auctionString = await contract.evaluateTransaction('QueryAuction', auctionID);
		// console.log('*** Result:  Bid: ' + prettyJSONString(auctionString.toString()));
		const auctionJSON = JSON.parse(auctionString);

		const statefulTxn = contract.createTransaction('CloseAuction');

		if (auctionJSON.organizations.length === 2) {
			statefulTxn.setEndorsingOrganizations(auctionJSON.organizations[0], auctionJSON.organizations[1]);
		} else {
			statefulTxn.setEndorsingOrganizations(auctionJSON.organizations[0]);
		}

		console.log('\n--> Submit Transaction: close auction');
		await statefulTxn.submit(auctionID);
		console.log('*** Result: committed');

		console.log('\n--> Evaluate Transaction: query the updated auction');
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
        auctionID: req.body.auctionID
    }
    try {
        const org = auction.org;
        const user = auction.user;
        const auctionID = auction.auctionID;

        if (org === 'Org1' || org === 'org1') {
			const ccp = buildCCPOrg1();
			const walletPath = path.join(__dirname, 'wallet/org1');
			const wallet = await buildWallet(Wallets, walletPath);
			await closeAuction(ccp, wallet, user, auctionID);
		} else if (org === 'Org2' || org === 'org2') {
			const ccp = buildCCPOrg2();
			const walletPath = path.join(__dirname, 'wallet/org2');
			const wallet = await buildWallet(Wallets, walletPath);
			await closeAuction(ccp, wallet, user, auctionID);
		} else {
			console.log('Usage: node closeAuction.js org userID auctionID');
			console.log('Org must be Org1 or Org2');
		}
    } catch (error) {
		console.error(`******** FAILED to run the application: ${error}`);
	}

    res.status(200).json({
        message: 'success close auction',
        auctionCreated: auction
    });
});

module.exports = router;