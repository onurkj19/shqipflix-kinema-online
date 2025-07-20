
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await login(email, password);
      if (!error) {
        toast({
          title: "Mirësevini në ShqipFlix!",
          description: "Ju keni hyrë me sukses në llogarinë tuaj.",
        });
        navigate('/shfleto');
      } else {
        toast({
          title: "Gabim në hyrje",
          description: error === 'Invalid login credentials' 
            ? "Email ose fjalëkalimi është i gabuar."
            : error,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Gabim",
        description: "Ka ndodhur një gabim. Ju lutem provoni përsëri.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="text-4xl font-bold text-red-600">
            ShqipFlix
          </Link>
          <p className="text-gray-400 mt-2">Hyni në llogarinë tuaj</p>
        </div>

        {/* Info */}
        <div className="bg-gray-900 p-4 rounded-lg mb-6 border border-gray-700">
          <h3 className="text-white font-semibold mb-2">Regjistrohu për akses:</h3>
          <p className="text-sm text-gray-300">Krijo një llogari të re për të pasur akses në platformë</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="email" className="text-white">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-gray-900 border-gray-700 text-white focus:border-red-500"
              placeholder="email@example.com"
            />
          </div>

          <div>
            <Label htmlFor="password" className="text-white">
              Fjalëkalimi
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-gray-900 border-gray-700 text-white focus:border-red-500 pr-10"
                placeholder="Fjalëkalimi juaj"
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

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-3"
          >
            {loading ? 'Duke u kyçur...' : 'Hyr'}
          </Button>
        </form>

        {/* Register Link */}
        <div className="text-center mt-6">
          <p className="text-gray-400">
            Nuk keni llogari?{' '}
            <Link to="/regjistrohu" className="text-red-400 hover:text-red-300">
              Regjistrohuni këtu
            </Link>
          </p>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-4">
          <Link to="/" className="text-gray-500 hover:text-gray-300 text-sm">
            ← Kthehuni në ballina
          </Link>
        </div>
      </div>
    </div>
  );
}
