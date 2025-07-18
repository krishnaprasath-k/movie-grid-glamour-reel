
import { Star } from "lucide-react";

interface Movie {
  title: string;
  tagline: string;
  vote_average: number;
}

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  return (
    <div className="bg-gray-900 rounded-lg p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-gray-800 hover:border-yellow-500/30">
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-white line-clamp-2 min-h-[3.5rem]">
          {movie.title}
        </h3>
        
        <p className="text-gray-300 text-sm italic line-clamp-3 min-h-[4rem]">
          "{movie.tagline}"
        </p>
        
        <div className="flex items-center justify-between pt-2 border-t border-gray-800">
          <div className="flex items-center space-x-2">
            <Star className="w-5 h-5 fill-yellow-500 text-yellow-500" />
            <span className="text-white font-semibold">
              {movie.vote_average.toFixed(1)}
            </span>
            <span className="text-gray-400 text-sm">/10</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
