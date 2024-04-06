import React from 'react';
import Link from 'next/link';

/* 참조 import */
import HeadMain from '../components/MainScreen/Header';
import FooterMain from '../components/MainScreen/FooterMain';

const AppLayout = ({ children }) => {
  return (
    <>
      {/* <Link href="/"><a>로고</a></Link>
      <Link href="/profile"><a>프로필</a></Link> */}
      <HeadMain />
      {children}
      <FooterMain />
    </>
  )
}

export default AppLayout;