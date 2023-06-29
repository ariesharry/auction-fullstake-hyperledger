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

export const CommodityList = (props) => {

  const [dataAuction, setData] = useState([{
        id: '',
        date: '',
        name: '',
        volume: ''
      }]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://7dfc-114-124-131-9.ngrok-free.app/vit_api/list/profile.production_history?fields=["id","date","name","volume"]'
        );

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setData(data);
        } else {
          throw new Error('Error fetching data from the API');
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.post('https://f1d1-2001-448a-2020-e659-d59b-2396-892a-97f9.ngrok-free.app/vit_api/list/profile.production_history?fields=["id","date","name","volume"]');
  //       setData([response[0]]);
  //       console.log(auctionData);
  //       // console.log(auctionData.item);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   fetchData();
  // }, [] );

  const { sx } = props;

  return (
    <Card sx={sx}>
      <CardHeader title="Sales History" />
      <Scrollbar sx={{ flexGrow: 1 }}>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  ID
                </TableCell>
                <TableCell>
                  Date
                </TableCell>
                <TableCell>
                  Name
                </TableCell>
                <TableCell>
                  Volume
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataAuction.map((order) => {
                

                return (
                  <TableRow
                    hover
                    key={order.id}
                  >
                    <TableCell>
                      {order.id}
                    </TableCell>
                    <TableCell>
                      {order.date}
                    </TableCell>
                    <TableCell>
                      {order.name}
                    </TableCell>
                    <TableCell>
                      {order.volume}
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
