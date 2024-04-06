import React, { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import styles from '../../MemberScrean/SignUp/styles.module.css';

// hooks
import useInput from '../../../hooks/useInput';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { SIGN_UP_REQUEST } from '../../../reducers/user';

import Router from 'next/router';

const SignUpForm = () => {
  const [passwordCheck, setPasswordCheck] = useState('');
  const [term, setTerm] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const [email, onChangeEmail] = useInput('');
  const [nickname, onChangeNickname] = useInput('');
  const [password, onChangePassword] = useInput('');

  // reudx
  const dispatch = useDispatch();
  const { signUpLoading, me, signUpDone, signUpError } = useSelector((state) => state.user);

  // useEffect(() => {
  //   if (me && me.id) {
  //     Router.replace('/')
  //   } else {
  //     Router.push('/Member/Signup')
  //   }
  // }, [me && me.id])

  useEffect(() => {
    if (signUpDone) {
      Router.push('/Member/Login')
    } else {
      Router.push('/Member/Signup')
    }
  }, [signUpDone]);

  useEffect(() => {
    if (signUpError) {
      alert(signUpError)
    }
  }, [signUpError])

  const onSubmit = useCallback((e) => {
    e.preventDefault();
    if (email.trim() === '' || nickname.trim() === '' || password.trim() === '' || passwordCheck.trim() === '') {
      alert('모두 입력해주세요.')
      return;
    }


    if (password !== passwordCheck) {
      return setPasswordError(true);
    }

    return dispatch({
      type: SIGN_UP_REQUEST,
      data: {
        email,
        password,
        nickname,
      },
    });
  });

  const onChangePasswordCheck = useCallback((e) => {
    setPasswordError(e.target.value !== password);
    setPasswordCheck(e.target.value);
  }, [password]);

  return (
    <div className={styles.hero}>
      <div className={styles.formBox}>
        <div className={styles.buttonBox}>
          <div className={styles.toggleBtn}>회원가입</div>
        </div>
        <div id="login" className={styles.inputGroup}>
          <input className={styles.inputFieldEmail} type="email" placeholder="이메일을 작성해주세요" value={email} onChange={onChangeEmail} required />
          <input className={styles.inputFieldNickname} tpye="text" placeholder="닉네임을 작성해주세요" value={nickname} onChange={onChangeNickname} required />
          <input className={styles.inputFieldPassword} type="password" placeholder="비밀번호를 작성해주세요" value={password} onChange={onChangePassword} required />
          <input className={styles.inputFieldPasswordNickname} type="password" placeholder="비밀번호를 다시 입력해주세요." value={passwordCheck} onChange={onChangePasswordCheck} required />
          {passwordError && <div style={{ color: 'red' }}>비밀번호가 일치하지 않습니다.</div>}

          <button type="submit" className={styles.submitBtn} onClick={onSubmit}>확인</button>
          <button className={styles.submitBtnLogin}><Link href="/Member/Login"><a className={styles.loginLink}>로그인</a></Link></button>
        </div>
      </div>
    </div>
  )
}

export default SignUpForm;