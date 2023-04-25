import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { useCallback, useState } from 'react';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import * as React from 'react';
import MuiAlert from '@mui/material/Alert';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Unstable_Grid2 as Grid
} from '@mui/material';

const states = [
  {
    value: 'alabama',
    label: 'Alabama'
  },
  {
    value: 'new-york',
    label: 'New York'
  },
  {
    value: 'san-francisco',
    label: 'San Francisco'
  },
  {
    value: 'los-angeles',
    label: 'Los Angeles'
  }
];

export const CommodityForm = () => {
  const [values, setValues] = useState({
    issuer: '',
    id: '',
    issueDate: '',
    maturityDate: '',
    quantity: '',
    commodity: '',
    lotNumber: '',
    quality: '',
    producer: '',
    certification: '',
    portOfLoading: '',
    deliveryConditions: ''
  });

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
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

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
    },
    []
  );

  const addAuction = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/auction', {
      org: values.org,
      user: values.user,
      auctionID: values.auctionID,
      item: values.item,
      quantity: values.quantity,
      auditor: "withAuditor"
    }).then(res => console.log("adding new auction", res)).catch(err => console.log(err));
    handleClick();
  };

  const [commodity, setCommodity] = React.useState('');

  const handleChangeCommodity = (event) => {
    setCommodity(event.target.value);
  };

  return (
    <form
      autoComplete="off"
      noValidate
      onSubmit={handleSubmit}
    >
      <Card>
        <CardHeader
          subheader="Add new asset commodity"
          title="Add Asset Commodity"
        />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid
              container
              spacing={3}
            >
              <Grid
                xs={12}
                md={4}
              >
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Commodity</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={commodity}
                    label="Commodity"
                    name='commodity'
                    onChange={handleChangeCommodity}
                  >
                    <MenuItem value={1}>Crude Palm Oil</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid
                xs={12}
                md={4}
              >
                <TextField
                  fullWidth
                  label="Issuer"
                  name="issuer"
                  onChange={handleChange}
                  required
                  value={values.item}
                />
              </Grid>

              <Grid
                xs={12}
                md={4}
              >
                <TextField
                  fullWidth
                  label="Id"
                  name="id"
                  onChange={handleChange}
                  required
                  value={values.item}
                />
              </Grid>

              <Grid
                xs={12}
                md={4}
              >
                <TextField
                  fullWidth
                  label="Quantity"
                  name="quanity"
                  onChange={handleChange}
                  required
                  value={values.org}
                />
              </Grid>
              <Grid
                xs={12}
                md={4}
              >
                <TextField
                  fullWidth
                  label="Issue Date"
                  name="issueDate"
                  onChange={handleChange}
                  required
                  value={values.user}
                />
              </Grid>

              <Grid
                xs={12}
                md={4}
              >
                <TextField
                  fullWidth
                  label="Maturity Date"
                  name="maturityDate"
                  onChange={handleChange}
                  required
                  value={values.user}
                />
              </Grid>
              
              <Grid
                xs={12}
                md={8}
              >
                <TextField
                  fullWidth
                  label="Quality"
                  name="quality"
                  onChange={handleChange}
                  // value={values.phone}
                />
              </Grid>
              <Grid
                xs={12}
                md={4}
              >
                <TextField
                  fullWidth
                  label="Lot Number"
                  name="lotNumber"
                  onChange={handleChange}
                  // value={values.phone}
                />
              </Grid>
              <Grid
                xs={12}
                md={8}
              >
                <TextField
                  fullWidth
                  label="Producer"
                  name="producer"
                  onChange={handleChange}
                  required
                  // value={values.country}
                />
              </Grid>
              <Grid
                xs={12}
                md={4}
              >
                <TextField
                  fullWidth
                  label="Certification"
                  name="certification"
                  onChange={handleChange}
                  required
                  // value={values.country}
                />
              </Grid>
              <Grid
                xs={12}
                md={8}
              >
                <TextField
                  fullWidth
                  label="Port of Loading"
                  name="portOfLoading"
                  onChange={handleChange}
                  required
                  value= "IDR"
                />
              </Grid>
              <Grid
                xs={12}
                md={4}
              >
                <TextField
                  fullWidth
                  label="Delivery Conditions"
                  name="deliveryConditions"
                  onChange={handleChange}
                  required
                  // value={values.country}
                />
              </Grid>
              
              {/* <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Select State"
                  name="state"
                  onChange={handleChange}
                  required
                  select
                  SelectProps={{ native: true }}
                  value={values.state}
                >
                  {states.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </option>
                  ))}
                </TextField>
              </Grid> */}
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button
          variant="contained"
          loading={true}
          onClick={addAuction}>
            Add Asset Commodity
          </Button>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
              Successfully added a new asset commodity!
            </Alert>
          </Snackbar>
        </CardActions>
      </Card>
    </form>
  );
};
