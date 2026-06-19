"use client";

import { useMemo, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SearchBar } from "@/components/SearchBar";
import { PersonCard } from "@/components/PersonCard";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { PEOPLE } from "@/lib/data";

const FILTER_TAGS = ["Builder", "Scripter", "Moderator", "Graphic Designer", "Voice Actor", "Community Manager"];

export default function PeoplePage() {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return PEOPLE.filter((p) => {
      const matchesQuery =
        query.trim().length === 0 ||
        p.handle.toLowerCase().includes(query.toLowerCase()) ||
        p.role.toLowerCase().includes(query.toLowerCase()) ||
        p.skills.some((s) => s.toLowerCase().includes(query.toLowerCase()));
      const matchesTag = !activeTag || p.role === activeTag;
      return matchesQuery && matchesTag;
    });
  }, [query, activeTag]);

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <Navbar />

      <section className="relative overflow-hidden pt-32 pb-16 md:pt-40">
        <div className="pointer-events-none absolute inset-0 bg-grid-fade" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <SectionLabel className="mx-auto mb-5 w-fit">People</SectionLabel>
          <h1 className="font-display text-5xl font-bold uppercase leading-[1] tracking-tight sm:text-6xl">
            Hire <span className="text-gradient-badge">talent</span> for your server.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-mute md:text-lg">
            Builders, scripters, moderators and more — all available for hire, message them
            directly on Discord.
          </p>

          <div className="mx-auto mt-9 max-w-2xl">
            <SearchBar
              value={query}
              onChange={setQuery}
              placeholder="Search by name, role, or skill"
              tags={FILTER_TAGS}
              activeTag={activeTag}
              onTagSelect={setActiveTag}
            />
          </div>
        </div>
      </section>

      <section className="relative border-t border-line py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="font-display text-3xl font-bold uppercase tracking-tight">
            {filtered.length} available
          </h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((person) => (
              <PersonCard key={person.id} person={person} />
            ))}
            {filtered.length === 0 && (
              <p className="col-span-full text-center text-sm text-mute">
                No one matches that search yet. Try a different role.
              </p>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
