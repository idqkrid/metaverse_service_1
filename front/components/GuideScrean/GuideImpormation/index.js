import React, { useEffect, useCallback } from 'react';
import styles from './styles.module.css';

import GuideHeader from './GuideHeader';
import GuideBody from './GuideBody'

const GuideImpormation = () => {
  return (
    <div className={styles.header}>
      <GuideHeader />
      <GuideBody />
    </div>
  )
}

export default GuideImpormation;