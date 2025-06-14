
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Heart, Mail, Lock, User } from 'lucide-react';

interface AuthFormProps {
  onAuth: (email: string, password: string, isSignUp: boolean, isAdmin: boolean, fullName?: string) => void;
}

const AuthForm = ({ onAuth }: AuthFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const handleSubmit = (e: React.FormEvent, isSignUp: boolean) => {
    e.preventDefault();
    onAuth(email, password, isSignUp, isAdmin, isSignUp ? fullName : undefined);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 to-orange-50 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center w-16 h-16 bg-teal-600 rounded-2xl mx-auto mb-4">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-teal-900 mb-2">Elizabeth Clinic</h1>
          <p className="text-teal-600">Your Healthcare Partner</p>
        </div>

        <Card className="bg-white/80 backdrop-blur-sm border-teal-100 shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-teal-900">Welcome</CardTitle>
            <CardDescription>Sign in to your account or create a new one</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-teal-50">
                <TabsTrigger value="login" className="data-[state=active]:bg-teal-600 data-[state=active]:text-white">Login</TabsTrigger>
                <TabsTrigger value="signup" className="data-[state=active]:bg-teal-600 data-[state=active]:text-white">Sign Up</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login">
                <form onSubmit={(e) => handleSubmit(e, false)} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email" className="text-teal-900">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-teal-500" />
                      <Input
                        id="login-email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10 border-teal-200 focus:border-teal-500"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="login-password" className="text-teal-900">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-teal-500" />
                      <Input
                        id="login-password"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10 border-teal-200 focus:border-teal-500"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="admin-login"
                      checked={isAdmin}
                      onCheckedChange={setIsAdmin}
                    />
                    <Label htmlFor="admin-login" className="text-sm text-teal-700">
                      Login as Admin
                    </Label>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-teal-600 hover:bg-teal-700 text-white"
                  >
                    Sign In
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="signup">
                <form onSubmit={(e) => handleSubmit(e, true)} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name" className="text-teal-900">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-teal-500" />
                      <Input
                        id="signup-name"
                        type="text"
                        placeholder="Enter your full name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="pl-10 border-teal-200 focus:border-teal-500"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="signup-email" className="text-teal-900">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-teal-500" />
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10 border-teal-200 focus:border-teal-500"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="signup-password" className="text-teal-900">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-teal-500" />
                      <Input
                        id="signup-password"
                        type="password"
                        placeholder="Create a password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10 border-teal-200 focus:border-teal-500"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="admin-signup"
                      checked={isAdmin}
                      onCheckedChange={setIsAdmin}
                    />
                    <Label htmlFor="admin-signup" className="text-sm text-teal-700">
                      Register as Admin
                    </Label>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-teal-600 hover:bg-teal-700 text-white"
                  >
                    Create Account
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AuthForm;
