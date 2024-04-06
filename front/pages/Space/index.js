import React, { useEffect, useCallback } from 'react';

import HeadMain from '../../components/MainScreen/Header'

/* reducers */
import { LOAD_MY_INFO_REQUEST } from '../../reducers/user';

/* router */
import { useRouter } from 'next/router';

// redux
import { useSelector, useDispatch } from 'react-redux';

// next
import wrapper from '../../store/configureStore'
import { END } from 'redux-saga';

/* axios */
import axios from 'axios';

import SpaceScrean from '../../components/SpaceScrean'

const InitialPayMent = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch({
      type: LOAD_MY_INFO_REQUEST,
    });
  }, [dispatch])

  return (
    <div>
      <HeadMain />
      <SpaceScrean />
    </div>
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

export default InitialPayMent;