import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { InputAdornment } from '@mui/material';

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Bid
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Bid</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Input your bid (quantity and price),<br></br>
            Note: Once you have submitted your bid, it cannot be changed
          </DialogContentText>
          <br></br>
          <TextField
          label="Price"
          id="price"
          type="number"
          sx={{ m: 1, width: '25ch' }}
          variant="outlined"
          required
          InputProps={{
            startAdornment: <InputAdornment position="start">Rp</InputAdornment>,
          }}
        />
          <TextField
          label="Quantity"
          id="quantity"
          type="number"
          sx={{ m: 1, width: '25ch' }}
          variant="outlined"
          defaultValue="500"
          required
          InputProps={{
            endAdornment: <InputAdornment position="end">Ton</InputAdornment>,
          }}
        />
        
          {/* <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Quantity"
            type="number"
            fullWidth
            variant="outlined"
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Price"
            type="number"
            fullWidth
            variant="standard"
          /> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
