"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AnimatePresence, motion } from "framer-motion";
import { Film, Loader2, Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function SearchBar() {
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    router.push(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  const clearSearch = () => {
    setQuery("");
    inputRef.current?.focus();
  };

  // Handle keyboard shortcut (Ctrl+K or Cmd+K) to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <motion.div
      className="w-full max-w-2xl"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <form
        onSubmit={handleSearch}
        className={`relative flex items-center overflow-hidden rounded-full border bg-background transition-all duration-300 ${
          isFocused
            ? "ring-2 ring-primary/20 border-primary/30 shadow-lg"
            : "shadow"
        }`}
      >
        <div className="flex items-center px-3 text-muted-foreground">
          <Film
            className={`w-5 h-5 transition-all duration-300 ${isFocused ? "text-primary" : ""}`}
          />
        </div>

        <Input
          ref={inputRef}
          type="text"
          placeholder="Describre a plot ..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="flex-grow border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 py-6 px-0"
        />

        <AnimatePresence>
          {query && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              type="button"
              onClick={clearSearch}
              className="p-2 text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4" />
              <span className="sr-only">Clear search</span>
            </motion.button>
          )}
        </AnimatePresence>

        <Button
          type="submit"
          variant="ghost"
          size="icon"
          className="m-1 ration-300 hover:scale-105"
          disabled={loading || !query.trim()}
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Search className="w-4 h-4" />
          )}
          <span className="sr-only">Search</span>
        </Button>
      </form>

      <div className="mt-2 text-xs text-center text-muted-foreground">
        <kbd className="px-1.5 py-0.5 bg-muted border rounded text-xs">
          Ctrl
        </kbd>
        <span className="mx-1">+</span>
        <kbd className="px-1.5 py-0.5 bg-muted border rounded text-xs">K</kbd>
        <span className="ml-1">to search</span>
      </div>
    </motion.div>
  );
}
