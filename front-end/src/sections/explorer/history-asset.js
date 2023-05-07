import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';
import { Card, InputAdornment, OutlinedInput, SvgIcon, CardHeader, Button , Typography } from '@mui/material';
import ArrowPathIcon from '@heroicons/react/24/solid/ArrowPathIcon';
import { Radio, Timeline } from 'antd';
import { useState } from 'react';

export const HistoryAsset = () => (
  
  <Card>
    <CardHeader
        action={(
          <Button
            color="inherit"
            size="small"
            startIcon={(
              <SvgIcon fontSize="small">
                <ArrowPathIcon />
              </SvgIcon>
            )}
          >
            Sync
          </Button>
        )}
        title="Commodity History"
      />
    <Timeline
        reverse="True"
        mode="left"
        items={[
          {
            label: '2023-05-01',
            children: (
              <>
                <p>Status: ISSUED</p>
                <p>Commodity: CPO</p>
                <p>Quantity: 10000</p>
                <p>Owner: Seller</p>
              </>
            )},
          {
            label: '2023-05-03',
            children: (
              <>
                <p>Status: TRADING</p>
                <p>Commodity: CPO</p>
                <p>Quantity: 5000</p>
                <p>Owner: Bidder1</p>
              </>
            )},
          {
            label: '2023-05-03',
            children: (
              <>
                <p>Status: TRADING</p>
                <p>Commodity: CPO</p>
                <p>Quantity: 5000</p>
                <p>Owner: Bidder2</p>
              </>
            )},
          {
            label: '2023-05-14',
            children: (
              <>
                <p>Status: DELIVERED</p>
                <p>Commodity: CPO</p>
                <p>Quantity: 10000</p>
                <p>Owner: Bidder1, Bidder2</p>
              </>
            )},
        ]}
      />
  </Card>
);
