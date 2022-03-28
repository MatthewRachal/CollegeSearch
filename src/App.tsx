import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

//Component Imports
import Nav from './Components/Nav/Nav';
import Schools from './Components/SchoolsOverview/Schools';
import DetailedSchool from './Components/SchoolDetailed/DetailedSchool';

function App() {
  return (
    <div className="App">
      <Router>
        <Nav />
        <Routes>
          <Route path="/Schools" element={<Schools />}></Route>
          <Route path="/Schools/:name" element={<DetailedSchool />}></Route>
          <Route path="/" element={<Schools />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
