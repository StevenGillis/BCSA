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

export function Claims({ submitClaim }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <div>
      <Button style ={{
        backgroundColor: "#a51c30",
        color: "white",
        padding: "9px 18px",
        marginLeft: "50px"
      }}
        variant="contained"
        onClick={handleOpen}>Submit Claim</Button>
      
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Submit claim
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <form
        onSubmit={(event) => {
          // This function just calls the transferTokens callback with the
          // form's data.
          event.preventDefault();

          const formData = new FormData(event.target);
          const PolicyOwner = formData.get("PolicyOwner");
          const PolicyId = formData.get("PolicyId");
          const InsurerId = formData.get("InsurerId");

          if (PolicyOwner && PolicyId && PolicyId) {
            submitClaim(PolicyId, InsurerId, PolicyOwner);
          }
        }}
      >
        <div className="form-group">
          <label>Asset to insure</label>
          {/*<input
            className="form-control"
            type="number"
            step="1"
            name="PolicyId"
            placeholder="1"
            required
      />*/}
        <select name="PolicyId">
              <option value={1}>Coinbase</option>
              <option value={2}>FTX</option>
              <option value={3}>Kraken</option>
              <option value={4}>USDT</option>
            </select>
        </div>
        <div className="form-group">
          <label>Address of Owner of the policy</label>
          <input className="form-control" type="text" name="PolicyOwner" required />
        </div>
        <div className="form-group">
          <label>Insurance provider</label>
          {/*<input className="form-control" type="text" name="InsurerId" required /*/}
            <select name="InsurerId">
              <option value={1}>Nexus Mutual</option>
              <option value={2}>InsurAce</option>
              <option value={3}>Ease</option>
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
