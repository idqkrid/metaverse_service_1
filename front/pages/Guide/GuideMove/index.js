import React from 'react';
import Head from 'next/head';

import GuideChoice3 from '../../../components/GuideScrean/GuideImpormation/GuideChoice3'
import GuideHeader from '../../../components/GuideScrean/GuideImpormation/GuideHeader'

const Guide = () => {
  return (
    <>
      <Head>
        <title>Meat_Community</title>
      </Head>
      <GuideHeader />
      <GuideChoice3 />
    </>
  )
}

export default Guide;