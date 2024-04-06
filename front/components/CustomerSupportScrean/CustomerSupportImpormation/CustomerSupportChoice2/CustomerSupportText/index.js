import React, {useEffect, useCallback} from 'react'
import styles from './styles.module.css';

/* router */
import { useRouter } from 'next/router';

const CustomerSupportText = ({update}) => {
  const router = useRouter();


  useEffect(() => {
    console.log(update);
  })

  const detailNoticeButton = useCallback((e) => {
    e.preventDefault();
    console.log('업데이트 소식 전체보기')
    router.push(`/CustomerSupport/CustomerSupportUpdate/CaseStudy/Detail/${update.id}`);
  })

  const date = new Date(update.createdAt);
  const formattedDate = date.toISOString().split('T')[0];
  
  return (
    <div>
      <div className={styles.content} onClick={detailNoticeButton}>
        <div className={styles.contentImage}>📢</div>
        <div className={styles.contentTitle}>{update.title}</div>
        <div className={styles.contentDay}>{formattedDate}</div>
      </div>
    </div>
  )
}

export default CustomerSupportText;