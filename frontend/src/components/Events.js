import React from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export function Events({ submitEvent }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <div >
      <Button style ={{
        backgroundColor: "#a51c30",
        color: "white",
        padding: "9px 18px",
        marginLeft: "50px"
      }}
      onClick={handleOpen}>Submit Event</Button>
      
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Submit event
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <form
        onSubmit={(event) => {
          // This function just calls the transferTokens callback with the
          // form's data.
          event.preventDefault();

          const formData = new FormData(event.target);
          const LossAmount = formData.get("LossAmount");
          const PolicyID = formData.get("PolicyId");
          const rootCauseId = formData.get("rootCauseId");

          if (LossAmount && PolicyID && rootCauseId) {
            submitEvent(PolicyID, LossAmount, rootCauseId);
          }
        }}
      >
        <div className="form-group">
          <label>Policies linked to the event</label>
          {/*<input
            className="form-control"
            type="number"
            step="1"
            name="PolicyID"
            placeholder="1"
            required
      />*/}
            <select name="Hacked asset">
              <option value={1}>Coinbase</option>
              <option value={2}>FTX</option>
              <option value={3}>Kraken</option>
              <option value={4}>USDT</option>
            </select>
        </div>
        <div className="form-group">
          <label>Amount of assets lost during hack</label>
          <input className="form-control" type="text" name="LossAmount" required />
        </div>
        <div className="form-group">
          <label>Root cause of the hack</label>
          {/*<input className="form-control" type="text" name="rootCauseId" required />*/}
          <select name="rootCauseId">
              <option value={1}>Smart contract hack</option>
              <option value={2}>Governance attack</option>
              <option value={3}>Front-end hack</option>
            </select>
        </div>
        <div className="form-group">
          <input style ={{
        backgroundColor: "#a51c30",
        color: "white",
          }} 
          className="btn btn-primary" type="submit" value="Submit" />
        </div>
      </form>
          </Typography>
        </Box>
      </Modal>
    </div>
  </div>
  );
}
