import type { MovieBasicInfosSemanticResults } from "@/types";
import { searchSemantic } from "@/utils/queries";
import { createClient } from "@/utils/supabase/server";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const filters = await searchParams;
  const query = filters.q as string;
  if (!query) {
    return redirect("/");
  }

  const supabase = await createClient();
  const results = await Promise.resolve(searchSemantic(supabase, query));

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">
          Search Results for "{query}"
        </h1>
        <p className="text-muted-foreground">Search type: Semantic Search</p>
      </div>

      {results.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold mb-2">No results found</h2>
          <p className="text-muted-foreground">
            Try a different search term or search type
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {results.map((movie, index) => (
            <MovieCard key={index} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}

function MovieCard({ movie }: { movie: MovieBasicInfosSemanticResults }) {
  const semanticMovie = movie as MovieBasicInfosSemanticResults;
  return (
    <Link href={`/movie/${semanticMovie.imdbId}`} className="block group">
      <div className="bg-card rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
        <div className="relative aspect-[2/3] w-full">
          <Image
            src={
              semanticMovie.poster ||
              "https://www.istockphoto.com/illustrations/placeholder-image"
            }
            alt={`Movie poster`}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <p className="text-sm text-muted-foreground">
              {semanticMovie.released}
            </p>
            <div className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs">
              {(semanticMovie.similarity * 100).toFixed(0)}% match
            </div>
          </div>
          <p className="line-clamp-3 text-sm text-muted-foreground">
            {semanticMovie.plot}
          </p>
        </div>
      </div>
    </Link>
  );
}
