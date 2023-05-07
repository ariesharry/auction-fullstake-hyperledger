import { Descriptions } from 'antd';
import { Card, CardHeader, Button, SvgIcon } from '@mui/material';
import ArrowPathIcon from '@heroicons/react/24/solid/ArrowPathIcon';
import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function DetailsCommodity(props) {
  const [openAlert, setOpenAlert] = React.useState(false);

  


  return (

    <Card sx={{p:4}}>
        
      <Descriptions
        title="Commodity Details"
        bordered
        column={{
          xxl: 4,
          xl: 2,
          lg: 2,
          md: 2,
          sm: 1,
          xs: 1,
        }}
      >
        <Descriptions.Item label="Issuer"> { props.dataAuction[0].issuer } </Descriptions.Item>
        <Descriptions.Item label="Owner"> { props.dataAuction[0].owner } </Descriptions.Item>
        <Descriptions.Item label="Id"> { props.dataAuction[0].id } </Descriptions.Item>
        <Descriptions.Item label="Issue Date"> { props.dataAuction[0].issueDateTime } </Descriptions.Item>
        <Descriptions.Item label="Maturity Date"> { props.dataAuction[0].maturityDateTime } </Descriptions.Item>
        <Descriptions.Item label="Quantity"> { props.dataAuction[0].quantity } </Descriptions.Item>
        <Descriptions.Item label="Commodity"> { props.dataAuction[0].commodity } </Descriptions.Item>
        <Descriptions.Item label="Lot Number"> { props.dataAuction[0].lotNumber } </Descriptions.Item>
        <Descriptions.Item label="Quality"> { props.dataAuction[0].quality } </Descriptions.Item>
        <Descriptions.Item label="Producer"> { props.dataAuction[0].producer } </Descriptions.Item>
        <Descriptions.Item label="Certification"> { props.dataAuction[0].certification } </Descriptions.Item>
        <Descriptions.Item label="Port of Loading"> { props.dataAuction[0].portOfLoading } </Descriptions.Item>
        <Descriptions.Item label="Delivery Conditions"> { props.dataAuction[0].deliveryConditions } </Descriptions.Item>
        <Descriptions.Item label="Status"> { props.dataAuction[0].currentState } </Descriptions.Item>
      </Descriptions>
    </Card>
  );

}
  
