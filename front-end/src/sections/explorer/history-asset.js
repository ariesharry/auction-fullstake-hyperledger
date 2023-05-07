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
            label: '2015-09-01',
            children: (
              <>
                <p>Solve initial network problems 1</p>
                <p>Solve initial network problems 2</p>
                <p>Solve initial network problems 3</p>
              </>
            )},
          {
            label: '2015-09-01',
            children: (
              <>
                <p>Solve initial network problems 1</p>
                <p>Solve initial network problems 2</p>
                <p>Solve initial network problems 3</p>
              </>
            )},
          {
            label: '2015-09-01',
            children: (
              <>
                <p>Solve initial network problems 1</p>
                <p>Solve initial network problems 2</p>
                <p>Solve initial network problems 3</p>
              </>
            )},
          {
            label: '2015-09-01',
            children: (
              <>
                <p>Solve initial network problems 1</p>
                <p>Solve initial network problems 2</p>
                <p>Solve initial network problems 3</p>
              </>
            )},
        ]}
      />
  </Card>
);
