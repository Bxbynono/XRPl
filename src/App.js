import React, { Component } from 'react';
import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminHome from './components/admin/AdminHome';
// import AdminProfile from './components/admin/adminProfile';
import AdminUpload from './components/admin/AdminUploadParticipants';
import AdminSideNav from './components/admin/sideNav';
import AdminViewCCA from './components/admin/adminviewCCA';

//user Frontend
import Home from './components/user/home';
import NavBar from './components/user/NavBar';
import About from './components/user/aboutus';
import LoginPage from './components/user/login';
import MyCCa from './components/user/mycca';
// import ForgotPassword from "./components/user/ForgotPassword"


class App extends Component {

  state = {
    account: '',
    studentCount: 0,
    students: [],
    loading: true,
    student: ''
  }


  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<NavBar />} >
            <Route index element={<Home />} />
            <Route path='about' element={<About />} />
            <Route path='CCA' element={<MyCCa findStudent/>} />

          </Route>
          <Route path="/admin" element={<AdminSideNav />} >
            <Route index element={<AdminHome studentCount/>} />
            <Route path='upload' element={<AdminUpload createStudent/>} />
            <Route path='view' element={<AdminViewCCA studentList/>} />
            {/* <Route path='profile' element={<AdminProfile />} /> */}
          </Route>
          <Route path='login' element={<LoginPage />} />
          {/* <Route path='reset' element={<ForgotPassword />} /> */}
        </Routes>
      </BrowserRouter>
    );
  }

}

export default App;
