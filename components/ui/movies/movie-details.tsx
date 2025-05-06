import { Movie } from "@/types";
import { Separator } from "@radix-ui/react-select";
import {
  Calendar,
  Clock,
  Film,
  Globe,
  Languages,
  MapPin,
  Star,
  Trophy,
  Users,
} from "lucide-react";
import Image from "next/image";
import { Badge } from "../badge";
import { Card } from "../card";
import MovieInfoItem from "./movie-info-item";
import MovieRating from "./reviews/movie-rating";
import { ReviewsSection } from "./reviews/review-section";

export default function MovieDetails({
  movie,
  trailerUrl,
}: {
  movie: Movie;
  trailerUrl: string;
}) {
  const genres = movie.Genre.split(", ");
  const imdbRating = Number.parseFloat(movie.imdbRating);
  const fullStars = Math.floor(imdbRating);
  const hasHalfStar = imdbRating % 1 >= 0.5;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="sticky top-8">
            <div className="rounded-lg overflow-hidden shadow-lg">
              <Image
                src={
                  movie.Poster !== "N/A"
                    ? movie.Poster
                    : "/placeholder.svg?height=600&width=400"
                }
                alt={movie.Title}
                width={400}
                height={600}
                className="w-full h-auto object-cover"
                priority
              />
            </div>

            <Card className="mt-6 p-4">
              <h3 className="text-lg font-bold mb-4 flex items-center">
                <Star className="mr-2 h-5 w-5 text-yellow-500" />
                Ratings
              </h3>

              <div className="space-y-4">
                {movie.Ratings.map((rating, index) => (
                  <MovieRating
                    key={index}
                    source={rating.Source}
                    value={rating.Value}
                  />
                ))}

                {movie.imdbRating !== "N/A" && (
                  <div className="mt-4">
                    <div className="flex items-center gap-1 mb-1">
                      <span className="font-medium">IMDB Rating:</span>
                      <span className="text-lg font-bold">
                        {movie.imdbRating}/10
                      </span>
                    </div>
                    <div className="flex items-center">
                      {[...Array(10)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < fullStars
                              ? "text-yellow-500 fill-yellow-500"
                              : i === fullStars && hasHalfStar
                                ? "text-yellow-500 fill-yellow-500/50"
                                : "text-gray-300"
                          }`}
                        />
                      ))}
                      <span className="ml-2 text-sm text-muted-foreground">
                        ({movie.imdbVotes} votes)
                      </span>
                    </div>
                  </div>
                )}

                {movie.Metascore !== "N/A" && (
                  <div className="mt-2">
                    <span className="font-medium">Metascore: </span>
                    <Badge
                      className={`ml-2 ${
                        Number.parseInt(movie.Metascore) >= 70
                          ? "bg-green-500"
                          : Number.parseInt(movie.Metascore) >= 50
                            ? "bg-yellow-500"
                            : "bg-red-500"
                      }`}
                    >
                      {movie.Metascore}
                    </Badge>
                  </div>
                )}
              </div>
            </Card>

            {trailerUrl && (
              <Card className="mt-6 p-4">
                <h3 className="text-lg font-bold mb-4">Trailer</h3>
                <iframe
                  width="100%"
                  height="315"
                  src={trailerUrl}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="Movie Trailer"
                ></iframe>
              </Card>
            )}
          </div>
        </div>

        <div className="lg:col-span-2">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">{movie.Title}</h1>
            <div className="flex flex-wrap items-center gap-2 mt-2 text-muted-foreground">
              <span className="flex items-center">
                <Calendar className="mr-1 h-4 w-4" />
                {movie.Year}
              </span>
              <span>•</span>
              <span className="flex items-center">
                <Clock className="mr-1 h-4 w-4" />
                {movie.Runtime}
              </span>
              <span>•</span>
              <span>{movie.Rated}</span>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {genres.map((genre) => (
                <Badge key={genre} variant="secondary" className="text-sm">
                  {genre}
                </Badge>
              ))}
            </div>
          </div>

          <Separator className="my-6" />

          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Plot</h2>
            <p className="text-lg leading-relaxed">{movie.Plot}</p>
          </div>

          {/* Reviews Section */}
          <ReviewsSection movieId={movie.imdbID} />

          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Cast & Crew</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <MovieInfoItem
                icon={<Users className="h-5 w-5" />}
                label="Director"
                value={movie.Director}
              />
              <MovieInfoItem
                icon={<Users className="h-5 w-5" />}
                label="Writer"
                value={movie.Writer}
              />
              <MovieInfoItem
                icon={<Users className="h-5 w-5" />}
                label="Actors"
                value={movie.Actors}
              />
              {movie.Production !== "N/A" && (
                <MovieInfoItem
                  icon={<Film className="h-5 w-5" />}
                  label="Production"
                  value={movie.Production}
                />
              )}
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Additional Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <MovieInfoItem
                icon={<Languages className="h-5 w-5" />}
                label="Language"
                value={movie.Language}
              />
              <MovieInfoItem
                icon={<MapPin className="h-5 w-5" />}
                label="Country"
                value={movie.Country}
              />
              {movie.Released !== "N/A" && (
                <MovieInfoItem
                  icon={<Calendar className="h-5 w-5" />}
                  label="Released"
                  value={movie.Released}
                />
              )}
              {movie.DVD !== "N/A" && (
                <MovieInfoItem
                  icon={<Film className="h-5 w-5" />}
                  label="DVD Release"
                  value={movie.DVD}
                />
              )}
              {movie.BoxOffice !== "N/A" && (
                <MovieInfoItem
                  icon={<Globe className="h-5 w-5" />}
                  label="Box Office"
                  value={movie.BoxOffice}
                />
              )}
              {movie.Awards !== "N/A" && (
                <MovieInfoItem
                  icon={<Trophy className="h-5 w-5" />}
                  label="Awards"
                  value={movie.Awards}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
