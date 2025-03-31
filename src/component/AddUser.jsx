import { useState } from "react"
import Button from '@mui/material/Button';

import UsersList from "./UsersList"
import Abc from "./Abc"

const AddUser = () => {
    const [open, setOpen] = useState(false);
    return (
        <div className="p-5 w-[100%] h-[100%]">
        <div className=" flex justify-between px-5 mt-9 mb-8 ">
            {/* // first part */}
            <div>
                <h1 className="mt-1 text-xl">All Users</h1>
            </div>
            {/* // modal part  */}
            <div>
            <Abc open={open} setOpen={setOpen}/>
            <Button onClick={()=>setOpen(true)}>Add User</Button>
            </div>
           {/* user list part */}
            </div>
            <div className="flex justify-center ">
            <UsersList setEditOpen={setOpen}/>
            </div>
            </div>
    )
}

export default AddUser