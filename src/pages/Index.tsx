
import { Link } from 'react-router-dom';
import { Play, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

export default function Index() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="relative h-screen flex items-center justify-center">
        {/* Background Video/Image */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1489599388350-e3f95e2d26b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80')`
          }}
        ></div>
        
        {/* Navigation */}
        <nav className="absolute top-0 w-full p-6 z-20">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <div className="text-3xl font-bold text-red-600">ShqipFlix</div>
            <div className="flex items-center space-x-4">
              {user ? (
                <Link to="/shfleto">
                  <Button className="bg-red-600 hover:bg-red-700">
                    Shfleto
                  </Button>
                </Link>
              ) : (
                <>
                  <Link to="/hyr">
                    <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black">
                      Hyr
                    </Button>
                  </Link>
                  <Link to="/regjistrohu">
                    <Button className="bg-red-600 hover:bg-red-700">
                      Regjistrohu
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="relative z-20 max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
            ShqipFlix
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-300">
            Platforma më e madhe e filmave dhe serialeve shqiptare
          </p>
          <p className="text-lg mb-12 text-gray-400 max-w-2xl mx-auto">
            Zbulo mijëra filma dhe seriale me përmbajtje ekskluzive shqiptare. 
            Shiko kudo dhe kurdoherë në të gjitha pajisjet e tua.
          </p>
          
          {!user && (
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Link to="/regjistrohu">
                <Button size="lg" className="bg-red-600 hover:bg-red-700 px-12 py-4 text-lg">
                  <Play className="mr-2 w-5 h-5" />
                  Fillo Tani
                </Button>
              </Link>
              <Link to="/hyr">
                <Button size="lg" variant="outline" className="border-gray-400 text-white hover:bg-white hover:text-black px-12 py-4 text-lg">
                  <Info className="mr-2 w-5 h-5" />
                  Mëso Më Shumë
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Play className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Përmbajtje Ekskluzive</h3>
              <p className="text-gray-400">
                Filma dhe seriale të prodhuara vetëm për ShqipFlix me aktorë të njohur shqiptarë
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">Multi-Pajisje</h3>
              <p className="text-gray-400">
                Shiko në telefon, tablet, kompjuter dhe televizor. Sinkronizo përparimin në të gjitha pajisjet
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">Pa Reklama</h3>
              <p className="text-gray-400">
                Shijoni filmat dhe serialet tuaja të preferuar pa ndërprerje nga reklamat
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-red-900/50 to-black py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Gati për të filluar?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Bashkohu me mijëra përdorues të tjerë dhe zbulo botën e përmbajtjes shqiptare
          </p>
          {!user && (
            <Link to="/regjistrohu">
              <Button size="lg" className="bg-red-600 hover:bg-red-700 px-12 py-4 text-lg">
                Krijo Llogari Falas
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
