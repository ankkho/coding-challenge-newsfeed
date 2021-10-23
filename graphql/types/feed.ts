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
