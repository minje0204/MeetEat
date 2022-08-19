import * as React from "react";
import Button from "@mui/material/Button";
import TabFriends from "components/friends/TabFriends";
import { Dialog } from "@mui/material";

export default function ModalFriends() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen} sx={{ border: 1 }}>밥친구 관리</Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <TabFriends />
      </Dialog>
    </div>
  );
}
