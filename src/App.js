import React from 'react'
import Create from './Component/Create';
import Profiles from './Component/Profiles';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Git_hubU from './Component/Git_hubU';
import Reg from './Component/Reg';
import Fake from './Component/Fake';
import Login from './Component/Login';

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='profile/' element={<Profiles/>}/>
      <Route path='create/' element={<Create/>}/>
      <Route path='git/' element={<Git_hubU/>}/>
      <Route path='reg/' element={<Reg/>}/>
      <Route path='fake/' element={<Fake/>}/>
      <Route path='/' element={<Login/>}/>
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
