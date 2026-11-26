import Image from "next/image";
import Link from "next/link";
import { itemHref } from "@/lib/archive/search";
import type { Entity, Selection } from "@/lib/archive/types";

const categories = [
  { key: "fashion", label: "Fashion" },
  { key: "music", label: "Music" },
] as const;

export function SelectionCard({
  item,
  label,
  compact = false,
}: {
  item: Entity;
  label: string;
  compact?: boolean;
}) {
  const cardLayout = compact
    ? "grid min-w-0 content-start gap-2 p-2 sm:flex sm:items-center sm:gap-4 sm:p-2.5"
    : "p-3";
  const artworkSize = compact ? "size-10 sm:size-20" : "aspect-video";

  return (
    <article className={`relative rounded-md border border-line bg-surface hover:border-muted ${cardLayout}`}>
      <div className={`artwork-placeholder relative shrink-0 overflow-hidden rounded-sm ${artworkSize}`}>
        {item.image && (
          <Image
            src={item.image.src}
            alt={item.image.alt}
            fill
            sizes={compact ? "(min-width: 640px) 80px, 40px" : "(min-width: 1440px) 604px, (min-width: 640px) 45vw, 100vw"}
            className="object-cover"
          />
        )}
      </div>
      <div className={compact ? "min-w-0" : "px-1 pt-3 pb-4 sm:px-0"}>
        <p className="text-xs font-medium uppercase text-muted">{label}</p>
        <h3 className={compact ? "mt-1 text-sm leading-snug font-semibold sm:text-base" : "mt-2 text-xl font-semibold tracking-tight sm:text-[1.7rem]"}>
          <Link href={itemHref(item.slug)} className="after:absolute after:inset-0 hover:underline">
            {item.title}
          </Link>
        </h3>
        <p className={compact ? "mt-1 text-xs leading-snug text-muted sm:text-sm" : "mt-2 text-sm text-muted sm:text-base"}>
          {item.creator}
          <span aria-hidden="true"> · </span>
          <span className="sr-only">, </span>
          {item.format}
        </p>
      </div>
    </article>
  );
}

export function DailySelection({ selection }: { selection: Selection }) {
  return (
    <section aria-labelledby="daily-title">
      <div className="mb-5 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h2 id="daily-title" className="text-2xl font-semibold tracking-tight sm:text-[1.625rem]">Daily selection</h2>
        <p className="text-sm text-muted">Sample content</p>
      </div>
      <div className="grid auto-rows-fr gap-4 sm:grid-cols-2 sm:gap-6">
        {categories.map(({ key, label }) => (
          <SelectionCard key={key} item={selection[key]} label={`Today’s ${label}`} />
        ))}
      </div>
    </section>
  );
}

export function RecentSelections({ selections }: { selections: readonly Selection[] }) {
  return (
    <section aria-labelledby="recent-title" className="my-6 border-t border-line pt-5">
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h2 id="recent-title" className="text-2xl font-semibold tracking-tight sm:text-[1.625rem]">Recent selections</h2>
        <p className="text-sm text-muted">Past 3 days · Sample content</p>
      </div>
      <ul className="grid gap-3 sm:gap-4">
        {selections.map(({ daysAgo, ...selection }) => (
          <li key={daysAgo} className="grid items-center gap-2 md:grid-cols-[8rem_1fr] md:gap-6 xl:grid-cols-[9.5rem_1fr]">
            <p className="text-sm font-medium">{daysAgo === 1 ? "Yesterday" : `${daysAgo} days ago`}</p>
            <div className="grid grid-cols-2 gap-2 sm:gap-6">
              {categories.map(({ key, label }) => (
                <SelectionCard key={key} item={selection[key]} label={label} compact />
              ))}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
