import React from 'react';
import styles from './Profile.module.css';
import avatar from '../../images/avatar.webp'

function Profile({loggedIn}) {
  if (loggedIn){
  return (
      <section className={styles.profile}>
        <img className={styles.profileAvatar} src={avatar} alt="аватар" />
        <h1 className={styles.profileTitle}>Welcome, user!</h1>
      </section>
  );
  }
}

export default Profile;