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
            label: '07-05-2023',
            children: (
              <>
                <p>Status: ISSUED</p>
                <p>Commodity: CPO</p>
                <p>Quantity: 10000</p>
                <p>Owner: PTPN</p>
              </>
            )},
          {
            label: '07-05-2023',
            children: (
              <>
                <p>Status: TRADING</p>
                <p>Commodity: CPO</p>
                <p>Quantity: 3000</p>
                <p>Owner: bidder1</p>
              </>
            )},
          {
            label: '07-05-2023',
            children: (
              <>
                <p>Status: TRADING</p>
                <p>Commodity: CPO</p>
                <p>Quantity: 2500</p>
                <p>Owner: bidder2</p>
              </>
            )},
          {
            label: '07-05-2023',
            children: (
              <>
                <p>Status: TRADING</p>
                <p>Commodity: CPO</p>
                <p>Quantity: 2000</p>
                <p>Owner: bidder4</p>
              </>
            )},
            {
              label: '07-05-2023',
              children: (
                <>
                  <p>Status: TRADING</p>
                  <p>Commodity: CPO</p>
                  <p>Quantity: 2500</p>
                  <p>Owner: bidder13</p>
                </>
              )},
        ]}
      />
  </Card>
);
