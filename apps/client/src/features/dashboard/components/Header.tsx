import { useState } from 'react';

import BrandLogo from '../../../components/BrandLogo';
import ButtonPrimary from '../../../components/ButtonPrimary';
import NewGoalDialog from './NewGoalDialog';

export default function Header() {
  const [newGoalActive, setNewGoalActive] = useState<boolean>(false);

  return (
    <header className="flex h-20 items-center justify-between py-150 md:py-200">
      <BrandLogo hideTextOnMobile={true} />
      <NewGoalDialog
        newGoalActive={newGoalActive}
        onClose={() => setNewGoalActive(false)}
      >
        <ButtonPrimary
          onClick={() => setNewGoalActive(true)}
          type="button"
          text="+ New goal"
        />
      </NewGoalDialog>
    </header>
  );
}
