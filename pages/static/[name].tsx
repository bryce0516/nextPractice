import React from 'react';

type Props = any;

const name = ({ user, time }: any) => {
  const username = user && user.name;
  return (
    <div>
      {username}
      {time}
    </div>
  );
};

export const getStaticProps = async ({ params }: any) => {
  try {
    const res = await fetch(`https://api.github.com/users/${params.name}`);
    let result;
    if (res.status === 200) result = await res.json();
    else result = null;
    return {
      props: {
        user: result,
        time: new Date().toISOString(),
      },
    };
  } catch (err) {
    console.warn(err);
    return {
      props: {
        user: null,
        time: new Date().toISOString(),
      },
    };
  }
};

export const getStaticPaths = async () => {
  return {
    paths: [{ params: { name: 'bryce0516' } }],
    fallback: true,
  };
};
export default name;
