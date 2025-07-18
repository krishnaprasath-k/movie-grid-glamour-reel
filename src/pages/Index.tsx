
import { useState } from "react";
import Header from "../components/Header";
import MovieGrid from "../components/MovieGrid";
import MovieSearch from "../components/MovieSearch";
import AddMovieForm from "../components/AddMovieForm";
import AuthGuard from "../components/auth/AuthGuard";
import { useUserRole } from "../hooks/useUserRole";
import { useQueryClient } from "@tanstack/react-query";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { isAdmin } = useUserRole();
  const queryClient = useQueryClient();

  const handleMovieAdded = () => {
    queryClient.invalidateQueries({ queryKey: ['movies'] });
  };

  return (
    <AuthGuard>
      <div className="min-h-screen bg-black">
        <Header />
        
        <main className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">Featured Movies</h2>
                <p className="text-gray-400">Discover the highest-rated films of all time</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <MovieSearch onSearch={setSearchQuery} />
                {isAdmin && <AddMovieForm onMovieAdded={handleMovieAdded} />}
              </div>
            </div>
          </div>
          
          <MovieGrid searchQuery={searchQuery} />
        </main>
        
        <footer className="bg-gray-900 border-t border-gray-800 mt-16">
          <div className="container mx-auto px-4 py-6">
            <p className="text-center text-gray-400">
              © 2024 MovieReel. Built with React & Supabase
            </p>
          </div>
        </footer>
      </div>
    </AuthGuard>
  );
};

export default Index;
