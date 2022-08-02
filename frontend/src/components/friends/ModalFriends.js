import * as React from 'react';
import Button from '@mui/material/Button';
import TabFriends from "components/friends/TabFriends";
import { Dialog } from '@mui/material';

export default function ModalFriends() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen} variant="outlined">밥친구 관리</Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div>
          <TabFriends></TabFriends>
        </div>
      </Dialog>
    </div>
  );
}
