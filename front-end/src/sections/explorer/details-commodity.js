import { Descriptions } from 'antd';
import { Card, CardHeader, Button, SvgIcon } from '@mui/material';
import ArrowPathIcon from '@heroicons/react/24/solid/ArrowPathIcon';
import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function DetailsCommodity() {
  const [openAlert, setOpenAlert] = React.useState(false);

  const [data, setData] = useState([
    {
      
          0: {
            TxId:"001",
            Value: {
                  
              }
          },
          class: "org.papernet.commercialpaper",
          key: ":",
          currentState: null
    }
  ]);

  console.log(data);

  const updatedData = data.map(obj => {
    delete obj.key;
    delete obj.class;
    delete obj.currentState;
    return obj;
  });

  const dataT = updatedData.map((obj) => {
    const records = Object.values(obj); // Extract the records from the object
    const transformedRecords = records.map((record) => ({
      id: record.Value.id,
      commodity: record.Value.commodity,
      owner: record.Value.owner,
      quantity: record.Value.quantity,
      issueDateTime: record.Value.issueDateTime,
      maturityDateTime: record.Value.maturityDateTime,
      issuer: record.Value.issuer,
      lotNumber: record.Value.lotNumber,
      quality: record.Value.quality,
      producer: record.Value.producer,
      certification: record.Value.certification,
      portOfLoading: record.Value.portOfLoading,
      deliveryConditions: record.Value.deliveryConditions,
      currentState: record.Value.currentState,
      owner: record.Value.owner,
    }));
    return transformedRecords;
  });

  const dataAuction = [].concat(...dataT);
  console.log(dataAuction);
  console.log(dataAuction[0].issuer);

  const queryHistoryCommodity = () => {
    // e.preventDefault();
    axios.post('http://103.250.10.234:3001/queryCommodityId', {
      key: "MagnetoCorp",
      id: "00001"
    }).then(res => setData([res.data.auctionCreated])).catch(err => console.log(err));
  };

  queryHistoryCommodity();


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
        <Descriptions.Item label="Issuer"> { dataAuction[0].issuer } </Descriptions.Item>
        <Descriptions.Item label="Owner"> { dataAuction[0].owner } </Descriptions.Item>
        <Descriptions.Item label="Id"> { dataAuction[0].id } </Descriptions.Item>
        <Descriptions.Item label="Issue Date"> { dataAuction[0].issueDateTime } </Descriptions.Item>
        <Descriptions.Item label="Maturity Date"> { dataAuction[0].maturityDateTime } </Descriptions.Item>
        <Descriptions.Item label="Quantity"> { dataAuction[0].quantity } </Descriptions.Item>
        <Descriptions.Item label="Commodity"> { dataAuction[0].commodity } </Descriptions.Item>
        <Descriptions.Item label="Lot Number"> { dataAuction[0].lotNumber } </Descriptions.Item>
        <Descriptions.Item label="Quality"> { dataAuction[0].quality } </Descriptions.Item>
        <Descriptions.Item label="Producer"> { dataAuction[0].producer } </Descriptions.Item>
        <Descriptions.Item label="Certification"> { dataAuction[0].certification } </Descriptions.Item>
        <Descriptions.Item label="Port of Loading"> { dataAuction[0].portOfLoading } </Descriptions.Item>
        <Descriptions.Item label="Delivery Conditions"> { dataAuction[0].deliveryConditions } </Descriptions.Item>
        <Descriptions.Item label="Status"> { dataAuction[0].currentState } </Descriptions.Item>
      </Descriptions>
    </Card>
  );

}
  
