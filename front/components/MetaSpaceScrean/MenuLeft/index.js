import React, { useCallback } from 'react';
import styles from '../MenuLeft/styles.module.css';

const Menu= ({ children, show, onCloseModal, closeButton }) => {
  const stopPropagation = useCallback((e) => {
    e.stopPropagation();
  }, []);

  if (!show) return null;

  return (
    <div className={styles.createMenu} onClick={onCloseModal}>
      <div className={styles.propagation} onClick={stopPropagation}>
        {closeButton && <button className={styles.closeModalButton} onClick={onCloseModal}>&times;</button>}
        {children}
      </div>
    </div>
  );
};
Menu.defaultProps = {
  closeButton: true,
};

export default Menu;