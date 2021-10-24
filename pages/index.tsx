import Head from 'next/head'
import Link from 'next/link'
import Layout from 'components/Layout'

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>On Deck Newsfeed</title>
      </Head>
      <h1>Hello there!</h1>
      <p>Checkout the newsfeed for founders, angels and writers</p>
      <span>Check out these pages:</span>
      <ul>
        <li><Link href="/feed/foundersFeed">Founders Feed</Link></li>
        <li><Link href="/feed/angelsFeed">Angels Feed</Link></li>
        <li><Link href="/feed/writersFeed">Writers Feed</Link></li>
      </ul>
      
      <ul>
        <li>Project <Link href="/projects/10">Blue Onion Labs</Link></li>
        <li>User <Link href="/users/11">Cai Burris</Link></li>
      </ul>
    </Layout>
  )
}
