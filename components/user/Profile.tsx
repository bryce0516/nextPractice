import React from 'react';
import { GoLink, GoLocation, GoMail, GoOrganization } from 'react-icons/go';

type Props = any

const Profile = (props: any) => {
  const {user} = props
  if(!user) return null
  return (
    <div style={styles.profileBox}>
      <div style={styles.profileImageWrapper}>
        <img style={styles.profileImage} src={user.avatar_url} />
      </div>
      <h2 style={styles.profileUserName}>{user.name}</h2>
      <h2 style={styles.profileUserLogin}>{user.login}</h2>
      <p style={styles.profileUserBio}>{user.bio}</p>
      <p style={styles.profileUserInfo}>
        <GoOrganization size={16} color="#6a737d" />
        <span style={styles.profileUserInfoText}>{user.company ? user.company: ""}</span>
      </p>
      <p style={styles.profileUserInfo}>
        <GoLocation size={16} color="#6a737d" />
        <span style={styles.profileUserInfoText}>{user.location}</span>
      </p>
      <p style={styles.profileUserInfo}>
        <GoMail size={16} color="#6a737d" />
        <span style={styles.profileUserInfoText}>{user.email}</span>
      </p>
      <p style={styles.profileUserInfo}>
        <GoLink size={16} color="#6a737d" />
        <span style={styles.profileUserInfoText}>{user.blog}</span>
      </p>
    </div>
  );
};

const styles = {
  profileBox: {
    width: '25%',
    maxWith: 272,
    marginRight: 26,
  },
  profileImageWrapper: {
    width: '100%',
    border: '1px solid #ele4e8',
  },
  profileImage: {
    display: 'block',
    width: '100%',
  },
  profileUserName: {
    margin: 0,
    paddingTop: 16,
    fontSize: 26,
  },
  profileUserLogin: {
    margin: 0,
    fontSize: 20,
  },
  profileUserBio: {
    margin: 0,
    paddingTop: 16,
    fontSize: 14,
  },
  profileUserInfo: {
    display: 'flex',
    alignItems: 'center',
    margin: `4px 0 0`,
  },
  profileUserInfoText: {
    marginLeft: 6,
  },
};

export default Profile;
