import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router';

import AddBook from './components/add/AddBook';
import { AppProvider } from './components/common/Context';
import ContentLayout from './components/common/ContentLayout';
import Details from './components/details/Details';
import ErrorComponent from './components/error-handling/ErrorComponent';
import Login from './components/login/Login';
import Overview from './components/overview/Overview';
import { Toaster } from './components/shadcn-ui/toaster';

function App(): JSX.Element {
    return (
        <div>
            <AppProvider>
                <BrowserRouter>
                    <Routes>
                        <Route element={<ContentLayout />}>
                            <Route index element={<Overview />} />
                            <Route
                                path="details/:bookId"
                                element={<Details />}
                            />
                            <Route path="add" element={<AddBook />} />
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
                        <Route
                            path="*"
                            element={
                                <ErrorComponent
                                    type={'notFound'}
                                    error="Die gesuchte Seite konnte leider nicht gefunden werden."
                                />
                            }
                        />
                    </Routes>
                </BrowserRouter>
            </AppProvider>
            <Toaster />
        </div>
    );
}

export default App;
