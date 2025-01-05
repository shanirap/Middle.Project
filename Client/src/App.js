import logo from './logo.svg';
import './App.css';
import Users from './Components/UsersComps/Users';
import Posts from './Components/PostComps/Posts';
import Todos from './Components/TodosComps/Todos';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import { Menubar } from 'primereact/menubar';
import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router";
import 'primeicons/primeicons.css'


import './index.css';
import './flags.css';


function App() {

  const navigate = useNavigate();
  const items = [
    {
      label: 'Users',
      icon: 'pi pi-user',
      command: () => {
        navigate('./Users')
      }
    },
    {
      label: 'Posts',
      icon: 'pi pi-book',
      command: () => {
        navigate('./Posts')
      }
    },
    {
      label: 'Todos',
      icon: 'pi pi-clipboard',
      command: () => {
        navigate('./Todos')
      }
    }
  ]


  return (
    <>
      <div className="App">
        <Menubar model={items} />
        <Routes>
          <Route path="/users" element={<Users />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/todos" element={<Todos />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
