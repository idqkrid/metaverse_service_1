import React from 'react';
import styles from './styles.module.css';

const BodyContentThree = () => {
  return (
    <div className={styles.header}>
      <h1>수많은 사용자가 ZEP을 이용 중입니다</h1>
      <div className={styles.content}>
        <div className={styles.contentOne}>
          <div className={styles.contentOneText1}>
            월간 활성 이용자
          </div>
          <div className={styles.contentOneText2}>
            <span>130</span>
            만명
          </div>
        </div>
        <div className={styles.contentTwo}>
          <div className={styles.contentOneText1}>
            일 평균 스페이스 생성 수
          </div>
          <div className={styles.contentOneText2}>
            <span>1800</span>
            개
          </div>
        </div>
        <div className={styles.contentThree}>
          <div className={styles.contentOneText1}>
            이용자 평균 이용 시간
          </div>
          <div className={styles.contentOneText2}>
            <span>40</span>
            분
          </div>
        </div>
      </div>
    </div>
  )
}

export default BodyContentThree;