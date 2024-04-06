import React, {useState, useCallback, useEffect} from 'react';
import styles from '../../MemberScrean/Login/styles.module.css';
import Link from 'next/link';

// hooks
import useInput from '../../../hooks/useInput';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { LOG_IN_REQUEST } from '../../../reducers/user';

const LoginForm = () => {
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');

  const dispatch = useDispatch();
  const { logInLoading, logInError } = useSelector((state) => state.user);

  useEffect(() => {
    if (logInError) {
      alert(logInError)
    }
  }, [logInError])

  const onSubmitForm = useCallback((e) => {
    e.preventDefault();
    console.log(email, password);

    if (email.trim() === '' || password.trim() === '') {
      alert('모두 입력해주세요.')
      return;
    }

    dispatch({
      type: LOG_IN_REQUEST,
      data: { email, password },
    });
  }, [email, password]);

  return (
    <div className={styles.hero}>
      <div className={styles.formBox}>
        <div className={styles.buttonBox}>
          <div className={styles.toggleBtn}>로그인</div>
        </div>
        <div id="login" className={styles.inputGroup}>
          <input className={styles.inputFieldEmail} type="email" placeholder="이메일을 작성해주세요." value={email} onChange={onChangeEmail} required />
          <input className={styles.inputFieldPassword} type="password" placeholder="비밀번호를 작성해주세요" value={password} onChange={onChangePassword} required />
          <button type="submit" className={styles.submitBtn} onClick={onSubmitForm}>확인</button>
          <button className={styles.submitBtnRegister}><Link href="/Member/Signup"><a className={styles.registerLink}>회원가입</a></Link></button>
        </div>
      </div>
    </div>
  )
}

export default LoginForm;