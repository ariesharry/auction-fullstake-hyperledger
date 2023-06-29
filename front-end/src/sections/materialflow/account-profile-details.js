import { useCallback, useState, useEffect } from 'react';
import axios from 'axios';
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

export const AccountProfileDetails = (props) => {
  const [values, setValues] = useState({
    name: '',
    itemID: '',
    issuer: '',
    description: '',
    quantity: '',
    quality: '',
    producer: '',
    issueDate: '',
    maturityDate: '',
    lotNumber: '',
  });

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

  const addPKSProfile = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8069/vit_api/create/profile.pks', {
      name: values.name,
      location: values.location,
      contactInformation: values.contactInformation,
      operationalStatus: values.operationalStatus,
      millCapacity: values.millCapacity,
      certificationDetails: values.certificationDetails
    });
    console.log(response);
  };

  // const queryPKSProfile = (e) => {
  //   // e.preventDefault();
  //   axios.post('https://f1d1-2001-448a-2020-e659-d59b-2396-892a-97f9.ngrok-free.app//vit_api/read/profile.pks/82', {
    
  //   }).then(res => setValues([res[0]])).catch(err => console.log(err));
  // };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://7dfc-114-124-131-9.ngrok-free.app/vit_api/read/material_flow.commodity/'+ props.idValue
        );

        if (response.ok) {
          const data = await response.json();
          console.log(data[0]);
          setValues(data[0]);
        } else {
          throw new Error('Error fetching data from the API');
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [props.idValue]);
  
  // console.log(queryPKSProfile())

  return (
    <form
      autoComplete="off"
      noValidate
      onSubmit={handleSubmit}
    >
      <Card>
        <CardHeader
          subheader=""
          title="Commodity"
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
                  label="Commodity Name"
                  name="name"
                  onChange={handleChange}
                  required
                  value={values.name}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Item id"
                  name="itemID"
                  onChange={handleChange}
                  required
                  value={values.itemID}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Issuer"
                  name="issuer"
                  onChange={handleChange}
                  required
                  value={values.issuer}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Description"
                  name="description"
                  onChange={handleChange}
                  value={values.description}
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
                  value={values.quantity}
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
                  required
                  value={values.quality}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Producer"
                  name="producer"
                  onChange={handleChange}
                  required
                  value={values.producer}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Issue date"
                  name="issueDate"
                  onChange={handleChange}
                  required
                  value={values.issueDate}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Maturity date"
                  name="maturityDate"
                  onChange={handleChange}
                  required
                  value={values.maturityDate}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Lot Number"
                  name="lotNumber"
                  onChange={handleChange}
                  required
                  value={values.lotNumber}
                />
              </Grid>
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        {/* <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button variant="contained">
            Save details
          </Button>
        </CardActions> */}
      </Card>
    </form>
  );
};
