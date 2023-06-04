const express = require('express');
const router = express.Router();

// Bring key classes into scope, most importantly Fabric SDK network class
const fs = require('fs');
const yaml = require('js-yaml');
const { Wallets, Gateway } = require('fabric-network');
const CommercialPaper = require('../contract/lib/paper.js');


router.post('/', async function (req, res, next) {

    const wallet = await Wallets.newFileSystemWallet('./identity/user/isabella/wallet');

    // A gateway defines the peers used to access Fabric networks
    const gateway = new Gateway();

    const auction ={
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

        // Specify userName for network access
        // const userName = 'isabella.issuer@magnetocorp.com';
        const userName = 'isabella';

        // Load connection profile; will be used to locate a gateway
        let connectionProfile = yaml.safeLoad(fs.readFileSync('./api/gateway/connection-org2.yaml', 'utf8'));

        // Set connection options; identity and wallet
        let connectionOptions = {
            identity: userName,
            wallet: wallet,
            discovery: { enabled:true, asLocalhost: true }
        };

        // Connect to gateway using application specified parameters
        console.log('Connect to Fabric gateway.');

        await gateway.connect(connectionProfile, connectionOptions);

        // Access PaperNet network
        console.log('Use network channel: mychannel.');

        const network = await gateway.getNetwork('mychannel');

        // Get addressability to commercial paper contract
        console.log('Use org.papernet.commercialpaper smart contract.');

        const contract = await network.getContract('papercontract');

        // issue commercial paper
        console.log('Submit commercial paper issue transaction.');

        const issueResponse = await contract.submitTransaction('issue', issuer, id, issueDate, maturityDate, quantity, commodity, lotNumber, quality, producer, certification, portOfLoading, deliveryConditions);

        // process response
        console.log('Process issue transaction response.'+issueResponse);

        let paper = CommercialPaper.fromBuffer(issueResponse);

        console.log(`${paper.issuer} commercial paper : ${paper.id} successfully issued for value ${paper.quantity}`);
        console.log('Transaction complete.');
        gateway.disconnect();

    } catch (error) {
		console.error(`******** FAILED to run the application: ${error}`);
	}

    res.status(200).json({
        message: 'success add new commodity',
        auctionCreated: auction
    });
});

module.exports = router;