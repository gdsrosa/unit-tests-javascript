import type { NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = () => {
  return (
    <div className="text-center">
      <Head>
        <title>Store Next</title>
        <meta name="description" content="Store Next - TDD course" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="text-3xl font-bold">Store Next</h1>
      </main>
    </div>
  );
};

export default Home;
