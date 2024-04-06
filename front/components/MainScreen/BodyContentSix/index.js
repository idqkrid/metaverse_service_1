import React, {useCallback} from 'react';
import styles from './styles.module.css';

import Router from 'next/router';

const BodyContentSix = () => {
  const InquireButton = useCallback((e) => {
    e.preventDefault();

    Router.push('/Inquire')
  })

  return (
    <div className={styles.header}>
      <div className={styles.title}>
        <h2>전문 제작자가 필요하신가요?</h2>
        <p>맵 제작이 어려우시거나, 특정 목적의 맵이 필요하시다면 전문 파트너사에 맡길 수 있습니다.</p>
      </div>
      <div className={styles.button} onClick={InquireButton}>
        지금 문의하기
      </div>
      <div>
        <img src="/images/bodySix.png" />
      </div>
    </div>
  )
}

export default BodyContentSix;