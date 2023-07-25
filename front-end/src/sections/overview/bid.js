import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { InputAdornment } from '@mui/material';
import { Descriptions } from 'antd';
import { useState, useEffect } from 'react';
import axios from 'axios';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

export default function FormDialog() {
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
    axios.post('http://20.5.96.89:3001/bid', {
      org: "org2",
      user: "PHPO",
      auctionID: "00004",
      quantity: 500,
      price: 10020
    }).then(res => setDataID([res.data.auctionCreated])).catch(err => console.log(err));
    handleClickAlert();
  };

  const submitBid = () => {
    // e.preventDefault();
    axios.post('http://20.5.96.89:3001/submitBid', {
      org: "org2",
      user: "PHPO",
      auctionID: "00004",
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

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Details
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Details</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Input your bid (quantity and price),<br></br>
            Note: Once you have submitted your bid, it cannot be changed 
          </DialogContentText>
          <DialogContentText>
          <br></br>
            <b>Total supply:</b> 2000 Ton <br></br>
            <b>Quality:</b> Grade A (ALB 3.51% sd 5% dan M+I 0.5%)
          </DialogContentText>
          <br></br>
          <TextField
          label="Price"
          id="price"
          name='price'
          type="number"
          sx={{ m: 1, width: '25ch' }}
          variant="outlined"
          required
          InputProps={{
            startAdornment: <InputAdornment position="start">Rp</InputAdornment>,
          }}
        />
          <TextField
          label="Quantity"
          id="quantity"
          name='quantity'
          type="number"
          sx={{ m: 1, width: '25ch' }}
          variant="outlined"
          defaultValue="500"
          required
          InputProps={{
            endAdornment: <InputAdornment position="end">Ton</InputAdornment>,
          }}
        />
        
          {/* <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Quantity"
            type="number"
            fullWidth
            variant="outlined"
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Price"
            type="number"
            fullWidth
            variant="standard"
          /> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="outlined" onClick={handleClickAlert}>Place Bid</Button>
          <Button variant="contained" onClick={submitBid}>Submit Bid</Button>
          
        </DialogActions>
        <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleCloseAlert}>
          <Alert onClose={handleCloseAlert} severity="success" sx={{ width: '100%' }}>
            Successfully place bid!
          </Alert>
        </Snackbar>
        <Snackbar open={openAlertSubmit} autoHideDuration={6000} onClose={function(event){handleClose(); handleCloseAlertSubmit()}}>
          <Alert onClose={function(event){handleClose(); handleCloseAlertSubmit()}} severity="success" sx={{ width: '100%' }}>
            Successfully submit auction!
          </Alert>
        </Snackbar>
      </Dialog>
    </div>
  );
}
