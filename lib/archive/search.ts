import type { ItemKind, SearchableEntity } from "./types";

export type SearchFilter = "all" | ItemKind;

export function normalizeQuery(query: string) {
  return query.trim().replace(/\s+/g, " ");
}

function searchText(value: string) {
  return normalizeQuery(value.normalize("NFKC").toLowerCase().replace(/[^\p{L}\p{N}]+/gu, " "));
}

export function findMatches<T extends SearchableEntity>(index: readonly T[], query: string, filter: SearchFilter = "all") {
  const term = searchText(query);
  if (!term) return [];
  const words = term.split(" ");

  return index.flatMap((entity) => {
    if (filter !== "all" && entity.kind !== filter) return [];
    const fields = [
      entity.title, entity.creator, ...entity.aliases, ...entity.styles, ...entity.keywords,
      entity.kind, entity.slug, `${entity.creator} ${entity.title}`,
    ].map(searchText);
    const rank = fields.includes(term) ? 0
      : fields.some((field) => field.startsWith(term)) ? 1
      : fields.some((field) => field.includes(term)) ? 2
      : words.every((word) => fields.some((field) => field.includes(word))) ? 3
      : -1;
    return rank < 0 ? [] : [{ entity, rank }];
  }).sort((a, b) => a.rank - b.rank)
    .map(({ entity }) => entity);
}

export function searchHref(query: string, filter: SearchFilter = "all") {
  const params = new URLSearchParams({ q: normalizeQuery(query) });
  if (filter !== "all") params.set("type", filter);
  return `/search?${params}`;
}

export function itemHref(slug: string) {
  return `/item/${encodeURIComponent(slug)}`;
}
