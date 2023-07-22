import { format } from 'date-fns';
import PropTypes from 'prop-types';
import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { SeverityPill } from 'src/components/severity-pill';
import FormDialog from './bid';

const statusMap = {
  trading: 'warning',
  issued: 'success',
  delivered: 'error'
};

export const CommodityList = (props) => {

  const [data, setData] = useState([
    {
      
          0: {
              Key:"null",
              Record: {
                  commodity: "null",
                  id: "null",  
                  owner: "null",
                  quantity: "null"
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

  console.log(updatedData);

  const dataT = updatedData.map((obj) => {
    const records = Object.values(obj); // Extract the records from the object
    const transformedRecords = records.map((record) => ({
      id: record.Record.id,
      commodity: record.Record.commodity,
      owner: record.Record.owner,
      quantity: record.Record.quantity,
      issueDateTime: record.Record.issueDateTime,
      maturityDateTime: record.Record.maturityDateTime,
      issuer: record.Record.issuer,
      lotNumber: record.Record.lotNumber,
      quality: record.Record.quality,
      producer: record.Record.producer,
      portOfLoading: record.Record.portOfLoading,
      deliveryConditions: record.Record.deliveryConditions,
      currentState: record.Record.currentState,
    }));
    return transformedRecords;
  });
  console.log(dataT);

  const dataAuction = [].concat(...dataT);

  console.log(dataAuction);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('http://20.5.96.89:3001/queryCommodity', {
        org: 'org1',
        user: 'PTPN4',  
        query: 'value'
        });
        setData([response.data.result]);
        console.log(response.data.result);
        // console.log(auctionData.item);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [] );

  
  const { sx } = props;

  return (
    <Card sx={sx}>
      <CardHeader title="CPO Commodity" />
      <Scrollbar sx={{ flexGrow: 1 }}>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  ID
                </TableCell>
                <TableCell>
                  Commodity
                </TableCell>
                <TableCell>
                  Owner
                </TableCell>
                <TableCell>
                  Quantity
                </TableCell>
                {/* <TableCell sortDirection="desc">
                  Tanggal
                </TableCell> */}
                <TableCell>
                  Status
                </TableCell>
                <TableCell>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataAuction.map((order) => {
                // const createdAt = format(order.createdAt, 'dd/MM/yyyy');
                const state = order.currentState === 1 ? 'issued' : order.currentState === 2 ? 'pending' : order.currentState === 3 ? 'trading' : order.currentState === 4 ? 'delivered' : null;

                return (
                  <TableRow
                    hover
                    key={order.id}
                  >
                    <TableCell>
                      {order.id}
                    </TableCell>
                    <TableCell>
                      {order.commodity}
                    </TableCell>
                    <TableCell>
                      {order.owner}
                    </TableCell>
                    <TableCell>
                      {order.quantity}
                    </TableCell>
                    {/* <TableCell>
                      {createdAt}
                    </TableCell> */}
                    <TableCell>
                      <SeverityPill color={statusMap[state]}>
                        {state}
                      </SeverityPill>
                    </TableCell>
                    <TableCell>
                      <FormDialog keyValue = {order.issuer} idValue = {order.id}/>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <Divider />
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button
          color="inherit"
          endIcon={(
            <SvgIcon fontSize="small">
              <ArrowRightIcon />
            </SvgIcon>
          )}
          size="small"
          variant="text"
        >
          View all
        </Button>
      </CardActions>
    </Card>
  );
};

CommodityList.prototype = {
  dataAuction: PropTypes.array,
  sx: PropTypes.object
};
