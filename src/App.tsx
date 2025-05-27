import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import Index from './pages/Index';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Auth from './pages/Auth';
import PaymentSuccess from './pages/PaymentSuccess';
import { AuthGuard } from './components/AuthGuard';
import { Toaster } from "@/components/ui/toaster"
import AdminSettings from './components/AdminSettings';
import { CartProvider } from './hooks/useCart';
import { AdminProtectedRoute } from './components/AdminProtectedRoute';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-gray-50">
            <Navigation />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/login" element={<Auth />} />
              <Route path="/signup" element={<Auth />} />
              <Route path="/payment-success" element={<PaymentSuccess />} />
              <Route 
                path="/admin-settings" 
                element={
                  <AdminProtectedRoute requiredPermission="can_manage_products">
                    <AdminSettings />
                  </AdminProtectedRoute>
                } 
              />
            </Routes>
            <Footer />
            <Toaster />
          </div>
        </BrowserRouter>
      </CartProvider>
    </QueryClientProvider>
  );
}

export default App;
