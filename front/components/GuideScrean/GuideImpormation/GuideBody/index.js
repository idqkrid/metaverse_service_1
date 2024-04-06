import React, { useEffect } from 'react';
import styles from './styles.module.css';

import Link from 'next/link';

const GuideBody = () => {
  return (
    <div className={styles.body}>
      <div className={styles.leftBody}>
        <div className={styles.leftBodyContent0}>OFFICIAL GUIDE</div>
        <div className={styles.leftBodyContent1}><Link href="/Guide"><a>🙆‍♀️ 사용자가이드</a></Link></div>
      </div>
      <div className={styles.centerBody}>
        <div className={styles.centerTitleBody}>
          ZEP 모두 알아보세요!
        </div>

        <div className={styles.centerContent1Body}>
          <div>
            <h3>ZEP 시작하기</h3>
          </div>
          <div className={styles.centerContent2Body}><Link href="/Guide/GuideLogin"><a>🐤로그인</a></Link></div>
          <div className={styles.centerContent3Body}><Link href="/Guide/GuideProfile"><a>😀프로필</a></Link></div>
          <div className={styles.centerContent4Body}><Link href="/Guide/GuideMove"><a>🤸‍♀️조작 방법</a></Link></div>
        </div>
      </div>
      <div className={styles.rightBody}></div>
    </div>
  )
}

export default GuideBody;