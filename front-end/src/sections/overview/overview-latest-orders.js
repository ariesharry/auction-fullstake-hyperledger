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
import FormDialog from './bid';
import AuctionResult from './result';

const statusMap = {
  open: 'warning',
  closed: 'success',
  ended: 'error'
};

export const OverviewLatestOrders = (props) => {

  const [dataAuction, setData] = useState([{
        auctionID: 'null',
        seller: 'null',
        quantity: 'null',
        item: 'null',
        createdAt: 'null',
        status: 'null'
      }]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('http://20.5.96.89:3001/queryAuctionAll', {
          org: 'org1',
          user: 'PTPN4',
          status: 'open'
        });
        setData(response.data.auctionDetails);
        console.log(response.data.auctionDetails);
        // console.log(auctionData.item);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [] );

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
      <CardHeader title="CPO Auction" />
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
                <TableCell>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataAuction.map((order) => {
                // const createdAt = format(order.createdAt, 'dd/MM/yyyy');

                return (
                  <TableRow
                    hover
                    key={order.auctionID}
                  >
                    <TableCell>
                      {order.auctionID}
                    </TableCell>
                    <TableCell>
                      {order.item}
                    </TableCell>
                    <TableCell>
                      {order.seller.split(',')[0]}
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
                    <TableCell>

                      <FormDialog />
                      <br></br>
                      <AuctionResult />
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
  dataAuction: PropTypes.array,
  sx: PropTypes.object
};
