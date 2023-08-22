import './App.scss';
import { HomeSection } from './components/HomeSection';

import { StaticSection } from './components/StaticSection';

function App() {
  return (
    <main className="page__main">
      <div className="container">
        <StaticSection />
        <HomeSection />
      </div>
    </main>
  );
}

export default App
