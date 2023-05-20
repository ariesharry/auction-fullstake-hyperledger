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

  const addBid = () => {
    // e.preventDefault();
    axios.post('http://103.250.10.234:3001/bid', {
      org: "org2",
      user: "bidder1",
      auctionID: "00001",
      quantity: 1000,
      price: 10000
    }).then(res => setDataID([res.data.auctionCreated])).catch(err => console.log(err));
    handleClickAlert();
  };

  const submitBid = () => {
    // e.preventDefault();
    axios.post('http://103.250.10.234:3001/submitBid', {
      org: "org2",
      user: "bidder1",
      auctionID: "00001",
      quantity: 1000,
      price: 10000
    }).then(res => setDataID([res.data.auctionCreated])).catch(err => console.log(err));
    handleClickAlertSubmit();
  };

  console.log(dataID);

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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Bid
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Bid</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Input your bid (quantity and price),<br></br>
            Note: Once you have submitted your bid, it cannot be changed
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
          <Button variant="outlined" onClick={addBid}>Place Bid</Button>
          <Button variant="contained" onClick={submitBid}>Submit Bid</Button>
          
        </DialogActions>
        <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleCloseAlert}>
          <Alert onClose={handleCloseAlert} severity="success" sx={{ width: '100%' }}>
            Successfully place bid!
          </Alert>
        </Snackbar>
        <Snackbar open={openAlert} autoHideDuration={6000} onClose={function(event){handleClose(); handleCloseAlertSubmit()}}>
          <Alert onClose={function(event){handleClose(); handleCloseAlertSubmit()}} severity="success" sx={{ width: '100%' }}>
            Successfully submit auction!
          </Alert>
        </Snackbar>
      </Dialog>
    </div>
  );
}
