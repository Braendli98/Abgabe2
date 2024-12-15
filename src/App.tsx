import './App.css';

import Details from './components/Details';
import Header from './components/Header';
import Login from './components/Login';
import Overview from './components/Overview';
import { useState } from 'react';
import { Buch } from './types/buch';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [page, setPage] = useState('overview');
  const [selectedBook, setSelectedBook] = useState<Buch | null>(null); // Zustand für das ausgewählte Buch

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
          <Overview setPage={setPage} setSelectedBook={setSelectedBook} />
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
          {selectedBook ? (
            <Details book={selectedBook} setPage={setPage} />
          ) : (
            <p>Keine Buchdaten verfügbar</p>
          )}
        </>
      );
    }
  }
}

export default App;
