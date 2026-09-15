"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";

/* ─── High-quality Unsplash photos of European cities / landmarks ── */
export const EUROPEAN_CITIES = [
  {
    id: "vilnius",
    city: "Vilnius",
    country: "Lithuania",
    countryId: "lt",
    caption: "Baltic gem of the EU",
    photo: "https://images.unsplash.com/photo-1587974928442-77dc3e0dba72?w=800&q=80&auto=format&fit=crop",
    accent: "#3b82f6",
  },
  {
    id: "berlin",
    city: "Berlin",
    country: "Germany",
    countryId: "de",
    caption: "Europe's innovation hub",
    photo: "https://images.unsplash.com/photo-1560969184-10fe8719e047?w=800&q=80&auto=format&fit=crop",
    accent: "#6366f1",
  },
  {
    id: "amsterdam",
    city: "Amsterdam",
    country: "Netherlands",
    countryId: "nl",
    caption: "Gateway to the continent",
    photo: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=800&q=80&auto=format&fit=crop",
    accent: "#f59e0b",
  },
  {
    id: "paris",
    city: "Paris",
    country: "France",
    countryId: "fr",
    caption: "Culture, art & opportunity",
    photo: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80&auto=format&fit=crop",
    accent: "#ec4899",
  },
  {
    id: "stockholm",
    city: "Stockholm",
    country: "Sweden",
    countryId: "se",
    caption: "Scandinavia's crown jewel",
    photo: "https://images.unsplash.com/photo-1509356843151-3e7d96241e11?w=800&q=80&auto=format&fit=crop",
    accent: "#10b981",
  },
  {
    id: "rome",
    city: "Rome",
    country: "Italy",
    countryId: "it",
    caption: "Where history meets modernity",
    photo: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&q=80&auto=format&fit=crop",
    accent: "#f97316",
  },
  {
    id: "warsaw",
    city: "Warsaw",
    country: "Poland",
    countryId: "pl",
    caption: "Rising tech & business hub",
    photo: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80&auto=format&fit=crop",
    accent: "#ef4444",
  },
  {
    id: "prague",
    city: "Prague",
    country: "Czech Republic",
    countryId: "de",
    caption: "Heart of Central Europe",
    photo: "https://images.unsplash.com/photo-1541849546-216549ae216d?w=800&q=80&auto=format&fit=crop",
    accent: "#06b6d4",
  },
  {
    id: "vienna",
    city: "Vienna",
    country: "Austria",
    countryId: "at",
    caption: "Imperial elegance & culture",
    photo: "https://images.unsplash.com/photo-1516550893885-985c836c5843?w=800&q=80&auto=format&fit=crop",
    accent: "#8b5cf6",
  },
  {
    id: "lisbon",
    city: "Lisbon",
    country: "Portugal",
    countryId: "pt",
    caption: "Atlantic gateway to Europe",
    photo: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=800&q=80&auto=format&fit=crop",
    accent: "#f59e0b",
  },
  {
    id: "barcelona",
    city: "Barcelona",
    country: "Spain",
    countryId: "es",
    caption: "Mediterranean lifestyle",
    photo: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=800&q=80&auto=format&fit=crop",
    accent: "#ec4899",
  },
];

/* ─── Types ─────────────────────────────────────────────────────── */
interface Props {
  /** If true, the strip auto-scrolls via CSS animation */
  animated?: boolean;
  /** Show city name overlay on each card */
  showLabels?: boolean;
  /** card width in px (height is auto-derived at 4:3) */
  cardWidth?: number;
  /** Extra className on the outer wrapper */
  className?: string;
}

/* ─── Component ─────────────────────────────────────────────────── */
export function EuropeanCitiesStrip({
  animated = true,
  showLabels = true,
  cardWidth = 280,
  className = "",
}: Props) {
  const cardHeight = Math.round(cardWidth * 0.67);
  /* Duplicate the list so the infinite scroll loop is seamless */
  const items = [...EUROPEAN_CITIES, ...EUROPEAN_CITIES];

  return (
    <div className={`relative overflow-hidden ${className}`} aria-label="European cities showcase">
      {/* Left / right fade edges */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-16 sm:w-28"
        style={{ background: "linear-gradient(to right, var(--fade-from, #f8f7ff), transparent)" }} />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-16 sm:w-28"
        style={{ background: "linear-gradient(to left, var(--fade-from, #f8f7ff), transparent)" }} />

      {/* Scrolling track */}
      <div
        className="flex gap-4"
        style={
          animated
            ? {
                animation: "citiesScroll 48s linear infinite",
                width: "max-content",
              }
            : { width: "max-content" }
        }
      >
        {items.map((city, i) => (
          <Link
            key={`${city.id}-${i}`}
            href={`/countries/${city.countryId}`}
            className="group shrink-0 relative overflow-hidden rounded-2xl"
            style={{ width: cardWidth, height: cardHeight }}
            aria-label={`${city.city}, ${city.country}`}
            tabIndex={i >= EUROPEAN_CITIES.length ? -1 : 0}
          >
            {/* Photo */}
            <Image
              src={city.photo}
              alt={`${city.city}, ${city.country}`}
              fill
              sizes={`${cardWidth}px`}
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />

            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent transition-opacity duration-300 group-hover:from-black/80" />

            {/* Colour accent top line */}
            <div
              className="absolute top-0 left-0 right-0 h-[3px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: `linear-gradient(90deg, transparent, ${city.accent}, transparent)` }}
            />

            {showLabels && (
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-base font-bold text-white leading-tight" style={{ fontFamily: "var(--font-syne)" }}>
                      {city.city}
                    </p>
                    <p className="flex items-center gap-1 text-[11px] text-white/65 mt-0.5" style={{ fontFamily: "var(--font-outfit)" }}>
                      <MapPin size={9} />
                      {city.country}
                    </p>
                  </div>
                  <span
                    className="rounded-full px-2.5 py-1 text-[10px] font-semibold text-white/90 border border-white/20 backdrop-blur-sm"
                    style={{ background: `${city.accent}55`, fontFamily: "var(--font-outfit)" }}
                  >
                    {city.caption}
                  </span>
                </div>
              </div>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}

/* ─── Dark-bg variant (used on void/dark sections) ──────────────── */
export function EuropeanCitiesStripDark(props: Props) {
  return (
    <EuropeanCitiesStrip
      {...props}
      className={`[--fade-from:#050714] ${props.className ?? ""}`}
    />
  );
}
