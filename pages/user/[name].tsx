import { GetServerSideProps, PreviewData } from 'next';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import React from 'react';
import { GoLink, GoLocation, GoMail } from 'react-icons/go';
import Profile from './component/Profile';
type Props = any;
// interface Params extends ParsedUrlQuery

export const getServerSideProps: GetServerSideProps<
  any,
  ParsedUrlQuery,
  PreviewData
> = async ({ query }) => {
  try {
    console.log('this is query', query.name);
    let userResult;
    let repoResult;
    const res = await fetch(`https://api.github.com/users/${query.name}`);
    const repoRes = await fetch(
      `https://api.github.com/users/${query.name}/repos?sort=updated&page=1&per_page=10`
    );
    if (res.status === 200 && repoRes.status === 200) {
      userResult = await res.json();
      repoResult = await repoRes.json();
    } else {
      userResult = null;
      repoResult = null;
    }
    return {
      props: {
        user: userResult,
        repos: repoResult,
      },
    };
  } catch (error) {
    console.warn(error);
    return {
      props: {
        user: null,
        repos: null,
      },
    };
  }
};

const name = (props: Props) => {
  const { user } = props;
  const router = useRouter();

  console.log(props);
  return (
    <div style={styles.userContentsWrapper}>
      <Profile user={user}/>
      <div style={styles.reposeWrapper}>
        <div style={styles.reposHeader}>
          Repositories
          <span style={styles.reposCount}>{user.public_repos}</span>
        </div>
      </div>
    </div>
  );
};


const styles = {
  userContentsWrapper: {
    display:"flex",
    padding:20
  },
  reposeWrapper: {
    width: "100%",
    height: "100vh",
    overflow: 'scroll',
    padding: '0px 16px'
  },
  reposHeader :{
    padding: "16px, 0",
    fontSize: 14,
    fontWeight: "600",
    borderBottom: "1px solid #ele4e8"
  },
  reposCount :{
    display:"inline-block",
    padding: '2px 5px',
    marginLeft: 6,
    fontSize: 12,
    fontWeight: "600",
    lineHeight: 1,
    color: "#586069",
    backgroundColor:"rgba(27, 31, 35, 0.08)",
    borderRadius: 20
  }
}
export default name;
