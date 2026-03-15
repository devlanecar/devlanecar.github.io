import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TechReport from './pages/TechReport';
import LeadMagnet from './pages/LeadMagnet';
import TransitionMain from './pages/TransitionMain';
import TransitionMin from './pages/TransitionMin';
import TriFold from './pages/TriFold';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TechReport />} />
        <Route path="/lead" element={<LeadMagnet />} />
        <Route path="/trifold" element={<TriFold />} />
        <Route path="/transitionmain" element={<TransitionMain />} />
        <Route path="/transitionmin" element={<TransitionMin />} />

      </Routes>
    </Router>
  );
}

export default App;
