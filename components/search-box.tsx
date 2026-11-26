"use client";

import { useEffect, useId, useState, type FormEvent, type KeyboardEvent } from "react";
import { useRouter } from "next/navigation";
import { findMatches, itemHref, normalizeQuery, searchHref } from "@/lib/archive/search";
import type { Entity, SearchableEntity } from "@/lib/archive/types";

export function SearchBox({
  index,
  initialQuery,
  className = "",
  placeholder = "Search artists, albums, brands, collections...",
}: {
  index: readonly (SearchableEntity & Pick<Entity, "sample">)[];
  initialQuery: string;
  className?: string;
  placeholder?: string;
}) {
  const router = useRouter();
  const inputId = useId();
  const listId = `${inputId}-suggestions`;
  const [query, setQuery] = useState(initialQuery);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const [showPrompt, setShowPrompt] = useState(false);
  const suggestions = findMatches(index, query).slice(0, 5);
  const expanded = open && suggestions.length > 0;
  const selected = expanded ? suggestions[active] : undefined;
  const activeId = selected ? `${listId}-${selected.id}` : undefined;

  useEffect(() => {
    if (activeId) document.getElementById(activeId)?.scrollIntoView({ block: "nearest" });
  }, [activeId]);

  function closeSuggestions() {
    setOpen(false);
    setActive(-1);
  }

  function openItem(item: SearchableEntity) {
    closeSuggestions();
    router.push(itemHref(item.slug));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    closeSuggestions();
    const term = normalizeQuery(query);
    if (!term) {
      setShowPrompt(true);
      return;
    }
    setQuery(term);
    router.push(searchHref(term));
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.nativeEvent.isComposing) return;
    if (event.key === "Escape" && expanded) {
      event.preventDefault();
      closeSuggestions();
    } else if ((event.key === "ArrowDown" || event.key === "ArrowUp") && suggestions.length) {
      event.preventDefault();
      setOpen(true);
      const last = suggestions.length - 1;
      setActive(event.key === "ArrowDown"
        ? (active >= last ? 0 : active + 1)
        : (active <= 0 ? last : active - 1));
    } else if (event.key === "Enter" && selected) {
      event.preventDefault();
      openItem(selected);
    }
  }

  return (
    <form
      action="/search"
      onSubmit={handleSubmit}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) closeSuggestions();
      }}
      role="search"
      aria-label="Archive search"
      className={`relative ${className}`}
    >
      <div className="flex items-center gap-3 rounded-md border border-line bg-surface p-2 pl-4 focus-within:border-muted sm:gap-4 sm:pl-5">
        <svg aria-hidden="true" className="size-5 shrink-0 text-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
          <circle cx="10.5" cy="10.5" r="6.5" />
          <path d="m16 16 4 4" />
        </svg>
        <label htmlFor={inputId} className="sr-only">Search the archive</label>
        <input
          id={inputId}
          name="q"
          type="search"
          value={query}
          autoComplete="off"
          role="combobox"
          aria-autocomplete="list"
          aria-expanded={expanded}
          aria-controls={expanded ? listId : undefined}
          aria-activedescendant={activeId}
          onFocus={() => setOpen(true)}
          onClick={() => setOpen(true)}
          onChange={(event) => {
            setQuery(event.target.value);
            setOpen(true);
            setActive(-1);
            setShowPrompt(false);
          }}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="min-w-0 flex-1 py-2 text-base placeholder:text-muted focus:outline-none"
        />
        <button type="submit" onFocus={closeSuggestions} className="min-h-11 shrink-0 rounded border border-line px-3 text-sm font-medium hover:bg-line sm:px-4">
          Search
        </button>
      </div>
      {expanded && (
        <ul id={listId} role="listbox" aria-label="Search suggestions" className="absolute inset-x-0 top-full z-20 mt-1 max-h-72 overflow-y-auto rounded-md border border-line bg-surface text-left shadow-xl">
          {suggestions.map((item, position) => (
            <li key={item.id} role="presentation">
              <button
                id={`${listId}-${item.id}`}
                type="button"
                role="option"
                tabIndex={-1}
                aria-selected={position === active}
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => openItem(item)}
                className="flex w-full flex-wrap items-center justify-between gap-x-3 gap-y-1 px-4 py-2 text-left hover:bg-line aria-selected:bg-line aria-selected:outline-2 aria-selected:-outline-offset-2 aria-selected:outline-muted"
              >
                <span className="min-w-0">
                  <span className="block text-sm font-semibold">{item.title}</span>
                  <span className="block text-xs text-muted">{item.creator}</span>
                </span>
                <span className="text-xs text-muted">
                  <span className="capitalize">{item.kind}</span>
                  {item.sample && " · Sample content"}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
      <p role="status" className="absolute inset-x-0 mt-2 text-sm text-muted">{showPrompt && "Enter a search term."}</p>
    </form>
  );
}
