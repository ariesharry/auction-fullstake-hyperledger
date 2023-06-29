import ChartBarIcon from '@heroicons/react/24/solid/ChartBarIcon';
import CogIcon from '@heroicons/react/24/solid/CogIcon';
import LockClosedIcon from '@heroicons/react/24/solid/LockClosedIcon';
import ShoppingBagIcon from '@heroicons/react/24/solid/ShoppingBagIcon';
import UserIcon from '@heroicons/react/24/solid/UserIcon';
import UserPlusIcon from '@heroicons/react/24/solid/UserPlusIcon';
import UsersIcon from '@heroicons/react/24/solid/UsersIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import XCircleIcon from '@heroicons/react/24/solid/XCircleIcon';
import { SvgIcon } from '@mui/material';
import BuildingOffice2Icon from '@heroicons/react/24/solid/BuildingOffice2Icon'

export const items = [
  {
    title: 'Dashboard',
    path: '/',
    icon: (
      <SvgIcon fontSize="small">
        <ChartBarIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Add Commodity',
    path: '/customers',
    icon: (
      <SvgIcon fontSize="small">
        <PlusIcon />
      </SvgIcon>
    )
  },
  {
    title: 'My Auction',
    path: '/myauction',
    icon: (
      <SvgIcon fontSize="small">
        <ShoppingBagIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Explorer',
    path: '/explorer',
    icon: (
      <SvgIcon fontSize="small">
        <BuildingOffice2Icon />
      </SvgIcon>
    )
  },
  {
    title: 'PKS Profile',
    path: '/pksprofile',
    icon: (
      <SvgIcon fontSize="small">
        <BuildingOffice2Icon />
      </SvgIcon>
    )
  },
  {
    title: 'Material Flow',
    path: '/materialflow',
    icon: (
      <SvgIcon fontSize="small">
        <BuildingOffice2Icon />
      </SvgIcon>
    )
  },
  {
    title: 'Account',
    path: '/account',
    icon: (
      <SvgIcon fontSize="small">
        <UserIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Settings',
    path: '/settings',
    icon: (
      <SvgIcon fontSize="small">
        <CogIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Login',
    path: '/auth/login',
    icon: (
      <SvgIcon fontSize="small">
        <LockClosedIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Register',
    path: '/auth/register',
    icon: (
      <SvgIcon fontSize="small">
        <UserPlusIcon />
      </SvgIcon>
    )
  }
];
