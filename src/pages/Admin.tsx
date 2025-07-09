
import Navbar from '@/components/Navbar';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Upload, Plus, Edit, Trash2, Eye } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Content {
  id: string;
  title: string;
  description: string;
  genre: string;
  year: number;
  rating: number;
  image: string;
  videoUrl: string;
  type: 'movie' | 'series';
  status: 'published' | 'draft';
  createdAt: string;
}

export default function Admin() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [selectedContent, setSelectedContent] = useState<Content | null>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    genre: '',
    year: new Date().getFullYear(),
    videoUrl: '',
    imageUrl: '',
    type: 'movie' as 'movie' | 'series',
    status: 'draft' as 'published' | 'draft'
  });

  // Mock content data
  const [contentList, setContentList] = useState<Content[]>([
    {
      id: '1',
      title: 'Në Kërkim të Dashurisë',
      description: 'Një histori romantike e vendosur në qytetin e bukur të Gjirokastës.',
      genre: 'Romantik',
      year: 2023,
      rating: 8.5,
      image: 'https://images.unsplash.com/photo-1489599388350-e3f95e2d26b6',
      videoUrl: 'https://example.com/video1.mp4',
      type: 'movie',
      status: 'published',
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      title: 'Familja Moderne',
      description: 'Komedi e lehtë që tregon jetën e përditshme të një familje shqiptare.',
      genre: 'Komedi',
      year: 2023,
      rating: 7.8,
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4',
      videoUrl: 'https://example.com/video2.mp4',
      type: 'series',
      status: 'published',
      createdAt: '2024-01-10'
    }
  ]);

  const genres = ['Romantik', 'Komedi', 'Dramë', 'Aksion', 'Historik', 'Dokumentar', 'Animacion', 'Krim'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const newContent: Content = {
        id: selectedContent?.id || Date.now().toString(),
        title: formData.title,
        description: formData.description,
        genre: formData.genre,
        year: formData.year,
        rating: 0,
        image: formData.imageUrl,
        videoUrl: formData.videoUrl,
        type: formData.type,
        status: formData.status,
        createdAt: selectedContent?.createdAt || new Date().toISOString().split('T')[0]
      };

      if (selectedContent) {
        // Update existing content
        setContentList(contentList.map(item => 
          item.id === selectedContent.id ? newContent : item
        ));
        toast({
          title: "Përmbajtja u përditësua",
          description: "Ndryshimet u ruajtën me sukses.",
        });
      } else {
        // Add new content
        setContentList([newContent, ...contentList]);
        toast({
          title: "Përmbajtja u shtua",
          description: "Përmbajtja e re u krijua me sukses.",
        });
      }

      // Reset form
      setFormData({
        title: '',
        description: '',
        genre: '',
        year: new Date().getFullYear(),
        videoUrl: '',
        imageUrl: '',
        type: 'movie',
        status: 'draft'
      });
      setSelectedContent(null);
    } catch (error) {
      toast({
        title: "Gabim",
        description: "Ka ndodhur një gabim gjatë ruajtjes.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (content: Content) => {
    setSelectedContent(content);
    setFormData({
      title: content.title,
      description: content.description,
      genre: content.genre,
      year: content.year,
      videoUrl: content.videoUrl,
      imageUrl: content.image,
      type: content.type,
      status: content.status
    });
  };

  const handleDelete = (id: string) => {
    setContentList(contentList.filter(item => item.id !== id));
    toast({
      title: "Përmbajtja u fshi",
      description: "Përmbajtja u largua me sukses.",
    });
  };

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      <div className="pt-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">Admin Panel</h1>
            <p className="text-gray-400 text-lg">
              Menaxhoni të gjithë përmbajtjen e ShqipFlix
            </p>
          </div>

          <Tabs defaultValue="add" className="space-y-8">
            <TabsList className="bg-gray-900 border-gray-700">
              <TabsTrigger value="add" className="flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>Shto Përmbajtje</span>
              </TabsTrigger>
              <TabsTrigger value="manage" className="flex items-center space-x-2">
                <Edit className="w-4 h-4" />
                <span>Menaxho Përmbajtjen</span>
              </TabsTrigger>
            </TabsList>

            {/* Add Content Tab */}
            <TabsContent value="add">
              <div className="bg-gray-900 rounded-lg p-6">
                <h2 className="text-2xl font-bold text-white mb-6">
                  {selectedContent ? 'Përditëso Përmbajtjen' : 'Shto Përmbajtje të Re'}
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="title" className="text-white">
                        Titulli *
                      </Label>
                      <Input
                        id="title"
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                        required
                        className="bg-black border-gray-600 text-white focus:border-red-500"
                        placeholder="Titulli i filmit/serialit"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="genre" className="text-white">
                        Zhanri *
                      </Label>
                      <Select value={formData.genre} onValueChange={(value) => setFormData({...formData, genre: value})}>
                        <SelectTrigger className="bg-black border-gray-600 text-white">
                          <SelectValue placeholder="Zgjidhni zhanrin" />
                        </SelectTrigger>
                        <SelectContent className="bg-black border-gray-600">
                          {genres.map(genre => (
                            <SelectItem key={genre} value={genre} className="text-white hover:bg-gray-800">
                              {genre}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="description" className="text-white">
                      Përshkrimi *
                    </Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      required
                      className="bg-black border-gray-600 text-white focus:border-red-500"
                      placeholder="Përshkrimi i përmbajtjes..."
                      rows={4}
                    />
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <Label htmlFor="year" className="text-white">
                        Viti i Prodhimit *
                      </Label>
                      <Input
                        id="year"
                        type="number"
                        value={formData.year}
                        onChange={(e) => setFormData({...formData, year: parseInt(e.target.value)})}
                        required
                        min="1900"
                        max={new Date().getFullYear() + 5}
                        className="bg-black border-gray-600 text-white focus:border-red-500"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="type" className="text-white">
                        Lloji *
                      </Label>
                      <Select value={formData.type} onValueChange={(value: 'movie' | 'series') => setFormData({...formData, type: value})}>
                        <SelectTrigger className="bg-black border-gray-600 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-black border-gray-600">
                          <SelectItem value="movie" className="text-white hover:bg-gray-800">Film</SelectItem>
                          <SelectItem value="series" className="text-white hover:bg-gray-800">Serial</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="status" className="text-white">
                        Statusi
                      </Label>
                      <Select value={formData.status} onValueChange={(value: 'published' | 'draft') => setFormData({...formData, status: value})}>
                        <SelectTrigger className="bg-black border-gray-600 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-black border-gray-600">
                          <SelectItem value="draft" className="text-white hover:bg-gray-800">Draft</SelectItem>
                          <SelectItem value="published" className="text-white hover:bg-gray-800">I Publikuar</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="videoUrl" className="text-white">
                        URL e Videos *
                      </Label>
                      <Input
                        id="videoUrl"
                        type="url"
                        value={formData.videoUrl}
                        onChange={(e) => setFormData({...formData, videoUrl: e.target.value})}
                        required
                        className="bg-black border-gray-600 text-white focus:border-red-500"
                        placeholder="https://example.com/video.mp4"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="imageUrl" className="text-white">
                        URL e Imazhit *
                      </Label>
                      <Input
                        id="imageUrl"
                        type="url"
                        value={formData.imageUrl}
                        onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
                        required
                        className="bg-black border-gray-600 text-white focus:border-red-500"
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>
                  </div>
                  
                  <div className="flex space-x-4">
                    <Button
                      type="submit"
                      disabled={loading}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      {loading ? 'Duke ruajtur...' : (selectedContent ? 'Përditëso' : 'Shto Përmbajtjen')}
                    </Button>
                    
                    {selectedContent && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setSelectedContent(null);
                          setFormData({
                            title: '',
                            description: '',
                            genre: '',
                            year: new Date().getFullYear(),
                            videoUrl: '',
                            imageUrl: '',
                            type: 'movie',
                            status: 'draft'
                          });
                        }}
                        className="border-gray-600 text-white hover:bg-white hover:text-black"
                      >
                        Anulo
                      </Button>
                    )}
                  </div>
                </form>
              </div>
            </TabsContent>

            {/* Manage Content Tab */}
            <TabsContent value="manage">
              <div className="bg-gray-900 rounded-lg p-6">
                <h2 className="text-2xl font-bold text-white mb-6">Përmbajtja Ekzistuese</h2>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-white">
                    <thead>
                      <tr className="border-b border-gray-700">
                        <th className="text-left p-4">Titulli</th>
                        <th className="text-left p-4">Lloji</th>
                        <th className="text-left p-4">Zhanri</th>
                        <th className="text-left p-4">Viti</th>
                        <th className="text-left p-4">Statusi</th>
                        <th className="text-left p-4">Veprimet</th>
                      </tr>
                    </thead>
                    <tbody>
                      {contentList.map((content) => (
                        <tr key={content.id} className="border-b border-gray-800 hover:bg-gray-800">
                          <td className="p-4">
                            <div className="flex items-center space-x-3">
                              <img
                                src={content.image}
                                alt={content.title}
                                className="w-12 h-16 object-cover rounded"
                              />
                              <div>
                                <div className="font-medium">{content.title}</div>
                                <div className="text-gray-400 text-sm">{content.createdAt}</div>
                              </div>
                            </div>
                          </td>
                          <td className="p-4">
                            <span className="capitalize">{content.type === 'movie' ? 'Film' : 'Serial'}</span>
                          </td>
                          <td className="p-4">{content.genre}</td>
                          <td className="p-4">{content.year}</td>
                          <td className="p-4">
                            <span className={`px-2 py-1 rounded text-xs ${
                              content.status === 'published' 
                                ? 'bg-green-600 text-white' 
                                : 'bg-yellow-600 text-white'
                            }`}>
                              {content.status === 'published' ? 'I Publikuar' : 'Draft'}
                            </span>
                          </td>
                          <td className="p-4">
                            <div className="flex space-x-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleEdit(content)}
                                className="border-gray-600 text-white hover:bg-white hover:text-black"
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleDelete(content.id)}
                                className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
