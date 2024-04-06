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
          <div>🐸 ZEP 이용 가이드 / 🙆‍♀️ 사용자 가이드 / 😀 프로필 </div>
          <div>
            <h2>프로필</h2>
          </div>
        </div>

        <div className={styles.centerContent1Body}>
          <div>
            <h3>프로필</h3>
          </div>
          <div className={styles.centerContent2Body}>
            <div>
              <h4>🦋닉네임 변경</h4>
              <h6>🦆닉네임이 변경 가능합니다.</h6>
            </div>

            <div>
              <h4>🦋비밀번호 변경</h4>
              <h6>🦆비밀번호 변경이 가능합니다.</h6>
            </div>

          </div>
        </div>
      </div>
      <div className={styles.rightBody}>
        <div>프로필</div>
        <div className={styles.rightBodyContent}>
          <div className={styles.rightBodyContent1}>닉네임 변경</div>
          <div className={styles.rightBodyContent1}>비밀번호 변경</div>
        </div>
      </div>
    </div>
  )
}

export default GuideChoice2;