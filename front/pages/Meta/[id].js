import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const DynamicComponentWithNoSSR = dynamic(
  () => import('../../components/MetaSpaceScrean'),
  { ssr: false }
);

const Meta = () => {
  const [phaserLoaded, setPhaserLoaded] = useState(false);
  
  useEffect(() => {
    const loadPhaser = async () => {
      if (typeof window !== "undefined" && !window.Phaser) {
        const Phaser = await import("phaser");
        window.Phaser = Phaser;
        setPhaserLoaded(true);
      }
    };

    loadPhaser();
  }, [phaserLoaded]);

  return (
    <div>
      {phaserLoaded && <DynamicComponentWithNoSSR />}
    </div>
  );
};

export default Meta;