import React, { useState, useCallback, useEffect, useRef } from 'react';
import styles from '../../MemberScrean/Profile/styles.module.css';
import Link from 'next/link';
import Router from 'next/router';

// hooks
import useInput from '../../../hooks/useInput';

// redux
import { useSelector, useDispatch } from 'react-redux';
import { CHANGE_NICKNAME_REQUEST, CHANGE_PASSWORD_REQUEST } from '../../../reducers/user'; 

const ProfileForm = () => {
  const { me, changePasswordDone, changePasswordError } = useSelector((state) => state.user);
  const [nickname, onChangeNickname] = useInput(me?.nickname || '');

  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    if (changePasswordDone) {
      alert('비밀번호를 수정하셨습니다.')
      setOldPassword('');
      setPassword('');
      setPasswordCheck('');
    }
  }, [changePasswordDone])

  useEffect(() => {
    if (changePasswordError) {
      alert('비밀번호를 수정하지 못하였습니다.')
      setOldPassword('');
      setPassword('');
      setPasswordCheck('');
    }
  }, [changePasswordError])

  const onChangeOldPassword = useCallback((e) => {
    setOldPassword(e.target.value);
  })

  const onChangePassword = useCallback((e) => {
    setPassword(e.target.value);
  })

  const onChangePsswordCheck = useCallback((e) => {
    setPasswordCheck(e.target.value);
  })

  const onChangeNicknameSubmit = useCallback(() => {
    dispatch({
      type: CHANGE_NICKNAME_REQUEST,
      data: nickname,
    });
  }, [nickname]);

  const onChangePasswordSubmit = useCallback(() => {
    console.log('클릭')
    console.log(password)
    dispatch({
      type: CHANGE_PASSWORD_REQUEST,
      data: passwordCheck,
    });
  }, [passwordCheck])

  console.log(me);

  return (
    <div className={styles.header}>
      <div className={styles.title}>
        프로필 설정
      </div>
      <div className={styles.nickNameLabel}>
        <label>닉네임</label>
        <div className={styles.nicknameGroup}>
          <input type="text" className={styles.nickNameChange} value={nickname} placeholder="닉네임을 입력하세요" onChange={onChangeNickname}></input>
          <button type="submit" className={styles.nickNameChageButton} onClick={onChangeNicknameSubmit}>수정</button>
        </div>
      </div>
      {/*  */}
      <div className={styles.passwordLabel}>
        <label>비밀번호 변경</label>
        <input type="password" placeholder="기존 비밀번호" className={styles.passwordOldChange} value={oldPassword} onChange={onChangeOldPassword}></input>
        <input type="password" placeholder="새 비밀번호" className={styles.passwordChange} value={password} onChange={onChangePassword}></input>
        <input type="password" placeholder="새 비밀번호 확인" className={styles.passwordCheckChange} value={passwordCheck} onChange={onChangePsswordCheck}></input>
        <button type="submit" className={styles.passwordButton} onClick={onChangePasswordSubmit}>수정</button>
      </div>
    </div>
  )
}

export default ProfileForm;