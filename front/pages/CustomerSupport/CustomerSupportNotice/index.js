import React from 'react';
import Head from 'next/head';

import CustomerSupportChoice1 from '../../../components/CustomerSupportScrean/CustomerSupportImpormation/CustomerSupportChoice1'
import CustomerSupportHead from '../../../components/CustomerSupportScrean/CustomerSupportImpormation/CustomerSupportHead'

const CustomerSupportNotice = () => {
  return (
    <>
      <Head>
        <title>Meat_Community</title>
      </Head>
      <CustomerSupportHead />
      <CustomerSupportChoice1 />
    </>
  )
}

export default CustomerSupportNotice;