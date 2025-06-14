
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Stethoscope, Mail, Lock, User, Phone, Shield } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from '@/hooks/use-toast';

const AuthForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [userSignUpData, setUserSignUpData] = useState({
    email: '',
    password: '',
    fullName: '',
    phone: '',
  });
  const [adminSignUpData, setAdminSignUpData] = useState({
    email: '',
    password: '',
    fullName: '',
    phone: '',
    adminCode: '',
  });
  const [signInData, setSignInData] = useState({
    email: '',
    password: '',
  });
  const { toast } = useToast();

  console.log('AuthForm rendered');

  const handleUserSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    console.log('Attempting user sign up with:', userSignUpData.email);

    try {
      const { error } = await supabase.auth.signUp({
        email: userSignUpData.email,
        password: userSignUpData.password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          data: {
            full_name: userSignUpData.fullName,
            phone: userSignUpData.phone,
            role: 'user',
          }
        }
      });

      if (error) throw error;

      toast({
        title: "User Account Created",
        description: "Please check your email to verify your account.",
      });
    } catch (error: any) {
      console.error('User sign up error:', error);
      toast({
        title: "Sign Up Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdminSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    console.log('Attempting admin sign up with:', adminSignUpData.email);

    // Simple admin code verification (you can make this more secure)
    if (adminSignUpData.adminCode !== 'CLINIC_ADMIN_2024') {
      toast({
        title: "Invalid Admin Code",
        description: "Please enter the correct admin code.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.signUp({
        email: adminSignUpData.email,
        password: adminSignUpData.password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          data: {
            full_name: adminSignUpData.fullName,
            phone: adminSignUpData.phone,
            role: 'admin',
          }
        }
      });

      if (error) throw error;

      toast({
        title: "Admin Account Created",
        description: "Please check your email to verify your admin account.",
      });
    } catch (error: any) {
      console.error('Admin sign up error:', error);
      toast({
        title: "Sign Up Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    console.log('Attempting sign in with:', signInData.email);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: signInData.email,
        password: signInData.password,
      });

      if (error) throw error;

      toast({
        title: "Welcome Back",
        description: "You have been logged in successfully!",
      });
    } catch (error: any) {
      console.error('Sign in error:', error);
      toast({
        title: "Sign In Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 to-orange-50 p-4">
      <Card className="w-full max-w-md bg-white/80 backdrop-blur-sm border-teal-100">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Stethoscope className="w-8 h-8 text-teal-600" />
            <h1 className="text-2xl font-bold text-teal-900">Elizabeth Clinic</h1>
          </div>
          <CardTitle className="text-teal-900">Welcome</CardTitle>
          <CardDescription>Sign in to your account or create a new one</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="user-signup">User Sign Up</TabsTrigger>
              <TabsTrigger value="admin-signup">Admin Sign Up</TabsTrigger>
            </TabsList>
            
            <TabsContent value="signin">
              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signin-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-teal-500" />
                    <Input
                      id="signin-email"
                      type="email"
                      placeholder="Enter your email"
                      value={signInData.email}
                      onChange={(e) => setSignInData({ ...signInData, email: e.target.value })}
                      className="pl-10 border-teal-200 focus:border-teal-500"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="signin-password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-teal-500" />
                    <Input
                      id="signin-password"
                      type="password"
                      placeholder="Enter your password"
                      value={signInData.password}
                      onChange={(e) => setSignInData({ ...signInData, password: e.target.value })}
                      className="pl-10 border-teal-200 focus:border-teal-500"
                      required
                    />
                  </div>
                </div>
                
                <Button
                  type="submit"
                  className="w-full bg-teal-600 hover:bg-teal-700"
                  disabled={isLoading}
                >
                  {isLoading ? 'Signing In...' : 'Sign In'}
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="user-signup">
              <form onSubmit={handleUserSignUp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="user-signup-name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-teal-500" />
                    <Input
                      id="user-signup-name"
                      type="text"
                      placeholder="Enter your full name"
                      value={userSignUpData.fullName}
                      onChange={(e) => setUserSignUpData({ ...userSignUpData, fullName: e.target.value })}
                      className="pl-10 border-teal-200 focus:border-teal-500"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="user-signup-phone">Phone</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-teal-500" />
                    <Input
                      id="user-signup-phone"
                      type="tel"
                      placeholder="Enter your phone number"
                      value={userSignUpData.phone}
                      onChange={(e) => setUserSignUpData({ ...userSignUpData, phone: e.target.value })}
                      className="pl-10 border-teal-200 focus:border-teal-500"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="user-signup-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-teal-500" />
                    <Input
                      id="user-signup-email"
                      type="email"
                      placeholder="Enter your email"
                      value={userSignUpData.email}
                      onChange={(e) => setUserSignUpData({ ...userSignUpData, email: e.target.value })}
                      className="pl-10 border-teal-200 focus:border-teal-500"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="user-signup-password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-teal-500" />
                    <Input
                      id="user-signup-password"
                      type="password"
                      placeholder="Enter your password"
                      value={userSignUpData.password}
                      onChange={(e) => setUserSignUpData({ ...userSignUpData, password: e.target.value })}
                      className="pl-10 border-teal-200 focus:border-teal-500"
                      required
                      minLength={6}
                    />
                  </div>
                </div>
                
                <Button
                  type="submit"
                  className="w-full bg-teal-600 hover:bg-teal-700"
                  disabled={isLoading}
                >
                  {isLoading ? 'Creating User Account...' : 'Create User Account'}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="admin-signup">
              <form onSubmit={handleAdminSignUp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="admin-signup-name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-orange-500" />
                    <Input
                      id="admin-signup-name"
                      type="text"
                      placeholder="Enter your full name"
                      value={adminSignUpData.fullName}
                      onChange={(e) => setAdminSignUpData({ ...adminSignUpData, fullName: e.target.value })}
                      className="pl-10 border-orange-200 focus:border-orange-500"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="admin-signup-phone">Phone</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-orange-500" />
                    <Input
                      id="admin-signup-phone"
                      type="tel"
                      placeholder="Enter your phone number"
                      value={adminSignUpData.phone}
                      onChange={(e) => setAdminSignUpData({ ...adminSignUpData, phone: e.target.value })}
                      className="pl-10 border-orange-200 focus:border-orange-500"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="admin-signup-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-orange-500" />
                    <Input
                      id="admin-signup-email"
                      type="email"
                      placeholder="Enter your email"
                      value={adminSignUpData.email}
                      onChange={(e) => setAdminSignUpData({ ...adminSignUpData, email: e.target.value })}
                      className="pl-10 border-orange-200 focus:border-orange-500"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="admin-signup-password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-orange-500" />
                    <Input
                      id="admin-signup-password"
                      type="password"
                      placeholder="Enter your password"
                      value={adminSignUpData.password}
                      onChange={(e) => setAdminSignUpData({ ...adminSignUpData, password: e.target.value })}
                      className="pl-10 border-orange-200 focus:border-orange-500"
                      required
                      minLength={6}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="admin-code">Admin Code</Label>
                  <div className="relative">
                    <Shield className="absolute left-3 top-3 h-4 w-4 text-orange-500" />
                    <Input
                      id="admin-code"
                      type="password"
                      placeholder="Enter admin access code"
                      value={adminSignUpData.adminCode}
                      onChange={(e) => setAdminSignUpData({ ...adminSignUpData, adminCode: e.target.value })}
                      className="pl-10 border-orange-200 focus:border-orange-500"
                      required
                    />
                  </div>
                  <p className="text-xs text-orange-600">Contact clinic management for admin code</p>
                </div>
                
                <Button
                  type="submit"
                  className="w-full bg-orange-600 hover:bg-orange-700"
                  disabled={isLoading}
                >
                  {isLoading ? 'Creating Admin Account...' : 'Create Admin Account'}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthForm;
