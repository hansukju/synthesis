import { exampleArchive } from "@/data/examples/archive";
import { comparisons, featuredConnections } from "@/data/examples/connections";
import { exampleSelections } from "@/data/examples/selections";
import type { Entity, ItemKind, RelatedItem, SearchableEntity, Selection } from "./types";

const byId = new Map(exampleArchive.map((entity) => [entity.id, entity]));
const bySlug = new Map(exampleArchive.map((entity) => [entity.slug, entity]));

export const searchIndex: readonly (SearchableEntity & Pick<Entity, "sample">)[] = exampleArchive.map(
  ({ id, slug, kind, title, creator, aliases, styles, keywords, sample }) =>
    ({ id, slug, kind, title, creator, aliases, styles, keywords, sample }),
);

export function listItemSlugs() {
  return exampleArchive.map(({ slug }) => ({ slug }));
}

export function getItem(slug: string) {
  return bySlug.get(slug);
}

export function getEntity(id: string) {
  return byId.get(id);
}

export function getSelections(): Selection[] {
  return exampleSelections.flatMap(({ daysAgo, fashionId, musicId }) => {
    const fashion = getEntity(fashionId);
    const music = getEntity(musicId);
    return fashion?.kind === "fashion" && music?.kind === "music" ? [{ daysAgo, fashion, music }] : [];
  });
}

export function getRelatedItems(current: Entity, kind: ItemKind): RelatedItem[] {
  const featured = featuredConnections[current.id];
  const ids = featured ? Object.keys(featured) : Object.keys(comparisons);

  return ids.flatMap((id) => {
    const item = getEntity(id);
    if (item?.kind !== kind || id === current.id) return [];
    return [{ item, type: comparisons[id].type, reason: featured?.[id] ?? comparisons[id].reason }];
  }).slice(0, 3);
}
