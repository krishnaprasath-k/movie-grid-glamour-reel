
import { Film, Star } from "lucide-react";
import UserMenu from "./UserMenu";

const Header = () => {
  return (
    <header className="bg-gray-900 border-b border-gray-800 shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <Film className="w-8 h-8 text-yellow-500" />
              <h1 className="text-3xl font-bold text-white">MovieReel</h1>
            </div>
            <div className="hidden sm:flex items-center space-x-2 text-gray-300">
              <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
              <span className="text-sm">Discover amazing movies</span>
            </div>
          </div>
          <UserMenu />
        </div>
      </div>
    </header>
  );
};

export default Header;
