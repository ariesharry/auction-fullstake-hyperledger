const express = require('express');
const router = express.Router();

const { Gateway, Wallets } = require('fabric-network');
const path = require('path');
const { buildCCPOrg1, buildCCPOrg2, buildWallet, prettyJSONString } = require('../../../../test-application/javascript/AppUtil.js');
const myChannel = 'mychannel';
const myChaincodeName = 'papercontract';

async function createAuction (ccp, wallet, user, issuer, id, issueDate, maturityDate, quantity, commodity, lotNumber, quality, producer, certification, portOfLoading, deliveryConditions) {
	try {
		const gateway = new Gateway();
		// connect using Discovery enabled

		await gateway.connect(ccp,
			{ wallet: wallet, identity: user, discovery: { enabled: true, asLocalhost: true } });

		const network = await gateway.getNetwork(myChannel);
		const contract = network.getContract(myChaincodeName);

		const statefulTxn = contract.createTransaction('issue');

		console.log('\n--> Submit Transaction: Propose a new auction');
		await statefulTxn.submit(issuer, id, issueDate, maturityDate, quantity, commodity, lotNumber, quality, producer, certification, portOfLoading, deliveryConditions);
		console.log('*** Result: committed');

		console.log('\n--> Evaluate Transaction: query the auction that was just created');
		const result = await contract.evaluateTransaction('queryHistory', issuer, id);
		console.log('*** Result: Auction: ' + prettyJSONString(result.toString()));

		gateway.disconnect();
        return result.toString();
	} catch (error) {
		console.error(`******** FAILED to submit bid: ${error}`);
		throw error;
	}
}

// router.get('/', (req, res, next) => {
//     res.status(200).json({
//         message: 'success get broo!'
//     });
// });

router.post('/', async function (req, res, next) {
    let result;
    const auction ={
        org: req.body.org,
        user: req.body.user,
        issuer: req.body.issuer,
        id: req.body.id,
        issueDate: req.body.issueDate,
        maturityDate: req.body.maturityDate,
        quantity: req.body.quantity,
        commodity: req.body.commodity,
        lotNumber: req.body.lotNumber,
        quality: req.body.quality,
        producer: req.body.producer,
        certification: req.body.certification,
        portOfLoading: req.body.portOfLoading,
        deliveryConditions: req.body.deliveryConditions
    }
    try {
        const org = auction.org;
        const user = auction.user;
        const issuer = auction.issuer;
        const id = auction.id;
        const issueDate = auction.issueDate;
        const maturityDate = auction.maturityDate;
        const quantity = auction.quantity;
        const commodity = auction.commodity;
        const lotNumber = auction.lotNumber;
        const quality = auction.quality;
        const producer = auction.producer;
        const certification = auction.certification;
        const portOfLoading = auction.portOfLoading;
        const deliveryConditions = auction.deliveryConditions;

        if (org === "Org1" || org === "org1") {
            const ccp = buildCCPOrg1();
            const walletPath = path.join(__dirname, 'wallet/org1');
            const wallet = await buildWallet(Wallets, walletPath);
            result = await createAuction(ccp, wallet, user, issuer, id, issueDate, maturityDate, quantity, commodity, lotNumber, quality, producer, certification, portOfLoading, deliveryConditions);
        } else if (org === 'Org2' || org === 'org2') {
            const ccp = buildCCPOrg2();
            const walletPath = path.join(__dirname, 'wallet/org2');
            const wallet = await buildWallet(Wallets, walletPath);
            result = await createAuction(ccp, wallet, user, issuer, id, issueDate, maturityDate, quantity, commodity, lotNumber, quality, producer, certification, portOfLoading, deliveryConditions);
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