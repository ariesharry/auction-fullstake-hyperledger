import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import { Box, Container, Typography, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { OverviewBudget } from 'src/sections/overview/overview-budget';
import { OverviewLatestOrders } from 'src/sections/overview/overview-latest-orders';
import { OverviewLatestProducts } from 'src/sections/overview/overview-latest-products';
import { OverviewSales } from 'src/sections/overview/overview-sales';
import { OverviewTasksProgress } from 'src/sections/overview/overview-tasks-progress';
import { OverviewTotalCustomers } from 'src/sections/overview/overview-total-customers';
import { OverviewTotalProfit } from 'src/sections/overview/overview-total-profit';
import { OverviewTraffic } from 'src/sections/overview/overview-traffic';
import { CustomersSearch } from 'src/sections/commodity/customers-search';
import { ChartComponent } from 'src/components/chart-tv';
import { CommodityList } from '../sections/commodity/commodity-list';

const now = new Date();

const Page = (props) => (
  
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
            <CustomersSearch />
            
          </Grid>
          
          {/* <Typography variant="h4">
            Dashboard
          </Typography> */}

<Grid
            xs={12}
            md={12}
            lg={12}
          >
            <CommodityList
              sx={{ height: '100%' }}
            />
          </Grid>

          <Grid
            xs={12}
            md={12}
            lg={12}
          >
            <OverviewLatestOrders
              sx={{ height: '100%' }}
            />
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
