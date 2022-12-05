import React,{useState,useEffect} from 'react'
import { Icon } from 'react-icons-kit'
import {plus} from 'react-icons-kit/feather/plus'
import {edit2} from 'react-icons-kit/feather/edit2'
import {trash} from 'react-icons-kit/feather/trash'
import { useNavigate, useLocation } from "react-router-dom";


//metodo para obtener tods los todos del local host
const getTodosFromLS=()=>{
    const data = localStorage.getItem('ListTodos');
    if(data){
      return JSON.parse(data)
    }
    else{
      return []
    }
  }
  
  export const Format = () => {
  

    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.setItem('loggedin',false);
        userName = null;
        userEmail = null;   
        setlistUserTodos([]);     
        navigate("/");
    }
    const location = useLocation();

    let userEmail = location.state.user;
    let userName = location.state.name;
    
    const [valueTo, setvalueTo]=useState('');
  
    const [listTodos, setlistTodos]=useState(getTodosFromLS());

    const [listUserTodos, setlistUserTodos] = useState([]);
    
    const handleSubmit=(e)=>{
      e.preventDefault();
  
      //Se usara la fecha como el id
      const date = new Date();
      const time = date.getTime();
  
      let todoObject={
        ID: time,
        TodoValue: valueTo,
        completed: false,
        user : userEmail
      }
      setlistTodos([...listTodos, todoObject]);
      
      setvalueTo('');
    }

    const [editFormat, setEditFormat] = useState(false); //editar format

    const [id, setId] = useState();

    
    //Eliminar de la lista
    const handleDelete = (id) => {
        const filterValue = listTodos.filter((TodoValue) => {
            return TodoValue.ID !== id;
        })
        setlistTodos(filterValue);
    }
    
    const handleEdit = (listTodos, index) => {
        setEditFormat(true);
        setId(index);
        //let userCurrent = listTodos.filter(element=> element.user === userEmail)
        setvalueTo(listTodos.valueTo);
    } 

    const handleEditSub = (e) =>{
        e.preventDefault();
        let items = [...listTodos];
        let item = items[id];
        item.TodoValue = valueTo;
        item.completed = false;
        items[id] = item;
        setlistTodos(items);
        setvalueTo('');
        setEditFormat(false);
    }   


    const handleCheckbox=(id)=>{
        let todoArray=[];
        listTodos.forEach((todo)=>{
          if(todo.ID===id){
            if(todo.completed===false){
              todo.completed=true;
            }
            else if(todo.completed===true){
              todo.completed=false;
            }
          }
          todoArray.push(todo);
          // console.log(todoArray);
          setlistTodos(todoArray);
        })
      }

    let valuesss = listTodos.filter(element=> element.user === userEmail)
    listUserTodos.push(valuesss);
    
    listUserTodos.pop();
      
    useEffect(()=>{                         
      localStorage.setItem('ListTodos', JSON.stringify(listTodos));
    },[listTodos]) // useEffect will run whenever our todos state changes
    
    

    return (
        <>
         {editFormat === false && (
             <div className="form" >
             <h1>Welcome to TODOLIST app : {userName}</h1>       

             <form autoComplete="off" onSubmit={handleSubmit}>
               <div className="input-and-button" >
                 <input  type='text' placeholder="Add an Item" required onChange={(e) => setvalueTo(e.target.value)} value = {valueTo}/>
                 <div className='button'>
                   <button type="submit">
                     <Icon icon={plus} size={20}/>
                   </button>
                 </div>
               </div>
             </form>
           </div>
         )}

            {editFormat === true && ( 
             <div className="form">
             <form autoComplete="off" onSubmit={handleEditSub}>
               <div className="input-and-button">
                 <input type='text' placeholder="Add an Item" required onChange={(e) => setvalueTo(e.target.value)} value = {valueTo}/>
                 <div className='button edit'>
                   <button type="submit">
                    Update
                   </button>
                 </div>
               </div>
             </form>
           </div>
         )}
              {valuesss.length>0&&(
                <>
                  {valuesss.map((individualTodo,index)=>(
                    <div className='todo' key={individualTodo.ID}>

                      {/* checkbox and value div   */}
                      <div>
                        {editFormat===false&&(
                        <input type='checkbox' checked={individualTodo.completed} onChange={()=>handleCheckbox(individualTodo.ID)}/>
                        )}
                        <span  style={individualTodo.completed===true?{textDecoration:'line-through'}:{textDecoration:'none'}}>{individualTodo.TodoValue}</span>
                      </div>

                      {/* edit and delete icon div */}

                    {editFormat === false&&(
                      <div className='edit-and-delete'>
                        <div style={{marginRight:7+'px'}} onClick={() => handleEdit(individualTodo,index)}>
                          <Icon icon={edit2} size={18}/>
                        </div>
                        <div onClick={() => handleDelete(individualTodo.ID)}>
                          <Icon icon={trash} size={18}/>
                        </div>
                      </div>
                    )}
                    </div>
                  ))}
                  <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <button className='delete-all' onClick={handleLogout}>Logout</button>
                  </div>
                </>
              )}
          
          
        </>
    )
}