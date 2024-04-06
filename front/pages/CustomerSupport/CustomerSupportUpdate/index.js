import React from 'react';
import Head from 'next/head';

import CustomerSupportChoice2 from '../../../components/CustomerSupportScrean/CustomerSupportImpormation/CustomerSupportChoice2'
import CustomerSupportHead from '../../../components/CustomerSupportScrean/CustomerSupportImpormation/CustomerSupportHead'

const Guide = () => {
  return (
    <>
      <Head>
        <title>Meat_Community</title>
      </Head>
      <CustomerSupportHead />
      <CustomerSupportChoice2 />
    </>
  )
}

export default Guide;