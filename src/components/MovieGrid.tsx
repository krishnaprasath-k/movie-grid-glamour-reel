
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import MovieCard from "./MovieCard";
import { Loader2, Film } from "lucide-react";

interface Movie {
  id: string;
  title: string;
  tagline: string;
  vote_average: number;
}

interface MovieGridProps {
  searchQuery?: string;
}

const fetchMovies = async (): Promise<Movie[]> => {
  const { data, error } = await supabase
    .from('movies')
    .select('*')
    .order('vote_average', { ascending: false });

  if (error) throw error;
  return data || [];
};

const MovieGrid = ({ searchQuery = '' }: MovieGridProps) => {
  const { data: movies, isLoading, error } = useQuery({
    queryKey: ['movies'],
    queryFn: fetchMovies,
  });

  // Filter movies based on search query
  const filteredMovies = movies?.filter(movie =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    movie.tagline?.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

  if (filteredMovies?.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-center">
          <Film className="w-16 h-16 text-gray-500 mx-auto mb-4" />
          <p className="text-white text-lg">
            {searchQuery ? 'No movies found' : 'No movies available'}
          </p>
          <p className="text-gray-400">
            {searchQuery ? 'Try a different search term' : 'Check back later'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {filteredMovies?.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default MovieGrid;
