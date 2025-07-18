
import Header from "../components/Header";
import MovieGrid from "../components/MovieGrid";

const Index = () => {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">Featured Movies</h2>
          <p className="text-gray-400">Discover the highest-rated films of all time</p>
        </div>
        
        <MovieGrid />
      </main>
      
      <footer className="bg-gray-900 border-t border-gray-800 mt-16">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-gray-400">
            © 2024 MovieReel. Built with React & Lovable
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
