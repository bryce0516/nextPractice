import { GetServerSideProps, PreviewData } from 'next';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import React from 'react';

type Props = any;
// interface Params extends ParsedUrlQuery

export const getServerSideProps: GetServerSideProps<
  any,
  ParsedUrlQuery,
  PreviewData
> = async ({ query }) => {
  try {
    console.log('this is query', query.name);
    const res = await fetch(`https://api.github.com/users/${query.name}`);
    let result;
    if (res.status === 200) result = await res.json();
    else result = null;
    return {
      props: {
        user: result,
      },
    };
  } catch (error) {
    console.warn(error);
    return {
      props: {
        user: null,
      },
    };
  }
};

const name = (props: Props) => {
  const { user } = props;
  const router = useRouter();

  console.log(props);
  return (
    <>
      <div style={styles.profileBox}>
        <div style={styles.profileImageWrapper}>
          <img style={styles.profileImage} src={user.avatar_url}/> 
        </div>
        <h2 style={styles.profileUserName}>{user.name}</h2>
        <h2 style={styles.profileUserLogin}>{user.login}</h2>
        <h2 style={styles.profileUserBio}>{user.bio}</h2>
      </div>
    </>
  );
};

const styles = {
  profileBox: {
    width: "25%",
    maxWith: 272,
    marginRight: 26
  },
  profileImageWrapper: {
    width:"100%",
    border: "1px solid #ele4e8"
  },
  profileImage: {
    display:"block",
    width:"100%"
  },
  profileUserName: {
    margin:0,
    paddingTop: 16,
    fontSize: 26
  },
  profileUserLogin: {
    margin: 0,
    fontSize: 20
  },
  profileUserBio : {
    margin: 0,
    paddingTop: 16,
    fontSize: 14
  }

}
export default name;
