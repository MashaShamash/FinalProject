import type { RootState } from '@reduxjs/toolkit/query';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

type ProfilePageProps = {};
function ProfilePage(): JSX.Element {
  const { user } = useSelector((state: RootState) => state.user);
//   const [pseudonym, setPseudonym] = useState('');
//   const [activity, setActivity] = useState('');
//   const [biography, setBiography] = useState('');
//   const [userId, setUserId] = useState('');
  return (
    <div className=" ProfilePage">
      {user ? <h2>{user.name}</h2> : null}
      {user ? <h3>{user.lastName}</h3> : null}
    </div>
  );
}
export default ProfilePage;
