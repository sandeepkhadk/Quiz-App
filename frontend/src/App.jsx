import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import your components
import Home from './components/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Registration';
import Quiz from './components/Quiz';
import Admin from './components/auth/Admin';

function App() {
  return (
    <Router>
      <div className="App">
        {/* All your routes go inside here */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;