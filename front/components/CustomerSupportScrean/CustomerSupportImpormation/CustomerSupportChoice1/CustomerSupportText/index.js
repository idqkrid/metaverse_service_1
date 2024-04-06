import React, {useEffect, useCallback} from 'react'
import styles from './styles.module.css';

/* router */
import { useRouter } from 'next/router';

const CustomerSupportText = ({notice}) => {
  const router = useRouter();


  useEffect(() => {
    console.log(notice);
  })

  const detailNoticeButton = useCallback((e) => {
    e.preventDefault();
    console.log('공지사항 조회하기')
    router.push(`/CustomerSupport/CustomerSupportNotice/CaseStudy/Detail/${notice.id}`);
  })

  const date = new Date(notice.createdAt);
  const formattedDate = date.toISOString().split('T')[0];
  
  return (
    <div>
      <div className={styles.content} onClick={detailNoticeButton}>
        <div className={styles.contentImage}>📢</div>
        <div className={styles.contentTitle}>{notice.title}</div>
        <div className={styles.contentDay}>{formattedDate}</div>
      </div>
    </div>
  )
}

export default CustomerSupportText;