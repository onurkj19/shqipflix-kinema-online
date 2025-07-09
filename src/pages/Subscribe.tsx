
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Check, Star, Zap } from 'lucide-react';

export default function Subscribe() {
  const [selectedPlan, setSelectedPlan] = useState('premium');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const plans = [
    {
      id: 'basic',
      name: 'Bazë',
      price: '€4.99',
      period: '/muaj',
      features: [
        'Qasje në bibliotekën bazë',
        'Cilësi HD',
        '1 pajisje në të njëjtën kohë',
        'Asnjë reklamë'
      ],
      icon: <Star className="w-6 h-6" />
    },
    {
      id: 'premium',
      name: 'Premium',
      price: '€9.99',
      period: '/muaj',
      features: [
        'Qasje në të gjithë bibliotekën',
        'Cilësi 4K Ultra HD',
        '4 pajisje në të njëjtën kohë',
        'Përmbajtje ekskluzive',
        'Download për përdorim offline',
        'Asnjë reklamë'
      ],
      icon: <Zap className="w-6 h-6" />,
      popular: true
    },
    {
      id: 'family',
      name: 'Familjar',
      price: '€14.99',
      period: '/muaj',
      features: [
        'Të gjitha përfitimet Premium',
        'Deri në 6 profile',
        'Kontroll prindëror',
        'Cilësi 4K Ultra HD',
        'Pajisje të pakufizuara',
        'Asnjë reklamë'
      ],
      icon: <Star className="w-6 h-6" />
    }
  ];

  const handleSubscribe = async () => {
    setLoading(true);
    
    try {
      // Mock subscription process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Abonimi i suksesshëm!",
        description: "Mirësevini në ShqipFlix! Tani mund të shijoni të gjithë përmbajtjen.",
      });
      
      // Update user subscription status in localStorage
      const userData = localStorage.getItem('shqipflix_user');
      if (userData) {
        const user = JSON.parse(userData);
        user.isSubscribed = true;
        localStorage.setItem('shqipflix_user', JSON.stringify(user));
      }
      
      navigate('/shfleto');
    } catch (error) {
      toast({
        title: "Gabim në abonim",
        description: "Ka ndodhur një gabim. Ju lutem provoni përsëri.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white py-12 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
            Zgjidhni Planin Tuaj
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Shijoni mijëra filma dhe seriale shqiptare me cilësi të lartë dhe pa reklama
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-gray-900 rounded-2xl p-8 cursor-pointer transition-all duration-300 ${
                selectedPlan === plan.id
                  ? 'ring-2 ring-red-500 bg-gray-800 scale-105'
                  : 'hover:bg-gray-800'
              } ${plan.popular ? 'border-2 border-red-500' : 'border border-gray-700'}`}
              onClick={() => setSelectedPlan(plan.id)}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    Më i Popullarizuar
                  </span>
                </div>
              )}
              
              <div className="text-center mb-8">
                <div className="text-red-500 mb-4 flex justify-center">
                  {plan.icon}
                </div>
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="text-4xl font-bold text-red-500 mb-1">
                  {plan.price}
                  <span className="text-lg text-gray-400">{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="text-center">
                <div className={`w-6 h-6 rounded-full border-2 mx-auto ${
                  selectedPlan === plan.id 
                    ? 'bg-red-500 border-red-500' 
                    : 'border-gray-500'
                }`}>
                  {selectedPlan === plan.id && (
                    <Check className="w-4 h-4 text-white m-0.5" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Subscribe Button */}
        <div className="text-center">
          <Button
            onClick={handleSubscribe}
            disabled={loading}
            size="lg"
            className="bg-red-600 hover:bg-red-700 px-12 py-4 text-lg"
          >
            {loading ? 'Duke u abonuar...' : `Abonohu në ${plans.find(p => p.id === selectedPlan)?.name}`}
          </Button>
          
          <p className="text-gray-400 text-sm mt-4">
            Mund të anuloni abonimi në çdo kohë. Pa kontrata afatgjata.
          </p>
        </div>

        {/* Features */}
        <div className="mt-20 grid md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Shiko Kudo</h3>
            <p className="text-gray-400">
              Në të gjitha pajisjet - telefon, tablet, kompjuter dhe TV
            </p>
          </div>
          
          <div>
            <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Download Offline</h3>
            <p className="text-gray-400">
              Shkarkoni filmat dhe shikoni pa internet
            </p>
          </div>
          
          <div>
            <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Anulo Kurdoherë</h3>
            <p className="text-gray-400">
              Pa kontrata. Anuloni abonimi me një klik
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
