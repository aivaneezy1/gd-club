import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Image from 'next/image';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80vw', // Adjust width
  height: '80vh', // Adjust height
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 0, // Remove padding
  overflow: 'hidden', // Hide overflow if any
};



export default function ZoomClickedModal(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className='w-8 h-8 sm:w-6 sm:h-6'>
          <path fill="#74C0FC" d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/>
        </svg>
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Image
            src={props.image}
            layout="fill" // Fill the container
            objectFit="contain" // Fit image within the container
            alt="Modal Image"
          />
        </Box>
      </Modal>
    </div>
  );
}
