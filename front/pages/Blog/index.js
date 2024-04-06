import React from 'react';
import Head from 'next/head';

/* import 문 */
import BlogImpormation from '../../components/BlogScrean/BlogImpormation'

const Blog = () => {
  return (
    <>
      <Head>
        <title>Meat_Community</title>
      </Head>
      <BlogImpormation />
    </>
  )
}

export default Blog;