import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import styles from '../styles/Home.module.css';
import { useRouter } from 'next/router';
import { httpLog, log } from 'logger';


type Props = any

export const getServerSideProps = async () => {
  try {
    const res = await fetch("https://api.github.com/users/jerrynim")
    // httpLog('', res)
    // console.log(res)
    const content = res.headers.get('content-type')
    // console.log(content)
    // logger.info({
    //   res
    // })
    return {props: {
      text:" hellowrd"
    }}
  } catch(error) {
    console.warn(error)
  }
}

const Home: NextPage<Props> = (props) => {
  console.log("this is home props", props)
  const {user} = props
  const [name, setName] = React.useState<string>('');
  const router = useRouter()
  const username= user && user.name


  return (
    <div className={styles.container}>
      <h2>Link to tomato page</h2>
      <img src="/logo.png" alt="logo"/>
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
