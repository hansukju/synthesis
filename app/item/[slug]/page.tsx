import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ItemOverview, ItemSources, RelatedContent } from "@/components/archive-detail";
import { SearchForm } from "@/components/search-form";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { getItem, getRelatedItems, listItemSlugs } from "@/lib/archive/catalog";

type ItemPageProps = PageProps<"/item/[slug]">;

export function generateStaticParams() {
  return listItemSlugs();
}

export async function generateMetadata({ params }: ItemPageProps): Promise<Metadata> {
  const item = getItem((await params).slug);
  return item
    ? { title: `${item.title} — ${item.creator} | SYNTHESIS`, description: item.overview }
    : { title: "Item not found | SYNTHESIS" };
}

export default async function ItemPage({ params }: ItemPageProps) {
  const item = getItem((await params).slug);
  if (!item) notFound();

  return (
    <div className="mx-auto flex w-full max-w-[90rem] flex-1 flex-col px-5 sm:px-10 lg:px-16 xl:px-20">
      <SiteHeader onHome={false} />
      <main id="main-content" className="flex-1">
        <SearchForm
          className="mt-6 mb-10 max-w-[47.5rem] sm:mt-8"
          placeholder="Search another artist, album, brand, or collection..."
        />
        <ItemOverview item={item} />
        <RelatedContent fashion={getRelatedItems(item, "fashion")} music={getRelatedItems(item, "music")} />
        <ItemSources sources={item.sources} />
      </main>
      <SiteFooter />
    </div>
  );
}
