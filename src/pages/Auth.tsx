
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Loader2, Mail, Lock, User, Shield, Chrome } from 'lucide-react';
import { useAuth } from '@/components/AuthGuard';

const Auth = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { user } = useAuth();

  // Get the redirect path from location state
  const from = location.state?.from || '/';
  const singleProduct = location.state?.singleProduct;

  useEffect(() => {
    // If user is already logged in, redirect to intended destination
    if (user) {
      if (singleProduct) {
        navigate('/checkout', { 
          state: { 
            singleProduct,
            total: singleProduct.price
          } 
        });
      } else {
        navigate(from);
      }
    }
  }, [user, navigate, from, singleProduct]);

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            phone: phone
          }
        }
      });

      if (error) throw error;

      if (data.user) {
        toast({
          title: "Account Created Successfully!",
          description: "Please check your email to verify your account.",
        });
        
        // Redirect after successful signup
        setTimeout(() => {
          if (singleProduct) {
            navigate('/checkout', { 
              state: { 
                singleProduct,
                total: singleProduct.price
              } 
            });
          } else {
            navigate(from);
          }
        }, 2000);
      }
    } catch (error: any) {
      toast({
        title: "Sign Up Failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        toast({
          title: "Welcome Back!",
          description: "You have successfully signed in.",
        });
        
        // Redirect after successful sign in
        if (singleProduct) {
          navigate('/checkout', { 
            state: { 
              singleProduct,
              total: singleProduct.price
            } 
          });
        } else {
          navigate(from);
        }
      }
    } catch (error: any) {
      toast({
        title: "Sign In Failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth`,
        }
      });

      if (error) throw error;
    } catch (error: any) {
      toast({
        title: "Google Sign In Failed",
        description: error.message,
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  if (user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-slate-600">Redirecting...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navigation />
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <Shield className="w-16 h-16 mx-auto text-blue-600 mb-4" />
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Secure Student Portal</h1>
            <p className="text-slate-600">Your privacy and security are our top priority</p>
          </div>

          <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl text-center">Welcome to EduElan</CardTitle>
              <CardDescription className="text-center">
                Sign in to access your secure student dashboard
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-4 mb-6">
                <Button
                  onClick={handleGoogleSignIn}
                  disabled={loading}
                  variant="outline"
                  className="w-full h-12 border-2 border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-300"
                >
                  <Chrome className="w-5 h-5 mr-2" />
                  Continue with Google
                </Button>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-slate-300" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-slate-500">Or continue with email</span>
                </div>
              </div>

              <Tabs defaultValue="signin" className="mt-6">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="signin">Sign In</TabsTrigger>
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>
                
                <TabsContent value="signin">
                  <form onSubmit={handleEmailSignIn} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="signin-email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                        <Input
                          id="signin-email"
                          type="email"
                          placeholder="student@university.edu"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signin-password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                        <Input
                          id="signin-password"
                          type="password"
                          placeholder="••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white h-12 text-lg font-semibold"
                      disabled={loading}
                    >
                      {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                      Sign In Securely
                    </Button>
                  </form>
                </TabsContent>
                
                <TabsContent value="signup">
                  <form onSubmit={handleEmailSignUp} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="signup-name">Full Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                        <Input
                          id="signup-name"
                          type="text"
                          placeholder="Your full name"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          required
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                        <Input
                          id="signup-email"
                          type="email"
                          placeholder="student@university.edu"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-phone">Phone (Optional)</Label>
                      <Input
                        id="signup-phone"
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                        <Input
                          id="signup-password"
                          type="password"
                          placeholder="••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          className="pl-10"
                          minLength={6}
                        />
                      </div>
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white h-12 text-lg font-semibold"
                      disabled={loading}
                    >
                      {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                      Create Secure Account
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
            
            <CardFooter>
              <div className="w-full text-center">
                <div className="flex items-center justify-center gap-2 text-sm text-slate-600 mb-2">
                  <Shield className="w-4 h-4 text-green-600" />
                  <span>Your data is encrypted and secure</span>
                </div>
                <p className="text-xs text-slate-500">
                  By continuing, you agree to our privacy-first approach to student data protection.
                </p>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Auth;
