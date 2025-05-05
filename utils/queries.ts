import { MovieBasicInfos, MovieBasicInfosSemanticResults } from "@/types";
import { SupabaseClient } from "@supabase/supabase-js";

// utils/fetchMovies.ts
const API_KEY = "82571ea7";
const BASE_URL = `http://www.omdbapi.com/?apikey=${API_KEY}`;

export const fetchRecentMovies = async (): Promise<any[]> => {
  try {
    const response = await fetch(
      `${BASE_URL}&s=movie&type=movie&y=${new Date().getFullYear()}&page=1&r=json`,
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

  const response = await fetch(url);
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
    },
  );

  console.log(response);

  if (!response.ok) {
    const errorText = await response.text();
    console.log("error: ", errorText);
    throw new Error(`Failed to fetch search results: ${errorText}`);
  }

  // Only try to parse JSON if the response was ok
  const results: MovieBasicInfosSemanticResults[] = await response.json();
  return results;
};
