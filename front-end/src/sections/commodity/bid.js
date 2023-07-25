import * as React from 'react';
import Button from '@mui/material/Button';
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
import { Grid } from '@mui/material';
import { TextField } from '@mui/material';
import { useCallback } from 'react';

export default function FormDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [openAlert, setOpenAlert] = React.useState(false);
  const [values, setValues] = useState({
    reservePrice: '',
    startTime: '',
    endTime: ''
  });

  console.log(values);

  const [data, setData] = useState([
    {
      
          0: {
            TxId:"null",
            Value: {
                  commodity: "null",
                  id: "null",  
                  owner: "null",
                  quantity: "null"
              }
          },
          class: "org.papernet.commercialpaper",
          key: ":",
          currentState: null
    }
  ]);

  console.log(data);

  const updatedData = data.map(obj => {
    delete obj.key;
    delete obj.class;
    delete obj.currentState;
    return obj;
  });

  const dataT = updatedData.map((obj) => {
    const records = Object.values(obj); // Extract the records from the object
    const transformedRecords = records.map((record) => ({
      id: record.Value.id,
      commodity: record.Value.commodity,
      owner: record.Value.owner,
      quantity: record.Value.quantity,
      issueDateTime: record.Value.issueDateTime,
      maturityDateTime: record.Value.maturityDateTime,
      issuer: record.Value.issuer,
      lotNumber: record.Value.lotNumber,
      quality: record.Value.quality,
      producer: record.Value.producer,
      certification: record.Value.certification,
      portOfLoading: record.Value.portOfLoading,
      deliveryConditions: record.Value.deliveryConditions,
      currentState: record.Value.currentState,
      owner: record.Value.owner,
    }));
    return transformedRecords;
  });

  const dataAuction = [].concat(...dataT);
  console.log(dataAuction);
  console.log(dataAuction[0].issuer);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.post('http://103.250.10.234:3001/queryCommodityId', {
  //         key: 'PTPN IV',
  //         id: '00002'
  //       });
  //       setData([response.data.auctionCreated]);
  //       // console.log(auctionData);
  //       // console.log(auctionData.item);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   fetchData();
  // }, [] );
  
  const addCommodity = () => {
    // e.preventDefault();
    axios.post('http://20.5.96.89:3001/queryCommodityId', {
    org: "org1",
    user: "PTPN4",
    key: props.keyValue,
    id: props.idValue
    }).then(res => setData([res.data.result])).catch(err => console.log(err));
  };

  const handleChange = useCallback(
    (event) => {
      setValues((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value
      }));
    },
    []
  );

  const handleClickAlert = () => {
    setOpenAlert(true);
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
    addCommodity();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const addAuction = (e) => {
    e.preventDefault();
    axios.post('http://20.5.96.89:3001/auction', {
      org: "org1",
      user: "PTPN4",
      auctionID: dataAuction[0].id,
      item: dataAuction[0].commodity,
      quantity: dataAuction[0].quantity,
      auditor: "withoutAuditor",
      reservePrice: values.reservePrice,
      startTime: values.startTime,
      endTime: values.endTime
    }).then(res => console.log("adding new auction", res)).catch(err => console.log(err));
    handleClickAlert();
  };

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });


  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Detail
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Open Auction</DialogTitle>
        <DialogContent>
        <Descriptions title="Commodity Details" layout="vertical">
          <Descriptions.Item label="Issuer"> { dataAuction[0].issuer } </Descriptions.Item>
          <Descriptions.Item label="Owner"> { dataAuction[0].owner } </Descriptions.Item>
          <Descriptions.Item label="Id"> { dataAuction[0].id } </Descriptions.Item>
          <Descriptions.Item label="Issue Date"> { dataAuction[0].issueDateTime } </Descriptions.Item>
          <Descriptions.Item label="Maturity Date"> { dataAuction[0].maturityDateTime } </Descriptions.Item>
          <Descriptions.Item label="Quantity"> { dataAuction[0].quantity } </Descriptions.Item>
          <Descriptions.Item label="Commodity"> { dataAuction[0].commodity } </Descriptions.Item>
          <Descriptions.Item label="Lot Number"> { dataAuction[0].lotNumber } </Descriptions.Item>
          <Descriptions.Item label="Quality"> { dataAuction[0].quality } </Descriptions.Item>
          <Descriptions.Item label="Producer"> { dataAuction[0].producer } </Descriptions.Item>
          <Descriptions.Item label="Certification"> { dataAuction[0].certification } </Descriptions.Item>
          <Descriptions.Item label="Port of Loading"> { dataAuction[0].portOfLoading } </Descriptions.Item>
          <Descriptions.Item label="Delivery Conditions"> { dataAuction[0].deliveryConditions } </Descriptions.Item>
        </Descriptions>
          <Grid
            container
            spacing={0}
          >
            <Grid
              xs={12}
              md={4}
            >
              <TextField
                fullWidth
                label="Reserve Price"
                name="reservePrice"
                onChange={handleChange}
                required
                // value={values.user}
              />
            </Grid>

            <Grid
              xs={12}
              md={4}
            >
              <TextField
                fullWidth
                label="Start Time"
                name="startTime"
                onChange={handleChange}
                required
                // value={values.user}
              />
            </Grid>
            <Grid
              xs={12}
              md={4}
            >
              <TextField
                fullWidth
                label="End Time"
                name="endTime"
                onChange={handleChange}
                required
                // value={values.user}
              />
            </Grid>

          </Grid>
          
        
        <FormControlLabel required control={<Checkbox />} label="I agree with the terms and conditions" />
        </DialogContent>
        
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={addAuction}>Open Auction</Button>
        </DialogActions>
        <Snackbar open={openAlert} autoHideDuration={6000} onClose={function(event){handleClose(); handleCloseAlert()}}>
          <Alert onClose={function(event){handleClose(); handleCloseAlert()}} severity="success" sx={{ width: '100%' }}>
            Successfully added a new auction!
          </Alert>
        </Snackbar>
      </Dialog>
    </div>
  );
}
