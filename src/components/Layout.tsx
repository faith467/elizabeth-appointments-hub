
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LogOut, Heart } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  userType?: 'user' | 'admin';
  onLogout?: () => void;
}

const Layout = ({ children, userType, onLogout }: LayoutProps) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-orange-50">
      <header className="bg-white/80 backdrop-blur-sm border-b border-teal-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 bg-teal-600 rounded-xl">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-teal-900">Elizabeth Clinic</h1>
                <p className="text-sm text-teal-600">Healthcare Excellence</p>
              </div>
            </div>
            
            {userType && (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600 capitalize">
                  {userType} Dashboard
                </span>
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  size="sm"
                  className="flex items-center space-x-2 border-teal-200 hover:bg-teal-50"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
};

export default Layout;
