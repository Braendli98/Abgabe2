import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router';

import { AppProvider } from './components/Context';
import ContentLayout from './components/ContentLayout';
import Details from './components/Details';
import Login from './components/Login';
import Overview from './components/Overview';

function App() {
    return (
        <AppProvider>
        <BrowserRouter>
            <Routes>
                <Route
                    element={
                        <ContentLayout />
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
                            <Login />
                        </div>
                    }
                />
            </Routes>
        </BrowserRouter>
        </AppProvider>
    );
}

export default App;
