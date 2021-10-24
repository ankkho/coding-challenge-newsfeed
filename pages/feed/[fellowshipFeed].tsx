import React, { useState } from 'react';
import {useQuery, gql} from '@apollo/client'
import { useRouter } from 'next/router'
import Layout from 'components/Layout'
import FeedCard from 'components/FeedCard'
import FeedLayout from 'components/FeedLayout'
import HomeLink from 'components/HomeLink'
import { Feed, QueryVarsPagination } from 'graphql/types/feed'

export default function FeedPage() {
  const [offset, setOffset] = useState(0);
  const limit = 10;

  const {query} = useRouter();
  const {fellowshipFeed: feedName} = query;  

  const FEED_QUERY = gql`
    query ${feedName}($limit: Int!, $offset: Int!) {
      ${feedName}(limit: $limit, offset: $offset) {
        id
        tableId
        type
        fellowship
        name
        description
        image_url
        created_ts
      }
    }
  `
  
  type QueryData = {
    [feedName: string]: Feed[]
  }

  const { data, error, loading, fetchMore } = useQuery<QueryData, QueryVarsPagination>(
    FEED_QUERY, { variables: { limit, offset }}
  )

  if (!data?.[`${feedName}`] || loading || error) {
    if (error) {
      console.error(error);
    }

    return null
  }

  window.onscroll = () => {
    const hasMore = data?.[`${feedName}`].length % 10 === 0;
    if (hasMore) {
      const isBottom = window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight;
      if(isBottom) {
        const updatedOffset = offset + 1;
        fetchMore({variables: { limit, offset: updatedOffset }});
        setOffset(updatedOffset);
      }
    }
  }

  return (
    <Layout>
      <HomeLink />
      {data?.[`${feedName}`].map(feed => {
        return (
          <FeedLayout key={feed.id}>
            <FeedCard feed={feed} />
          </FeedLayout>
        )
      })}
    </Layout>
  )
}