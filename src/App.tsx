
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Browse from "./pages/Browse";
import Movies from "./pages/Movies";
import Series from "./pages/Series";
import MyList from "./pages/MyList";
import Profile from "./pages/Profile";
import Subscribe from "./pages/Subscribe";
import Watch from "./pages/Watch";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/hyr" element={<Login />} />
            <Route path="/regjistrohu" element={<Register />} />
            <Route path="/abonohu" element={<Subscribe />} />
            <Route path="/shfleto" element={
              <ProtectedRoute>
                <Browse />
              </ProtectedRoute>
            } />
            <Route path="/filma" element={
              <ProtectedRoute>
                <Movies />
              </ProtectedRoute>
            } />
            <Route path="/seriale" element={
              <ProtectedRoute>
                <Series />
              </ProtectedRoute>
            } />
            <Route path="/te-preferuarat" element={
              <ProtectedRoute>
                <MyList />
              </ProtectedRoute>
            } />
            <Route path="/profili" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            <Route path="/shiko/:id" element={
              <ProtectedRoute>
                <Watch />
              </ProtectedRoute>
            } />
            <Route path="/admin" element={
              <ProtectedRoute adminOnly>
                <Admin />
              </ProtectedRoute>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
