

import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { userTodoContext } from '../context/userTodoContext';
import DeleteModal from './DeleteModal';


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

export default function ProfileView({ singleUser, open, setOpen }) {
    const { name, file, email, number, age, id } = singleUser
    const [deleteBtnOpen, setDeleteBtnOpen] = React.useState(false);
    const [singleUserId, setSingleUserId] = React.useState('');

    // const { deleteUser } = userTodoContext()

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // delete button 
    const deleteHandler = (id) => {
        setDeleteBtnOpen(true)
        setSingleUserId(id)
        // handleClose()
    }

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className='mb-5 text-2xl'>
                        User Info :
                    </div>
                    <div className='flex justify-between' sx={{ mt: 5 }}>
                        <div className='w-[100px] h-[100px] rounded-full'>
                            <img className="w-full h-full object-cover rounded-full" src={`${URL.createObjectURL(file)}`} alt="Profile" />
                        </div>
                        <div>
                            <p className='text-black m-0.5'>usernmae:<span className='ml-2'>{name}</span></p>
                            <p className='text-black m-0.5'>email:<span className='ml-2'>{email}</span></p>
                            <p className='text-black m-0.5'>number:<span className='ml-2'>{number}</span></p>
                            <p className='text-black m-0.5'>age:<span className='ml-2'>{age}</span></p>
                            <button onClick={() => deleteHandler(id)} type="submit" className="py-1 mt-4 px-3 rounded bg-blue-500 hover:bg-blue-700 text-white">delete</button>
                        </div>
                    </div>
                </Box>
            </Modal>
            {
                deleteBtnOpen && <DeleteModal singleUserId={singleUserId} deleteBtnOpen={deleteBtnOpen} setDeleteBtnOpen={setDeleteBtnOpen} handleClose={handleClose}/>
            }
            
        </div>
    );
}
