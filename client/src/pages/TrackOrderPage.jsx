// client/src/pages/TrackOrderPage.jsx
import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Package, Search, Truck, CheckCircle2, Clock, AlertCircle, ArrowRight } from 'lucide-react';
import { SEOHead } from '../components/seo/SEOHead';
import { api } from '../services/api';

export const TrackOrderPage = () => {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('num') || '';

  const [query, setQuery] = useState(initialQuery);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleTrack = async (searchVal) => {
    const term = (searchVal || query).trim();
    if (!term) return;

    setLoading(true);
    setErrorMsg('');
    setOrder(null);
    try {
      const data = await api.trackOrder(term);
      setOrder(data);
    } catch (err) {
      setErrorMsg('No order found matching this Order Number or Phone. Please check and try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialQuery) {
      handleTrack(initialQuery);
    }
  }, [initialQuery]);

  const stages = [
    { key: 'Placed', label: 'Order Placed', desc: 'Received & Queued' },
    { key: 'Confirmed', label: 'Confirmed', desc: 'Quality Check & Packing' },
    { key: 'Shipped', label: 'Shipped', desc: 'Dispatched via Express Courier' },
    { key: 'Delivered', label: 'Delivered', desc: 'Safely Arrived at Doorstep' },
  ];

  const getCurrentStageIndex = (status) => {
    const s = (status || '').toLowerCase();
    if (s === 'delivered') return 3;
    if (s === 'shipped') return 2;
    if (s === 'confirmed' || s === 'processing') return 1;
    return 0; // Placed
  };

  const currentStage = order ? getCurrentStageIndex(order.orderStatus) : 0;

  return (
    <div className="bg-sand-50 min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <SEOHead
        title="Track Your Order | Inthugil"
        description="Track your Inthugil fashion parcel in real-time. View shipping updates, courier partner tracking, and delivery timelines across India."
        canonicalUrl="https://inthugil.in/track-order"
      />

      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-brand-100 text-brand-600 flex items-center justify-center mx-auto shadow-soft">
            <Package className="w-6 h-6" />
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-regal-900 tracking-tight">
            Track Your Inthugil Order
          </h1>
          <p className="text-xs sm:text-sm text-sand-600 max-w-md mx-auto">
            Enter your Order Number (e.g. <span className="font-mono font-bold text-brand-700">INTH-84920</span>) or your 10-digit mobile number.
          </p>
        </div>

        {/* Search Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleTrack();
          }}
          className="bg-white p-3 rounded-2xl border border-sand-300 shadow-soft flex gap-2"
        >
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-sand-400 absolute left-4 top-3.5" />
            <input
              type="text"
              required
              placeholder="e.g. INTH-84920 or 9820012345"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 text-xs sm:text-sm bg-transparent focus:outline-none text-regal-900 font-medium"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-brand-600 hover:bg-brand-500 text-white px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition shadow shrink-0"
          >
            {loading ? 'Searching...' : 'Track'}
          </button>
        </form>

        {errorMsg && (
          <div className="bg-rose-50 border border-rose-200 p-4 rounded-2xl flex items-center gap-3 text-xs text-rose-700">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Order Result Card */}
        {order && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sand-200 shadow-lift space-y-8 animate-in fade-in duration-300">
            
            {/* Top Banner */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-sand-200 gap-4">
              <div>
                <span className="text-xs text-sand-500 font-medium">Order Number</span>
                <h2 className="font-serif text-2xl font-bold text-regal-900 font-mono">
                  {order.orderNumber}
                </h2>
                <p className="text-[11px] text-sand-500 mt-0.5">
                  Placed on {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                </p>
              </div>

              <div className="sm:text-right">
                <span className="text-xs text-sand-500 font-medium block">Current Status</span>
                <span className="inline-block bg-brand-100 text-brand-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  {order.orderStatus}
                </span>
                {order.trackingNumber && (
                  <p className="text-[11px] text-sand-500 mt-1 font-mono">
                    AWB: {order.trackingNumber}
                  </p>
                )}
              </div>
            </div>

            {/* Timeline Stepper */}
            <div>
              <h3 className="font-serif text-sm font-bold text-regal-900 mb-6">
                Delivery Progress
              </h3>

              <div className="relative">
                <div className="grid grid-cols-4 gap-2">
                  {stages.map((stage, idx) => {
                    const isPassed = idx <= currentStage;
                    const isCurrent = idx === currentStage;

                    return (
                      <div key={stage.key} className="text-center relative">
                        <div
                          className={`w-9 h-9 rounded-full mx-auto flex items-center justify-center text-xs font-bold transition duration-300 ${
                            isPassed
                              ? 'bg-brand-600 text-white shadow-md'
                              : 'bg-sand-200 text-sand-500'
                          } ${isCurrent ? 'ring-4 ring-brand-200 scale-110' : ''}`}
                        >
                          {isPassed ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                        </div>
                        <h4 className={`text-xs font-bold mt-2 ${isPassed ? 'text-regal-900' : 'text-sand-400'}`}>
                          {stage.label}
                        </h4>
                        <p className="text-[10px] text-sand-500 hidden sm:block mt-0.5">
                          {stage.desc}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Timeline Notes */}
            {order.timeline && order.timeline.length > 0 && (
              <div className="bg-sand-50 p-4 rounded-2xl border border-sand-200 space-y-2">
                <h4 className="text-xs font-bold text-regal-900">Activity Log</h4>
                <div className="divide-y divide-sand-200/60 text-xs text-sand-600">
                  {order.timeline.map((event, i) => (
                    <div key={i} className="py-2 flex items-start justify-between gap-4">
                      <div>
                        <span className="font-bold text-regal-900 mr-2">{event.status}:</span>
                        <span>{event.note}</span>
                      </div>
                      <span className="text-[10px] text-sand-500 whitespace-nowrap">{event.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Items in Package */}
            <div>
              <h3 className="font-serif text-sm font-bold text-regal-900 mb-3">
                Items in This Shipment
              </h3>
              <div className="divide-y divide-sand-100">
                {order.items?.map((item, idx) => (
                  <div key={idx} className="py-3 flex items-center gap-4">
                    <img src={item.image} alt={item.name} className="w-12 h-14 object-cover rounded-xl bg-sand-100 shadow-xs" />
                    <div className="flex-1 min-w-0">
                      <h5 className="text-xs font-bold text-regal-900 truncate">{item.name}</h5>
                      <p className="text-[11px] text-sand-500">Size: {item.size} • Qty: {item.quantity}</p>
                    </div>
                    <span className="text-xs font-bold text-regal-900">
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery Recipient Info */}
            <div className="pt-4 border-t border-sand-200 text-xs text-sand-600 space-y-1">
              <p><strong>Recipient:</strong> {order.customer?.name} ({order.customer?.phone})</p>
              <p><strong>Shipping Address:</strong> {order.customer?.address}, {order.customer?.city}, {order.customer?.state} - {order.customer?.pincode}</p>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
