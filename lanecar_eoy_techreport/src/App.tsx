import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TechReport from './pages/TechReport';
import LeadMagnet from './pages/Leadmagnet';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TechReport />} />
        <Route path="/lead" element={<LeadMagnet />} />
      </Routes>
    </Router>
  );
}

export default App;
