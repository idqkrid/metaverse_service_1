import React, {useCallback} from 'react';
import styles from './styles.module.css';

import Router from 'next/router';

const BodyIntro = () => {
  const InquireButton = useCallback((e) => {
    e.preventDefault();

    Router.push('/Inquire');
  })
  
  return (
    <div className={styles.introBg}>
      <div className={styles.mainText}>
        <ul>
          <li>
            <div><h1>쉽고 재미있는 메타버스, ZEP</h1></div>
            <div className={styles.mainTextButton} onClick={InquireButton}>
              도입 문의하기
            </div>
          </li>
        </ul>
      </div> 
    </div>
  )
}

export default BodyIntro;