// client/src/pages/OrderSuccessPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { CheckCircle2, Package, Truck, ArrowRight, Home, Sparkles } from 'lucide-react';
import { SEOHead } from '../components/seo/SEOHead';
import { api } from '../services/api';

export const OrderSuccessPage = () => {
  const { orderNumber } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Launch celebratory confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#C46E63', '#B05549', '#D4AF37', '#FAF8F5']
      });
    } catch (e) {
      console.error(e);
    }

    const fetchOrder = async () => {
      try {
        const data = await api.trackOrder(orderNumber);
        setOrder(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (orderNumber) {
      fetchOrder();
    }
  }, [orderNumber]);

  return (
    <div className="bg-sand-50 min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <SEOHead
        title="Order Confirmed | Inthugil"
        description="Your Inthugil order has been successfully placed. We are preparing your elegant clothing with love."
        canonicalUrl="https://inthugil.in/order-success"
      />

      <div className="max-w-2xl mx-auto bg-white rounded-3xl p-8 sm:p-12 border border-sand-200 shadow-lift text-center">
        
        {/* Celebration Icon */}
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-6 shadow-soft">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <span className="text-xs uppercase tracking-widest font-bold text-brand-600 block mb-1">
          Payment & Order Confirmed
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-regal-900 mb-2">
          Thank You For Choosing Inthugil!
        </h1>
        <p className="text-xs sm:text-sm text-sand-600 max-w-md mx-auto mb-6">
          Your order has been confirmed and our studio team is preparing your package with careful quality checks.
        </p>

        {/* Order Badge */}
        <div className="inline-flex items-center gap-2 bg-sand-100 px-4 py-2 rounded-2xl text-xs sm:text-sm font-mono font-bold text-regal-900 border border-sand-300 mb-8">
          <span>Order Number:</span>
          <span className="text-brand-700">{orderNumber}</span>
        </div>

        {/* Order details card */}
        {order && (
          <div className="bg-sand-50 p-6 rounded-2xl text-left border border-sand-200 text-xs text-sand-700 space-y-3 mb-8">
            <div className="flex justify-between items-center pb-2 border-b border-sand-200 font-bold text-regal-900">
              <span>Delivery Recipient</span>
              <span>{order.customer?.name} ({order.customer?.phone})</span>
            </div>
            <p>
              <strong>Shipping to:</strong> {order.customer?.address}, {order.customer?.city}, {order.customer?.state} - {order.customer?.pincode}
            </p>
            <p>
              <strong>Payment Method:</strong> {order.paymentMethod} • <span className="text-emerald-700 font-bold">{order.paymentStatus}</span>
            </p>
            <p>
              <strong>Estimated Delivery:</strong> 3 to 4 Business Days (Express Air Dispatch)
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to={`/track-order?num=${orderNumber}`}
            className="w-full sm:w-auto bg-regal-900 hover:bg-brand-600 text-white px-6 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition shadow"
          >
            <Truck className="w-4 h-4" />
            <span>Track Delivery Status</span>
          </Link>

          <Link
            to="/shop"
            className="w-full sm:w-auto bg-sand-100 hover:bg-sand-200 text-regal-900 px-6 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition"
          >
            <Home className="w-4 h-4" />
            <span>Continue Shopping</span>
          </Link>
        </div>

      </div>
    </div>
  );
};
