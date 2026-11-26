import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { SearchForm } from "@/components/search-form";
import { SelectionCard } from "@/components/selections";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { getEntity, searchIndex } from "@/lib/archive/catalog";
import { findMatches, normalizeQuery, searchHref, type SearchFilter } from "@/lib/archive/search";

export const metadata: Metadata = { title: "Search | SYNTHESIS" };

const filters: readonly { label: string; value: SearchFilter }[] = [
  { label: "All", value: "all" },
  { label: "Fashion", value: "fashion" },
  { label: "Music", value: "music" },
];

async function SearchResults({ searchParams }: Pick<PageProps<"/search">, "searchParams">) {
  const { q, type } = await searchParams;
  const query = normalizeQuery((Array.isArray(q) ? q[0] : q) ?? "");
  const filter = type === "fashion" || type === "music" ? type : "all";
  const results = findMatches(searchIndex, query, filter).flatMap(({ id }) => getEntity(id) ?? []);

  return (
    <>
      <SearchForm initialQuery={query} className="mt-5 mb-9 max-w-[47.5rem]" />
      <nav aria-label="Filter search results" className="flex flex-wrap gap-2">
        {filters.map(({ label, value }) => (
          <Link
            key={value}
            href={searchHref(query, value)}
            aria-current={filter === value ? "true" : undefined}
            className="rounded-md border border-line px-4 py-2 text-sm text-muted hover:border-muted aria-[current=true]:border-muted aria-[current=true]:bg-surface aria-[current=true]:text-ink"
          >
            {label}
          </Link>
        ))}
      </nav>
      <p className="my-5 wrap-anywhere text-sm text-muted">
        {results.length} {results.length === 1 ? "result" : "results"}{query && <> for “{query}”</>}
      </p>
      {results.length > 0 ? (
        <ul className="grid gap-4 sm:grid-cols-2">
          {results.map((item) => (
            <li key={item.id}>
              <SelectionCard item={item} label={item.sample ? `${item.kind} · Sample content` : item.kind} compact />
            </li>
          ))}
        </ul>
      ) : (
        <section className="rounded-md border border-line bg-surface p-6">
          <h2 className="text-xl font-semibold">{query ? "No results found" : "Enter a search term"}</h2>
          <p className="mt-2 text-muted">
            {query
              ? "Try a different title, artist, brand, designer, or genre, or switch to All."
              : "Try a title, artist, brand, designer, or genre."}
          </p>
        </section>
      )}
    </>
  );
}

export default function SearchPage({ searchParams }: PageProps<"/search">) {
  return (
    <div className="mx-auto flex w-full max-w-[90rem] flex-1 flex-col px-5 sm:px-10 lg:px-16 xl:px-20">
      <SiteHeader onHome={false} />
      <main id="main-content" className="flex-1 py-8 sm:py-12">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Search results</h1>
        <Suspense fallback={<p role="status" className="mt-5 text-muted">Loading results…</p>}>
          <SearchResults searchParams={searchParams} />
        </Suspense>
      </main>
      <SiteFooter />
    </div>
  );
}
