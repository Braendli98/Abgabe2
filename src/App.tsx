import './App.css'

import Header from './components/Header';
import Login from './components/Login'
import Overview from './components/Overview'
import { useState } from 'react';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <>
    {
      loggedIn ? 
      <>
        <Header setLoggedIn={setLoggedIn}/>
        <Overview />
      </>
    :
    <div className="flex justify-center items-center" style={{ height: '100vh'}}>
      <Login setLoggedIn={setLoggedIn}/>
    </div>
    }
    </>
  )
}

export default App
