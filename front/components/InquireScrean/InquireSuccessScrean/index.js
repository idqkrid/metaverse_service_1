import React, {useState, useCallback, useEffect} from 'react';
import styles from '../InquireSuccessScrean/styles.module.css';
import Link from 'next/link';


const InquireScrean = () => {
  return (
    <div className={styles.hero}>
      <div className={styles.titleBackground}>
        <img src="/images/backgroundZep.png" />
      </div>
      <div className={styles.formBox}>
        <div className={styles.buttonBox}>
          <h2 className={styles.titleH2}>
          <div>ZEP 프리미엄 플랜 엔터프라이즈 문의가 정상적으로 접수 완료 되었습니다.</div>
          <div>문의에 대한 답변은 담당자가 1-2 영업일 내에 입력하신 메일로 연락드릴 예정입니다.</div> 
          <div>감사합니다.</div>
          </h2>
        </div>
      </div>
    </div>
  )
}

export default InquireScrean;