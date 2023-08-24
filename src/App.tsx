import { Route, Routes } from 'react-router-dom';
import './App.scss';
import { HomeSection } from './components/HomeSection';

import { StaticSection } from './components/StaticSection';
import { VotingSection } from './components/VotingSection';

function App() {
  return (
    <main className="page__main">
      <div className="container">
        <StaticSection />

        <Routes>
          <Route path="/" element={<HomeSection />} />
          <Route path='/voting' element={<VotingSection />} />
        </Routes>
      </div>
    </main>
  );
}

export default App
