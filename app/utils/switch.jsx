import * as React from 'react';
import Switch from '@mui/material/Switch';

const label = { inputProps: { 'aria-label': 'Switch demo' } };

export default function BasicSwitches({ checked, onChange }) {
  return (
    <div>
      <Switch {...label} checked={checked} onChange={onChange}  />
    </div>
  );
}
