import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import { Button, Card, InputAdornment, OutlinedInput, SvgIcon, Box, Container, Typography, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { HistoryAsset } from 'src/sections/explorer/history-asset';
import DetailsCommodity from 'src/sections/explorer/details-commodity';
import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';

const now = new Date();

const Page = () => (
  
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
                  defaultValue=""
                  fullWidth
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
                  <Button variant="contained" size="large">Trace</Button>
              </Grid>
            
            
          </Card>            
          </Grid>

          <Grid
            xs={12}
            md={12}
            lg={7}
          >
            <DetailsCommodity />
            
          </Grid>

          <Grid
            xs={12}
            md={12}
            lg={5}
          >
            <HistoryAsset />
            
          </Grid>
          
          
        </Grid>
      </Container>
    </Box>
  </>
);

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
