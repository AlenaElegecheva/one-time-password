import React from 'react';
import styles from './ProcessingHeading.module.css';
import classNames from 'classnames';

function ProcessingHeading({ text, link, isCorrectPassword, isUncorrectPassword }) {
  const processingHeadingClass = classNames(styles.processingHeading, {
    [styles.processingHeadingCorrect]: isCorrectPassword,
    [styles.processingHeadingUncorrect]: isUncorrectPassword,
  });


  return <p className={processingHeadingClass}>{text}<a className={styles.linkToNewOtp} href='#'> {link}</a></p>;
}

export default ProcessingHeading;