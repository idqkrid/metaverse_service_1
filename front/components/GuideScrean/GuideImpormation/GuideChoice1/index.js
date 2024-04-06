import React, { useEffect } from 'react';
import styles from './styles.module.css';

import Link from 'next/link';

const GuideChoice1 = () => {
  return (
    <div className={styles.body}>
      <div className={styles.leftBody}>
        <div className={styles.leftBodyContent0}>OFFICIAL GUIDE</div>
        <div className={styles.leftBodyContent1}><Link href="/Guide"><a>🙆‍♀️ 사용자가이드</a></Link></div>
      </div>
      <div className={styles.centerBody}>
        <div className={styles.centerTitleBody}>
          <div>🐸 ZEP 이용 가이드 / 🙆‍♀️ 사용자 가이드 / 🐤 로그인 </div>
          <div>
            <h2>로그인</h2>
          </div>
        </div>

        <div className={styles.centerContent1Body}>
          <div>
            <h3>로그인</h3>
          </div>
          <div className={styles.centerContent2Body}>
            <div>
              <h4>🦋구글로 로그인</h4>
              <h6>🦆구글 계정으로 로그인이 가능합니다.</h6>
            </div>

            <div>
              <h4>🦋카카오톡으로 로그인</h4>
              <h6>🦆카카오톡 계정으로 로그인이 가능합니다.</h6>
            </div>

            <div>
              <h4>🦋이메일/비밀번호 로그인</h4>
              <h6>🦆이메일/비밀번호 계정으로 로그인이 가능합니다.</h6>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.rightBody}>
        <div>로그인</div>
        <div className={styles.rightBodyContent}>
          <div className={styles.rightBodyContent1}>구글로 로그인</div>
          <div className={styles.rightBodyContent1}>카카오톡으로 로그인</div>
          <div className={styles.rightBodyContent1}>이메일/비밀번호 로그인</div>
        </div>
      </div>
    </div>
  )
}

export default GuideChoice1;