import React from 'react';
import Head from 'next/head';

import GuideChoice2 from '../../../components/GuideScrean/GuideImpormation/GuideChoice2'
import GuideHeader from '../../../components/GuideScrean/GuideImpormation/GuideHeader'

const Guide = () => {
  return (
    <>
      <Head>
        <title>Meat_Community</title>
      </Head>
      <GuideHeader />
      <GuideChoice2 />
    </>
  )
}

export default Guide;