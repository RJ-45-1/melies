import {
  Movie,
  MovieBasicInfos,
  MovieBasicInfosSemanticResults,
} from "@/types";
import { SupabaseClient } from "@supabase/supabase-js";

// utils/fetchMovies.ts
const BASE_URL = `http://www.omdbapi.com/?apikey=${process.env.NEXT_PUBLIC_IMDB_KEY!}`;

export const fetchRecentMovies = async (): Promise<any[]> => {
  try {
    const response = await fetch(
      `${BASE_URL}&s=movie&type=movie&y=${new Date().getFullYear()}&page=1&r=json`,
      { cache: "force-cache" }, // Enable caching
    );
    const data = await response.json();

    if (data.Response === "True") {
      // Return the first 8 movies from the search results
      return data.Search.slice(0, 8) as unknown as MovieBasicInfos[];
    } else {
      throw new Error(data.Error);
    }
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
};

export const searchMovies = async (
  query: string,
  searchType: string,
): Promise<MovieBasicInfos[]> => {
  let url = `${BASE_URL}&s=${query}&type=movie&r=json`;
  if (searchType === "intelligence") {
    // Implement your intelligence-based search logic here
    // For now, we'll just use the same API call
    url = `${BASE_URL}&s=${query}&type=movie&r=json`;
  }

  const response = await fetch(url, { cache: "force-cache" }); // Enable caching
  const data = await response.json();

  if (data.Response === "True") {
    return data.Search;
  } else {
    throw new Error(data.Error);
  }
};

export const searchSemantic = async (
  supabase: SupabaseClient,
  query: string,
): Promise<MovieBasicInfosSemanticResults[]> => {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    throw new Error("No active session found");
  }

  const response = await fetch(
    `https://zdzmpgultlfsfcgktmih.supabase.co/functions/v1/semantic-search`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session.access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ plot: query }), // Send the plot in the request body as JSON
      cache: "force-cache", // Enable caching
    },
  );

  if (!response.ok) {
    const errorText = await response.text();
    console.log("error: ", errorText);
    throw new Error(`Failed to fetch search results: ${errorText}`);
  }

  // Only try to parse JSON if the response was ok
  const results: MovieBasicInfosSemanticResults[] = await response.json();
  return results;
};

const OMDB_BASE_URL = `http://www.omdbapi.com/?apikey=${process.env.NEXT_PUBLIC_IMDB_KEY!}`;

export async function fetchMovieById(id: string): Promise<Movie> {
  const response = await fetch(`${OMDB_BASE_URL}&i=${id}`);
  const data = await response.json();
  return data;
}

export async function fetchMovieTrailer(
  title: string,
  year: string,
): Promise<string> {
  const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY!;
  const searchQuery = `${title} ${year} trailer`;
  const searchResponse = await fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(searchQuery)}&type=video&key=${apiKey}`,
  );
  const searchData = await searchResponse.json();

  if (searchData.error) {
    return "https://www.youtube.com/embed/0MY9tw2Q7ro?si=4X9L3lgsh8uZWsed";
  } else {
    if (searchData.items.length === 0) {
      return "";
    }
  }

  const trailer = searchData.items[0];
  return `https://www.youtube.com/embed/${trailer.id.videoId}`;
}
