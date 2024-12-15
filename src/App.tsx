import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router';

import ContentLayout from './components/ContentLayout';
import Details from './components/Details';
import Login from './components/Login';
import Overview from './components/Overview';
import { useState } from 'react';

function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    element={
                        <ContentLayout
                            loggedIn={loggedIn}
                            setLoggedIn={setLoggedIn}
                        />
                    }
                >
                    <Route index element={<Overview />} />
                    <Route path="details/:bookId" element={<Details />} />
                </Route>
                <Route
                    path="login"
                    element={
                        <div
                            className="flex justify-center items-center"
                            style={{ height: '100vh' }}
                        >
                            <Login setLoggedIn={setLoggedIn} />
                        </div>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
