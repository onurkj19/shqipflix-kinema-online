
import Navbar from '@/components/Navbar';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { User, Settings, CreditCard, Bell, Shield, Eye, EyeOff } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';

export default function Profile() {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // Profile form state
  const [profileData, setProfileData] = useState({
    emri: user?.emri || '',
    email: user?.email || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Settings state
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    autoplay: true,
    highQuality: true,
    parentalControls: false
  });

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Mock profile update
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Profili u përditësua",
        description: "Të dhënat tuaja u ruajtën me sukses.",
      });
    } catch (error) {
      toast({
        title: "Gabim",
        description: "Ka ndodhur një gabim gjatë përditësimit.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (profileData.newPassword !== profileData.confirmPassword) {
      toast({
        title: "Gabim",
        description: "Fjalëkalimet e reja nuk përputhen.",
        variant: "destructive",
      });
      return;
    }

    if (profileData.newPassword.length < 6) {
      toast({
        title: "Gabim",
        description: "Fjalëkalimi i ri duhet të ketë të paktën 6 karaktere.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      // Mock password change
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Fjalëkalimi u ndryshua",
        description: "Fjalëkalimi juaj u përditësua me sukses.",
      });
      
      setProfileData({
        ...profileData,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (error) {
      toast({
        title: "Gabim",
        description: "Ka ndodhur një gabim gjatë ndryshimit të fjalëkalimit.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSettingChange = (key: string, value: boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    toast({
      title: "Cilësimi u përditësua",
      description: "Ndryshimet u ruajtën automatikisht.",
    });
  };

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      <div className="pt-20 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">Profili Im</h1>
            <p className="text-gray-400 text-lg">
              Menaxhoni të dhënat e llogarisë dhe cilësimet tuaja
            </p>
          </div>

          <Tabs defaultValue="profile" className="space-y-8">
            <TabsList className="bg-gray-900 border-gray-700">
              <TabsTrigger value="profile" className="flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span>Profili</span>
              </TabsTrigger>
              <TabsTrigger value="security" className="flex items-center space-x-2">
                <Shield className="w-4 h-4" />
                <span>Siguria</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center space-x-2">
                <Settings className="w-4 h-4" />
                <span>Cilësimet</span>
              </TabsTrigger>
              <TabsTrigger value="subscription" className="flex items-center space-x-2">
                <CreditCard className="w-4 h-4" />
                <span>Abonimi</span>
              </TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile">
              <div className="bg-gray-900 rounded-lg p-6">
                <h2 className="text-2xl font-bold text-white mb-6">Informacionet Personale</h2>
                
                <form onSubmit={handleProfileUpdate} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="emri" className="text-white">
                        Emri i Plotë
                      </Label>
                      <Input
                        id="emri"
                        type="text"
                        value={profileData.emri}
                        onChange={(e) => setProfileData({...profileData, emri: e.target.value})}
                        className="bg-black border-gray-600 text-white focus:border-red-500"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="email" className="text-white">
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                        className="bg-black border-gray-600 text-white focus:border-red-500"
                      />
                    </div>
                  </div>
                  
                  <Button
                    type="submit"
                    disabled={loading}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    {loading ? 'Duke ruajtur...' : 'Ruaj Ndryshimet'}
                  </Button>
                </form>
              </div>
            </TabsContent>

            {/* Security Tab */}
            <TabsContent value="security">
              <div className="bg-gray-900 rounded-lg p-6">
                <h2 className="text-2xl font-bold text-white mb-6">Siguria e Llogarisë</h2>
                
                <form onSubmit={handlePasswordChange} className="space-y-6">
                  <div>
                    <Label htmlFor="currentPassword" className="text-white">
                      Fjalëkalimi Aktual
                    </Label>
                    <div className="relative">
                      <Input
                        id="currentPassword"
                        type={showPassword ? 'text' : 'password'}
                        value={profileData.currentPassword}
                        onChange={(e) => setProfileData({...profileData, currentPassword: e.target.value})}
                        className="bg-black border-gray-600 text-white focus:border-red-500 pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="newPassword" className="text-white">
                        Fjalëkalimi i Ri
                      </Label>
                      <Input
                        id="newPassword"
                        type="password"
                        value={profileData.newPassword}
                        onChange={(e) => setProfileData({...profileData, newPassword: e.target.value})}
                        className="bg-black border-gray-600 text-white focus:border-red-500"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="confirmPassword" className="text-white">
                        Konfirmo Fjalëkalimin
                      </Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={profileData.confirmPassword}
                        onChange={(e) => setProfileData({...profileData, confirmPassword: e.target.value})}
                        className="bg-black border-gray-600 text-white focus:border-red-500"
                      />
                    </div>
                  </div>
                  
                  <Button
                    type="submit"
                    disabled={loading}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    {loading ? 'Duke ndryshuar...' : 'Ndrysho Fjalëkalimin'}
                  </Button>
                </form>
              </div>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings">
              <div className="bg-gray-900 rounded-lg p-6">
                <h2 className="text-2xl font-bold text-white mb-6">Cilësimet e Aplikacionit</h2>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-white font-medium">Njoftime Email</h3>
                      <p className="text-gray-400 text-sm">Merrni njoftime për përmbajtje të reja</p>
                    </div>
                    <Switch
                      checked={settings.emailNotifications}
                      onCheckedChange={(checked) => handleSettingChange('emailNotifications', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-white font-medium">Njoftime Push</h3>
                      <p className="text-gray-400 text-sm">Njoftime në pajisjen tuaj</p>
                    </div>
                    <Switch
                      checked={settings.pushNotifications}
                      onCheckedChange={(checked) => handleSettingChange('pushNotifications', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-white font-medium">Autoplay</h3>
                      <p className="text-gray-400 text-sm">Luani automatikisht episodin tjetër</p>
                    </div>
                    <Switch
                      checked={settings.autoplay}
                      onCheckedChange={(checked) => handleSettingChange('autoplay', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-white font-medium">Cilësi të Lartë</h3>
                      <p className="text-gray-400 text-sm">Përdorni cilësi HD/4K kur është e mundur</p>
                    </div>
                    <Switch
                      checked={settings.highQuality}
                      onCheckedChange={(checked) => handleSettingChange('highQuality', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-white font-medium">Kontroll Prindëror</h3>
                      <p className="text-gray-400 text-sm">Aktivizo kontrollin për përmbajtje të fëmijëve</p>
                    </div>
                    <Switch
                      checked={settings.parentalControls}
                      onCheckedChange={(checked) => handleSettingChange('parentalControls', checked)}
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Subscription Tab */}
            <TabsContent value="subscription">
              <div className="bg-gray-900 rounded-lg p-6">
                <h2 className="text-2xl font-bold text-white mb-6">Abonimi Aktual</h2>
                
                <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-lg p-6 mb-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-2xl font-bold text-white">Premium</h3>
                      <p className="text-red-100">Qasje e plotë në të gjithë përmbajtjen</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-white">€9.99</div>
                      <div className="text-red-100">/muaj</div>
                    </div>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-black rounded-lg p-4">
                    <h4 className="text-white font-medium mb-2">Data e Fillimit</h4>
                    <p className="text-gray-400">15 Janar 2024</p>
                  </div>
                  
                  <div className="bg-black rounded-lg p-4">
                    <h4 className="text-white font-medium mb-2">Rinovimi i Ardhshëm</h4>
                    <p className="text-gray-400">15 Shkurt 2024</p>
                  </div>
                </div>
                
                <div className="flex space-x-4">
                  <Button variant="outline" className="border-gray-600 text-white hover:bg-white hover:text-black">
                    Menaxho Abonimi
                  </Button>
                  <Button variant="outline" className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white">
                    Anulo Abonimi
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
