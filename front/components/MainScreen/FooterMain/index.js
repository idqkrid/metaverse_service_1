import React from 'react';
import styles from './styles.module.css';

const FooterMain = () => {
  return (
    <div className={styles.footer}>
      <div>
        <img src="/images/logo_zep.svg"></img>
      </div>
      <div>
        <span>주식회사 ZEP | 공동대표이사 김원배, 김상엽 | 사업자등록번호: 535-86-02323 |<br /></span> 
        <span>통신판매업 신고번호: 2033-서울강남-04632
        서울특별시 강남구 강남대로94길 10, 9층 (역삼동) |<br /></span>
        유선번호: 070-7666-9837 | 팩스번호: 02-2135-5446 | e-mail: hello@zep.us
        @ZEP Co, LTD All Rights Reserved
      </div>
    </div>
  )
}

export default FooterMain;