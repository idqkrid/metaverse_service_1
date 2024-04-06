import React, { useEffect } from 'react';
import Head from 'next/head';
import AppLayout from '../../../components/AppLayout';
import Router from 'next/router';

// Redux
import { useSelector } from 'react-redux';
import ProfileForm from '../../../components/MemberScrean/Profile'

const Profile = () => {
  const { me } = useSelector((state) => state.user);

  useEffect(() => {
    if (!(me && me.id)) {
      Router.push('/');
    }
  }, [me && me.id]);
  if (!me) {
    return null;
  }

  return (
    <AppLayout>
      <div>
        <ProfileForm />
      </div>
  </AppLayout>
  )
}

export default Profile;