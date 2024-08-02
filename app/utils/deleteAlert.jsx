import * as React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

export default function DeleteFolderAlert() {
  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert variant="filled" severity="success">
        Folder has been deleted with succession
      </Alert>
     
    </Stack>
  );
}
