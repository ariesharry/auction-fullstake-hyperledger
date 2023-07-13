import { format } from 'date-fns';
import PropTypes from 'prop-types';
import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box, Grid,
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
  Accepted: 'success',
  Withdrawn: 'error'
};

export const BidHistory = (props) => {

  const [dataAuction, setData] = useState([{
        id: 'Sinarmas',
        bidder: 'Sinarmas',
        price: '11900',
        quantity: '500',
        status: 'Accepted'
      },
      {
        id: 'Sinarmas',
        bidder: 'Wilmar',
        price: '11900',
        quantity: '500',
        status: 'Accepted'
      },
      {
        id: 'Sinarmas',
        bidder: 'PHPO',
        price: '11900',
        quantity: '1000',
        status: 'Accepted'
      },
      {
        id: 'Sinarmas',
        bidder: 'IBP',
        price: '11700',
        quantity: '500',
        status: 'Withdrawn'
      },
      {
        id: 'Sinarmas',
        bidder: 'Nagamas',
        price: '11800',
        quantity: '500',
        status: 'Withdrawn'
      },
      {
        id: 'Sinarmas',
        bidder: 'KJA',
        price: '11850',
        quantity: '500',
        status: 'Withdrawn'
      }]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.post('http://103.250.10.234:3001/queryAuction', {
  //         org: 'org1',
  //         user: 'ptpn5',
  //         auctionID: '0001'
  //       });
  //       setData([response.data.auctionDetails]);
  //       // console.log(auctionData);
  //       // console.log(auctionData.item);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   fetchData();
  // }, [] );

  // console.log(dataAuction[0]['item']);

  // const orders = [
  //   {
  //     id: 'auction1',
  //     seller: 'PTPN',
  //     quantity: dataAuction[0]['quantity'],
  //     item: dataAuction[0]['item'],
  //     createdAt: 1555016400000,
  //     status: dataAuction[0]['status']
  //   },
  //   {
  //     id: 'auction2',
  //     seller: 'PTPN',
  //     quantity: dataAuction[0]['quantity'],
  //     item: dataAuction[0]['item'],
  //     createdAt: 1555016400000,
  //     status: dataAuction[0]['status']
  //   },
  //   {
  //     id: 'auction3',
  //     seller: 'PTPN',
  //     quantity: dataAuction[0]['quantity'],
  //     item: dataAuction[0]['item'],
  //     createdAt: 1555016400000,
  //     status: dataAuction[0]['status']
  //   },
  //   {
  //     id: 'auction4',
  //     seller: 'PTPN',
  //     quantity: dataAuction[0]['quantity'],
  //     item: dataAuction[0]['item'],
  //     createdAt: 1555016400000,
  //     status: dataAuction[0]['status']
  //   },
  //   {
  //     id: 'auction5',
  //     seller: 'PTPN',
  //     quantity: dataAuction[0]['quantity'],
  //     item: dataAuction[0]['item'],
  //     createdAt: 1555016400000,
  //     status: dataAuction[0]['status']
  //   },
  //   {
  //     id: 'auction6',
  //     seller: 'PTPN',
  //     quantity: dataAuction[0]['quantity'],
  //     item: dataAuction[0]['item'],
  //     createdAt: 1555016400000,
  //     status: dataAuction[0]['status']
  //   }
  // ]
  const { sx } = props;

  return (
    <Card sx={sx}>
      <CardHeader title="Bid History" />
      <Scrollbar sx={{ flexGrow: 1 }}>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Auction ID
                </TableCell>
                <TableCell>
                  Bidder
                </TableCell>
                <TableCell>
                  Bid Price
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
              {dataAuction.map((order) => {
                // const createdAt = format(order.createdAt, 'dd/MM/yyyy');

                return (
                  <TableRow
                    hover
                    key={order.id}
                  >
                    <TableCell>
                      0001
                    </TableCell>
                    <TableCell>
                      {order.bidder}
                    </TableCell>
                    <TableCell>
                      {order.price}
                    </TableCell>
                    <TableCell>
                      {order.quantity}
                    </TableCell>
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

BidHistory.prototype = {
  dataAuction: PropTypes.array,
  sx: PropTypes.object
};
