import { useState } from 'react';
import ProposalPage from './pages/ProposalPage';
import CelebrationPage from './pages/CelebrationPage';
import FutureFamilyPage from './pages/FutureFamilyPage';

type Page = 'proposal' | 'celebration' | 'future-family';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('proposal');

  const handleYes = () => {
    setCurrentPage('celebration');
  };

  const handleContinue = () => {
    setCurrentPage('future-family');
  };

  return (
    <div className="min-h-screen">
      {currentPage === 'proposal' && <ProposalPage onYes={handleYes} />}
      {currentPage === 'celebration' && <CelebrationPage onContinue={handleContinue} />}
      {currentPage === 'future-family' && <FutureFamilyPage />}
    </div>
  );
}

export default App;
