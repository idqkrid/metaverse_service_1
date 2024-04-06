import React from 'react';
import styles from './styles.module.css';

const Pagination = ({totalPosts, postsPerPage, setCurrentPage}) => {
  let pages = [];

  for (let i = 1; i <= Math.ceil(totalPosts.length / postsPerPage); i++) {
    pages.push(i);
  }

  return (
    <div className={styles.pagination}>
      {console.log(pages)}
      {pages.map((page, index) => {
        return <button className={styles.paginationButton} key={index} onClick={() => setCurrentPage(page)}>{page}</button>
      })}
    </div>
  )
}

export default Pagination;