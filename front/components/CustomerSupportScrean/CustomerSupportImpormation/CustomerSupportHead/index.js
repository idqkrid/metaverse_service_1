import React, { useState, useCallback, useEffect } from 'react';
import styles from './styles.module.css';

import { useSelector, useDispatch } from 'react-redux';

import CustomerSupportSearchResult from './CustomerSupportSearchResult'

/* reducers */
import { LOAD_MY_INFO_REQUEST } from '../../../../reducers/user';
import { LOAD_SEARCH_DATA_REQUEST } from '../../../../reducers/post';
/* axios */
import axios from 'axios';

/* router */
import { useRouter } from 'next/router';

import Link from 'next/link';

const CustomerSupportHead = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { me } = useSelector((state) => state.user);
  const { hasMorePosts, loadPostsLoading, loadUpdatesDone, searchDatas } = useSelector((state) => state.post);

  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림 상태를 관리하는 상태
  const [querydata, setQuery] = useState('');

  const openModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);

  }, []);

  const handleSearch = useCallback((e) => {
    e.preventDefault();
    setQuery(e.target.value);
  }, [querydata]);

  const onClickButton = useCallback((e) => {
    e.preventDefault();

    if (querydata !== "") {
      dispatch({
        type: LOAD_SEARCH_DATA_REQUEST,
        querydata,
      });
    }

  }, [querydata])

  const handleNoticeClick = useCallback((id) => {
    router.push(`/CustomerSupport/CustomerSupportNotice/CaseStudy/Detail/${id}`);
  }, [])

  const handleUpdateClick = useCallback((id) => {
    router.push(`/CustomerSupport/CustomerSupportUpdate/CaseStudy/Detail/${id}`);
  }, [])

  return (
    <div className={styles.title}>
      <div className={styles.logoDesign}>
        <div className={styles.logo}><Link href="/"><a><img src="/images/logo_zep.svg" alt="logo"></img></a></Link></div>
      </div>
      <ul className={styles.navOne}>
          <li className={styles.navLink}>
            <Link href="/CustomerSupport/CustomerSupportNotice"><a>공지사항</a></Link>
          </li>
          <li className={styles.navLink}>
            <Link href="/CustomerSupport/CustomerSupportUpdate"><a>업데이트 노트</a></Link>
          </li>
      </ul>
      <div className={styles.navSearch}>
      <div onClick={openModal}>
        <svg xmlns="http://www.w3.org/2000/svg" width="1.25rem" height="1.25rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search" type="Search"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg>
      </div>
      </div>
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
                      onChange={(e) => handleSearch(e)}
                  />
                </div>
              </div>
              <div className={styles.modalSendButton} onClick={onClickButton}>전송</div>
              <div className={styles.modalTitleContent2}
                onClick={closeModal}>x</div>
            </div>
            <div className={styles.modalContent}>
              <div className={styles.modalSearchTitle}>
              🐡 검색 기록 🐡
              </div>
              <div>
                {searchDatas?.length > 0 ? (
                  searchDatas?.map((item, index) => (
                    <div key={index} className={styles.modelDetail}>
                      {item.source === 'search'
                        ?
                        <>
                          <a onClick={() => handleNoticeClick(`${item.id}`)}>
                            {/* {item.title} */}
                            <CustomerSupportSearchResult result={item} />
                          </a>
                        </>
                        :
                        <>
                        <a onClick={() => handleUpdateClick(`${item.id}`)}>
                            {/* {item.title} */}
                            <CustomerSupportSearchResult result={item} />
                        </a>
                      </>
                      }
                            
                        </div>
                    ))
                ) : null}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CustomerSupportHead;