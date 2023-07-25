import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { InputAdornment, TableCell, TableHead, TableRow, TableBody } from '@mui/material';
import { Descriptions, Table } from 'antd';
import { useState, useEffect } from 'react';
import axios from 'axios';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

export default function AuctionResult() {
  const [open, setOpen] = React.useState(false);
  const [openAlert, setOpenAlert] = React.useState(false);
  const [openAlertSubmit, setOpenAlertSubmit] = React.useState(false);
  const [dataID, setDataID] = useState([]);
  // const [dataAuction, setData] = useState([{
  //   id: 'auction1',
  //   seller: 'PTPN',
  //   quantity: '10000',
  //   item: 'CPO',
  //   createdAt: 1555016400000,
  //   status: 'Open'
  // }]);

  // const queryAuction = () => {
  //   // e.preventDefault();
  //   axios.post('http://103.250.10.234:3001/queryAuction', {
  //     org: "org2",
  //     user: "bidder1",
  //     auctionID: "00001"
  //   }).then(res => setData([res.data.auctionCreated])).catch(err => console.log(err));
  // };

  const handleClickAlert = () => {
    setOpenAlert(true);
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  const handleClickAlertSubmit = () => {
    setOpenAlertSubmit(true);
  };

  const handleCloseAlertSubmit = () => {
    setOpenAlertSubmit(false);
  };

  const addBid = () => {
    // e.preventDefault();
    axios.post('http://103.250.10.234:3001/bid', {
      org: "org2",
      user: "bidder1",
      auctionID: "00013",
      quantity: 2000,
      price: 10000
    }).then(res => setDataID([res.data.auctionCreated])).catch(err => console.log(err));
    handleClickAlert();
  };

  const submitBid = () => {
    // e.preventDefault();
    axios.post('http://103.250.10.234:3001/submitBid', {
      org: "org2",
      user: "bidder1",
      auctionID: "00013",
      bidID: 2000
    }).then(res => setDataID([res.data.auctionCreated])).catch(err => console.log(err));
    handleClickAlertSubmit();
  };

  console.log(dataID);


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  function createData(auctionId, winner, quantity, price) {
    return { auctionId, winner, quantity, price };
  };
  const rows = [
    createData('00013', 'PHPO', 500, 10020),
    createData('00013', 'NPO', 500, 10018),
    createData('00013', 'WNI', 1000, 10018),
  ];

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        Result
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Auction Result</DialogTitle>
        <DialogContent>
        <Descriptions title="Auction Results" layout="vertical" bordered column={4}>
          <Descriptions.Item label="Auction ID"> 
            <p>00004</p>
            <p>00004</p>
            <p>00004</p>
          </Descriptions.Item>
          <Descriptions.Item label="___Winner">
            <p>PHPO</p>
            <p>NPO</p>
            <p>WNI</p>
          </Descriptions.Item>
          <Descriptions.Item label="Quantity">
            <p>500</p>
            <p>500</p>
            <p>1000</p>
          </Descriptions.Item>
          <Descriptions.Item label="Price__">
            <p>10020</p>
            <p>10018</p>
            <p>10018</p>
          </Descriptions.Item>
        </Descriptions>
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button> 
        </DialogActions>
      </Dialog>
    </div>
  );
}
