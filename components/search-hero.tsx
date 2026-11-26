import { SearchForm } from "./search-form";

export function SearchHero() {
  return (
    <section aria-labelledby="hero-title" className="relative mx-auto max-w-[47.5rem] py-16 text-center sm:py-22">
      <h1 id="hero-title" className="text-4xl leading-tight font-semibold tracking-tight sm:text-5xl">
        Discover the connection.
      </h1>
      <p className="mt-4 text-base text-muted sm:mt-5 sm:text-xl">
        Explore the culture behind fashion and music.
      </p>
      <SearchForm className="mt-6 text-center" />
    </section>
  );
}
