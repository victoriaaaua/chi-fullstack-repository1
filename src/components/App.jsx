import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Heroes from './Heroes';
import About from './About';
import ModalCharacter from './ModalCharacter';
import { ThemeProvider } from './ThemeContext';
import MainLayout from '../layouts/MainLayout';


function App() {
  const [info, setInfo] = useState({});
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  return (
    <ThemeProvider>
      <Router>
        <Routes>

          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="heroes" 
              element={
              <Heroes 
                setInfo={setInfo}
                setResults={setResults}
                loading={loading}
                setLoading={setLoading}
                results={results}
                info={info} />
                }>

              <Route path=":id" element={<ModalCharacter />} />
            </Route>
            <Route path="about" element={<About />} />
          </Route>

        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
