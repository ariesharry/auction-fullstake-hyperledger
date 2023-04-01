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
    org: '',
    user: '',
    auctionID: '',
    item: '',
    quantity: 0
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

  return (
    <form
      autoComplete="off"
      noValidate
      onSubmit={handleSubmit}
    >
      <Card>
        <CardHeader
          subheader="Add new auction"
          title="Add Auction"
        />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid
              container
              spacing={3}
            >
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Auction ID/Lot number"
                  name="auctionID"
                  onChange={handleChange}
                  required
                  value={values.auctionID}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  helperText="Enter the commodity (ex: CPO)"
                  label="Commodity"
                  name="item"
                  onChange={handleChange}
                  required
                  value={values.item}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Group"
                  name="org"
                  onChange={handleChange}
                  required
                  value={values.org}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Owner"
                  name="user"
                  onChange={handleChange}
                  required
                  value={values.user}
                />
              </Grid>
              
              <Grid
                xs={12}
                md={6}
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
                md={6}
              >
                <TextField
                  fullWidth
                  label="Quantity"
                  name="quantity"
                  onChange={handleChange}
                  required
                  type="number"
                  value={values.quantity}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Price"
                  name="price"
                  onChange={handleChange}
                  required
                  // value={values.country}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Factory"
                  name="factory"
                  onChange={handleChange}
                  required
                  // value={values.country}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Currency"
                  name="currency"
                  onChange={handleChange}
                  required
                  value= "IDR"
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Shippment"
                  name="shippment"
                  onChange={handleChange}
                  required
                  // value={values.country}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Port of Loading"
                  name="portOfLoading"
                  onChange={handleChange}
                  required
                  // value={values.country}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Delivery date"
                  name="deliveryDate"
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
            Add Auction
          </Button>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
              Successfully added a new auction!
            </Alert>
          </Snackbar>
        </CardActions>
      </Card>
    </form>
  );
};
