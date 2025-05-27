
import React from "react";
import { Button } from "@/components/ui/button";

interface OrderFormProps {
  formData: {
    name: string;
    email: string;
    phone: string;
    paymentMethod: string;
    specialization: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  singleProduct?: any;
  checkoutTotal: number;
}

export const OrderForm = ({
  formData,
  handleInputChange,
  handleSubmit,
  isLoading,
  singleProduct,
  checkoutTotal
}: OrderFormProps) => {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">Customer Information</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
            Full Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your full name"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your email address"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your phone number"
          />
        </div>

        <div>
          <label htmlFor="specialization" className="block text-sm font-medium text-slate-700 mb-2">
            Your Specialization *
          </label>
          <select
            id="specialization"
            name="specialization"
            value={formData.specialization}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select your specialization</option>
            <option value="cloud_security">Cloud & Security</option>
            <option value="data_analytics">Data Analytics</option>
          </select>
          <p className="text-sm text-slate-600 mt-1">
            This helps us deliver the most relevant projects for your field of study.
          </p>
        </div>

        <div>
          <label htmlFor="paymentMethod" className="block text-sm font-medium text-slate-700 mb-2">
            Payment Method
          </label>
          <select
            id="paymentMethod"
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="upi">UPI Payment</option>
            <option value="card">Credit/Debit Card</option>
            <option value="netbanking">Net Banking</option>
          </select>
        </div>

        <Button 
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-4 text-lg rounded-xl hover:shadow-lg transition-all duration-300"
        >
          {isLoading ? 'Processing...' : `Complete Order - ₹${(singleProduct ? singleProduct.price : checkoutTotal).toLocaleString()}`}
        </Button>
      </form>
    </div>
  );
};
