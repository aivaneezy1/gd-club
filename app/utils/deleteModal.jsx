import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",

  boxShadow: 24,
  p: 4,
};

export default function DeleteModal(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDeleteFolder = async (id) => {
    try {
      const res = await fetch("/api/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      if (res.ok) {
        props.setPostData(props.postdata.filter((post) => post._id !== id));
        props.setIsDeleted(true);

      } else {
        console.error("Failed to delete post:", res.statusText);
      }
    } catch (err) {
      console.error("Failed to delete post:", err);
    }
  };

  return (
    <div>
      <button
        className="px-6 py-4 bg-red-500 rounded-lg text-white font-semibold"
        onClick={handleOpen}
      >
        Remove
      </button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            className="font-bold"
          >
            Warning
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            The Folder will be <span className="font-bold">removed</span> but
            they will be remain in the cloud.
          </Typography>
          <div className="flex justify-end">
            <div>
              {/*Getting the postid from a prop and passing to the API call */}
              <button
                onClick={() => handleDeleteFolder(props.postid)}
                className="px-8 py-4 bg-blue-500  text-white font-semibold hover:bg-blue-600 transition duration-300 shadow-lg rounded-lg"
              >
                Confirm
              </button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
