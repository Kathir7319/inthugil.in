// client/src/pages/CheckoutPage.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, Lock, CreditCard, Truck, ArrowLeft, CheckCircle2, AlertCircle } from 'lucide-react';
import { SEOHead } from '../components/seo/SEOHead';
import { useCart } from '../context/CartContext';
import { api } from '../services/api';

export const CheckoutPage = () => {
  const navigate = useNavigate();
  const {
    cartItems,
    subtotal,
    shippingFee,
    isFreeShipping,
    appliedCoupon,
    discountAmount,
    grandTotal,
    clearCart
  } = useCart();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: 'Tamil Nadu',
    pincode: '',
    paymentMethod: 'Razorpay UPI' // 'Razorpay UPI' | 'COD'
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const indianStates = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa',
    'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala',
    'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland',
    'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana',
    'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Delhi NCR', 'Puducherry'
  ];

  if (cartItems.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <h2 className="font-serif text-3xl font-bold text-regal-900 mb-2">Your Bag is Empty</h2>
        <p className="text-xs text-sand-500 mb-6">Add graceful outfits to your bag before checking out.</p>
        <Link
          to="/shop"
          className="bg-brand-600 text-white px-8 py-3.5 rounded-2xl font-bold text-xs inline-flex items-center gap-2 shadow"
        >
          <span>Return to Shop</span>
        </Link>
      </div>
    );
  }

  const handleCheckout = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    // Validation
    if (!formData.name || !formData.phone || !formData.address || !formData.city || !formData.pincode) {
      setErrorMessage('Please fill in all mandatory delivery address fields.');
      return;
    }

    if (!/^\d{6}$/.test(formData.pincode)) {
      setErrorMessage('Please enter a valid 6-digit Indian PIN code.');
      return;
    }

    if (formData.phone.replace(/\D/g, '').length < 10) {
      setErrorMessage('Please enter a valid 10-digit Indian phone number.');
      return;
    }

    setLoading(true);

    try {
      // 1. If Razorpay UPI selected
      if (formData.paymentMethod === 'Razorpay UPI' && window.Razorpay) {
        // Create order on backend
        const rzpData = await api.createRazorpayOrder(grandTotal);
        
        // If in test mode without real merchant keys, create order directly with smooth simulation
        if (rzpData.isTestMode) {
          const newOrder = await api.createOrder({
            customer: {
              name: formData.name,
              email: formData.email,
              phone: formData.phone,
              address: formData.address,
              city: formData.city,
              state: formData.state,
              pincode: formData.pincode
            },
            items: cartItems,
            paymentMethod: 'Razorpay UPI (Verified)',
            paymentStatus: 'PAID',
            subtotal,
            shippingFee,
            discount: discountAmount,
            total: grandTotal
          });

          clearCart();
          navigate(`/order-success/${newOrder.order.orderNumber}`);
          return;
        }

        // Real Razorpay Checkout modal
        const options = {
          key: rzpData.keyId,
          amount: rzpData.order.amount,
          currency: 'INR',
          name: 'Inthugil.in',
          description: 'Women Affordable Elegant Fashion',
          image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=200&q=80',
          order_id: rzpData.order.id,
          handler: async function (response) {
            // Verify payment
            await api.verifyRazorpayPayment(response);

            // Record order
            const newOrder = await api.createOrder({
              customer: {
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                address: formData.address,
                city: formData.city,
                state: formData.state,
                pincode: formData.pincode
              },
              items: cartItems,
              paymentMethod: 'Razorpay UPI / Cards',
              paymentStatus: 'PAID',
              razorpayPaymentId: response.razorpay_payment_id,
              subtotal,
              shippingFee,
              discount: discountAmount,
              total: grandTotal
            });

            clearCart();
            navigate(`/order-success/${newOrder.order.orderNumber}`);
          },
          prefill: {
            name: formData.name,
            email: formData.email,
            contact: formData.phone
          },
          theme: {
            color: '#B05549'
          }
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
        setLoading(false);
        return;
      }

      // 2. Cash on Delivery (COD)
      const codExtraCharge = 40;
      const finalCODTotal = grandTotal + (formData.paymentMethod === 'COD' ? codExtraCharge : 0);

      const newOrder = await api.createOrder({
        customer: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode
        },
        items: cartItems,
        paymentMethod: 'Cash on Delivery (COD)',
        paymentStatus: 'PENDING',
        subtotal,
        shippingFee: shippingFee + (formData.paymentMethod === 'COD' ? codExtraCharge : 0),
        discount: discountAmount,
        total: finalCODTotal
      });

      clearCart();
      navigate(`/order-success/${newOrder.order.orderNumber}`);
    } catch (err) {
      console.error(err);
      setErrorMessage(err.message || 'Payment or order processing failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-sand-50 min-h-screen py-12">
      <SEOHead
        title="Secure Checkout | Inthugil"
        description="Complete your order securely with Inthugil. 100% verified Razorpay payments, UPI, and Cash on Delivery across India."
        canonicalUrl="https://inthugil.in/checkout"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header */}
        <div className="flex items-center justify-between pb-8 mb-8 border-b border-sand-200">
          <Link to="/" className="inline-block">
            <span className="font-serif text-2xl font-bold tracking-tight text-regal-900">
              INTHUGIL
            </span>
          </Link>
          <div className="flex items-center gap-1.5 text-xs text-sand-500">
            <Lock className="w-4 h-4 text-emerald-600" />
            <span>256-Bit SSL Encrypted Checkout</span>
          </div>
        </div>

        <form onSubmit={handleCheckout}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Left Column: Delivery & Payment Details (7 cols) */}
            <div className="lg:col-span-7 space-y-8">
              
              {/* Shipping Address */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sand-200 shadow-soft space-y-4">
                <div className="flex items-center gap-2 pb-3 border-b border-sand-100">
                  <Truck className="w-5 h-5 text-brand-600" />
                  <h2 className="font-serif text-lg font-bold text-regal-900">1. Delivery Address (India)</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-regal-900 mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Priyadarshini Sundar"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-sand-50 border border-sand-300 rounded-xl px-3.5 py-2.5 text-xs text-regal-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-regal-900 mb-1">Mobile Number (for delivery SMS) *</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 9876543210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-sand-50 border border-sand-300 rounded-xl px-3.5 py-2.5 text-xs text-regal-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-regal-900 mb-1">Email Address (for invoice) *</label>
                  <input
                    type="email"
                    required
                    placeholder="priya@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-sand-50 border border-sand-300 rounded-xl px-3.5 py-2.5 text-xs text-regal-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-regal-900 mb-1">Street Address, Flat / House No *</label>
                  <textarea
                    rows={2}
                    required
                    placeholder="Flat 302, Lotus Apartments, 4th Cross Road"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full bg-sand-50 border border-sand-300 rounded-xl px-3.5 py-2 text-xs text-regal-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-regal-900 mb-1">City / Town *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Chennai"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full bg-sand-50 border border-sand-300 rounded-xl px-3.5 py-2.5 text-xs text-regal-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-regal-900 mb-1">State *</label>
                    <select
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="w-full bg-sand-50 border border-sand-300 rounded-xl px-3 py-2.5 text-xs text-regal-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
                    >
                      {indianStates.map((st) => (
                        <option key={st} value={st}>{st}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-regal-900 mb-1">PIN Code *</label>
                    <input
                      type="text"
                      required
                      maxLength={6}
                      placeholder="600001"
                      value={formData.pincode}
                      onChange={(e) => setFormData({ ...formData, pincode: e.target.value.replace(/\D/g, '') })}
                      className="w-full bg-sand-50 border border-sand-300 rounded-xl px-3.5 py-2.5 text-xs text-regal-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method Selector */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sand-200 shadow-soft space-y-4">
                <div className="flex items-center gap-2 pb-3 border-b border-sand-100">
                  <CreditCard className="w-5 h-5 text-brand-600" />
                  <h2 className="font-serif text-lg font-bold text-regal-900">2. Payment Method</h2>
                </div>

                <div className="space-y-3">
                  {/* Razorpay UPI / Cards */}
                  <label className={`flex items-start gap-4 p-4 rounded-2xl border-2 cursor-pointer transition ${
                    formData.paymentMethod === 'Razorpay UPI'
                      ? 'border-brand-600 bg-brand-50/40'
                      : 'border-sand-200 hover:border-sand-300 bg-white'
                  }`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="Razorpay UPI"
                      checked={formData.paymentMethod === 'Razorpay UPI'}
                      onChange={() => setFormData({ ...formData, paymentMethod: 'Razorpay UPI' })}
                      className="mt-1 text-brand-600 focus:ring-brand-500"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <strong className="text-xs sm:text-sm font-bold text-regal-900">
                          Instant UPI, Cards & Netbanking (Razorpay)
                        </strong>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                          Fast & Free Delivery
                        </span>
                      </div>
                      <p className="text-xs text-sand-600 mt-1">
                        Google Pay, PhonePe, Paytm, BHIM UPI, Visa, Mastercard, RuPay, and Net Banking.
                      </p>
                    </div>
                  </label>

                  {/* Cash on Delivery */}
                  <label className={`flex items-start gap-4 p-4 rounded-2xl border-2 cursor-pointer transition ${
                    formData.paymentMethod === 'COD'
                      ? 'border-brand-600 bg-brand-50/40'
                      : 'border-sand-200 hover:border-sand-300 bg-white'
                  }`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="COD"
                      checked={formData.paymentMethod === 'COD'}
                      onChange={() => setFormData({ ...formData, paymentMethod: 'COD' })}
                      className="mt-1 text-brand-600 focus:ring-brand-500"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <strong className="text-xs sm:text-sm font-bold text-regal-900">
                          Cash on Delivery (COD)
                        </strong>
                        <span className="text-[10px] text-sand-500">
                          +₹40 COD Convenience Fee
                        </span>
                      </div>
                      <p className="text-xs text-sand-600 mt-1">
                        Pay with cash or scan QR when your parcel arrives at your doorstep.
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              {errorMessage && (
                <div className="bg-rose-50 border border-rose-200 p-4 rounded-2xl flex items-center gap-2 text-xs text-rose-700">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

            </div>

            {/* Right Column: Order Summary (5 cols) */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sand-200 shadow-soft sticky top-28 space-y-6">
                
                <h3 className="font-serif text-lg font-bold text-regal-900 pb-3 border-b border-sand-100">
                  Order Summary ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})
                </h3>

                {/* Items preview */}
                <div className="divide-y divide-sand-100 max-h-64 overflow-y-auto pr-1">
                  {cartItems.map((item) => (
                    <div key={`${item.id}-${item.size}`} className="py-3 first:pt-0 flex items-center gap-3">
                      <img src={item.image} alt={item.name} className="w-12 h-14 object-cover rounded-lg bg-sand-100 shadow-xs" />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-semibold text-regal-900 truncate">{item.name}</h4>
                        <p className="text-[11px] text-sand-500">Size: {item.size} • Qty: {item.quantity}</p>
                      </div>
                      <span className="text-xs font-bold text-regal-900">
                        ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Cost Calculations */}
                <div className="space-y-2 text-xs pt-3 border-t border-sand-200 text-sand-600">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold text-regal-900">₹{subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-700 font-medium">
                      <span>Coupon ({appliedCoupon?.code})</span>
                      <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Shipping Charges</span>
                    <span>{isFreeShipping ? <strong className="text-emerald-700">FREE</strong> : `₹${shippingFee}`}</span>
                  </div>
                  {formData.paymentMethod === 'COD' && (
                    <div className="flex justify-between">
                      <span>COD Handling Fee</span>
                      <span>₹40</span>
                    </div>
                  )}
                  <div className="flex justify-between text-base font-bold text-regal-900 pt-3 border-t border-sand-200">
                    <span>Grand Total (INR)</span>
                    <span className="font-serif text-xl text-brand-700">
                      ₹{(grandTotal + (formData.paymentMethod === 'COD' ? 40 : 0)).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-brand-600 hover:bg-brand-500 text-white py-4 px-6 rounded-2xl font-bold text-sm uppercase tracking-wider shadow-lift transition duration-200"
                >
                  {loading ? 'Processing Order...' : `Place Order (₹${(grandTotal + (formData.paymentMethod === 'COD' ? 40 : 0)).toLocaleString('en-IN')})`}
                </button>

                <div className="pt-2 text-center space-y-2 text-[11px] text-sand-500">
                  <div className="flex items-center justify-center gap-1.5 text-emerald-700 font-semibold">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Inthugil Buyer Guarantee</span>
                  </div>
                  <p>7-Day Easy Doorstep Exchange & Returns across India</p>
                </div>

              </div>
            </div>

          </div>
        </form>

      </div>
    </div>
  );
};
