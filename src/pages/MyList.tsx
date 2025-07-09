
import Navbar from '@/components/Navbar';
import { useState } from 'react';
import { Play, Trash2, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Content {
  id: string;
  title: string;
  description: string;
  genre: string;
  year: number;
  rating: number;
  image: string;
  duration?: string;
  seasons?: number;
  type: 'movie' | 'series';
}

export default function MyList() {
  const [myList, setMyList] = useState<Content[]>([
    {
      id: '1',
      title: 'Në Kërkim të Dashurisë',
      description: 'Një histori romantike e vendosur në qytetin e bukur të Gjirokastës.',
      genre: 'Romantik',
      year: 2023,
      rating: 8.5,
      image: 'https://images.unsplash.com/photo-1489599388350-e3f95e2d26b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      duration: '2h 15min',
      type: 'movie'
    },
    {
      id: '2',
      title: 'Familja Moderne',
      description: 'Komedi e lehtë që tregon jetën e përditshme të një familje shqiptare.',
      genre: 'Komedi',
      year: 2023,
      rating: 7.8,
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      seasons: 2,
      type: 'series'
    },
    {
      id: '3',
      title: 'Malësorët',
      description: 'Epik historik për luftëtarët shqiptarë dhe luftën e tyre për liri.',
      genre: 'Historik',
      year: 2022,
      rating: 9.2,
      image: 'https://images.unsplash.com/photo-1489599388350-e3f95e2d26b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      duration: '2h 45min',
      type: 'movie'
    }
  ]);

  const removeFromList = (id: string) => {
    setMyList(myList.filter(item => item.id !== id));
  };

  const ContentCard = ({ content }: { content: Content }) => (
    <div className="group relative cursor-pointer">
      <div className="flex bg-gray-900 rounded-lg overflow-hidden hover:bg-gray-800 transition-colors duration-300">
        {/* Image */}
        <div className="w-32 h-48 flex-shrink-0">
          <img
            src={content.image}
            alt={content.title}
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Content */}
        <div className="flex-1 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-xl font-bold text-white">{content.title}</h3>
              <button
                onClick={() => removeFromList(content.id)}
                className="text-gray-400 hover:text-red-500 transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex items-center space-x-4 mb-3 text-sm text-gray-400">
              <span>{content.year}</span>
              <span className="capitalize">{content.type === 'movie' ? 'Film' : 'Serial'}</span>
              <span>{content.genre}</span>
              <div className="flex items-center">
                <Star className="w-4 h-4 text-yellow-500 mr-1" />
                <span>{content.rating}</span>
              </div>
            </div>
            
            <p className="text-gray-300 text-sm mb-4 line-clamp-2">
              {content.description}
            </p>
            
            <div className="text-sm text-gray-400 mb-4">
              {content.type === 'movie' ? content.duration : `${content.seasons} sezone`}
            </div>
          </div>
          
          <div className="flex space-x-3">
            <Button size="sm" className="bg-white text-black hover:bg-gray-200">
              <Play className="w-4 h-4 mr-2" />
              Luaj
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      <div className="pt-20 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">Të Preferuarat</h1>
            <p className="text-gray-400 text-lg">
              Lista juaj personale e filmave dhe serialeve të preferuar
            </p>
          </div>

          {/* Content */}
          {myList.length > 0 ? (
            <div className="space-y-6 pb-20">
              {myList.map((content) => (
                <ContentCard key={content.id} content={content} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <Star className="w-12 h-12 text-gray-600" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">
                Lista juaj është bosh
              </h2>
              <p className="text-gray-400 mb-8 max-w-md mx-auto">
                Filloni të shtoni filma dhe seriale në listën tuaj të preferuar për t'i gjetur lehtësisht më vonë.
              </p>
              <Button className="bg-red-600 hover:bg-red-700">
                Shfleto Përmbajtjen
              </Button>
            </div>
          )}

          {/* Stats */}
          {myList.length > 0 && (
            <div className="mt-12 p-6 bg-gray-900 rounded-lg">
              <h3 className="text-xl font-bold text-white mb-4">Statistikat e Listës</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-red-500">{myList.length}</div>
                  <div className="text-gray-400 text-sm">Totali</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-red-500">
                    {myList.filter(item => item.type === 'movie').length}
                  </div>
                  <div className="text-gray-400 text-sm">Filma</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-red-500">
                    {myList.filter(item => item.type === 'series').length}
                  </div>
                  <div className="text-gray-400 text-sm">Seriale</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-red-500">
                    {(myList.reduce((sum, item) => sum + item.rating, 0) / myList.length).toFixed(1)}
                  </div>
                  <div className="text-gray-400 text-sm">Vlerësimi Mesatar</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
