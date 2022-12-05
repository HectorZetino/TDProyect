
import { Format } from './Components/Format/Format';
import {BrowserRouter , Routes ,Route  } from 'react-router-dom';
import SignInSide from './Components/SignInSide/SignInSide';
import SignUp from './Components/SignUp/SignUp';
import { ERROR } from './Components/Error/Error';
import React, { useEffect, useState } from 'react'
import { user } from './shared/data';





function App() {

  const [users, setUsers] = useState(JSON.parse(localStorage.getItem('users')) || user)
  
  
  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users))
  }, [users])

  return (
    <> 
    <BrowserRouter>
      <Routes>
        <Route path="/TDProyect" element={<SignInSide users={users} setUsers={setUsers}/>}/>
        <Route path="/register" element={<SignUp users={users} setUsers={setUsers}/>}/>
        <Route path="/main" element={<Format users={users}/>}/>
        <Route path="/error" element={<ERROR/>}/>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
