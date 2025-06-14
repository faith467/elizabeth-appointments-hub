
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import AuthForm from "./components/AuthForm";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";
import { useToast } from "@/hooks/use-toast";

const queryClient = new QueryClient();

const AppContent = () => {
  const [user, setUser] = useState<{ email: string; isAdmin: boolean } | null>(null);
  const { toast } = useToast();

  const handleAuth = async (email: string, password: string, isSignUp: boolean, isAdmin: boolean, fullName?: string) => {
    try {
      // Simulate authentication
      console.log('Auth attempt:', { email, isSignUp, isAdmin, fullName });
      
      // In a real app, this would make API calls to Supabase
      setUser({ email, isAdmin });
      
      toast({
        title: isSignUp ? "Account Created" : "Welcome Back",
        description: isSignUp 
          ? "Your account has been created successfully!" 
          : "You have been logged in successfully!",
      });
    } catch (error) {
      console.error('Auth error:', error);
      toast({
        title: "Authentication Error",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      });
    }
  };

  const handleLogout = () => {
    setUser(null);
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully.",
    });
  };

  if (!user) {
    return <AuthForm onAuth={handleAuth} />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/" 
          element={
            user.isAdmin 
              ? <AdminDashboard onLogout={handleLogout} />
              : <UserDashboard onLogout={handleLogout} />
          } 
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AppContent />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
