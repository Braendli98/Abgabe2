import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router';
import { useState } from 'react';

import { AppProvider } from './components/Context';
import ContentLayout from './components/ContentLayout';
import Details from './components/Details';
import Login from './components/Login';
import Overview from './components/Overview';
import AddBook from './components/AddBook'
import { Buch } from '@/types/buch';


function App(): JSX.Element {
    const [books, setBooks] = useState<Buch[]>([]);

    // Funktion zum Hinzufügen eines neuen Buches
    const addBook = (newBook: Buch): void => {
        setBooks((prevBooks) => [...prevBooks, newBook]);
    };

    return (
        <AppProvider>
            <BrowserRouter>
                <Routes>
                    <Route element={<ContentLayout />}>
                        <Route index element={<Overview books={books} setBooks={setBooks} />} />
                        <Route path="details/:bookId" element={<Details />} />
                        <Route path="add" element={<AddBook onAddBook={addBook} />} />
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
