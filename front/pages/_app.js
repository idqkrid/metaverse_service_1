import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';

import wrapper from '../store/configureStore';

const NodeBird = ({ Component }) => {
  return (
    <>
      <Head>
        <title>Meat_Community</title>
      </Head>
      <div>
        <Component />
      </div>
    </>
  );
};

export default wrapper.withRedux(NodeBird);