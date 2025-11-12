export const sortOptions = [
  "Recent",
  "Oldest",
  "Most Votes",
  "Least Votes",
  "Live",
  "Expired",
] as const;
export type SortOptions = (typeof sortOptions)[number];
