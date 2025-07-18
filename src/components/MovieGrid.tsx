
import { useQuery } from "@tanstack/react-query";
import MovieCard from "./MovieCard";
import { Loader2, Film } from "lucide-react";

interface Movie {
  title: string;
  tagline: string;
  vote_average: number;
}

const fetchMovies = async (): Promise<Movie[]> => {
  // Since we can't use Express backend in Lovable, we'll import the JSON directly
  const response = await import("../data/movies_metadata.json");
  return response.default;
};

const MovieGrid = () => {
  const { data: movies, isLoading, error } = useQuery({
    queryKey: ['movies'],
    queryFn: fetchMovies,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="flex items-center space-x-3">
          <Loader2 className="w-8 h-8 animate-spin text-yellow-500" />
          <span className="text-white text-lg">Loading movies...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-center">
          <Film className="w-16 h-16 text-gray-500 mx-auto mb-4" />
          <p className="text-white text-lg">Failed to load movies</p>
          <p className="text-gray-400">Please try again later</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {movies?.map((movie, index) => (
        <MovieCard key={index} movie={movie} />
      ))}
    </div>
  );
};

export default MovieGrid;
