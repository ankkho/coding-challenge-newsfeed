import db, {FeedRow} from '../../../db'
import {Args} from '../../../types/feed'

export default async function writersFeed(parent: unknown, {limit, offset}: Args): Promise<FeedRow[]> {
  const begin = offset * limit;
  const feed: FeedRow[] = await db.getAll(
    `
    SELECT * FROM (
      SELECT users.id, users.id AS tableId, "user" AS type, users.fellowship, users.name, users.bio AS description, users.avatar_url AS image_url, users.created_ts FROM users
        WHERE users.fellowship = "writers"
      UNION ALL
      SELECT announcements.id, announcements.id AS tableId, "announcement" AS type, announcements.fellowship, announcements.title AS name, announcements.body AS description, NULL AS image_url, announcements.created_ts FROM announcements
        WHERE announcements.fellowship = "all" OR announcements.fellowship = "writers"
    ) AS result
    ORDER BY result.created_ts DESC
    LIMIT ?,?;
    `,
    [begin, limit]
  )
  
  let id = begin;
  const uniqueIdFeed = feed.map(item => {
    item.id = id++;
    return item;
  });

  return uniqueIdFeed;
}
