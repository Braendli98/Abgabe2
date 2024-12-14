import './App.css';

import Details from './components/Details';
import Header from './components/Header';
import Login from './components/Login';
import Overview from './components/Overview';
import { useState } from 'react';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [page, setPage] = useState('overview');
  console.log(page);

  switch (page) {
    case 'login': {
      return (
        <div
          className="flex justify-center items-center"
          style={{ height: '100vh' }}
        >
          <Login setLoggedIn={setLoggedIn} setPage={setPage} />
        </div>
      );
    }
    case 'overview': {
      return (
        <>
          <Header
            loggedIn={loggedIn}
            setLoggedIn={setLoggedIn}
            setPage={setPage}
          />
          <Overview setPage={setPage} />
        </>
      );
    }
    case 'details': {
      return (
        <>
          <Header
            loggedIn={loggedIn}
            setLoggedIn={setLoggedIn}
            setPage={setPage}
          />
          <Details setPage={setPage} />
        </>
      );
    }
  }
}

export default App;
