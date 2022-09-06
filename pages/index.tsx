import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import styles from '../styles/Home.module.css';
import { useRouter } from 'next/router';
import { httpLog, log } from 'logger';

type Props = {
  user: any;
};

// export const getServerSideProps = async () => {
//   try {
//     const res = await fetch('https://api.github.com/users/bryce0516');
//     let result;
//     if (res.status === 200) result = await res.json();
//     else result = null;
//     return {
//       props: {
//         user: result,
//       },
//     };
//   } catch (error) {
//     console.warn(error);
//     return null;
//   }
// };

const Home: NextPage<Props> = () => {
  // console.log('this is home props', props);
  // const { user } = props;
  const [name, setName] = React.useState<string>('');
  const router = useRouter();
  // const username = user && user.name;

  return (
    <div className={styles.container}>
      <h2>Link to tomato page</h2>
      <img src="/logo.png" alt="logo" />
      <div>
        <Link href="/tomato">
          <a>Move to &#39;/tomato&#39;</a>
        </Link>
      </div>

      <div>
        <Link href="/">
          <a>Move to &#39;/&#39;</a>
        </Link>
      </div>
      <div>
        <Link href={`/user/${name}`}>
          <a>Move to &#39;깃허브 {name}검색하러가기&#39;</a>
        </Link>
      </div>
      <p>{name}</p>
      <div>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ marginRight: 12 }}
        />
      </div>
      <div>
        <button onClick={() => router.push(`/vegetable/${name}`)}>
          go to tomato
        </button>
      </div>
{/* 
      <div>
        <p>깃허브 유저네임: {username}</p>
      </div> */}
    </div>
  );
};

export default Home;
