export interface MovieBasicInfos {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

export interface MovieBasicInfosSemanticResults {
  id: string;
  imdbId: string;
  plot: string;
  poster: string;
  released: string;
  similarity: number;
}

export interface Movie {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: { Source: string; Value: string }[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
}

export type Review = {
  id: number;
  user_email: string | null;
  user_id: string | null;
  stars: number;
  content: string;
  imdb_id: string;
  created_at?: string;
};
