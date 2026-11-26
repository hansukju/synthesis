import type { Entity, SearchableEntity } from "@/lib/archive/types";

function sample(
  entity: Omit<SearchableEntity, "aliases" | "keywords"> &
    Pick<Entity, "format" | "image" | "creative">,
): Entity {
  return {
    ...entity,
    aliases: [],
    keywords: [],
    release: "Unreleased concept",
    overview: `A fictional ${entity.format.toLowerCase()} by ${entity.creator}, created for the SYNTHESIS preview.`,
    history: "This concept has no documented release history.",
    significance: "The related selections offer ways to compare how clothing and sound can express a similar mood.",
    sample: true,
    sources: [],
  };
}

const sampleItems = [
  sample({
    id: "fashion-02", slug: "asymmetric-wool-coat", kind: "fashion",
    title: "Asymmetric Wool Coat", creator: "Studio Vale", format: "Outerwear concept",
    styles: ["Deconstruction", "Modern tailoring"],
    creative: "An off-center opening and overlapping wool panels turn the coat’s closure into its main design feature.",
    image: { src: "/images/sample-fashion.webp", alt: "Illustration of a model wearing a sculptural black coat" },
  }),
  sample({
    id: "music-02", slug: "after-the-static", kind: "music",
    title: "After the Static", creator: "Signal Assembly", format: "Post-punk LP concept",
    styles: ["Post-punk", "Minimal rock"],
    creative: "A spare bass line and dry percussion leave room for short bursts of guitar noise.",
    image: { src: "/images/sample-music.webp", alt: "Illustration of a vinyl record and a sleeve with white wave patterns" },
  }),
  sample({
    id: "fashion-03", slug: "field-jacket-study", kind: "fashion",
    title: "Field Jacket Study", creator: "Common Form", format: "Outerwear",
    styles: ["Workwear", "Utility"],
    creative: "Offset pockets and a storm flap give the jacket an uneven, practical shape.",
  }),
  sample({
    id: "music-03", slug: "concrete-hours", kind: "music",
    title: "Concrete Hours", creator: "North Loop", format: "Hip-hop EP",
    styles: ["Hip-hop", "Sample-based production"],
    creative: "A tightly cut drum loop holds the track together as grainy samples enter and drop out.",
  }),
  sample({
    id: "fashion-04", slug: "pleated-cargo-trousers", kind: "fashion",
    title: "Pleated Cargo Trousers", creator: "Studio Vale", format: "Collection piece",
    styles: ["Utility", "Tailoring"],
    creative: "Pressed pleats sharpen the outline of a loose leg, while the cargo pockets sit low.",
  }),
  sample({
    id: "music-04", slug: "room-tone", kind: "music",
    title: "Room Tone", creator: "The Narrow Rooms", format: "Indie rock single",
    styles: ["Indie rock", "Lo-fi"],
    creative: "The arrangement leaves the sound of the room audible between guitar phrases.",
  }),
  sample({
    id: "fashion-05", slug: "layered-nylon-parka", kind: "fashion",
    title: "Layered Nylon Parka", creator: "Grey Assembly", format: "Outerwear",
    styles: ["Technical outerwear", "Layering"],
    creative: "A matte shell and a translucent liner give the parka two visibly different layers.",
  }),
  sample({
    id: "music-05", slug: "night-shift-tapes", kind: "music",
    title: "Night Shift Tapes", creator: "West Relay", format: "Hip-hop mixtape",
    styles: ["Hip-hop", "Beat tape"],
    creative: "Short instrumentals use uneven drum accents and soft tape noise to create a late-night mood.",
  }),
];

export const exampleArchive: readonly Entity[] = [
  {
    id: "fashion-01",
    slug: "helmut-lang-fw-1999",
    aliases: ["Helmut Lang FW99", "Helmut Lang FW 1999", "Fall Winter 1999"],
    keywords: ["archive fashion", "runway", "1999"],
    kind: "fashion",
    title: "Fall / Winter 1999",
    creator: "Helmut Lang",
    format: "Ready-to-wear collection",
    image: {
      src: "/images/archive-fashion-illustration.webp",
      alt: "Concept illustration of layered charcoal outerwear in a concrete space",
    },
    release: "Fall 1999",
    styles: ["Minimalism", "Utilitarian fashion"],
    facts: [{ label: "Collection photography", value: "Juergen Teller" }],
    overview: "Helmut Lang’s Fall 1999 ready-to-wear collection uses padding, leather, and metallic finishes to give urban clothing a protective quality.",
    history: "The collection belongs to the Fall 1999 ready-to-wear season. The archive includes scans of the original collection lookbook.",
    creative: "Some coats use straps that allow the garment to hang from the shoulders, making a functional detail part of the silhouette.",
    significance: "An editorial reading of the collection is that everyday utility can become a visual language of its own. The related selections explore that idea through clothing and sound.",
    sample: false,
    sources: [
      { name: "Vogue Runway — Fall 1999 collection", url: "https://www.vogue.com/fashion-shows/fall-1999-ready-to-wear/helmut-lang", status: "verified" },
      { name: "Helmut Lang Fall 1999 lookbook scans — Vogue Runway", url: "https://www.vogue.com/fashion-shows/fall-1999-ready-to-wear/helmut-lang/slideshow/collection", status: "verified" },
    ],
  },
  {
    id: "music-01",
    slug: "joy-division-unknown-pleasures",
    aliases: ["Joy Division Unknown Pleasures"],
    keywords: ["rock", "Factory Records", "Martin Hannett"],
    kind: "music",
    title: "Unknown Pleasures",
    creator: "Joy Division",
    format: "Studio album",
    image: {
      src: "/images/archive-music-illustration.webp",
      alt: "Concept illustration of a black record beside an unprinted sleeve",
    },
    release: "June 1979",
    styles: ["Post-punk"],
    facts: [
      { label: "Label", value: "Factory Records" },
      { label: "Producer", value: "Martin Hannett" },
    ],
    overview: "Unknown Pleasures is Joy Division’s debut studio album, released by Factory Records.",
    history: "The band recorded the album at Strawberry Studios in Stockport in April 1979. Factory Records released it that June.",
    creative: "Producer Martin Hannett used studio ambience to give the group’s post-punk recording a sense of space and tension.",
    significance: "As an editorial comparison, the album’s use of space offers a way to think about restraint in clothing, from the outline of a coat to the distance between seams.",
    sample: false,
    sources: [
      { name: "Rhino — Unknown Pleasures", url: "https://www.rhino.com/aod/unknown-pleasures-joy-division", status: "verified" },
      { name: "Science Museum Group Collection — Joy Division", url: "https://collection.sciencemuseumgroup.org.uk/people/ap13960/joy-division", status: "verified" },
    ],
  },
  ...sampleItems,
];
