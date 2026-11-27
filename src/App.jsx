import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import CropDoctor from './pages/CropDoctor';
import CropAdvisor from './pages/CropAdvisor';
import FarmChat from './pages/FarmChat';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/crop-doctor" element={<CropDoctor />} />
          <Route path="/crop-advisor" element={<CropAdvisor />} />
          <Route path="/farm-chat" element={<FarmChat />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
