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
import { ExplorerSearch } from 'src/sections/explorer/explorer-search';
import { HistoryAsset } from 'src/sections/explorer/history-asset';
import DetailsCommodity from 'src/sections/explorer/details-commodity';

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
            <ExplorerSearch />
            
          </Grid>

          <Grid
            xs={12}
            md={12}
            lg={6}
          >
            <DetailsCommodity />
            
          </Grid>

          <Grid
            xs={12}
            md={12}
            lg={12}
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
