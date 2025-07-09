
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Search, Bell, User, LogOut, Settings } from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
    }
  };

  return (
    <nav className="fixed top-0 w-full bg-black/90 backdrop-blur-sm z-50 border-b border-red-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/shfleto" className="flex items-center space-x-2">
            <div className="text-2xl font-bold text-red-600">ShqipFlix</div>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/shfleto" className="text-white hover:text-red-400 transition-colors">
              Ballina
            </Link>
            <Link to="/filma" className="text-white hover:text-red-400 transition-colors">
              Filma
            </Link>
            <Link to="/seriale" className="text-white hover:text-red-400 transition-colors">
              Seriale
            </Link>
            <Link to="/te-preferuarat" className="text-white hover:text-red-400 transition-colors">
              Të Preferuarat
            </Link>
          </div>

          {/* Search and User Menu */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <form onSubmit={handleSearch} className="hidden sm:flex items-center">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Kërko filma, seriale..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-black/50 border border-gray-600 rounded-md pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-red-500 w-64"
                />
              </div>
            </form>

            {/* Notifications */}
            <button className="text-white hover:text-red-400 transition-colors">
              <Bell className="w-5 h-5" />
            </button>

            {/* User Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center space-x-2 text-white hover:text-red-400 transition-colors">
                  <User className="w-5 h-5" />
                  <span className="hidden sm:inline">{user?.emri}</span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-black/90 border-gray-700 text-white">
                <DropdownMenuItem asChild>
                  <Link to="/profili" className="flex items-center space-x-2">
                    <Settings className="w-4 h-4" />
                    <span>Profili</span>
                  </Link>
                </DropdownMenuItem>
                {user?.isAdmin && (
                  <DropdownMenuItem asChild>
                    <Link to="/admin" className="flex items-center space-x-2 text-red-400">
                      <Settings className="w-4 h-4" />
                      <span>Admin Panel</span>
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem onClick={handleLogout} className="flex items-center space-x-2 text-red-400">
                  <LogOut className="w-4 h-4" />
                  <span>Dil</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
}
