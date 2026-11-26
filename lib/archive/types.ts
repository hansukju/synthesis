export type ItemKind = "fashion" | "music";

export type Artwork = { src: string; alt: string };

export type SearchableEntity = {
  id: string;
  slug: string;
  title: string;
  creator: string;
  kind: ItemKind;
  styles: readonly string[];
  aliases: readonly string[];
  keywords: readonly string[];
};

export type ArchiveSource = {
  name: string;
  url: string;
  status: "verified" | "unverified";
};

export type Entity = SearchableEntity & {
  format: string;
  image?: Artwork;
  release: string;
  facts?: readonly { label: string; value: string }[];
  overview: string;
  history: string;
  creative: string;
  significance: string;
  sample: boolean;
  sources: readonly ArchiveSource[];
};

export type RelatedItem = {
  item: Entity;
  type: string;
  reason: string;
};

export type Selection = {
  daysAgo: number;
  fashion: Entity;
  music: Entity;
};
