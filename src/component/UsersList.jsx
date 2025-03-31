import * as React from 'react';
import { userTodoContext } from "../context/userTodoContext"
import { MdEdit } from "react-icons/md";
import ProfileView from "./ProfileView";
import Button from '@mui/material/Button';
import { FaEye } from "react-icons/fa";

const UsersList = ({setEditOpen}) => {
    const { todos,updateUser,setSingleUserData } = userTodoContext()
        const [open, setOpen] = React.useState(false);
        const [singleUser, setSingleUser] = React.useState({});

        // profile view handler(set user detail to singleUser)
        const handleClick = (data) => {
            setSingleUser(data);
            setOpen(true)
        }
    // updateHandler
    const updateHandler = (val) =>{
        setSingleUserData(val)
        setEditOpen(true)
    }

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-[90%]">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            profile pic
                        </th>
                        <th scope="col" className="px-8 py-3">
                            name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Email
                        </th>
                        <th scope="col" className="px-6 py-3">
                            number
                        </th>
                        <th scope="col" className="px-6 py-3">
                            age
                        </th>
                        <th scope="col" className="px-6 py-3">
                            view
                        </th>
                        <th scope="col" className="px-6 py-3">
                            edit
                        </th>
                    </tr>
                </thead>
                {todos.map((val, index) => {
                    return (
                        <tbody key={index}>
                            <tr className=" border-b  border-gray-200">
                                <td className="px-6 py-4 w-[1%]">
                                    <div className='w-[21px] h-[21px] rounded-full'>
                                <img className="w-full h-full object-cover rounded-full" src={`${URL.createObjectURL(val.file)}`} alt="Profile" />
                                    </div>
                                </td>
                                <th scope="row" className="px-8 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                    {val.name}
                                </th>
                                <td className="px-6 py-4">
                                   {val.email}
                                </td>
                                <td className="px-6 py-4">
                                    {val.number}
                                </td>
                                <td className="px-6 py-4">
                                    {val.age}
                                </td>
                                <td className="px-6 py-4">
                                <Button onClick={() => handleClick(val)}><FaEye /></Button>
                                </td>
                                <td className="px-6 py-4">
                                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline"><MdEdit onClick={()=>updateHandler(val)}/></a>
                                </td>
                            </tr>
                        </tbody>
                    )
                })}

            </table>
            {open &&
            <ProfileView singleUser={singleUser} open={open} setOpen={setOpen} />
}
        </div>

    )
}

export default UsersList