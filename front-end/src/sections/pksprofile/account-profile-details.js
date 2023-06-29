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
    location: '',
    contactInformation: '',
    operationalStatus: '',
    millCapacity: '',
    certificationDetails: ''
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


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://7dfc-114-124-131-9.ngrok-free.app/vit_api/read/profile.pks/'+ props.idValue
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
          subheader="The information can be edited"
          title=" PKS Profile"
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
                  label="PKS Name"
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
                  label="Location"
                  name="location"
                  onChange={handleChange}
                  required
                  value={values.location}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Contact Information"
                  name="contactInformation"
                  onChange={handleChange}
                  required
                  value={values.contactInformation}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Operational Status"
                  name="operationalStatus"
                  onChange={handleChange}
                  value={values.operationalStatus}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Mill Capacity (ton/h)"
                  name="millCapacity"
                  onChange={handleChange}
                  required
                  value={values.millCapacity}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Certificate"
                  name="certificationDetails"
                  onChange={handleChange}
                  required
                  value={values.certificationDetails}
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
