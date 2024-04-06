import React, { useEffect } from 'react';
import styles from './styles.module.css';

import Link from 'next/link';

const GuideChoice2 = () => {
  return (
    <div className={styles.body}>
      <div className={styles.leftBody}>
        <div className={styles.leftBodyContent0}>OFFICIAL GUIDE</div>
        <div className={styles.leftBodyContent1}><Link href="/Guide"><a>🙆‍♀️ 사용자가이드</a></Link></div>
      </div>
      <div className={styles.centerBody}>
        <div className={styles.centerTitleBody}>
          <div>🐸 ZEP 이용 가이드 / 🙆‍♀️ 사용자 가이드 / 😀 조작 방법 </div>
          <div>
            <h2>조작 방법</h2>
          </div>
        </div>

        <div className={styles.centerContent1Body}>
          <div>
            <h3>조작 방법</h3>
          </div>
          <div className={styles.centerContent2Body}>
            <div>
              <h4>🦋PC 조작 방법</h4>
              <h6>🦆방향키 이동가능</h6>
            </div>

            <div>
              <h4>🦋채팅</h4>
              <h6>상단 왼쪽 버튼을 클릭하면 채팅을 입력할 수 있습니다.</h6>
            </div>

          </div>
        </div>
      </div>
      <div className={styles.rightBody}>
        <div>조작방법</div>
        <div className={styles.rightBodyContent}>
          <div className={styles.rightBodyContent1}>조작 방법</div>
          <div className={styles.rightBodyContent1}>채팅</div>
        </div>
      </div>
    </div>
  )
}

export default GuideChoice2;