import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import styles from '../styles/Home.module.css';
import { useRouter } from 'next/router';

const Home: NextPage = () => {
  const [name, setName] = React.useState<string>('');
  const router = useRouter()



  return (
    <div className={styles.container}>
      <h2>Link to tomato page</h2>
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
        <Link href="/vegetable/[name]" as="/vegetable/potato">
          <a>Move to &#39;/vegetable/potato&#39;</a>
        </Link>
      </div>
      <p>
        {name}
      </p>
      <div>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ marginRight: 12 }}
        />
      </div>
      <div>
        <button onClick={() => router.push(`/vegetable/${name}`)}> go to tomato </button>
      </div>
    </div>
  );
};

export default Home;
