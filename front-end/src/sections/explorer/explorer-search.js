import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';
import { Card, InputAdornment, OutlinedInput, SvgIcon } from '@mui/material';

export const ExplorerSearch = () => (
  <Card sx={{ p: 4 }}>
    <OutlinedInput
      defaultValue=""
      fullWidth
      placeholder="Trace Asset Commodity"
      startAdornment={(
        <InputAdornment position="start">
          <SvgIcon
            color="action"
            fontSize="small"
          >
            <MagnifyingGlassIcon />
          </SvgIcon>
        </InputAdornment>
      )}
      
    />
  </Card>
);
