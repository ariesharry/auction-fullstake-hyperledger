import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import { Button, Card, InputAdornment, OutlinedInput, SvgIcon, Box, Container, Typography, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { HistoryAsset } from 'src/sections/explorer/history-asset';
import DetailsCommodity from 'src/sections/explorer/details-commodity';
import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';
import { useState, useCallback } from 'react';
import axios from 'axios';
import Fade from '@mui/material/Fade';
import { AccountProfileDetails } from 'src/sections/pksprofile/account-profile-details';
import { CommodityList } from 'src/sections/pksprofile/sales-table';


const Page = () => {

  const now = new Date();
  const [values, setValues] = useState({
    id: ''});
  const [data, setData] = useState({
    name: '',
    location: '',
    contactInformation: '',
    operationalStatus: '',
    millCapacity: '',
    certificationDetails: ''
  });

  console.log(data);

  const queryHistoryCommodity = () => {
    // e.preventDefault();
    axios.post('https://f1d1-2001-448a-2020-e659-d59b-2396-892a-97f9.ngrok-free.app/vit_api/read/profile.pks/81'
    ).then(res => setData([res])).catch(err => console.log(err));
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
  console.log(values.id);

  const [checked, setChecked] = useState(false);

  const [idValue, setIdValue] = useState();

  const handleChangeFade = () => {
    setChecked((prev) => !prev);
  };

  
  return(
    <>
    <Head>
      <title>
        PKS Profile
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 4
      }}
    >
      <Container maxWidth="xl">
        
        <Grid
          container
          spacing={2}
        >
          <Grid
            xs={12}
            md={12}
            lg={12}
          >
            <Card sx={{ p: 4 }}>
              <Grid
                item xs={12}
              >
                <OutlinedInput
                  defaultValue={values.id}
                  onChange={handleChange}
                  fullWidth
                  label="Id"
                  name="id"
                  placeholder="PKS ID"
                  startAdornment={(
                    <InputAdornment position="start">
                      <SvgIcon
                        color="action"
                        fontSize="small"
                      >
                        <MagnifyingGlassIcon />
                      </SvgIcon>
                    </InputAdornment>
                  )} 
                />
              </Grid>
              <Grid
                item xs={4}
                >
                  <Button variant="contained" size="large" onClick={function(event){handleChangeFade();}}>Find</Button>
              </Grid>
            
            
          </Card>            
          </Grid>

          <Fade in={checked}>
          <Grid
            xs={12}
            md={12}
            lg={7}
          >
            <AccountProfileDetails idValue ={values.id} />  
          </Grid>

          </Fade>

          <Fade in={checked}>
          <Grid
            xs={12}
            md={12}
            lg={7}
          >
            <CommodityList />  
          </Grid>

          </Fade>
           
        </Grid>
      </Container>
    </Box>
    </>

  )
  
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
