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
                <p>Quantity: 2000</p>
                <p>Owner: PTPN</p>
              </>
            )},
          {
            label: '07-05-2023',
            children: (
              <>
                <p>Status: TRADING</p>
                <p>Commodity: CPO</p>
                <p>Quantity: 500</p>
                <p>Owner: Sinarmas</p>
              </>
            )},
          {
            label: '07-05-2023',
            children: (
              <>
                <p>Status: TRADING</p>
                <p>Commodity: CPO</p>
                <p>Quantity: 500</p>
                <p>Owner: Wilmar</p>
              </>
            )},
          {
            label: '07-05-2023',
            children: (
              <>
                <p>Status: TRADING</p>
                <p>Commodity: CPO</p>
                <p>Quantity: 1000</p>
                <p>Owner: PHPO</p>
              </>
            )},
        
        ]}
      />
  </Card>
);
