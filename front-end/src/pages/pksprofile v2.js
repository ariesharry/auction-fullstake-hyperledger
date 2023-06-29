import Head from 'next/head';
import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { AccountProfile } from 'src/sections/pksprofile/account-profile';
import { AccountProfileDetails } from 'src/sections/pksprofile/account-profile-details';
import { subDays, subHours } from 'date-fns';
import { Button, Card, InputAdornment, OutlinedInput, SvgIcon } from '@mui/material';
import { HistoryAsset } from 'src/sections/explorer/history-asset';
import DetailsCommodity from 'src/sections/explorer/details-commodity';
import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';
import { useState, useCallback } from 'react';
import axios from 'axios';
import Fade from '@mui/material/Fade';

const Page = () => (
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
        py: 8
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={3}>
          <div>
            <Typography variant="h4">
              PKS Profile
            </Typography>
          </div>
          <div>
            <Grid
              container
              spacing={3}
            >
              <Grid
                item xs={12}
              >
                <OutlinedInput
                  defaultValue="PKS ID"
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
                xs={12}
                
                lg={12}
              >
                <AccountProfileDetails />
              </Grid>
            </Grid>
          </div>
        </Stack>
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
