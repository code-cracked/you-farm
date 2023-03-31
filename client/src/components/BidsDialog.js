import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import { blue } from "@mui/material/colors";
import { TextField } from "@mui/material";
import { toast } from "react-hot-toast";

const BidsDialog = (props) => {
  const { onClose, hasBid, open } = props;

  const [bidAmount, setBidAmount] = React.useState(0);

  const handleClose = () => {
    if (bidAmount <= 0) {
      toast("Bid amount must be greater than 0", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      return;
    }
    onClose(bidAmount);
  };

  if (!hasBid)
    return (
      <Dialog onClose={handleClose} open={open}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-evenly",
            padding: "1rem",
            gap: "1rem",
          }}
        >
          <DialogTitle>$ Enter a bid amount</DialogTitle>
          <TextField
            label="Bid Amount"
            variant="outlined"
            type="number"
            value={bidAmount}
            onChange={(e) => setBidAmount(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              handleClose();
            }}
          >
            Place Bid
          </Button>
        </div>
      </Dialog>
    );

  return null;
};

BidsDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  hasBid: PropTypes.bool.isRequired,
};

export default BidsDialog;
