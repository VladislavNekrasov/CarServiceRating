import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'semantic-ui-css/semantic.min.css';
import { HashRouter, Route, Routes } from 'react-router-dom';


import Home from './Components/Home';
import Login from './Components/Login';
import Profile from './Components/Profile';
import Register from './Components/Register';

import { ViewService } from './Pages/Service/ViewService';
import { EditService } from './Pages/Service/EditService';
import { CreateService } from './Pages/Service/CreateService';
import { ViewMaster } from './Pages/Master/ViewMaster';
import { CreateMaster } from './Pages/Master/CreateMaster';
import { EditMaster } from './Pages/Master/EditMaster';






const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <React.StrictMode>

    <HashRouter >

      <Routes>

        <Route exact path={"/"} element={<Home />} />
        <Route exact path={"/home"} element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/profile" element={<Profile />} />

        <Route path="/services" element={<ViewService/>} />
        <Route path="/services/edit/:id" element={<EditService/>} />
        <Route path="/services/create" element={<CreateService />} />

        <Route path="/master" element={<ViewMaster/>} />
        <Route path="/master/edit/:id" element={<EditMaster/>} />
        <Route path="/master/create" element={<CreateMaster />} />


      </Routes>



    </HashRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
