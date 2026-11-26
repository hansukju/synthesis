import Image from "next/image";
import Link from "next/link";
import { itemHref } from "@/lib/archive/search";
import type { Entity, ArchiveSource, RelatedItem } from "@/lib/archive/types";

function ArchiveArtwork({ item, large = false }: { item: Entity; large?: boolean }) {
  return (
    <div className={`artwork-placeholder relative grid place-items-center overflow-hidden rounded-md border border-line ${large ? "aspect-[5/4] lg:aspect-[4/5]" : "aspect-[16/8]"}`}>
      {item.image ? (
        <Image
          src={item.image.src}
          alt={item.image.alt}
          fill
          sizes="(min-width: 1440px) 610px, (min-width: 768px) 45vw, 100vw"
          className="object-cover"
        />
      ) : (
        <span className="rounded border border-line bg-background px-3 py-2 text-sm text-muted">Image unavailable</span>
      )}
    </div>
  );
}

export function ItemOverview({ item }: { item: Entity }) {
  const facts = [
    { label: item.kind === "fashion" ? "Designer" : "Artist", value: item.creator },
    { label: item.kind === "fashion" ? "Season / release" : "Release date", value: item.release },
    { label: item.kind === "fashion" ? "Style" : "Genre / style", value: item.styles.join(" · ") },
    ...(item.facts ?? []),
  ];
  const sections = [
    { title: "Overview", text: item.overview },
    { title: "Historical Background", text: item.history },
    { title: "Creative Context", text: item.creative },
    { title: "Cultural Significance", text: item.significance },
  ];

  return (
    <section aria-labelledby="item-title" className="grid items-start gap-6 pb-8 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)] lg:gap-12">
      <figure>
        <ArchiveArtwork item={item} large />
        {item.image && <figcaption className="mt-2 text-sm text-muted">Illustrative image</figcaption>}
      </figure>
      <div>
        <p className="text-sm font-medium uppercase text-muted">
          {item.kind} / {item.format}{item.sample && " · Sample content"}
        </p>
        <h1 id="item-title" className="mt-4 text-4xl leading-tight font-semibold tracking-tight lg:text-6xl">{item.title}</h1>
        <dl className="mt-5 grid grid-cols-[repeat(auto-fit,minmax(min(100%,8rem),1fr))] gap-x-5 gap-y-3 border-b border-line pb-5">
          {facts.map(({ label, value }) => (
            <div key={label}>
              <dt className="text-xs text-muted">{label}</dt>
              <dd className="mt-1 text-sm font-medium">{value}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-5 space-y-5">
          {sections.map(({ title, text }) => (
            <section key={title}>
              <h2 className="text-xl font-semibold">{title}</h2>
              <p className="mt-2 text-base leading-relaxed text-muted">{text}</p>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}

function RelatedColumn({ heading, items }: { heading: string; items: readonly RelatedItem[] }) {
  return (
    <section aria-label={heading} className="flex min-w-0 flex-col">
      <h2 className="mb-4 text-2xl font-semibold tracking-tight sm:text-[1.625rem]">{heading}</h2>
      <ul className="grid flex-1 auto-rows-fr gap-4">
        {items.map(({ item, type, reason }) => (
          <li key={item.id} className="relative rounded-md border border-line bg-surface p-3 hover:border-muted">
            <figure>
              <ArchiveArtwork item={item} />
              {item.image && <figcaption className="mt-1 px-2 text-xs text-muted">Illustrative image</figcaption>}
            </figure>
            <div className="p-2 pt-3">
              <p className="text-xs font-medium uppercase text-muted">{type}{item.sample && " · Sample content"}</p>
              <h3 className="mt-1 text-xl font-semibold">{item.title}</h3>
              <p className="mt-1 text-sm text-muted">{item.creator}</p>
              <p className="mt-3 text-base leading-relaxed text-muted">{reason}</p>
              <Link href={itemHref(item.slug)} aria-label={`Explore ${item.title} by ${item.creator}`} className="mt-3 inline-block py-1 text-sm font-semibold underline decoration-muted underline-offset-4 after:absolute after:inset-0 hover:decoration-ink">
                Explore
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function RelatedContent({ fashion, music }: { fashion: readonly RelatedItem[]; music: readonly RelatedItem[] }) {
  return (
    <div className="border-t border-line py-7">
      <p className="mb-4 text-sm text-muted">Editorial comparisons · Direct connections have not been verified.</p>
      <div className="grid gap-8 md:grid-cols-2">
        <RelatedColumn heading="Related Fashion" items={fashion} />
        <RelatedColumn heading="Related Music" items={music} />
      </div>
    </div>
  );
}

export function ItemSources({ sources }: { sources: readonly ArchiveSource[] }) {
  return (
    <section aria-labelledby="sources-title" className="border-t border-line py-7">
      <h2 id="sources-title" className="text-2xl font-semibold tracking-tight">Sources &amp; References</h2>
      {sources.length ? (
        <ul className="mt-4 divide-y divide-line rounded-md border border-line bg-surface">
          {sources.map(({ name, url, status }) => (
            <li key={url} className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 px-4 py-3">
              <a href={url} className="min-w-0 wrap-anywhere text-sm font-medium underline decoration-muted underline-offset-4 hover:decoration-ink">{name}</a>
              <span className="text-sm text-muted">{status === "verified" ? "Verified source" : "Pending verification"}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-3 text-sm text-muted">No sources are available for this sample entry.</p>
      )}
    </section>
  );
}
