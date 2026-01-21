import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TechReport from './pages/TechReport';
import LeadMagnet from './pages/LeadMagnet';
import TriFold from './pages/TriFold';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TechReport />} />
        <Route path="/lead" element={<LeadMagnet />} />
        <Route path="/trifold" element={<TriFold />} />
      </Routes>
    </Router>
  );
}

export default App;
