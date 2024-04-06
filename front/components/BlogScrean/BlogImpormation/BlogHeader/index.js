import React, { useEffect } from 'react';
import styles from './styles.module.css';

import Link from 'next/link';

const BlogImpormationHeader = () => {
  return (
    <div className={styles.title}>
      <div className={styles.logoDesign}>
        <div className={styles.logo}><Link href="/"><a href="/"><img src="/images/logo_zep.svg"></img></a></Link></div>
      </div>
      <ul className={styles.titleNav}>
        <li><Link href="/Blog/MoreDetail"><a>성공사례</a></Link></li>
        <li><Link href="/"><a href="/">ZEP 홈페이지</a></Link></li>
      </ul>
  </div>
  )
}

export default BlogImpormationHeader;