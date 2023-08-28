import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.scss';
import { HomeSection } from './components/HomeSection';

import { StaticSection } from './components/StaticSection';
import { VotingSection } from './components/VotingSection';
import { FavouritesSection } from './components/FavouritesSection';
import { VotingResult } from './components/VotingResult';
import { BreedsSection } from './components/BreedsSection';
import { BreedInfo } from './components/BreedInfo';
import { SearchSection } from './components/SearchSection';
import { GallerySection } from './components/GallerySection';

export const App: React.FC = () => {
  const [favouritesId, setFavouritesId] = useState<string[]>([]);

  return (
    <main className="page__main">
      <div className="container">
        <StaticSection />

        <Routes>
          <Route path="/" element={<HomeSection />} />
          <Route 
            path='/voting' 
            element={
              <VotingSection />
            } 
          />
          <Route path='/favourites' element={<FavouritesSection setFavouritesId={setFavouritesId} />} />
          <Route path='/likes' element={<VotingResult pageName='Likes' />} />
          <Route path='/dislikes' element={<VotingResult pageName='Dislikes' />} />

          <Route path='breeds'>
            <Route index element={<BreedsSection />} />
            <Route path=":breedId" element={<BreedInfo />} />
          </Route>

          <Route 
            path='/gallery' 
            element={
              <GallerySection favouritesId={favouritesId} setFavouritesId={setFavouritesId} />
            } 
          />

          <Route path='/search' element={<SearchSection />} />
        </Routes>
      </div>
    </main>
  );
}
