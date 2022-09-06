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
> = async ({query}) => {
  try {
    console.log("this is query", query.name)
    const res = await fetch(`https://api.github.com/users/${query.name}`);
    let result;
    if (res.status === 200) result = await res.json();
    else result = null
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
  return <div>name</div>;
};

export default name;
