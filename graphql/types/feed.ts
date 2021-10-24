export type Feed = {
    id: number;
    tableId: number;
    type: "user" | "project" | "announcement"
    fellowship: "founders" | "angels" | "writers" | "all";
    name: string;
    description: string;
    image_url: string;
    created_ts: Date;
  }

export type QueryVarsPagination = {
    limit: number;
    offset: number;
  }

export type Args = {
    limit: number;
    offset: number;
  }

export type Props = {
    feed: Feed;
  }

export  type fellowshipMapType = {
    [name: string]: String
  }

export type QueryData = {
    [feedName: string]: Feed[]
  }