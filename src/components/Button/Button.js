import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Button.module.css';
import arrow from '../../images/Arrow_back.svg'

function Button() {
  const navigate = useNavigate();

  return (
    <div className={styles.btnContainer}>
      <button className={styles.btnBackPrevPage} onClick={() => navigate(-1)}>
      <img className={styles.btnImage} src={arrow} alt='перейти на предыдущую страницу' />
        Back
      </button>
    </div>

  )
}

export default Button;