
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { Play, Plus, Info, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Movie {
  id: string;
  title: string;
  description: string;
  genre: string;
  year: number;
  rating: number;
  image: string;
  duration: string;
  isSeries?: boolean;
}

export default function Browse() {
  const [featuredMovie, setFeaturedMovie] = useState<Movie | null>(null);
  const [categories, setCategories] = useState<{[key: string]: Movie[]}>({});

  // Mock data
  useEffect(() => {
    const mockMovies: Movie[] = [
      {
        id: '1',
        title: 'Në Kërkim të Dashurisë',
        description: 'Një histori romantike e vendosur në qytetin e bukur të Gjirokastës, ku dy të rinj gjejnë dashuri mes traditave dhe modernitetit.',
        genre: 'Dramë/Romantik',
        year: 2023,
        rating: 8.5,
        image: 'https://images.unsplash.com/photo-1489599388350-e3f95e2d26b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        duration: '2h 15min'
      },
      {
        id: '2',
        title: 'Malësorët',
        description: 'Epik historik për luftëtarët shqiptarë dhe luftën e tyre për liri dhe dinjitet.',
        genre: 'Historik/Aksion',
        year: 2022,
        rating: 9.2,
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        duration: '2h 45min'
      },
      {
        id: '3',
        title: 'Familja Moderne',
        description: 'Komedi e lehtë që tregon jetën e përditshme të një familje shqiptare në kohët moderne.',
        genre: 'Komedi',
        year: 2023,
        rating: 7.8,
        image: 'https://images.unsplash.com/photo-1489599388350-e3f95e2d26b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        duration: '1h 35min',
        isSeries: true
      },
      {
        id: '4',
        title: 'Sekretet e Shqipërisë',
        description: 'Dokumentar që eksploron historinë e fshehur dhe thesaret kulturore të Shqipërisë.',
        genre: 'Dokumentar',
        year: 2023,
        rating: 8.9,
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        duration: '3h 20min'
      }
    ];

    setFeaturedMovie(mockMovies[0]);
    
    setCategories({
      'Të Fundit': mockMovies,
      'Filma Popularë': mockMovies.filter(m => m.rating > 8),
      'Seriale Shqiptare': mockMovies.filter(m => m.isSeries),
      'Për Fëmijë': mockMovies.slice(0, 2),
      'Dokumentarë': mockMovies.filter(m => m.genre.includes('Dokumentar'))
    });
  }, []);

  const MovieCard = ({ movie }: { movie: Movie }) => (
    <div className="group relative min-w-[200px] md:min-w-[250px] cursor-pointer transition-transform duration-300 hover:scale-105">
      <div className="relative aspect-[16/9] bg-gray-800 rounded-lg overflow-hidden">
        <img
          src={movie.image}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="flex space-x-2">
            <Button size="sm" className="bg-white text-black hover:bg-gray-200">
              <Play className="w-4 h-4 mr-1" />
              Luaj
            </Button>
            <Button size="sm" variant="outline" className="border-gray-400 text-white hover:bg-white hover:text-black">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
      <div className="mt-2">
        <h4 className="text-white font-semibold text-sm truncate">{movie.title}</h4>
        <div className="flex items-center justify-between text-xs text-gray-400 mt-1">
          <span>{movie.year}</span>
          <div className="flex items-center">
            <Star className="w-3 h-3 text-yellow-500 mr-1" />
            <span>{movie.rating}</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      {/* Featured Content */}
      {featuredMovie && (
        <div className="relative h-[80vh] flex items-center">
          <div className="absolute inset-0">
            <img
              src={featuredMovie.image}
              alt={featuredMovie.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
          </div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-6">
            <div className="max-w-lg">
              <h1 className="text-5xl font-bold text-white mb-4">
                {featuredMovie.title}
              </h1>
              <p className="text-lg text-gray-300 mb-6 line-clamp-3">
                {featuredMovie.description}
              </p>
              
              <div className="flex items-center space-x-4 mb-8">
                <div className="flex items-center text-yellow-500">
                  <Star className="w-5 h-5 mr-1" />
                  <span className="text-white">{featuredMovie.rating}</span>
                </div>
                <span className="text-gray-400">{featuredMovie.year}</span>
                <span className="text-gray-400">{featuredMovie.duration}</span>
                <span className="text-gray-400">{featuredMovie.genre}</span>
              </div>
              
              <div className="flex space-x-4">
                <Button size="lg" className="bg-white text-black hover:bg-gray-200">
                  <Play className="mr-2 w-5 h-5" />
                  Luaj
                </Button>
                <Button size="lg" variant="outline" className="border-gray-400 text-white hover:bg-white hover:text-black">
                  <Info className="mr-2 w-5 h-5" />
                  Më Shumë Info
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Content Rows */}
      <div className="relative z-10 px-6 pb-20 -mt-32">
        {Object.entries(categories).map(([category, movies]) => (
          <div key={category} className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">{category}</h2>
            <div className="flex space-x-6 overflow-x-auto pb-4 scrollbar-hide">
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
