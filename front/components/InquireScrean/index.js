import React, {useState, useCallback, useEffect} from 'react';
import styles from '../InquireScrean/styles.module.css';
import Link from 'next/link';

import useInput from '../../hooks/useInput'

// redux
import { useDispatch, useSelector } from 'react-redux';
import { SEND_EMAIL_REQUEST } from '../../reducers/post';

import { useRouter } from 'next/router';

const InquireScrean = () => {
  const [name, onChangeName] = useInput('');
  const [email, onChangeEmail] = useInput('');
  const [subject, onChangeSubject] = useInput('');
  const [message, onChangeMessage] = useInput('');
  
  const router = useRouter();

  const dispatch = useDispatch();
  const { sendEmailDone } = useSelector((state) => state.post);

  const onSubmitForm = useCallback((e) => {
    e.preventDefault();

    dispatch({
      type: SEND_EMAIL_REQUEST,
      data: { name, email, subject, message},
    });
  }, [name, email, subject, message]);

  if (sendEmailDone) {
    router.replace('/Inquire/InquireSuccess');
  }


  return (
    <div className={styles.hero}>
      <div className={styles.titleBackground}>
        <img src="/images/backgroundZep.png" />
      </div>
      <div className={styles.formBox}>
        <div className={styles.buttonBox}>
          <button type="button" className={styles.toggleBtn}>문의하기</button>
        </div>
        <div className={styles.inputGroup}>
          <input className={styles.inputField} type="text" placeholder="이름을 작성해 주세요" value={name} onChange={onChangeName} required />
          <input className={styles.inputField} type="text" placeholder="이메일주소를 작성해 주세요" value={email} onChange={onChangeEmail} required />
          <input className={styles.inputField} type="text" placeholder="보내는 이유를 작성해 주세요" value={subject} onChange={onChangeSubject} required />
          <input className={styles.inputField} type="text" placeholder="내용을 작성해 주세요" value={message} onChange={onChangeMessage} required />
          <button type="submit" className={styles.submitBtn} onClick={onSubmitForm}>전송</button>
        </div>
      </div>
    </div>
  )
}

export default InquireScrean;