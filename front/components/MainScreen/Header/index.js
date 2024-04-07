import React, { useCallback, useEffect } from "react";
import styles from "../Header/styles.module.css";
import Link from "next/link";

// redux
import { useDispatch, useSelector } from "react-redux";
import { LOG_OUT_REQUEST } from "../../../reducers/user";

const HeadMain = () => {
  const dispatch = useDispatch();
  const { logOutLoading, logInDone } = useSelector((state) => state.user);
  const me = useSelector((state) => state.user.me?.id);

  useEffect(() => {
    console.log(me);
  });

  const onLogout = useCallback(() => {
    console.log("로그아웃 합니다.");
    dispatch({
      type: LOG_OUT_REQUEST,
    });
  }, []);

  return (
    <div className={styles.global}>
      <div className={styles.header} id="link_header">
        <div className={styles.searchArea}>
          <div className={styles.logo}>
            <Link href="/">
              <a>
                <img src="/images/logo_zep.svg"></img>
              </a>
            </Link>
          </div>
        </div>
        <ul className={styles.navOne}>
          <li className={styles.navLink}>
            <div>
              소개
              <img src="/images/chevron-down.svg"></img>
            </div>
            <ul className={styles.dropDown}>
              <div>ZEP 소개</div>
              <div>
                <Link href="/Blog">
                  <a>블로그</a>
                </Link>
              </div>
            </ul>
          </li>
          {/* <li>
            <Link href="/Price/InitialPayMent"><a>가격</a></Link>
          </li> */}
          <li className={styles.navLink}>
            <div>
              비즈니스
              <img src="/images/chevron-down.svg"></img>
            </div>
            <ul className={styles.dropDown}>
              <div>
                <Link href="/Inquire">
                  <a>문의하기</a>
                </Link>
              </div>
            </ul>
          </li>
          <li className={styles.navLink}>
            <Link href="/Guide">
              <a>이용가이드</a>
            </Link>
          </li>
          <li className={styles.navLink}>
            <Link href="/CustomerSupport">
              <a>고객 지원</a>
            </Link>
          </li>
        </ul>
        <ul className={styles.navTwo}>
          <li>
            <div className={styles.more2}>
              {me ? (
                <>
                  <div className={styles.more2Floor1}>
                    <Link href="/">
                      <a onClick={onLogout} loading={logOutLoading}>
                        로그아웃
                      </a>
                    </Link>
                  </div>
                  <div className={styles.more2Floor2}>
                    <Link href="/Member/Profile">
                      <a>프로필</a>
                    </Link>
                  </div>
                  <div className={styles.more2Floor2}>
                    <Link href="/Space">
                      <a>스페이스</a>
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  <div className={styles.more2Floor1}>
                    <Link href="/Member/Login">
                      <a>로그인</a>
                    </Link>
                  </div>
                </>
              )}
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HeadMain;
