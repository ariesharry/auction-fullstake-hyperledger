import React, { useCallback, useMemo, useEffect, useState } from 'react';
import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography, Grid } from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
// import { CustomersTable } from 'src/sections/auction/auction-table';
import { CommodityList } from 'src/sections/auction/auction-table';
import { CustomersSearch } from 'src/sections/commodity/customers-search';
import { applyPagination } from 'src/utils/apply-pagination';
import { CommodityForm } from 'src/sections/auction/auction-form';
import axios from 'axios';


const Page = () => {

  const [dataAuction, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('http://103.250.10.234:3001/queryAuction', {
          org: 'org1',
          user: 'seller',
          auctionID: 'auction1'
        });
        setData([response.data.auctionDetails]);
        // console.log(auctionData);
        // console.log(auctionData.item);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [] );

  console.log(dataAuction[0]);

  //this moved from above lol :D
  const now = new Date();

  const data = [
    {
      id: '5e887ac47eed253091be10cb',
      address: {
        city: 'Cleveland',
        country: 'USA',
        state: 'Ohio',
        street: '2849 Fulton Street'
      },
      avatar: '/assets/avatars/avatar-carson-darrin.png',
      createdAt: subDays(subHours(now, 7), 1).getTime(),
      email: dataAuction.item,
      name: 'auction1',
      phone: '10000'
    }
    
  ];
  
  const useCustomers = (page, rowsPerPage) => {
    return useMemo(
      () => {
        return applyPagination(data, page, rowsPerPage);
      },
      [page, rowsPerPage]
    );
  };
  
  const useCustomerIds = (customers) => {
    return useMemo(
      () => {
        return customers.map((customer) => customer.id);
      },
      [customers]
    );
  };
  //end-this moved from above lol :D

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const customers = useCustomers(page, rowsPerPage);
  const customersIds = useCustomerIds(customers);
  const customersSelection = useSelection(customersIds);

  const handlePageChange = useCallback(
    (event, value) => {
      setPage(value);
    },
    []
  );

  const handleRowsPerPageChange = useCallback(
    (event) => {
      setRowsPerPage(event.target.value);
    },
    []
  );

  return (
    <>
      <Head>
        <title>
          Add New Auction | Add Auction System
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
          <Stack spacing={3}>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >
              <Stack spacing={1}>
                <Typography variant="h4">
                  Add New Auction
                </Typography>
                {/* <Stack
                  alignItems="center"
                  direction="row"
                  spacing={1}
                >
                  <Button
                    color="inherit"
                    startIcon={(
                      <SvgIcon fontSize="small">
                        <ArrowUpOnSquareIcon />
                      </SvgIcon>
                    )}
                  >
                    Import
                  </Button>
                  <Button
                    color="inherit"
                    startIcon={(
                      <SvgIcon fontSize="small">
                        <ArrowDownOnSquareIcon />
                      </SvgIcon>
                    )}
                  >
                    Export
                  </Button>
                </Stack> */}
              </Stack>
              <div>
                <Button
                  startIcon={(
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  )}
                  variant="contained"
                >
                  Add
                </Button>
              </div>
            </Stack>
            <CustomersSearch />
            {/* <Grid
            xs={12}
            md={12}
            lg={12}
            >
              <CommodityList
                sx={{ height: '100%' }}
              />
            </Grid> */}
            <CommodityForm />
            {/* <Grid
                xs={12}
                md={6}
                lg={8}
              >
                
            </Grid> */}
            {/* <CustomersTable
              count={data.length}
              items={customers}
              onDeselectAll={customersSelection.handleDeselectAll}
              onDeselectOne={customersSelection.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={customersSelection.handleSelectAll}
              onSelectOne={customersSelection.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={customersSelection.selected}
            /> */}
            
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
