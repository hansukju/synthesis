import { searchIndex } from "@/lib/archive/catalog";
import { SearchBox } from "./search-box";

export function SearchForm({
  initialQuery = "",
  className,
  placeholder,
}: {
  initialQuery?: string;
  className?: string;
  placeholder?: string;
}) {
  return <SearchBox key={initialQuery} initialQuery={initialQuery} index={searchIndex} className={className} placeholder={placeholder} />;
}
