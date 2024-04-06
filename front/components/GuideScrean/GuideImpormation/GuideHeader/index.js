import React, { useState, useCallback } from 'react';
import styles from './styles.module.css';

import { useRouter } from 'next/router';

import Link from 'next/link';

const GuideHeader = () => {
  const router = useRouter();

  const models = [
    { first_name: '로그인', path: '/Guide/GuideLogin' },
    { first_name: '프로필', path: '/Guide/GuideProfile' },
    { first_name: '조작 방법', path: '/Guide/GuideMove' }
  ];


  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림 상태를 관리하는 상태
  const [query, setQuery] = useState('');

  const openModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const search = (data) => {
    return data.filter((item) => item.first_name.toLowerCase().includes(query));
  }

  const handleClick = (path) => {
    router.push(path);
  }

  return (
    <div className={styles.title}>
      <div className={styles.logoDesign}>
        <div className={styles.logo}><Link href="/"><a><img src="/images/logo_zep.svg" alt="logo"></img></a></Link></div>
      </div>
      <ul className={styles.titleNav}>
        <li>
          <div onClick={openModal}>
            <svg xmlns="http://www.w3.org/2000/svg" width="1.25rem" height="1.25rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search" type="Search"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg>
          </div>
        </li>
      </ul>
      {/* 모달이 열렸을 때만 모달을 렌더링합니다 */}
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalTitle}>
              <div className={styles.modalTitleContent1}>
                <div className={styles.modalTitleContent1Input}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="1.25rem" height="1.25rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search" type="Search"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg>
                  <input
                      type="text"
                      placeholder='Search...'
                      onChange={(e) => setQuery(e.target.value)}
                  />
                </div>
              </div>
              <div className={styles.modalTitleContent2}
                onClick={closeModal}>x</div>
            </div>
            <div className={styles.modalContent}>
              <div>
                {query && search(models).length > 0 ? (
                  search(models).map((item, index) => (
                        <div key={index} className={styles.modelDetail}>
                            <a onClick={() => handleClick(`${item.path}`)}>
                                {item.first_name}
                            </a>
                        </div>
                    ))
                ) : null}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default GuideHeader;