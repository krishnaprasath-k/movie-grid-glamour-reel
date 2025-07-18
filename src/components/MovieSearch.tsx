
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface MovieSearchProps {
  onSearch: (query: string) => void;
}

const MovieSearch = ({ onSearch }: MovieSearchProps) => {
  const [query, setQuery] = useState('');

  const handleSearch = (value: string) => {
    setQuery(value);
    onSearch(value);
  };

  return (
    <div className="relative max-w-md">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
      <Input
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        className="pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-400"
      />
    </div>
  );
};

export default MovieSearch;
