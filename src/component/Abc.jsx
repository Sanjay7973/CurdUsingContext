import { useState, useEffect  } from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { userTodoContext } from "../context/userTodoContext";

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

export default function Abc({ open, setOpen }) {
    // const [open, setOpen] = useState(false);
    const { addUser, singleUserData, setSingleUserData, updateUser } = userTodoContext();
    const [file, setFile] = useState(singleUserData?.file);
    const [err, setErr] = useState({
        file: '',
        name: '',
        email: '',
        number: '',
        age: ''
    });
console.log("file", file)
    const handleOpen = () => setOpen(true);

    const handleClose = () => {
        setOpen(false)
        setSingleUserData({})
        // setFile('')
    };

    // file change handler 
    const fileChangeHandler = (e) => {
        setFile(e.target.files[0])
        handleChange('file')
    }
    // Submit Handler
    const submitHandler = (e) => {
        e.preventDefault();
        let formErrors = {
            file: '',
            name: '',
            email: '',
            number: '',
            age: ''
        };

        let isValid = true;
        // validation file
        if (!file) {
            formErrors.file = "File field is required";
            isValid = false;
        }

        // Validate name
        if (e.target.name.value === "") {
            formErrors.name = "Name field is required";
            isValid = false;
        }

        // Validate email
        if (e.target.email.value === "") {
            formErrors.email = "Email field is required";
            isValid = false;
        }

        // Validate number
        if (e.target.number.value.length < 10 ) {
            formErrors.number = "Number must be at least 10 digits";
            isValid = false;
           if(e.target.number.value === ''){
            formErrors.number = "Number field is required";
            isValid = false;
           }
            
        }
        

        // Validate age
        if (e.target.age.value === "") {
            formErrors.age = "Age field is required";
            isValid = false;
        }

        if (!isValid) {
            setErr(formErrors);
            return;
        }

        // If all fields are valid, proceed with the user object creation
        let user = {
            id: singleUserData?.id ?? Date.now(),
            file: file,
            name: e.target.name.value,
            email: e.target.email.value,
            number: e.target.number.value,
            age: e.target.age.value
        };
        if (singleUserData?.id) {
            // alert('1')
            updateUser(user)
            setFile('')
        } else {
            // alert('2')

            addUser(user);
        }
        handleClose();  // Close the modal after submission
    };
useEffect(()=>{
       setFile(singleUserData?.file)
     },[singleUserData])
    // OnChange handlers to clear error when the user starts typing
    const handleChange = (field) => {
        setErr(prevErr => ({
            ...prevErr,
            [field]: ''  // Clear the specific error field
        }));
    };

    return (
        <div>
            {/* <Button onClick={handleOpen}>Add User</Button> */}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div id="modal-modal-title" variant="h6" component="h2">
                        Fill User Detail :-
                    </div>
                    <div id="modal-modal-description" sx={{ mt: 2 }}>
                        <form className="max-w-md mx-auto mt-4" onSubmit={submitHandler}>
                            <div className="mb-5">
                                <div className='w-[30px] h-[30px] rounded-full'>
                                    {file && <img className="w-full h-full object-cover rounded-full" src={URL.createObjectURL(file)} alt="User Upload" />}
                                </div>
                                <label htmlFor="file" className="flex mb-1">select img :</label>
                                <input onChange={fileChangeHandler} className="w-[100%]" type="file" name="file" />
                                {err.file && <span style={{ color: 'red' }}>{err.file}</span>}
                            </div>
                            <div className="mb-5">
                                <label htmlFor="name" className="flex">Enter name :</label>
                                <input
                                    defaultValue={singleUserData?.name}
                                    name="name"
                                    className="rounded w-[100%]"
                                    type="text"
                                    placeholder="Enter name"
                                    id="name"
                                    onChange={() => handleChange('name')}  // Clear the error when typing
                                />
                                {err.name && <span style={{ color: 'red' }}>{err.name}</span>}
                            </div>
                            <div className="mb-5">
                                <label htmlFor="email" className="flex">Enter email :</label>
                                <input
                                    defaultValue={singleUserData?.email}
                                    id="email"
                                    name="email"
                                    placeholder="Enter Email"
                                    className="rounded w-[100%]"
                                    type="email"
                                    onChange={() => handleChange('email')}  // Clear the error when typing
                                />
                                {err.email && <span style={{ color: 'red' }}>{err.email}</span>}
                            </div>
                            <div className="mb-5">
                                <label className="flex" htmlFor="phone_number">Enter Number :</label>
                                <input
                                    name="number"
                                    defaultValue={singleUserData?.number}
                                    id="phone_number"
                                    className="rounded w-[100%]"
                                    type="number"
                                    placeholder="Enter Number"
                                    onChange={() => handleChange('number')}  // Clear the error when typing
                                />
                                {err.number && <span style={{ color: 'red' }}>{err.number}</span>}
                            </div>
                            <div className="mb-5">
                                <label htmlFor="age" className="flex">Enter age :</label>
                                <input
                                    id="age"
                                    defaultValue={singleUserData?.age}
                                    name="age"
                                    placeholder="Enter Age"
                                    className="rounded w-[100%]"
                                    type="number"
                                    onChange={() => handleChange('age')}  // Clear the error when typing
                                />
                                {err.age && <span style={{ color: 'red' }}>{err.age}</span>}
                            </div>
                            <button type="submit" className="py-1 px-3 rounded bg-blue-500 hover:bg-blue-700 text-white">Submit</button>
                            <button className="ml-2 py-1 px-3 rounded bg-red-500 hover:bg-red-700 text-white" variant="contained" onClick={handleClose}>Close</button>
                        </form>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}
