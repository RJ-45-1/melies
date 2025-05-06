import { Card, CardContent } from "@/components/ui/card";
import LastestMovieSkeleton from "@/components/ui/movies/skeletons/latest-movie-skeleton";
import SearchBar from "@/components/ui/search/search-bar";
import type { MovieBasicInfos } from "@/types";
import { fetchRecentMovies } from "@/utils/queries";
import { Clock, Film, Star, TrendingUp } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

function LatestMovieWrapper({
  latestMovies,
}: {
  latestMovies: MovieBasicInfos[];
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {latestMovies.map((movie) => (
        <Link
          href={`/movie/${movie.imdbID}`}
          key={movie.imdbID}
          className="group"
        >
          <Card
            key={movie.imdbID}
            className="overflow-hidden bg-background/50 backdrop-blur-sm border border-muted/20 rounded-xl transition-all duration-300 group-hover:shadow-xl group-hover:shadow-primary/5 group-hover:border-primary/20"
          >
            <div className="relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-end p-4">
                <div className="flex items-center gap-2 text-white">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span className="text-sm font-medium">8.5</span>
                  <span className="mx-2">•</span>
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">{movie.Year}</span>
                </div>
              </div>
              <img
                src={
                  movie.Poster !== "N/A"
                    ? movie.Poster
                    : `/placeholder.svg?height=450&width=300&text=${encodeURIComponent(movie.Title)}`
                }
                alt={movie.Title}
                width={300}
                height={450}
                className="w-full h-[350px] object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold line-clamp-1 group-hover:text-primary transition-colors duration-200">
                {movie.Title}
              </h3>
              <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                <Film className="w-3.5 h-3.5" />
                {movie.Year}
              </p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}

export default async function Home() {
  const latestMovies = await Promise.resolve(fetchRecentMovies());

  return (
    <div className="flex flex-col mt-16 md:mt-24 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-center gap-2 text-primary">
          <Film className="w-8 h-8 animate-pulse" />
          <TrendingUp className="w-6 h-6" />
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-center text-primary animate-fade-in">
          Search and note the best movies
        </h1>

        <p
          className="text-muted-foreground text-center max-w-2xl mx-auto animate-fade-in-up opacity-0"
          style={{ animationDelay: "200ms", animationFillMode: "forwards" }}
        >
          Don't waste time searching for a movie for hours
        </p>

        <div
          className="w-full flex flex-row justify-center items-center mt-8 animate-fade-in-up opacity-0"
          style={{ animationDelay: "400ms", animationFillMode: "forwards" }}
        >
          <SearchBar />
        </div>
      </div>

      <div
        className="mt-24 animate-fade-in-up opacity-0"
        style={{ animationDelay: "600ms", animationFillMode: "forwards" }}
      >
        <div className="flex items-center gap-2 mb-6 px-4">
          <TrendingUp className="w-5 h-5 text-primary" />
          <h2 className="text-2xl font-semibold">Latest movies</h2>
        </div>

        <Suspense fallback={<LastestMovieSkeleton />}>
          <LatestMovieWrapper latestMovies={latestMovies} />
        </Suspense>
      </div>
    </div>
  );
}
