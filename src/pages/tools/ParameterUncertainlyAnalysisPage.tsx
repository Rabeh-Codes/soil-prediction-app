import { memo, useState } from 'react';
import MapView from '@/components/map/MapView';
import AboutSidebar from '@/components/AboutSidebar';
import RightToolPanel from '@/components/RightToolPanel';
import styles from '@/styles/ParameterUncertainlyPage.module.scss'

const ParameterUncertainlyPage = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  return (
    <div className={styles['container']}>
      <aside className={styles['sidebar']}>
      <AboutSidebar />
      </aside>
      <main className={styles['mapContainer']}>
         <RightToolPanel
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
        />
        <MapView selectedOption={selectedOption} />
      </main>
    </div>
  );
};

export default memo(ParameterUncertainlyPage);
