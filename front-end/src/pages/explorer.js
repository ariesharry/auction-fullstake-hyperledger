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


const Page = () => {

  const now = new Date();
  const [values, setValues] = useState({
    id: ''});
  const [data, setData] = useState([
    {
      
          0: {
            TxId:"001",
            Value: {
                  
              }
          },
          class: "org.papernet.commercialpaper",
          key: ":",
          currentState: null
    }
  ]);

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

  const queryHistoryCommodity = () => {
    // e.preventDefault();
    axios.post('http://103.250.10.234:3001/queryCommodityId', {
      key: "MagnetoCorp",
      id: values.id
    }).then(res => setData([res.data.auctionCreated])).catch(err => console.log(err));
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

  const handleChangeFade = () => {
    setChecked((prev) => !prev);
  };

  
  return(
    <>
    <Head>
      <title>
        Dashboard | Auction System
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
                  placeholder="Trace Asset Commodity"
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
                  <Button variant="contained" size="large" onClick={function(event){queryHistoryCommodity(); handleChangeFade();}}>Trace</Button>
              </Grid>
            
            
          </Card>            
          </Grid>

          <Fade in={checked}>
          <Grid
            xs={12}
            md={12}
            lg={7}
          >
            <DetailsCommodity dataAuction = {dataAuction} />  
          </Grid>
          </Fade>

          <Fade in={checked}>
          <Grid
            xs={12}
            md={12}
            lg={5}
          >
            <HistoryAsset />
            
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
