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
            label: '2020-04-07',
            children: (
              <>
                <p>Status: ISSUED</p>
                <p>Commodity: CPO</p>
                <p>Quantity: 2000</p>
                <p>Owner: PTPN IV</p>
              </>
            )},
          {
            label: '2020-04-07',
            children: (
              <>
                <p>Status: TRADING</p>
                <p>Commodity: CPO</p>
                <p>Quantity: 500</p>
                <p>Owner: PHPO</p>
              </>
            )},
          {
            label: '2020-04-07',
            children: (
              <>
                <p>Status: TRADING</p>
                <p>Commodity: CPO</p>
                <p>Quantity: 500</p>
                <p>Owner: NPO</p>
              </>
            )},
          {
            label: '2020-04-07',
            children: (
              <>
                <p>Status: TRADING</p>
                <p>Commodity: CPO</p>
                <p>Quantity: 1000</p>
                <p>Owner: WNI</p>
              </>
            )},
        
        ]}
      />
  </Card>
);
