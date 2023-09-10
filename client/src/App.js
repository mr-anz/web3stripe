import SetUsername from './components/SetUsername';
import Dashboard from './components/Dashboard';
import { BrowserRouter, Route, Routes  } from 'react-router-dom';
import Navbar from './components/Navbar';
import PayRequest from './components/PayRequest';
import { useState } from 'react';
import CreateRequest from './components/CreateRequest';
import FriendRequest from './components/FriendRequest';

function App() {

 
   return (
    <div className="h-screen bg-black glass">
      <Navbar />
        <SetUsername />
        <Dashboard />
        <PayRequest />
      <CreateRequest />
      <FriendRequest />
    </div>
  );
}

export default App;
