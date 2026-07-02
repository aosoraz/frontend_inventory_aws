import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SearchProvider } from './hooks/useSearch';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <SearchProvider>
        <Navbar>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
          </Routes>
        </Navbar>
      </SearchProvider>
    </BrowserRouter>
  );
}

export default App;
