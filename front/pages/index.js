import React from 'react';
import Head from 'next/head';
import AppLayout from '../components/AppLayout';

/* 참조 import */
import BodyIntro from '../components/MainScreen/BodyIntro';
import BodyContentOne from '../components/MainScreen/BodyContentOne';
import BodyContentTwo from '../components/MainScreen/BodyContentTwo';
import BodyContentThree from '../components/MainScreen/BodyContentThree';
import BodyContentFour from '../components/MainScreen/BodyContentFour';
import BodyContentFive from '../components/MainScreen/BodyContentFive';
import BodyContentSix from '../components/MainScreen/BodyContentSix';
import BodyContentSeven from '../components/MainScreen/BodyContentSeven';

/* reduce */
import { LOAD_MY_INFO_REQUEST } from '../reducers/user';
import { useSelector, useDispatch } from 'react-redux';
import wrapper from '../store/configureStore'
import { END } from 'redux-saga';
import axios from 'axios';

const Home = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);

  return (
    <AppLayout>
      <Head>
        <title>Meat_Community</title>
      </Head>
      <div>
        <BodyIntro />
        <BodyContentOne />
        <BodyContentTwo />
        <BodyContentThree />
        <BodyContentFour />
        <BodyContentFive />
        <BodyContentSix />
        <BodyContentSeven />
      </div>
  </AppLayout>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  context.store.dispatch({
    type: LOAD_MY_INFO_REQUEST,
  })

  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
})

export default Home;