import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Products from './pages/Products';
import AddProduct from './pages/AddProduct';
import EditProduct from './pages/EditProduct';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import './App.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <div className="main-content">
          <Topbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <main className="page-container fade-in">
            <Routes>
              <Route path="/" element={<Products searchTerm={searchTerm} />} />
              <Route path="/add" element={<AddProduct />} />
              <Route path="/edit/:id" element={<EditProduct />} />
              <Route path="*" element={<Products searchTerm={searchTerm} />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
