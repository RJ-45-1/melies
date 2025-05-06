import MovieDetails from "@/components/ui/movies/movie-details";
import MovieDetailsSkeleton from "@/components/ui/movies/skeletons/movie-detail-skeleton";
import { fetchMovieById, fetchMovieTrailer } from "@/utils/queries";
import { notFound } from "next/navigation";
import { Suspense } from "react";

// Review type definition

// Review form schema

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const movieId = (await params).id;

  if (!movieId) {
    return notFound();
  }

  return (
    <Suspense fallback={<MovieDetailsSkeleton />}>
      <MovieDetailsContent movieId={movieId} />
    </Suspense>
  );
}

async function MovieDetailsContent({ movieId }: { movieId: string }) {
  const movie = await fetchMovieById(movieId);

  if (movie.Response === "False") {
    return notFound();
  }

  const trailerUrl = await fetchMovieTrailer(movie.Title, movie.Year);

  return <MovieDetails movie={movie} trailerUrl={trailerUrl} />;
}
