
import Navbar from '@/components/Navbar';
import { useState } from 'react';
import { Play, Plus, Star, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Series {
  id: string;
  title: string;
  description: string;
  genre: string;
  year: number;
  rating: number;
  image: string;
  seasons: number;
  episodes: number;
}

export default function Series() {
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  // Mock series data
  const series: Series[] = [
    {
      id: '1',
      title: 'Familja Moderne',
      description: 'Komedi e lehtë që tregon jetën e përditshme të një familje shqiptare në kohët moderne.',
      genre: 'Komedi',
      year: 2023,
      rating: 7.8,
      image: 'https://images.unsplash.com/photo-1489599388350-e3f95e2d26b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      seasons: 2,
      episodes: 24
    },
    {
      id: '2',
      title: 'Krime në Tiranë',
      description: 'Serial kriminal që ndiqet nga publiku i gjerë për intrigat dhe misteret.',
      genre: 'Krim',
      year: 2022,
      rating: 8.9,
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      seasons: 3,
      episodes: 36
    },
    {
      id: '3',
      title: 'Dashuria në Fshat',
      description: 'Drama romantike që tregon dashurinë dhe traditat në fshatrat shqiptare.',
      genre: 'Romantik',
      year: 2023,
      rating: 8.2,
      image: 'https://images.unsplash.com/photo-1489599388350-e3f95e2d26b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      seasons: 1,
      episodes: 12
    },
    {
      id: '4',
      title: 'Historia Jonë',
      description: 'Serial historik që rrëfen ngjarje të rëndësishme të historisë shqiptare.',
      genre: 'Historik',
      year: 2021,
      rating: 9.1,
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      seasons: 2,
      episodes: 20
    },
    {
      id: '5',
      title: 'Fëmijët e Lagjes',
      description: 'Serial për fëmijë që tregon aventurat e një grupi fëmijësh.',
      genre: 'Fëmijë',
      year: 2022,
      rating: 8.0,
      image: 'https://images.unsplash.com/photo-1489599388350-e3f95e2d26b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      seasons: 2,
      episodes: 30
    }
  ];

  const genres = ['all', 'Komedi', 'Krim', 'Romantik', 'Historik', 'Fëmijë'];
  const years = ['all', '2023', '2022', '2021', '2020'];

  const filteredSeries = series
    .filter(serie => selectedGenre === 'all' || serie.genre === selectedGenre)
    .filter(serie => selectedYear === 'all' || serie.year.toString() === selectedYear)
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return b.year - a.year;
        case 'oldest':
          return a.year - b.year;
        case 'rating':
          return b.rating - a.rating;
        case 'title':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

  const SeriesCard = ({ series }: { series: Series }) => (
    <div className="group relative cursor-pointer transition-transform duration-300 hover:scale-105">
      <div className="relative aspect-[2/3] bg-gray-800 rounded-lg overflow-hidden">
        <img
          src={series.image}
          alt={series.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4">
          <h4 className="text-white font-bold text-lg mb-2 text-center">{series.title}</h4>
          <p className="text-gray-300 text-sm mb-4 text-center line-clamp-3">{series.description}</p>
          <div className="flex space-x-2 mb-4">
            <Button size="sm" className="bg-white text-black hover:bg-gray-200">
              <Play className="w-4 h-4 mr-1" />
              Luaj
            </Button>
            <Button size="sm" variant="outline" className="border-gray-400 text-white hover:bg-white hover:text-black">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex items-center justify-between w-full text-xs text-gray-400">
            <span>{series.seasons} sezone</span>
            <div className="flex items-center">
              <Star className="w-3 h-3 text-yellow-500 mr-1" />
              <span>{series.rating}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-3">
        <h4 className="text-white font-semibold text-sm truncate">{series.title}</h4>
        <div className="flex items-center justify-between text-xs text-gray-400 mt-1">
          <span>{series.genre}</span>
          <span>{series.episodes} episodet</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      <div className="pt-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">Seriale</h1>
            <p className="text-gray-400 text-lg">
              Shikoni serialet më të reja dhe më të mira shqiptare
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-4 mb-8 p-4 bg-gray-900 rounded-lg">
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <span className="text-white font-medium">Filtro:</span>
            </div>
            
            <Select value={selectedGenre} onValueChange={setSelectedGenre}>
              <SelectTrigger className="w-40 bg-black border-gray-600 text-white">
                <SelectValue placeholder="Zhanri" />
              </SelectTrigger>
              <SelectContent className="bg-black border-gray-600">
                {genres.map(genre => (
                  <SelectItem key={genre} value={genre} className="text-white hover:bg-gray-800">
                    {genre === 'all' ? 'Të gjithë' : genre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger className="w-32 bg-black border-gray-600 text-white">
                <SelectValue placeholder="Viti" />
              </SelectTrigger>
              <SelectContent className="bg-black border-gray-600">
                {years.map(year => (
                  <SelectItem key={year} value={year} className="text-white hover:bg-gray-800">
                    {year === 'all' ? 'Të gjithë' : year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40 bg-black border-gray-600 text-white">
                <SelectValue placeholder="Rendit sipas" />
              </SelectTrigger>
              <SelectContent className="bg-black border-gray-600">
                <SelectItem value="newest" className="text-white hover:bg-gray-800">Më të Rinj</SelectItem>
                <SelectItem value="oldest" className="text-white hover:bg-gray-800">Më të Vjetër</SelectItem>
                <SelectItem value="rating" className="text-white hover:bg-gray-800">Vlerësimi</SelectItem>
                <SelectItem value="title" className="text-white hover:bg-gray-800">Titulli</SelectItem>
              </SelectContent>
            </Select>

            <div className="text-gray-400 text-sm ml-auto">
              {filteredSeries.length} seriale
            </div>
          </div>

          {/* Series Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 pb-20">
            {filteredSeries.map((serie) => (
              <SeriesCard key={serie.id} series={serie} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
