import { SearchHero } from "@/components/search-hero";
import { DailySelection, RecentSelections } from "@/components/selections";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { getSelections } from "@/lib/archive/catalog";

export default function Home() {
  const selections = getSelections();
  const today = selections.find(({ daysAgo }) => daysAgo === 0);
  const recent = selections
    .filter(({ daysAgo }) => daysAgo >= 1 && daysAgo <= 3)
    .sort((first, second) => first.daysAgo - second.daysAgo);

  return (
    <div className="mx-auto flex w-full max-w-[90rem] flex-1 flex-col px-5 sm:px-10 lg:px-16 xl:px-20">
      <SiteHeader />
      <main id="main-content" className="flex-1">
        <SearchHero />
        {today && <DailySelection selection={today} />}
        <RecentSelections selections={recent} />
      </main>
      <SiteFooter />
    </div>
  );
}
