import React, { useState } from 'react';
import MainLayout from './layouts/MainLayout';
import AddNote from './pages/AddNote';
import EditNote from './pages/EditNote';
import NoteDetails from './pages/NoteDetails';
import Filter from './components/filter/Filter';

import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';


function App() {
  const [query, setQuery] = useState('');
  const handleSearchChange = (newQuery) => {setQuery(newQuery)};
  const router = createBrowserRouter(createRoutesFromElements(
      <Route path="/" element={<MainLayout onSearchChange={handleSearchChange}/>}>
         <Route index element={<Filter query={query}/>} />
         <Route path="/addnote" element={<AddNote/>} />
         <Route path="/notes/:slug" element={<NoteDetails/>} />
         <Route path="/notes/edit/:slug" element={<EditNote/>} />
      </Route>
  ))

  return <RouterProvider router={router}/>

}

export default App


