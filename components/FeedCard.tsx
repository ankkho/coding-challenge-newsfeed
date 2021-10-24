import styled from 'styled-components'
import Card from './Card'
import Markdown from './Markdown'
import Link from 'next/link';
import { Feed, Props, fellowshipMapType } from '../graphql/types/feed'

const fellowshipMap: fellowshipMapType = {
  founders: 'Founder',
  angels: 'Angel',
  writers: 'Writer'
}

function renderImage(image_url: string) {
  if (image_url) {
    return (
      <ColumnLeft>
        <Avatar src={image_url}/>
      </ColumnLeft>
    );
  }
}

function renderTitleContent(title: String, tableId: number, name: string, showLink: boolean) {
  const linkPath = title === 'project' ? 'project' : 'user'

  return (
    <div>
      {title && <h2>New {title}</h2>}
      <h3>
        {showLink ? <Link href={`/${linkPath}s/${tableId}`}>{name}</Link> : name}
      </h3>
    </div>
  )
}

function renderTitle(feed: Feed) {
  const {type: feedType, name, tableId, fellowship} = feed

  if (feedType === 'user') {
    return renderTitleContent(fellowshipMap[fellowship], tableId, name, true)
  } else if (feedType === 'project') {
    return renderTitleContent('project', tableId, name, true)
  } else if (feedType === 'announcement') {
    return renderTitleContent('', tableId, name, false)
  }
}

export default function FeedCard({feed}: Props) {
  const {type: feedType, created_ts} = feed  
  
  return (
    <Card>
      <Columns>
        {renderImage(feed.image_url)}
        <ColumnRight>
          <CardTitle>
            {renderTitle(feed)}
          </CardTitle>
          <Markdown>{feed.description}</Markdown>
          {feedType !== 'announcement' && <h4>Date: {new Date(created_ts).toLocaleDateString()}</h4>}
        </ColumnRight>
      </Columns>
    </Card>
  )
}

const Avatar = styled.img`
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 10px;
`

const Columns = styled.div`
  display: flex;
  flex-direction: row;
  min-width: 21rem;
`

const ColumnLeft = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 7rem;
  flex-grow: 0;
  flex-shrink: 0;
  margin-right: 1.5rem;
`

const CardTitle = styled.h2`
  font-weight: bold;
  text-transform: capitalize;
`

const ColumnRight = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  flex-shrink: 0;
  flex-basis: 14rem;
`
