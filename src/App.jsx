import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar from './components/Navbar'
import { v4 as uuidv4} from 'uuid';
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";


function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [Showfinished, setShowfinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if(todoString){
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])
  

const saveToLS = (parms) =>{
  localStorage.setItem("todos", JSON.stringify(parms))
}


const toggleFinished = (e) =>{
setShowfinished(!Showfinished)

}


  const handleEdit = (e,id) => {
   let t = todos.filter(i=>i.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item=>{
      return item.id!==id
    });
    setTodos(newTodos)
    saveToLS(newTodos)
  }

  const handleDelete =(e,id)=>{
    let newTodos = todos.filter(item=>{
      return item.id!==id
    });
    setTodos(newTodos)
    saveToLS(newTodos)
  }


  const handleAdd = () => {
    setTodos([...todos, {id: uuidv4(),todo, isCompleted: false }])
    setTodo("")
    saveToLS(newTodos)
  }

  const hadnleChange = (e) => {
    setTodo(e.target.value)
  }
  
  const handlechangebox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item=>{
      return item.id == id;
    }) 
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    saveToLS(newTodos)
  }
  
  return (
    <>
      <Navbar/>
      
      <div className="md:container mx-3 md:mx-auto my-5 rounded-xl p-5 bg-blue-200 min-h-[80vh] md:w-[35%]">
      <h1 className='font-bold text-center text-2xl'>iTask - Mange your todos at one place</h1>
        <div className="addtodo my-5 flex flex-col gap-2">
          <h2 className='text-lg font-bold'>Add a Todo</h2>
          <div className="flex">

          <input onChange={hadnleChange} value={todo} type="text" className='w-full mr-[15px] bg-white rounded-full px-5 py-1' />
          <button onClick={handleAdd} disabled={todo.length<=1} className='bg-blue-400 rounded-full disabled:bg-blue-300 hover:bg-blue-500 px-4 p-2 py-1 text-white  font-bold cursor-pointer'>Save</button>
          </div>
        </div>
        <input onChange={toggleFinished} type="checkbox" checked={Showfinished} />  Show Finished
        <div className='h-[1px] bg-black opacity-50 mt-2'></div>
        <h2 className='text-lg font-bold mt-3'>Your Todos</h2>
        <div className='h-[1px] bg-black opacity-50 w-[85px] ml-1.5'></div>
        <div className="todos">
          {todos.length ===0 && <div className='m-5'>No Todos to display</div>}
          {todos.map(item => {

              return (Showfinished || !item.isCompleted) && <div key={item.id} className="todo flex my-3 justify-between">
                <div className='flex items-center gap-5'>

                <input name={item.id} onChange={handlechangebox} type="checkbox" checked={item.isCompleted} id="" />
              <div className={item.isCompleted ? "line-through":""}>{item.todo}</div>
                </div>
              <div className="buttons flex h-full">
              <button onClick={(e)=>handleEdit(e,item.id)} className='bg-blue-400 hover:bg-blue-500 p-3 py-1 mx-1 text-3xl text-white rounded-md border-2 border-b-amber-50 font-bold cursor-pointer'><CiEdit /></button>
                <button onClick={(e)=>{handleDelete(e, item.id)}} className='bg-blue-400 hover:bg-blue-500 p-3 py-1 mx-1 text-3xl text-white rounded-md border-2 border-b-amber-50 font-bold cursor-pointer'><MdDeleteOutline /></button>
              </div>
              
            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App
