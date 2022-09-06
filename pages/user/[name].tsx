import { GetServerSideProps, PreviewData } from 'next';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import React from 'react';
import formatDistance from 'date-fns/formatDistance';
import Profile from '../../components/user/Profile';
import Link from 'next/link';
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
      `https://api.github.com/users/${query.name}/repos?sort=updated&page={${query.page}}&per_page=10`
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
  const { user, repos } = props;

  const [hover, setHover] = React.useState<number>(0);
  const router = useRouter();
  const { page = '1' } = router.query;
  if (!user && !repos) {
    return null;
  }
  return (
    <div style={styles.userContentsWrapper}>
      <Profile user={user} />
      <div style={styles.reposeWrapper}>
        <div style={styles.reposHeader}>
          Repositories
          <span style={styles.reposCount}>{user.public_repos}</span>
        </div>
        {user &&
          repos &&
          repos.map((element: any, index: number) => {
            return (
              <div key={element.id} style={styles.repositoryWrapper}>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href={`https://github.com/${user.login}/${element.name}`}
                >
                  <h2
                    style={{
                      ...styles.repositoryName,
                      textDecorationLine:
                        hover === element.id ? 'underline' : 'none',
                    }}
                    onMouseEnter={() => {
                      setHover(element.id);
                    }}
                    onMouseLeave={() => {
                      setHover(0);
                    }}
                  >
                    {element.name}
                  </h2>
                </a>
                <p style={styles.repositoryDescription}>
                  {element.description}
                </p>
                <p style={styles.repoLanguage}>
                  {element.language}
                  <span style={styles.repoUpdateAt}>
                    {formatDistance(new Date(element.updated_at), new Date(), {
                      addSuffix: true,
                    })}
                  </span>
                </p>
              </div>
            );
          })}
        <div style={styles.repositoryPagination}>
          <Link href={`/users/${user.login}?page=${Number(page) - 1}`}>
            <a>
              <button type="button" disabled={page === '1'}>
                Previous
              </button>
            </a>
          </Link>
          <Link
            href={`/users/${user.login}?page=${!page ? '2' : Number(page) + 1}`}
          >
            <a>
              <button type="button" disabled={repos.length < 10}>
                Next
              </button>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

const styles = {
  repositoryWrapper: {
    width: '100%',
    borderBottom: '1px solid #ele4e8',
    padding: '24px 0',
  },
  repositoryDescription: {
    padding: '12px 0',
  },
  repositoryName: {
    margin: 0,
    color: '#0366d6',
    fontSize: 20,
    display: 'inline-block',
    cursor: 'pointer',
  },
  userContentsWrapper: {
    display: 'flex',
    padding: 20,
  },
  reposeWrapper: {
    width: '100%',
    height: '100vh',
    overflow: 'scroll',
    padding: '0px 16px',
  },
  reposHeader: {
    padding: '16px, 0',
    fontSize: 14,
    fontWeight: '600',
    borderBottom: '1px solid #ele4e8',
  },
  reposCount: {
    display: 'inline-block',
    padding: '2px 5px',
    marginLeft: 6,
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 1,
    color: '#586069',
    backgroundColor: 'rgba(27, 31, 35, 0.08)',
    borderRadius: 20,
  },
  repoLanguage: {
    margin: 0,
    fontSize: 14,
  },
  repoUpdateAt: {
    marginLeft: 20,
  },
  repositoryPagination: {
    border: '1px solid rgba(27, 31,35, 0.15)',
    borderRaidus: 3,
    width: 'fit-content',
    margin: 'auto',
    marginTop: 20,
  },
  button: {
    padding: '6px 12px',
    fontSize: 14,
    border: 0,
    color: '#0366d6',
    fontWeight: 'bold',
    cursor: 'pointer',
    outline: 'none',
  },
};
export default name;
