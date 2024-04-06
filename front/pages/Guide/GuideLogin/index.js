import React from 'react';
import Head from 'next/head';

import GuideChoice1 from '../../../components/GuideScrean/GuideImpormation/GuideChoice1'
import GuideHeader from '../../../components/GuideScrean/GuideImpormation/GuideHeader'

const Guide = () => {
  return (
    <>
      <Head>
        <title>Meat_Community</title>
      </Head>
      <GuideHeader />
      <GuideChoice1 />
    </>
  )
}

export default Guide;