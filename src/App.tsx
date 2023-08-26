import { Route, Routes } from 'react-router-dom';
import './App.scss';
import { HomeSection } from './components/HomeSection';

import { StaticSection } from './components/StaticSection';
import { VotingSection } from './components/VotingSection';
import { FavouritesSection } from './components/FavouritesSection';
import { VotingResult } from './components/VotingResult';

function App() {
  return (
    <main className="page__main">
      <div className="container">
        <StaticSection />

        <Routes>
          <Route path="/" element={<HomeSection />} />
          <Route path='/voting' element={<VotingSection />} />
          <Route path='/favourites' element={<FavouritesSection />} />
          <Route path='/likes' element={<VotingResult pageName='Likes' />} />
          <Route path='/dislikes' element={<VotingResult pageName='Dislikes' />} />
        </Routes>
      </div>
    </main>
  );
}

export default App
