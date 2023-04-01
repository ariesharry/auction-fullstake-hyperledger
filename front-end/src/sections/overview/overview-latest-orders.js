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

const statusMap = {
  pending: 'warning',
  delivered: 'success',
  refunded: 'error'
};

export const OverviewLatestOrders = (props) => {

  const [dataAuction, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('http://localhost:3001/queryAuction', {
          org: 'org1',
          user: 'ptpn',
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

  console.log(dataAuction[0]['item']);

  const orders = [
    {
      id: 'f69f88012978187a6c12897f',
      ref: 'auction1',
      seller: 'PTPN',
      quantity: dataAuction[0]['quantity'],
      amount: 30.5,
      customer: {
        name: dataAuction[0]['item']
      },
      createdAt: 1555016400000,
      status: dataAuction[0]['status']
    },
    {
      id: '9eaa1c7dd4433f413c308ce2',
      ref: 'DEV1048',
      amount: 25.1,
      customer: {
        name: 'Cao Yu'
      },
      createdAt: 1555016400000,
      status: 'delivered'
    },
    {
      id: '01a5230c811bd04996ce7c13',
      ref: 'DEV1047',
      amount: 10.99,
      customer: {
        name: 'Alexa Richardson'
      },
      createdAt: 1554930000000,
      status: 'refunded'
    },
    {
      id: '1f4e1bd0a87cea23cdb83d18',
      ref: 'DEV1046',
      amount: 96.43,
      customer: {
        name: 'Anje Keizer'
      },
      createdAt: 1554757200000,
      status: 'pending'
    },
    {
      id: '9f974f239d29ede969367103',
      ref: 'DEV1045',
      amount: 32.54,
      customer: {
        name: 'Clarke Gillebert'
      },
      createdAt: 1554670800000,
      status: 'delivered'
    },
    {
      id: 'ffc83c1560ec2f66a1c05596',
      ref: 'DEV1044',
      amount: 16.76,
      customer: {
        name: 'Adam Denisov'
      },
      createdAt: 1554670800000,
      status: 'delivered'
    }
  ]
  const { sx } = props;

  return (
    <Card sx={sx}>
      <CardHeader title="Crude Palm Oil Auction" />
      <Scrollbar sx={{ flexGrow: 1 }}>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Auction ID
                </TableCell>
                <TableCell>
                  Commodity
                </TableCell>
                <TableCell>
                  Seller
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
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => {
                const createdAt = format(order.createdAt, 'dd/MM/yyyy');

                return (
                  <TableRow
                    hover
                    key={order.id}
                  >
                    <TableCell>
                      {order.ref}
                    </TableCell>
                    <TableCell>
                      {order.customer.name}
                    </TableCell>
                    <TableCell>
                      {order.seller}
                    </TableCell>
                    <TableCell>
                      {order.quantity}
                    </TableCell>
                    {/* <TableCell>
                      {createdAt}
                    </TableCell> */}
                    <TableCell>
                      <SeverityPill color={statusMap[order.status]}>
                        {order.status}
                      </SeverityPill>
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

OverviewLatestOrders.prototype = {
  orders: PropTypes.array,
  sx: PropTypes.object
};
