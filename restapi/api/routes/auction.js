const express = require('express');
const router = express.Router();

const { Gateway, Wallets } = require('fabric-network');
const path = require('path');
const { buildCCPOrg1, buildCCPOrg2, buildWallet, prettyJSONString } = require('../../../../test-application/javascript/AppUtil.js');
const myChannel = 'mychannel';
const myChaincodeName = 'auction';

async function createAuction (ccp, wallet, user, auctionID, item, quantity, auditor, reservePrice, startTime, endTime) {
	try {
		const gateway = new Gateway();
		// connect using Discovery enabled

		await gateway.connect(ccp,
			{ wallet: wallet, identity: user, discovery: { enabled: true, asLocalhost: true } });

		const network = await gateway.getNetwork(myChannel);
		const contract = network.getContract(myChaincodeName);

		const statefulTxn = contract.createTransaction('CreateAuction');

		console.log('\n--> Submit Transaction: Propose a new auction');
		await statefulTxn.submit(auctionID, item, parseInt(quantity), auditor, reservePrice, startTime, endTime);
		console.log('*** Result: committed');

		console.log('\n--> Evaluate Transaction: query the auction that was just created');
		const result = await contract.evaluateTransaction('QueryAuction', auctionID);
		console.log('*** Result: Auction: ' + prettyJSONString(result.toString()));

		gateway.disconnect();
	} catch (error) {
		console.error(`******** FAILED to submit bid: ${error}`);
		throw error;
	}
}


router.post('/', async function (req, res, next) {
    const auction ={
        org: req.body.org,
        user: req.body.user,
        auctionID: req.body.auctionID,
        item: req.body.item,
        quantity: req.body.quantity,
        auditor: req.body.auditor,
        reservePrice: req.body.reservePrice,
        startTime: req.body.startTime,
        endTime: req.body.endTime
    }
    try {
        const org = auction.org;
        const user = auction.user;
        const auctionID = auction.auctionID;
        const item = auction.item;
        const quantity = auction.quantity;
        const auditor = auction.auditor;
        const reservePrice = auction.reservePrice;
        const startTime = auction.startTime;
        const endTime = auction.endTime;

        if (org === "Org1" || org === "org1") {
            const ccp = buildCCPOrg1();
            const walletPath = path.join(__dirname, 'wallet/org1');
            const wallet = await buildWallet(Wallets, walletPath);
            await createAuction(ccp, wallet, user, auctionID, item, quantity, auditor, reservePrice, startTime, endTime);
        } else if (org === 'Org2' || org === 'org2') {
            const ccp = buildCCPOrg2();
            const walletPath = path.join(__dirname, 'wallet/org2');
            const wallet = await buildWallet(Wallets, walletPath);
            await createAuction(ccp, wallet, user, auctionID, item, quantity, auditor, reservePrice, startTime, endTime);
        } else {
            console.log('Usage: node createAuction.js org userID auctionID item quantity');
            console.log('Org must be Org1 or Org2');
        }
    } catch (error) {
		console.error(`******** FAILED to run the application: ${error}`);
	}

    res.status(200).json({
        message: 'success add new auction',
        auctionCreated: auction
    });
});

module.exports = router;