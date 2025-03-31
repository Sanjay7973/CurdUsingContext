import { createContext, useContext, useState } from "react"


const TodoContext = createContext();


const AppProvider = ({ children }) => {
  const [singleUserData, setSingleUserData] = useState({})
  const [todos, setTodos] = useState([])

  // add user
  const addUser = (user) => {
    setTodos([...todos, user])
  }
  const getUser = (user) => {
    setSingleUserData(user)
  }
  // delete user
  const deleteUser = (id) => {
    let deleteuser = todos.filter((val) => {
      return id !== val.id
    })
    setTodos(deleteuser)
  }
  // update user
  const updateUser = (upuser) => {
    let updateuser = todos.map((val) => upuser.id === val.id ? upuser : val
    )

    setTodos(updateuser)
  }
  return (
    <TodoContext.Provider value={{ todos, updateUser, deleteUser, addUser, getUser, setSingleUserData, singleUserData }}>
      {children}
    </TodoContext.Provider>
  )
}

const userTodoContext = () => {
  return useContext(TodoContext)
}
export { userTodoContext }
export default AppProvider