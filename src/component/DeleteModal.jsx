import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { userTodoContext } from '../context/userTodoContext';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function DeleteModal({singleUserId,deleteBtnOpen,setDeleteBtnOpen,handleClose:bothHandleClose}) {
//   const [open, setOpen] = React.useState(false);
  // const handleOpen = () => setDeleteBtnOpen(true);
  const handleClose = () => setDeleteBtnOpen(false);
         const { deleteUser } = userTodoContext()

  //deleteBtn 
  const deleteHandler = (id) =>{
    bothHandleClose()
    deleteUser(id)
  }

  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={deleteBtnOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div id="modal-modal-title" variant="h6" component="h2">
            Are You Sure?
          </div>
          <div id="modal-modal-description" sx={{ mt: 2 }}>
          <button onClick={()=>deleteHandler(singleUserId)} type="submit" className="py-1 px-3 rounded bg-blue-500 hover:bg-blue-700 text-white">delete</button>
          <button className="ml-2 py-1 px-3 rounded bg-red-500 hover:bg-red-700 text-white" variant="contained" onClick={handleClose}>cancel</button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
